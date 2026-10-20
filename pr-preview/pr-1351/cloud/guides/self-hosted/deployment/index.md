# Deploying Layer5 Cloud

> Layer5 Cloud is a collection of services that can be deployed on-premises using Helm.


## High-level List of Deployment Tasks

<ol>
    <li>Review the prerequisites for installing Layer5 Cloud on Kubernetes. (<a href="#prerequisites">docs</a>)</li>
    <li>Prepare <code>INIT_CONFIG</code> so the first start creates the provider organization and its Provider Admin. (<a href="#provider-initialization">docs</a>)</li>
    <li>Install the <code>layer5-cloud</code> chart. (<a href="#installation">docs</a>)</li>
    <li>Create the OAuth2 client in Hydra. The server does not create it.</li>
    <li>Deploy Meshery separately and point it at this deployment as its remote provider. (<a href="https://docs.meshery.io/installation/quick-start">docs</a>, <a href="https://docs.meshery.io/extensibility/providers#meshery-server-registration">registration</a>)</li>
</ol>

### Kubernetes-based Installation with Helm

The `layer5-cloud` chart is in the [Layer5 Helm repository](https://docs.layer5.io/charts). It deploys the Layer5 Cloud server together with Kratos and Hydra. It does not install PostgreSQL, an ingress controller, or a TLS certificate. Make the decisions in [Planning](/pr-preview/pr-1351/cloud/guides/self-hosted/planning/) first. The commands below use the release name `layer5-cloud` in the namespace `layer5-cloud`.

#### Prerequisites

- A Kubernetes cluster and Helm 3.
- An ingress controller that supports WebSocket upgrades, and a TLS certificate for your hostname. The chart does not request a certificate.
- A PostgreSQL server you can create databases on. Any deployment works, including an operator such as CloudNativePG, a managed service, or a server outside the cluster. The chart reaches it only through the connection strings you set.
- An SMTP relay that satisfies the [mail constraints](/pr-preview/pr-1351/cloud/guides/self-hosted/operating/smtp/#constraints-on-the-shared-mail-server), or the decision to run without mail. Set all four `smtp` values or none.
- The OAuth applications for Google and GitHub, if you offer social sign-in.

The chart does not require a dedicated database namespace, a local-path provisioner, or cert-manager.

#### INIT_CONFIG

`INIT_CONFIG` is a YAML document, set in Helm as `env.initConfig`. It is not a JSON object and it is not a Docker run flag. When it is set and the provider organization does not exist yet, the server creates that organization and the first Provider Admin. See [Provider initialization](#provider-initialization).

##### Purpose

`INIT_CONFIG` gives a new deployment an administrator who can sign in. Without it, the server starts with no provider administrator.

##### Usage

```yaml
env:
  initConfig: |
    organization:
      name: "Example Corp"
      description: "The provider organization for Example Corp."
      country: "United States"
      region: "North America"
    user:
      first_name: "Ada"
      last_name: "Admin"
      email: "admin@example.com"
      username: "admin@example.com"
      password: "<initial password>"
```

Or load the same YAML from a file:

```bash
helm install layer5-cloud layer5/layer5-cloud \
  --namespace layer5-cloud \
  --set-file env.initConfig=provider-init.yaml \
  --values values.yaml
```







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Note</h4>
  
      The server evaluates <code>INIT_CONFIG</code> on every start. If the provider organization already exists, initialization is skipped and later edits are ignored.
  
</div>



##### Configuration Schema

| Field | Required | Meaning |
| --- | --- | --- |
| `organization.name` | Yes | Name of the provider organization. |
| `organization.description` | No | Description. |
| `organization.country` | No | Country. |
| `organization.region` | No | Region. |
| `user.first_name` | Yes | First name of the administrator. |
| `user.last_name` | Yes | Last name of the administrator. |
| `user.email` | Yes | Email address. It is the sign-in identifier. |
| `user.username` | No | Defaults to the email address. |
| `user.password` | Yes | Initial password. |

There is no `provider.name` or `provider.settings` field.

#### Installation

Create the databases, write a values file that replaces the chart's localhost and placeholder secrets, install the chart, then create the Hydra client.

##### 1. Prepare PostgreSQL

Create one role and three databases, then create the `uuid-ossp` extension in `meshery`. The server creates its own schema. CloudNativePG is one way to run PostgreSQL. It is not required, and this chart does not install it.

```sql
CREATE ROLE meshery LOGIN PASSWORD '<password>';
CREATE DATABASE meshery OWNER meshery;
CREATE DATABASE kratos OWNER meshery;
CREATE DATABASE hydra OWNER meshery;
\c meshery
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

Give that user the rights to create tables in the `public` schema of `meshery`. Kratos and Hydra run their own migrations when the chart's automatic migration setting is on, which is the default.

##### 2. Deploy Layer5 cloud

```bash
kubectl create namespace layer5-cloud
helm repo add layer5 https://docs.layer5.io/charts
helm repo update
helm show values layer5/layer5-cloud > values.yaml
```

Edit `values.yaml` before you install. The chart defaults do not produce a working deployment: URLs point at localhost, secrets are placeholders, and the in-cluster Hydra addresses (`hydra-admin`, `hydra-public`) do not match the service names the subcharts create. Set at least `env.proto`, `env.serverbaseurl`, `env.serverHost`, the three database URLs, the Kratos and Hydra addresses, `env.oauthclientid`, `env.oauthsecret`, the two encryption keys, `env.kratosWebhookApiKey`, `env.initConfig`, ingress hosts for `/`, `/kratos`, and `/hydra`, and either all four `smtp` values or none. Point Kratos registration web hooks at `https://<host>/api/identity/users`. The chart default URL omits the `/api` prefix, which the server does not serve. The field-by-field list is [Helm Chart Values](/pr-preview/pr-1351/cloud/guides/self-hosted/deployment/helm-chart-values/).

```bash
helm install layer5-cloud layer5/layer5-cloud \
  --namespace layer5-cloud \
  --values values.yaml
kubectl -n layer5-cloud rollout status deploy/meshery-cloud
```

After the first install, run `kubectl -n layer5-cloud get svc` and correct `env.kratospublic`, `env.kratosadmin`, and `env.hydraadmin` if the service names differ, then upgrade.

##### 3. Create an OAuth 2.0 client

Layer5 Cloud authenticates to Hydra as an OAuth2 client whose id and secret you set in `env.oauthclientid` and `env.oauthsecret`. Create that client with the matching values and the redirect address `<serverbaseurl>/callback`. Sign-in does not work until it exists.

```bash
kubectl -n layer5-cloud exec deploy/cloud-hydra -- hydra create client \
  --endpoint http://127.0.0.1:4445 \
  --id layer5-cloud \
  --secret '<the value of env.oauthsecret>' \
  --grant-type authorization_code,refresh_token,client_credentials,implicit \
  --response-type token,code,id_token \
  --scope openid,offline,offline_access \
  --redirect-uri https://cloud.example.com/callback \
  --skip-consent
```

The command uses the flag names of the Hydra version in the chart's subchart. If your Hydra is older, its command is `hydra clients create` with `--grant-types`, `--response-types`, and `--callbacks`.

## Confirm the deployment works

1. `GET https://<host>/readyz` returns `200`.
2. The server log contains `Server is up and running!` and no `Failed to initialize Provider Admin` line.
3. You can sign in as the administrator from `env.initConfig`.
4. Send a test email. See [Email / SMTP Troubleshooting](/pr-preview/pr-1351/cloud/guides/self-hosted/operating/smtp/#send-a-test-email).
5. If you registered Google or GitHub, sign in with each.

Once sign-in works, remove `env.initConfig` from your values file and run `helm upgrade`, so the initial password does not stay in the release history and logs.

## Connect a Meshery Server

Meshery Server is a separate deployment. Install it from the [Meshery documentation](https://docs.meshery.io/installation/quick-start), then point it at your deployment as its remote provider. See [Meshery Server registration](/pr-preview/pr-1351/cloud/concepts/meshery-server-registration/). The server rejects sign-in from a Meshery Server older than `env.minmesheryversion`.

## Upgrade

Run `helm upgrade` with the new chart version and your values file. The server applies pending database migrations when it starts, and exits if one fails. Take a database backup first.

## Provider initialization {#provider-initialization}

A new deployment has no users, so nobody can sign in to administer it. Provider initialization solves that: when the server starts with `INIT_CONFIG` set, it creates the **provider organization** and its first **Provider Admin**. The provider organization always has the fixed identifier `11111111-1111-1111-1111-111111111111`.

### What happens at startup

The server evaluates `INIT_CONFIG` on every start, after database migrations and before it reports ready.

1. **Not set.** Initialization is skipped.
2. **Set but invalid.** A missing required field or YAML that does not parse is logged as an error. The server keeps starting, with no provider administrator.
3. **The provider organization already exists.** Initialization is skipped, and any change to `INIT_CONFIG` is ignored.
4. **The provider organization does not exist.** The server runs these steps in order:
   1. Creates a Kratos identity with the password and the email marked verified.
   2. Creates the user and marks the account active.
   3. Grants the user the Provider Admin role and the Kanvas role.
   4. Creates the provider organization with the fixed identifier, owned by that user.
   5. Adds the user to the organization with the Organization Admin role.

The first administrator can sign in as soon as the server is ready. They never see an email verification step, because the address is created verified.

After the organization exists, the server also seeds the deployment's default Google and GitHub sign-in credentials from `env.providerOrg*`. See [Identity Services](/pr-preview/pr-1351/cloud/guides/self-hosted/planning/identity-services/#how-the-defaults-are-stored).

### Failure modes

| Condition | Result |
| --- | --- |
| A step fails after earlier steps succeeded | The server logs the error and keeps starting. The steps are not wrapped in one transaction, so rows from earlier steps remain. Fix the cause and restart. A restart repeats the whole sequence for as long as the provider organization does not exist. |
| Kratos rejects the identity (for example, the password is too weak or the identity exists) | The server logs a warning and continues with the remaining steps. |
| `INIT_CONFIG` removed after the first successful start | No effect. The organization exists. |
| `INIT_CONFIG` changed after the first successful start | No effect. Change the administrator through the product. |

### Handling the password

The initial password is stored in the Helm release, in the pod environment, and in the server log, because the server logs the configuration it reads. Treat all three as secret. After you have signed in and changed the password, remove `env.initConfig` and run `helm upgrade`. The administrator account is unaffected.

