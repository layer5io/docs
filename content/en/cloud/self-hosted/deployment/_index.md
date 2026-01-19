---
title: Deploying Layer5 Cloud
description: "Layer5 Cloud is a collection of services that can be deployed on-premises using Helm."
categories: [Self-Hosted]
tags: [helm]
weight: 2
---

## High-level List of Deployment Tasks

<ol>
    <li>Review the prequisites for installing Layer5 Cloud on Kubernetes. (<a href="#prerequisites">docs</a>)</li>
    <li>Prepare INIT_CONFIG parameters for initial setup</li>
    <li>Install Layer5 Cloud on Kubernetes using Helm. Deploy it's services in Kubernetes in-cluster. (<a href="#installation">docs</a>)</li>
    <li>Meshery deployments are separate from <a href="https://docs.meshery.io/extensibility/providers">Remote Provider</a> deployments (Layer5 Cloud). Deploy Meshery in Kubernetes in-cluster (or out-of-cluster). (<a href="https://docs.meshery.io/installation/quick-start">docs</a>)</li>
    <li>Configure Meshery Server point to your Remote Provider. Learn more about the Meshery Server registration process with Remote Providers. (<a href="https://docs.meshery.io/extensibility/providers#meshery-server-registration">docs</a>)</li>
</ol>

### Kubernetes-based Installation with Helm

