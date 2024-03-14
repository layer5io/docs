---
title: Deploying Layer5 Cloud
description: "Layer5 Cloud is a collection of services that can be deployed on-premises using Helm."
categories: [Self-Hosted]
---

## High-level List of Deployment Tasks

<ol>
    <li>Review the prequisites for installing Layer5 Cloud on Kubernetes. (<a href="https://docs.layer5.io/self-hosted/">docs</a>)</li>
    </li>
    <li>Install Layer5 Cloud on Kubernetes using Helm. Deploy it's services in Kubernetes in-cluster. (<a href="https://docs.layer5.io/self-hosted/">docs</a>)</li>
    <li>Meshery deployments are separate from <a href="https://docs.meshery.io/extensibility/providers">Remote Provider</a> deployments (Layer5 Cloud). Deploy Meshery in Kubernetes in-cluster (or out-of-cluster). (<a href="https://docs.meshery.io/installation/quick-start">docs</a>)</li>
    <li>Configure Meshery Server point to your Remote Provider. Learn more about the Meshery Server registration process with Remote Providers. (<a href="https://docs.meshery.io/extensibility/providers#meshery-server-registration">docs</a>)</li>
</ol>

### Kubernetes-based Installation with Helm

Layer5 offers on-premises installation of its [Meshery Remote Provider](https://docs.meshery.io/extensibility/providers): Layer5 Cloud. See the repository's full [index](https://docs.layer5.io/charts) of Layer5 Helm Charts. Contained in the Layer5 Helm repository is one chart with two subcharts.

#### Prerequisites

##### 1. Prepare a Persistent Volume

A persistent volume to store the Postgres database is necessary to prepare prior to deployment. If your target cluster does not have a persistent volume readily available (or not configured for automatic PV provisioning and binding of PVCs to PV), we suggest to apply the following configuration to your cluster.

```bash
kubectl apply -f install/kubernetes/persistent-volume.yaml
```

##### 2. Prepare a dedicated namespace and add the chart repo to your helm configuration

```bash
kubectl create ns <namespace>
helm repo add layer5 https://docs.layer5.io/charts
```

##### 3. Ensure NGINX Ingress Controller is deployed

*You may chose to use an alternative ingress controller, but the following instructions assume the use of NGINX Ingress Controller.*

``` 
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.2/deploy/static/provider/cloud/deploy.yaml
```

#### Installation

##### 1. Install Postgres database

```bash
helm install -f ./install/postgresql/values.yaml postgres ./install/postgresql -n <namespace>
```

##### 2. Install Remote Provider Server and Identity Provider

```bash
## TBD: Delete local filesystem reference
# helm install -f ./install/kubernetes/values.yaml cloud ./install/kubernetes -n <namespace>`

helm install -f ./install/helm-chart-values/layer5-cloud-values.yaml cloud ./install/kubernetes -n postgres \
--set-file 'kratos.kratos.emailTemplates.recovery.valid.subject'=<path to the email templates to override>/valid/email-recover-subject.body.gotmpl \
--set-file 'kratos.kratos.emailTemplates.recovery.valid.body'=<path to the email templates to override>/valid/email-recover.body.gotmpl \
--set-file 'kratos.kratos.emailTemplates.verification.valid.subject'=<path to the email templates to override>/valid/email-verify-subject.body.gotmpl \
--set-file 'kratos.kratos.emailTemplates.verification.valid.body'=<path to the email templates to override>/valid/email-verify.body.gotmpl
```

##### 3. Create an OAuth 2.0 client
1. Port forward the Hydra Admin service.
2. ```bash
    hydra clients create \
    --endpoint <port forwarded endpoint> \
    --id meshery-cloud \ <--- ensure the id specified matches with the env.oauthclientid in values.yaml
    --secret some-secret \ <--- ensure the secret specified matches with the env.oauthsecret in values.yaml
    --grant-types authorization_code,refresh_token,client_credentials,implicit \
    --response-types token,code,id_token \
    --scope openid,offline,offline_access \
    --callbacks <Layer5 Cloud host>/callback 
    ```

#### Customizing Layer5 Cloud's installation with values.yaml

Layer5’s Helm charts support a number of configuration options. Please refer to following table of configuration options.

## Requirements

| Repository | Name | Version |
|------------|------|---------|
| @ory | hydra | 0.24.2 |
| @ory | kratos | 0.39.1 |

## Values

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| affinity | object | `{}` | Affinity for Layer5 Cloud primary pods assignment ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity |
| appVersion | string | `"v0.7.15"` |  |
| autoscaling.enabled | bool | `false` |  |
| autoscaling.maxReplicas | int | `100` |  |
| autoscaling.minReplicas | int | `1` |  |
| autoscaling.targetCPUUtilizationPercentage | int | `80` |  |
| env.db | string | `"postgres://postgres:postgres@postgres-postgresql.postgres.svc.cluster.local:5432/meshery?sslmode=disable"` | URL to be used to connect with the meshery database. |
| env.debug | string | `"false"` |  |
| env.environment | string | `"cloud"` | If the environment is set as "development", the cloud server expects the meshery database connection at postgres://postgres:postgres@127.0.0.1:5432/meshery. For any other value env.db variable is used to connect to the database. |
| env.ghtoken | string | `""` | GitHub PAT to be used by server for dispatching workflows. |
| env.githubappkeypath | string | `"key.pem"` |  |
| env.hydraadmin | string | `"http://hydra-admin:4445"` |  |
| env.hydradb | string | `"postgres://postgres:postgres@postgres-postgresql.postgres.svc.cluster.local:5432/hydra?sslmode=disable"` | URL to be used to connect with the hydra database. |
| env.hydrapublic | string | `"http://hydra-public:4444"` |  |
| env.kratosdb | string | `"postgres://postgres:postgres@postgres-postgresql.postgres.svc.cluster.local:5432/kratos?sslmode=disable"` | URL to be used to connect with the kratos database. |
| env.minmesheryversion | string | `"v0.7.0"` | Minimum Meshery Server version compatible with the current Layer5 cloud server.  |
| env.oauthclientid | string | `"meshery-cloud"` |  |
| env.oauthsecret | string | `"secret1234567890"` |  |
| env.port | int | `9876` | The port on which Layer5 Cloud server runs. |
| env.serverHost | string | `"localhost"` |  |
| env.serverbaseurl | string | `"http://localhost:9876"` | Layer5 Cloud base URL |
| fullnameOverride | string | `"meshery-cloud"` |  |
| hydra.hydra.config | object | `{"dsn":"postgres://postgres:postgres@postgres-postgresql.postgres.svc.cluster.local:5432/hydra?sslmode=disable","log":{"leak_sensitive_values":false,"level":"debug"},"oauth2":{"expose_internal_errors":true},"secrets":{"system":[""]},"serve":{"public":{"cors":{"enabled":true}}},"strategies":{"access_token":"jwt"},"ttl":{"access_token":"24h","auth_code":"1h","id_token":"1h","refresh_token":"1000h"},"urls":{"consent":"https://public.hydra.localhost/consent","error":"https://public.hydra.localhost/error","login":"https://public.hydra.localhost/login","post_logout_redirect":"https://public.hydra.localhost/login","self":{"issuer":"https://public.hydra.localhost/hydra/","public":"https://public.hydra.localhost/hydra/"}}}` | Hydra configuration to use. You can pass your own Hydra configuration file and configure callback, admin and public urls. (Hydra Reference Configuration)[https://www.ory.sh/docs/hydra/reference/configuration] for detailed description of each fields. |
| hydra.hydra.config.secrets.system[0] | string | `""` | pass in a seceret to be used in AuthZ flow |
| hydra.hydra.config.ttl.access_token | string | `"24h"` | Expiry of the issued token |
| hydra.hydra.config.ttl.auth_code | string | `"1h"` | Expiry of the issued auth code to be exchanged for access_token. |
| hydra.hydra.config.ttl.refresh_token | string | `"1000h"` | Expiry of the issued refresh token, once expired the refresh token cannot be used to re-issue the access token. |
| hydra.hydra.dangerousForceHttp | bool | `true` | enabled for development environment to skip TLS. |
| image.pullPolicy | string | `"IfNotPresent"` |  |
| image.repository | string | `"layer5/meshery-cloud"` |  |
| image.tag | string | `"latest"` |  |
| imagePullSecrets | list | `[]` |  |
| ingress.annotations | object | `{}` |  |
| ingress.className | string | `""` |  |
| ingress.enabled | bool | `false` |  |
| ingress.hosts[0].host | string | `""` |  |
| ingress.hosts[0].paths[0].path | string | `"/"` |  |
| ingress.hosts[0].paths[0].pathType | string | `"ImplementationSpecific"` |  |
| ingress.tls | list | `[]` |  |
| kratos.enabled | bool | `true` |  |
| kratos.kratos.automigration.enabled | bool | `true` |  |
| kratos.kratos.config | object | `{"ciphers":{"algorithm":"xchacha20-poly1305"},"courier":{"smtp":{"connection_uri":""},"templates":{"recovery_code":{"valid":{"email":{"body":{"html":""},"subject":""}}},"verification_code":{"valid":{"email":{"body":{"html":""},"subject":""}}}}},"dsn":"postgres://postgres:postgres@postgres-postgresql.postgres.svc.cluster.local:5432/kratos?sslmode=disable","hashers":{"argon2":{"iterations":2,"key_length":16,"memory":"128MB","parallelism":1,"salt_length":16}},"identity":{"default_schema_id":"default","schemas":[{"id":"default","url":"file:///etc/config/identity.schema.json"}]},"log":{"format":"text","leak_sensitive_values":false,"level":"debug"},"secrets":{"cipher":[""],"cookie":[""]},"selfservice":{"allowed_return_urls":["http://localhost:9876"],"default_browser_return_url":"http://localhost:9876","flows":{"error":{"ui_url":"http://localhost:9876/error"},"login":{"after":{"default_browser_return_url":"http://localhost:9876/oauth/callback","password":{"hooks":[{"hook":"require_verified_address"}]}},"lifespan":"720m","ui_url":"http://localhost:9876/login"},"logout":{"after":{"default_browser_return_url":"http://localhost:9876/login"}},"recovery":{"enabled":true,"lifespan":"720h","ui_url":"http://localhost:9876/recovery","use":"code"},"registration":{"after":{"default_browser_return_url":"http://localhost:9876/registered","oidc":{"hooks":[{"hook":"session"},{"config":{"auth":{"config":{"in":"header","name":"X-API-Key","value":"dev_token"},"type":"api_key"},"body":"file:///home/ory/identity/password.webhook.jsonnet","method":"POST","response":{"ignore":true},"url":"http://localhost:9876/identity/users"},"hook":"web_hook"}]},"password":{"hooks":[{"config":{"auth":{"config":{"in":"header","name":"X-API-Key","value":"dev_token"},"type":"api_key"},"body":"file:///home/ory/identity/password.webhook.jsonnet","method":"POST","response":{"ignore":true},"url":"http://localhost:9876/identity/users"},"hook":"web_hook"}]}},"lifespan":"24h","ui_url":"http://localhost:9876/registration"},"settings":{"after":{"default_browser_return_url":"http://localhost:9876/account/profile"},"privileged_session_max_age":"15m","ui_url":"http://localhost:9876/reset"},"verification":{"enabled":true,"lifespan":"720h","ui_url":"http://localhost:9876/verification","use":"code"}},"methods":{"oidc":{"config":{"providers":[{"client_id":"","client_secret":"","id":"github","mapper_url":"file:///home/ory/identity/oidc.github.jsonnet","provider":"github","requested_claims":{"id_token":{"email":{"essential":true},"email_verified":{"essential":true},"name":{"essential":true},"picture":{"essential":true},"profile":{"essential":true}}},"scope":["read:user","user:email"]},{"client_id":"","client_secret":"","id":"google","mapper_url":"file:///home/ory/identity/oidc.google.jsonnet","provider":"google","requested_claims":{"id_token":{"email":{"essential":true},"email_verified":{"essential":true},"family_name":null,"given_name":{"essential":true},"hd":null}},"scope":["email","profile"]}]},"enabled":true},"password":{"config":{"haveibeenpwned_enabled":true,"identifier_similarity_check_enabled":true,"min_password_length":8},"enabled":true}}},"serve":{"admin":{"base_url":"http://localhost:9011/"},"public":{"base_url":"http://localhost:9010/","cors":{"allowed_headers":["Authorization","Cookie"],"allowed_methods":["POST","GET","PUT","PATCH","DELETE"],"allowed_origins":["http://localhost:9010/"],"enabled":true,"exposed_headers":["Content-Type","Set-Cookie"]}}}}` | Kratos configuration to use. You can pass your own Kratos configuration file and configure self-service flows, enable/disable features as required. (Kratos Reference Configuration)[https://www.ory.sh/docs/kratos/reference/configuration] for detailed description of each fields. |
| kratos.kratos.config.ciphers | object | `{"algorithm":"xchacha20-poly1305"}` | One of the values: `[noop, aes, xchacha20-poly1305]`. Default if not provided is `noop`. |
| kratos.kratos.config.secrets.cookie | list | `[""]` | Fill in values for cookie and cipher to be used in the AuthN flows |
| kratos.kratos.config.selfservice.flows.login.lifespan | string | `"720m"` | Each session is valid for a set amount of time. This time is the session's lifespan. When the session lifespan expires, the user must re-authenticate. |
| kratos.kratos.config.selfservice.flows.recovery.lifespan | string | `"720h"` | In the configuration, session lifespan is expressed in hours, minutes, and seconds. Use a combination of these units to define the desired lifespan. For example: 72h, 10m, 12s, 1h13m3s. |
| kratos.kratos.config.selfservice.flows.registration.lifespan | string | `"24h"` | Each session is valid for a set amount of time. This time is the session's lifespan. When the session lifespan expires, the user must re-authenticate. |
| kratos.kratos.config.selfservice.flows.verification.lifespan | string | `"720h"` | In the configuration, session lifespan is expressed in hours, minutes, and seconds. Use a combination of these units to define the desired lifespan. For example: 72h, 10m, 12s, 1h13m3s. |
| kratos.kratos.config.selfservice.methods.oidc.config.providers[0].client_id | string | `""` | GitHub OAuth App client_id to enable GitHub OIDC support for cloud IDP. |
| kratos.kratos.config.selfservice.methods.oidc.config.providers[0].client_secret | string | `""` | GitHub OAuth App client_secret to enable GitHub OIDC support for cloud IDP. |
| kratos.kratos.config.selfservice.methods.oidc.config.providers[0].mapper_url | string | `"file:///home/ory/identity/oidc.github.jsonnet"` | mapper_url is a jsonnet file to map the incoming OIDC profile details to the Kratos Identity. |
| kratos.kratos.config.selfservice.methods.oidc.config.providers[0].scope | list | `["read:user","user:email"]` | GitHub OAuth App scope's to specify exactly what type of access you need. Scopes limit access for OAuth tokens. They do not grant any additional permission beyond that which the user already has. |
| kratos.kratos.config.selfservice.methods.oidc.config.providers[1].client_id | string | `""` | Google OAuth App client_id to enable Google OIDC support for cloud IDP. |
| kratos.kratos.config.selfservice.methods.oidc.config.providers[1].client_secret | string | `""` | Google OAuth App client_secret to enable Google OIDC support for cloud IDP. |
| kratos.kratos.config.selfservice.methods.oidc.config.providers[1].mapper_url | string | `"file:///home/ory/identity/oidc.google.jsonnet"` | mapper_url is a jsonnet file to map the incoming OIDC profile details to the Kratos Identity. |
| kratos.kratos.config.selfservice.methods.oidc.config.providers[1].scope | list | `["email","profile"]` | GitHub OAuth App scope's to specify exactly what type of access you need. Scopes limit access for OAuth tokens. They do not grant any additional permission beyond that which the user already has. |
| kratos.kratos.identitySchemas."identity.schema.json" | string | `"{\n\"$id\": \"identity.schema.json\",\n\"$schema\": \"http://json-schema.org/draft-07/schema#\",\n\"title\": \"Person\",\n\"type\": \"object\",\n\"properties\": {\n  \"traits\": {\n    \"type\": \"object\",\n    \"properties\": {\n      \"email\": {\n        \"type\": \"string\",\n        \"format\": \"email\",\n        \"title\": \"E-Mail\",\n        \"minLength\": 3,\n        \"ory.sh/kratos\": {\n          \"credentials\": {\n            \"password\": {\n              \"identifier\": true\n            }\n          },\n          \"verification\": {\n            \"via\": \"email\"\n          },\n          \"recovery\": {\n            \"via\": \"email\"\n          }\n        }\n      },\n      \"name\": {\n        \"type\": \"object\",\n        \"properties\": {\n          \"first_name\": {\n            \"title\": \"First Name\",\n            \"type\": \"string\"\n          },\n          \"last_name\": {\n            \"title\": \"Last Name\",\n            \"type\": \"string\"\n          }\n        },\n        \"required\": [\n          \"first_name\",\n          \"last_name\"\n        ]\n      },\n      \"avatar\": {\n        \"title\": \"Avatar URL\",\n        \"type\": \"string\"\n      }\n    },\n    \"required\": [\n      \"email\",\n      \"name\"\n    ],\n    \"additionalProperties\": true\n  }\n}\n}"` |  |
| kratos.service.admin.enabled | bool | `true` |  |
| kratos.service.admin.port | int | `9011` | Kratos Admin API port |
| kratos.service.public.enabled | bool | `true` |  |
| kratos.service.public.port | int | `9010` | Kratos Public API port |
| nameOverride | string | `""` |  |
| nodeSelector | object | `{}` | Node labels for Layer5 Cloud pods assignment ref: https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/ |
| podAnnotations | object | `{}` |  |
| podSecurityContext | object | `{}` |  |
| replicaCount | int | `1` |  |
| resources.limits | object | `{}` | The resources limits for the Layer5 Cloud containers |
| resources.requests.cpu | string | `"250m"` | The requested cpu for the Layer5 Cloud containers |
| resources.requests.memory | string | `"256Mi"` | The requested memory for the Layer5 Cloud containers |
| securityContext | object | `{}` |  |
| service.port | int | `9876` |  |
| service.type | string | `"ClusterIP"` |  |
| serviceAccount.annotations | object | `{}` |  |
| serviceAccount.create | bool | `true` | Specifies whether a service account should be created |
| serviceAccount.name | string | `"meshery-cloud"` |  |
| smtp | object | `{"smtphost":"","smtppassword":"","smtpport":"","smtpusername":""}` | smtp configuration to be used when sending out emails |
| tolerations | list | `[]` | Tolerations for Layer5 Cloud pods assignment ref: https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/ |


## Uninstalling the Chart

    