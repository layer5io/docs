---
docType: "Chapter"
chapterTitle: "Deploy a sample application"
title: "Deploy a Sample Application"
description: "Meshery, collaborative Kubernetes manager"
lectures: 12
weight: 2
---

{{< chapterstyle >}}

To play with Istio and demonstrate some of it's capabilities, you will deploy the example BookInfo application, which is included the Istio package.

<h2 class="chapter-sub-heading">What is the Bookinfo Application </h2>
<br />
This application is a polyglot composition of microservices are written in different
languages and sample BookInfo application displays information about a book, similar to a
single catalog entry of an online book store. Displayed on the page is a description of
the book, book details (ISBN, number of pages, and so on), and a few book reviews.

The end-to-end architecture of the application is shown in the figure.

{{< image src="/images/learning-path/istio/bookinfo-off-mesh.webp" width="100%" align="center" alt="BookInfo architecture deployed off the mesh" title="Figure: BookInfo deployed off the mesh" >}}

<br />
It’s worth noting that these services have no dependencies on Istio, but make an interesting
service mesh example, particularly because of the multitude of services, languages and versions
for the reviews service.

As shown in the figure below, proxies are sidecarred to each of the application containers.

{{< image src="/images/learning-path/istio/bookinfo-on-mesh.webp" width="100%" align="center" alt="BookInfo architecture deployed on the mesh" title="Figure: BookInfo deployed on the mesh" >}}

<br />
Sidecars proxy can be either manually or automatically injected into the pods. Automatic sidecar
injection requires that your Kubernetes api-server supports `admissionregistration.k8s.io/v1`
or `admissionregistration.k8s.io/v1beta1` or `admissionregistration.k8s.io/v1beta2` APIs. Verify
whether your Kubernetes deployment supports these APIs by executing:

```sh
kubectl api-versions | grep admissionregistration
```

If your environment **does NOT** supports either of these two APIs, then you may use [manual sidecar injection](#manual-sidecar-inj) to deploy the sample app.

As part of Istio deployment in [Previous chapter](./getting-started), you have deployed the sidecar injector.

<br />
<h2 class="chapter-sub-heading">
  <a name="auto"></a> Deploying Sample App with Automatic sidecar injection
</h2>

<br />
Istio, deployed as part of this workshop, will also deploy the sidecar injector. Let us now
verify sidecar injector deployment.

```sh
kubectl -n istio-system get configmaps istio-sidecar-injector
```

Output:

```sh
NAME                     DATA   AGE
istio-sidecar-injector   2      9h
```

NamespaceSelector decides whether to run the webhook on an object based on whether the namespace for that object matches the [selector](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#label-selectors).

```sh
kubectl get namespace -L istio-injection
```

Output:

```sh
NAME           STATUS    AGE       ISTIO-INJECTION
default        Active    1h        enabled
istio-system   Active    1h        disabled
kube-public    Active    1h
kube-system    Active    1h
```

Using Meshery, navigate to the Istio management page.

1. Enter `default` in the `Namespace` field.
1. Click the (+) icon on the `Sample Application` card and select `BookInfo Application` from the list.

This will do 3 things:

1. Label `default` namespace for sidecar injection.
1. Deploys all the BookInfo services in the `default` namespace.
1. Deploys the virtual service and gateway needed to expose the BookInfo's productpage application in the `default` namespace.

<h3 class="chapter-sub-heading">
  <a name="verify"></a> Verify Bookinfo deployment{" "}
</h3>

1. Verify that the deployments are all in a state of AVAILABLE before continuing.

```sh
watch kubectl get deployment
```

2. Choose a service, for instance `productpage`, and view it's container configuration:

```sh
kubectl get po

kubectl describe pod productpage-v1-.....
```

3. Examine details of the services:

```sh
kubectl describe svc productpage
```

Next, you will expose the BookInfo application to be accessed external from the cluster.

<br />
<h3>Alternative: Manual installation </h3>
Follow this if the above steps did not work for you
<br />
<br />

<h4 class="chapter-alt-heading"> Label namespace for injection</h4>

Label the default namespace with istio-injection=enabled

```sh
kubectl label namespace default istio-injection=enabled
```

```sh
kubectl get namespace -L istio-injection
```

Output:

```sh
NAME           STATUS    AGE       ISTIO-INJECTION
default        Active    1h        enabled
istio-system   Active    1h        disabled
kube-public    Active    1h
kube-system    Active    1h
```

<h4 class="chapter-alt-heading"> Deploy BookInfo</h4>
<br />

Applying this yaml file included in the Istio package you collected in [Getting Started](./getting-started) will deploy the BookInfo app in you cluster.

```sh
kubectl apply -f samples/bookinfo/platform/kube/bookinfo.yaml
```

<h4 class="chapter-alt-heading">Deploy Gateway and Virtual Service for BookInfo app</h4>

```sh
kubectl apply -f samples/bookinfo/networking/bookinfo-gateway.yaml
```

<hr />
<br />

<h3>
  <a name="manual-sidecar-inj" />
  Manual Sidecar Injection
</h3>

<p>Use this only when Automatic Sidecar injection doesn't work</p>

To do a manual sidecar injection we will be using `istioctl` command:

```sh
curl https://raw.githubusercontent.com/istio/istio/master/samples/bookinfo/platform/kube/bookinfo.yaml | istioctl kube-inject -f - > newBookInfo.yaml
```

Observing the new yaml file reveals that additional container Istio Proxy has been added to the Pods with necessary configurations:

```
        image: docker.io/istio/proxyv2:1.3.0
        imagePullPolicy: IfNotPresent
        name: istio-proxy
```

We need to now deploy the new yaml using `kubectl`

```sh
kubectl apply -f newBookInfo.yaml
```

To do both in a single command:

```sh
kubectl apply -f <(curl https://raw.githubusercontent.com/istio/istio/master/samples/bookinfo/platform/kube/bookinfo.yaml | istioctl kube-inject -f -)
```

Now continue to [Verify Bookinfo deployment](#verify).

{{< /chapterstyle >}}