Layer5 offers on-premises installation of its [Meshery Remote Provider](https://docs.meshery.io/extensibility/providers): Layer5 Cloud. Contained in the [Layer5 Helm repository](https://docs.layer5.io/charts) is one chart with two subcharts (see repo [index](https://docs.layer5.io/charts/index.yaml)).

#### Prerequisites

Before you begin ensure the following are installed:
- Helm.
- An ingress controller like `ingress-nginx`.
- A certificate manager like `cert-manager`.

##### 1. Create dedicated namespaces

This deployment uses two namespaces, `cnpg-postgres` for hosting the PostgreSQL database using CloudNativePG operator and `layer5-cloud` namespace for the Layer5 cloud. You can also choose to keep all components in the same namespace. 
```bash
kubectl create ns cnpg-postgres
kubectl create ns layer5-cloud
```

##### 2. Prepare for data persistence (Persistent Volume)

Layer5 uses PostgreSQL database that requires a persistent storage. It can be configured in many different ways in a Kubernetes cluster. Here we are using _local path provisioner from Rancher_ which automatically creates a PV using a set local path. Running the follwing command to deploy the local path provisioner: 

```bash
kubectl apply -f https://raw.githubusercontent.com/rancher/local-path-provisioner/v0.0.31/deploy/local-path-storage.yaml
```

This creates a default storage class called `local-path` which stores data by default in `/opt/local-path-provisioner` and has the reclaim policy set to `Delete`. 

> **_NOTE:_** It is recommended you create a new storage class that uses a different path with ample storage and uses `Retain` reclaim policy. 

For this guide, we will use the defaults.

##### 3. Install an ingress controller

This example deployment uses ingress-nginx but you may choose to use an ingress controller of your choice.

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.13.3/deploy/static/provider/cloud/deploy.yaml
```

#### INIT_CONFIG

The `INIT_CONFIG` environment variable allows you to configure the initial setup of your self-hosted Layer5 Cloud provider. This variable accepts a JSON string that defines the provider initialization configuration.

##### Purpose

`INIT_CONFIG` enables you to:
- Pre-configure provider settings during deployment
- Automate initial setup for consistent deployments  
- Define custom provider configurations without manual intervention

##### Usage

Set the `INIT_CONFIG` environment variable with a JSON configuration string:

```bash
export INIT_CONFIG='{"provider": {"name": "my-provider", "settings": {...}}}'
```

For Docker deployments:

```bash
# example
docker run -e INIT_CONFIG='{"provider": {"name": "my-provider"}}' layer5/meshery-cloud
```

For Kubernetes deployments, add to your deployment manifest:

```yaml
env:
  - name: INIT_CONFIG
    value: '{"provider": {"name": "my-provider", "settings": {...}}}'
```

{{< alert type="info" title="Note" >}}
The INIT_CONFIG variable is only processed during the initial startup. Subsequent restarts will not reprocess this configuration.
{{< /alert >}}

##### Configuration Schema

The `INIT_CONFIG` JSON structure supports the following fields:

- `provider.name`: The name of your provider instance
- `provider.settings`: Custom provider settings specific to your deployment


#### Installation

You will install the Postgres database first or configure connection details to your existing Postgres v12+ database server, followed by the rest of Layer5 Cloud's containers.

##### 1. Deploy PostgreSQL using CloudNativePG

In this example, we are using CloudNativePG's operator based approach to create a PostgreSQL cluster. You can choose a different approach of your choice.

PostgreSQL requires persistent storage which can be configured in many different ways in a Kubernetes cluster. Here we are using _local path provisioner from Rancher_ which automatically creates a PV using a set local path. Running the follwing command to deploy the local path provisioner: 

```bash
kubectl apply -f https://raw.githubusercontent.com/rancher/local-path-provisioner/v0.0.31/deploy/local-path-storage.yaml
```

This creates a default storage class called `local-path` which stores data by default in `/opt/local-path-provisioner`. You can create a new storage class that uses a different path. For this deployment, we will use the defaults.

Add and install CloudNativePG operator using the following commands:

```bash
helm repo add cnpg https://cloudnative-pg.github.io/charts

helm upgrade --install cnpg --namespace cnpg-system --create-namespace cnpg/cloudnative-pg
```

Deploying a PostgreSQL cluster requires the follwing pre-requisite resources:
- A super user secret
- A Meshery user secret

Run the following commands to create them replacing username and passwords as needed:
```bash
kubectl -n cnpg-postgres create secret generic meshery-user --from-literal=username=meshery --from-literal=password=meshery --type=kubernetes.io/basic-auth
```

```bash
kubectl -n cnpg-postgres create secret generic cnpg-superuser --from-literal=username=postgres --from-literal=password=postgres --type=kubernetes.io/basic-auth
```

For this documentation, we use the following manifests to deploy a PostgreSQL cluster:
```yaml
# cluster.yaml
apiVersion: postgresql.cnpg.io/v1
kind: Cluster
metadata:
  name: cnpg-postgres
  namespace: cnpg-postgres
spec:
  instances: 2
  # Persistent storage configuration
  storage:
    storageClass: local-path
    size: 10Gi

  superuserSecret:
    name: cnpg-superuser
  bootstrap:
    initdb:
      database: meshery
      owner: meshery
      secret:
        name: meshery-user
      postInitSQL:
        - create database hydra owner meshery;
        - create database kratos owner meshery;
        - create extension "uuid-ossp";
        - ALTER ROLE meshery WITH SUPERUSER;
      postInitApplicationSQLRefs:
        configMapRefs:
          - name: extra-init
            key: init.sql
---
# extra-init.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: extra-init
  namespace: cnpg-postgres
data:
  init.sql: |
    GRANT ALL PRIVILEGES ON DATABASE meshery to meshery;
    GRANT ALL PRIVILEGES ON DATABASE hydra to meshery;
    GRANT ALL PRIVILEGES ON DATABASE kratos to meshery;
```

CloudNativePG provides a curated list of [samples](https://github.com/cloudnative-pg/cloudnative-pg/blob/main/docs/src/samples.md) showing configuration options that can be used as a reference.

Apply the YAML file. You should notice two cnpg pods shortly thereafter.
```bash
NAME     READY   STATUS    RESTARTS   AGE
cnpg-postgres-1   1/1     Running   0          3h5m
cnpg-postgres-2   1/1     Running   0          3h5m
```
Retrieve the _Service_ endpoints of cnpg. This must be updated in the Layer5 `values.yaml` file later.

##### 2. Deploy Layer5 cloud

1. Start by adding the Layer5 helm chart repo.
    ```bash
    helm repo add layer5 https://docs.layer5.io/charts
    ```

2. Next, to modify values such as the database connection or other parameters, you will use the `values.yaml` file. 

    You can generate it using the following command:
    ```bash
    helm show values layer5/layer5-cloud > values.yaml
    ```
    Review and update values if necessary. If you have followed this tutorial with the exact steps, there are no changes requires to get started.

3. Deploy Layer5 Cloud using the `helm install` command.

    ```bash
    helm install -f values.yaml layer5-cloud -n layer5-cloud
    ```

##### 3. Create an OAuth 2.0 client
1. Port forward the _Hydra Admin_ service.

2. Run the following command to create the hydra client:
```bash
hydra clients create \
--endpoint <port forwarded endpoint> \
--id meshery-cloud \ <--- ensure the id specified matches with the env.oauthclientid in values.yaml
--secret some-secret \ <--- ensure the secret specified matches with the env.oauthsecret in values.yaml
--grant-types authorization_code,refresh_token,client_credentials,implicit \
--response-types token,code,id_token \
--scope openid,offline,offline_access \
--callbacks <Layer5 Cloud host>/callback 
```