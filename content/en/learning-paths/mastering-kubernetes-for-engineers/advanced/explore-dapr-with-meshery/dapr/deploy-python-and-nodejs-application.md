---
docType: "Chapter"
id: "deploy-python-and-nodejs-application.mdx"
chapterTitle: "Deploy Python and NodeJS application"
description: 
title: "Deploy Python and NodeJS application"
lectures: 4
weight: 5
---
{{< chapterstyle >}}

<h3 class="chapter-sub-heading">Deploy Node.js Application</h3>

1. Clone [this](https://github.com/dapr/quickstarts.git) repo and cd into **quickstarts/tutorials/hello-kubernetes/deploy** directory to get the Node.js and Python YAML files.

1. Import the Node.js application into Meshery.

{{< meshery-design-embed src="/images/learning-path/embed-test/embedded-design-node-application.js" id="embedded-design-13665e6e-53cc-4cf4-9e8e-280237428672" >}}

The Dapr annotations in the manifest file will let the Dapr sidecar injector know that it is supposed to inject a sidecar container into this pod during creation.

```yaml
annotations:
        dapr.io/enabled: "true"
        dapr.io/app-id: "nodeapp"
        dapr.io/app-port: "3000"
        dapr.io/enable-api-logging: "true"
```
1. Click the **Actions** button and deploy.

<h3 class="chapter-sub-heading">Deploy Python Application</h3>

Follow previous steps to import and Deploy the python application.

{{< meshery-design-embed src="/images/learning-path/embed-test/embedded-design-python-application.js" id="embedded-design-03016ef6-7124-4169-a5c0-f403711d480d" >}}
Switch to visualizer and filter according to these specifications:

- For **View Selector** select **Single Namespace**.
- For **Kinds** select the resources you want to see including _Deployments, Pods, Services, Replicaset_.
- For **Labels** select _app=node_ and _app=python_.

You should see the daprd sidecar containers in both the python and node pods.

{{< image src="/images/learning-path/dapr/filter-node-python.png" width="100%" align="center" alt="" >}}

{{< /chapterstyle >}}