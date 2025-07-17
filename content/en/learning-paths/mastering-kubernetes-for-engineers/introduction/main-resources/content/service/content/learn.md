---
docType: "Chapter"
title: "Learn"
lectures: 1
courseTitle: "Service"
themeColor: "#00B39F"
weight: 4
cardImage: ""
---
{{< chapterstyle >}}

## What is a Service ?

A Service is used to expose Pods so that other Pods, or the external world, can access them. It uses labels to group Pods. There are different types of Services:  

- ClusterIP to expose Pods inside the cluster
- NodePort, LoadBalancer to expose Pods to the outside world

Each time a Service receive a request, this one is load-balanced between the Pods exposed by a Service.

{{< image src="/images/learning-path/intro-kubernetes/resources/service/learn/service.png" align="center" width="100%" alt="Service" >}}

## Service of type ClusterIP

Let's consider 2 Pods running inside a cluster. The *www* Pods is running a web interface, how can this Pod access the api Pods running a backend component ? The calling Pod could use the IP address of the Pod it needs to call, but this is not how this should be done.

{{< image src="/images/learning-path/intro-kubernetes/resources/service/learn/clusterip-1.png" align="center" width="100%" alt="ClusterIP" >}}

Instead, we use a Service which exposes the *api* Pod. The *www* Pod calls this new Service to access the *api* Pod.

{{< image src="/images/learning-path/intro-kubernetes/resources/service/learn/clusterip-2.png" align="center" width="100%" alt="ClusterIP" >}}

## A Service uses labels to expose Pods

A Service exposes the Pods which labels match its selector.

The following specification defines a Service with selector `app: api`:

``` yaml
apiVersion: v1
kind: Service
metadata:
  name: api
spec:
  selector:
    app: api
  type: ClusterIP
  ports:
  - port: 80
    targetPort: 5000
```

The specification below defines a Pod which labels `app: api` corresponding to the Service's selector:

``` yaml
apiVersion: v1
kind: Pod
metadata:
  name: api
  labels:             
    app: api
spec:
  containers:
  - name: api
    image: org/api:1.2
    ports:
    - containerPort: 5000
```

Because the Service's selector matches the Pod's labels, the Pod is exposed by the Service, so that other Pods can reach it internally.

## Service of type NodePort

A NodePort Service is a ClusterIP Service which also exposes Pods to the outside of the cluster. 

{{< image src="/images/learning-path/intro-kubernetes/resources/service/learn/nodeport.png" align="center" width="100%" alt="NodePort" >}}

When specifying a NodePort Service, we need to set the *.spec.type* property to NodePort. We can also set the port this Service should listen on via the *.spec.ports.nodePort* property, if it's not set Kubernetes will automatically select a port on the 30000-32767 range. 

The following specification defines a Service of type NodePort exposing the Pods with labels `app: ghost`. This Service is reachable from any node on port 31000.

``` yaml
apiVersion: v1
kind: Service
metadata:
  name: ghost-np
spec:
  selector:
    app: ghost
  type: NodePort
  ports:
  - port: 80
    targetPort: 2368
    nodePort: 31000
```

When an application is exposed with a NodePort Service, it's accessible via the selected port from *any* cluster's node.

## Service of type LoadBalancer

A LoadBalancer Service is a NodePort Service which also triggers the creation of an external Load Balancer on the cloud provider infrastructure.


LoadBalancer Service only triggers the creation of a Load Balancer, thus gets an external IP address, when used in a cluster managed by a cloud provider


{{< image src="/images/learning-path/intro-kubernetes/resources/service/learn/loadbalancer-1.png" align="center" width="100%" alt="LoadBalancer" >}}

The following specification defines a Service of type LoadBalancer exposing the Pods with labels `app: ghost` to the external world.

``` yaml
apiVersion: v1
kind: Service
metadata:
  name: ghost-lb
spec:
  selector:
    app: ghost
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 2368
```

When created, this Service creates a LoadBalancer, with a dedicated IP address, in the cloud provider infrastructure.

We can reach the application exposed by the Service (a Pod running the ghost image in this example) using the Service IP address.

{{< image src="/images/learning-path/intro-kubernetes/resources/service/learn/loadbalancer-3.png" align="center" width="100%" alt="LoadBalancer" >}}

## Base commands

- Creating a Service

```bash
kubectl apply -f svc.yaml
```

- Listing the existing Service

```bash
kubectl get svc
```

- Getting a Service’s details

```bash
kubectl get svc ghost -o yaml
```

- Getting the Service main properties

```bash
kubectl describe svc ghost
```

- Deleting a Service

```bash
kubectl delete svc ghost
```

## Using Services in the VotingApp

The previous exercise left the app with the following components:

{{< image src="/images/learning-path/intro-kubernetes/resources/service/learn/votingapp-1.png" align="center" width="100%" alt="VotingApp" >}}

We will now add Services to the VotingApp to get the first working version of this demo app running fine in Kubernetes.

{{< image src="/images/learning-path/intro-kubernetes/resources/service/learn/votingapp-2.png" align="center" width="100%" alt="VotingApp" >}}

{{< /chapterstyle >}}