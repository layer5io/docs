---
docType: "Chapter"
id: "deploy-redis"
chapterTitle: "Deploy Redis"
description: "This chapter covers the deployment of Redis Statestore"
lectures: 4
weight: 3
title: "Deploy Redis"
---

{{< chapterstyle >}}

<h3 class="chapter-sub-heading">Import Redis Helm Chart and Deploy to Cluster</h3>

1. Follow the same steps used for the Dapr deployment to import this [Redis helm chart](https://charts.bitnami.com/bitnami/redis-19.6.2.tgz) into Meshery and deploy.

{{< meshery-design-embed src="/images/learning-path/embed-test/embedded-design-redis.js" id="embedded-design-c3dcee44-6b8a-498f-a44c-66682ccf4d2a" >}}

2. Click **Actions** to deploy, then click **Open In Visualizer**.
3. In **Visualizer** mode, use the filter to adjust the views of the resources in the cluster.
  - For **View Selector** select **Single Node**.
  - For **Kinds** select the resources you want to see including _Deployments,Pods, Services, Statefulset, Secret, Replicaset, Endpoints and Endpoint slices_.
  - For **Namespaces** select _dapr_system_ and _default_.

These filter settings will allow you to view both Dapr resources within the _dapr-system_ namespace and Redis resources within the default namespace.

{{< image src="/images/learning-path/dapr/redis-dapr.png" width="100%" align="center" alt="" >}}

Next, let's deploy the Dapr state store component that will manage this Redis state store.

{{< /chapterstyle >}}
