# Deploy Layer5 Cloud

> Install Layer5 Cloud on Kubernetes with Helm, create the OAuth2 client, confirm the deployment is ready, and connect a Meshery Server to it.



This guide installs the `layer5-cloud` chart, which deploys the Layer5 Cloud server together with Kratos and Hydra. It assumes you have made the decisions in [Plan a Deployment](/pr-preview/pr-1350/cloud/guides/self-hosted/planning/). The commands use the release name `layer5-cloud` in the namespace `layer5-cloud`.

## Prerequisites

- A Kubernetes cluster and Helm 3.
- An ingress controller that supports WebSocket upgrades, and a TLS certificate for your hostname.
- A PostgreSQL server you can create databases on.
- An SMTP relay that satisfies the [mail constraints](/pr-preview/pr-1350/cloud/guides/self-hosted/operating/smtp/#constraints-on-the-shared-mail-server), or the decision to run without mail.
- The OAuth applications for Google and GitHub, if you offer social sign-in.

## Install

### 1. Prepare the database

Create one role and three databases on your PostgreSQL server, then create the `uuid-ossp` extension in the `meshery` database. The server creates the schema itself.

```sql
CREATE ROLE meshery LOGIN PASSWORD '<password>';
CREATE DATABASE meshery OWNER meshery;
CREATE DATABASE kratos OWNER meshery;
CREATE DATABASE hydra OWNER meshery;
\c meshery
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

Any PostgreSQL deployment works, including an operator such as CloudNativePG, a managed service, or a server outside the cluster. The chart reaches it only through the connection strings you set in the next step.

### 2. Create the namespace and add the chart repository

```bash
kubectl create namespace layer5-cloud
helm repo add layer5 https://docs.layer5.io/charts
helm repo update
helm show values layer5/layer5-cloud > values.yaml
```

`helm show values` prints every value of the chart version you are about to install. Keep that file as the baseline and edit it. The [chart values reference](/pr-preview/pr-1350/cloud/guides/self-hosted/deployment/helm-chart-values/) explains each value.

### 3. Write the values file

Set at least the following. The `kratospublic`, `kratosadmin`, and `hydraadmin` addresses and the ingress backend names are the in-cluster service names of the Kratos and Hydra subcharts. Run `kubectl -n layer5-cloud get svc` after the first install and correct them to match your release. The chart defaults for these addresses (`hydra-admin`, `hydra-public`) do not match the names the subcharts create. The `/(.*)`, `/kratos/(.*)`, and `/hydra/(.*)` paths with the rewrite annotation strip the prefix before the request reaches each service; use your controller's equivalent if it is not NGINX.

```yaml
env:
  proto: https
  serverbaseurl: https://cloud.example.com
  serverHost: cloud.example.com
  db: postgres://meshery:<password>@<db-host>:5432/meshery?sslmode=require
  kratosdb: postgres://meshery:<password>@<db-host>:5432/kratos?sslmode=require
  hydradb: postgres://meshery:<password>@<db-host>:5432/hydra?sslmode=require
  kratospublic: http://layer5-cloud-kratos-public.layer5-cloud.svc.cluster.local:9010
  kratosadmin: http://layer5-cloud-kratos-admin.layer5-cloud.svc.cluster.local:9011
  kratosbrowser: https://cloud.example.com/kratos
  hydrapublic: https://cloud.example.com/hydra
  hydrabrowser: https://cloud.example.com/hydra
  hydraadmin: http://cloud-hydra-admin.layer5-cloud.svc.cluster.local:4445
  oauthclientid: layer5-cloud
  oauthsecret: <generated>
  cloudCredentialEncryptionKey: <base64 32 bytes>
  cloudOidcStateHmacKey: <base64 32 bytes>
  kratosWebhookApiKey: <generated>
  initConfig: |
    organization:
      name: "Example Corp"
    user:
      first_name: "Ada"
      last_name: "Admin"
      email: "admin@example.com"
      password: "<initial password>"
ingress:
  className: nginx
  annotations:
    nginx.ingress.kubernetes.io/use-regex: "true"
    nginx.ingress.kubernetes.io/rewrite-target: /$1
    nginx.ingress.kubernetes.io/proxy-read-timeout: "3600"
    nginx.ingress.kubernetes.io/proxy-send-timeout: "3600"
  hosts:
    - host: cloud.example.com
      paths:
        - path: /(.*)
          pathType: ImplementationSpecific
          backend:
            service:
              name: meshery-cloud
              port:
                number: 9876
        - path: /kratos/(.*)
          pathType: ImplementationSpecific
          backend:
            service:
              name: layer5-cloud-kratos-public
              port:
                number: 9010
        - path: /hydra/(.*)
          pathType: ImplementationSpecific
          backend:
            service:
              name: cloud-hydra-public
              port:
                number: 4444
  tls:
    - secretName: cloud-example-com-tls
      hosts:
        - cloud.example.com
smtp:
  smtphost: smtp.example.com
  smtpport: "587"
  smtpusername: no-reply@example.com
  smtppassword: <password>
```

Then set the Kratos and Hydra values. Helm replaces a list as a whole, so copy the lists you change from `values.yaml` and edit them in place:

- Replace every `http://localhost:9876` and `http://localhost:9010` URL under `kratos.kratos.config` with your public URL. That covers `serve.public.base_url` (`https://cloud.example.com/kratos`), `serve.public.cors.allowed_origins`, `selfservice.default_browser_return_url`, `selfservice.allowed_return_urls`, and each `ui_url` and `default_browser_return_url` under `selfservice.flows`.
- Point the registration `web_hook` entries at `https://cloud.example.com/api/identity/users`. Add a hook to `https://cloud.example.com/api/identity/signup/validate` before it on the password method if you use signup validation or reCAPTCHA. Set each hook's `X-API-Key` value to `env.kratosWebhookApiKey`. The chart default URL omits the `/api` prefix, which the server does not serve.
- Set `kratos.kratos.config.secrets.cookie` and `.cipher`, and `hydra.hydra.config.secrets.system`.
- Set the Kratos `dsn` and Hydra `dsn` to the same database URLs as `env.kratosdb` and `env.hydradb`.
- Set the Hydra `urls` (login, consent, error, and `self.public` and `self.issuer`) to `https://cloud.example.com/...`, with `self.public` and `self.issuer` ending in `/hydra/`. Set `hydra.hydra.dangerousForceHttp` to `false` once Hydra is reached over TLS.
- Add the Google and GitHub `client_id` and `client_secret` under the Kratos `oidc` providers, and the matching `env.providerOrg*` values.
- Choose the identity mail courier. See [Mail](/pr-preview/pr-1350/cloud/guides/self-hosted/planning/#mail).

Route `/kratos` and `/hydra` on the ingress to the Kratos and Hydra public services, as described in [Plan a Deployment](/pr-preview/pr-1350/cloud/guides/self-hosted/planning/#hostname-and-tls).

### 4. Install the chart

```bash
helm install layer5-cloud layer5/layer5-cloud \
  --namespace layer5-cloud \
  --values values.yaml
```

Kratos and Hydra run their database migrations when they start, and the Layer5 Cloud server applies its own before it reports ready. Pods can restart once or twice while the databases fill. Wait for them:

```bash
kubectl -n layer5-cloud rollout status deploy/meshery-cloud
```

### 5. Create the OAuth2 client in Hydra

Layer5 Cloud authenticates to Hydra as an OAuth2 client whose id and secret you set in `env.oauthclientid` and `env.oauthsecret`. Create that client in Hydra with the matching values and the redirect address `<serverbaseurl>/callback`. The server does not create it, and sign-in does not work until it exists.

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

1. `GET https://cloud.example.com/readyz` returns `200`.
2. The server log contains `Server is up and running!` and no `Failed to initialize Provider Admin` line.
3. You can sign in as the administrator you defined in `env.initConfig`. That user holds the Provider Admin role. See [Provider initialization](/pr-preview/pr-1350/cloud/guides/self-hosted/deployment/provider-initialization/).
4. Send a test email through `POST /api/system/email/test`. See [Troubleshoot Email Delivery](/pr-preview/pr-1350/cloud/guides/self-hosted/operating/smtp/#send-a-test-email).
5. If you registered Google or GitHub, sign in with each.

Once sign-in works, remove `env.initConfig` from your values file and run `helm upgrade`, so the initial password does not stay in your release history and logs.

## Connect a Meshery Server

Meshery Server is a separate deployment. Install it by following the [Meshery documentation](https://docs.meshery.io/installation/quick-start), then point it at your deployment as its remote provider. See [Meshery Server registration](/pr-preview/pr-1350/cloud/concepts/meshery-server-registration/) and the Meshery guide to [remote providers](https://docs.meshery.io/extensibility/providers#meshery-server-registration). The server rejects sign-in from a Meshery Server older than `env.minmesheryversion`.

## Upgrade

Run `helm upgrade` with the new chart version and your values file. The server applies pending database migrations when it starts, and exits if one fails. Take a database backup first.

