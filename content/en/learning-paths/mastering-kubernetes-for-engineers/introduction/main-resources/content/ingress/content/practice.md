---
docType: "Chapter"
title: "Practice"
lectures: 1
courseTitle: "Ingress"
themeColor: "#00B39F"
weight: 2
cardImage: ""
---
{{< chapterstyle >}}


## Expose the VotingApp with an Ingress resource

1. Traefik Ingress Controller

Since the cluster used in this section is based on k3s, it comes with Traefik Ingress Controller by default. This can be verified using the following command.

```bash
$ kubectl get po -n kube-system | grep traefik
helm-install-traefik-crd-vj4hz            0/1     Completed   0          56m
helm-install-traefik-qg2g5                0/1     Completed   1          56m
svclb-traefik-de21cf3d-vctd2              2/2     Running     0          56m
traefik-57b79cf995-vf6qh                  1/1     Running     0          56m
```


Traefik is one implementation of the Kubernetes Ingress Controller. Other implementations exist including nginx, HAProxy, ...


Get the external IP of this load-balancer as you will need it in the next part. 

``` bash
$ kubectl get service -n kube-system | grep traefik
NAME      TYPE           CLUSTER-IP     EXTERNAL-IP    PORT(S)                      AGE
traefik          LoadBalancer   10.43.2.146   192.168.64.8   80:32667/TCP,443:32545/TCP   57m
```

In this example, the external IP address is *192.168.64.8*. This is the IP address of the Ubuntu VM you created using Multipass, in a previous step.

2. In a file named *ingress.yaml*, define the specification for an *Ingress* resource with the following characteristics:

- Name: vote
- ingressClassName: traefik
- All requests to the URL *vote.votingapp.com* should be redirected to port 80 of the *vote-ui* service
- All requests to the URL *result.votingapp.com* should be redirected to port 80 of the *result-ui* service

Update your */etc/hosts* file so that the URLs *vote.votingapp.com* and *result.votingapp.com* resolve to the IP address of the Ingress Controller (the one you get before)


Then you should modify your */etc/hosts* file to add the following entry:

``` bash
...
IP_OF_YOUR_VM vote.votingapp.com result.votingapp.com
```


If you do not have the necessary permissions to modify your */etc/hosts* file, you can use the *nip.io* service and set the domain names *vote.IP_OF_YOUR_VM.nip.io* / *result.IP_OF_YOUR_VM.nip.io* instead of *vote.votingapp.com* / *result.votingapp.com* in your Ingress resource definition.


3. Deploy the application and verify that the vote interface is available at *http://vote.votingapp.com* and the result interface is available at *http://result.votingapp.com* (or at *http://vote.IP_OF_YOUR_VM.nip.io* / *http://result.IP_OF_YOUR_VM.nip.io* if you are using the nip.io approach).

4. Delete the application.

<br/>
<details>
<summary markdown="span">Solution</summary>

1. The specification for the Ingress resource is as follows:

``` yaml {filename="ingress.yaml"}
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
name: vote
spec:
ingressClassName: traefik
rules:
- host: vote.votingapp.com
  http:
    paths:
    - path: /
      pathType: Prefix
      backend:
        service:
          name: vote-ui
          port:
            number: 80
- host: result.votingapp.com
  http:
    paths:
    - path: /
      pathType: Prefix
      backend:
        service:
          name: result-ui
          port:
            number: 80
```

2. Deploy the application with the following command from the *manifests* directory:

``` bash
kubectl apply -f .
```

You can then access the different interfaces using real domain names instead of a port number.

{{< image src="/images/learning-path/intro-kubernetes/resources/ingress/practice/voteui.png" align="center" width="100%" alt="Vote" >}}

{{< image src="/images/learning-path/intro-kubernetes/resources/ingress/practice/resultui.png" align="center" width="100%" alt="Result" >}}

3. Delete the application with the following command from the *manifests* directory:

``` bash
kubectl delete -f .
```

</details>

{{< /chapterstyle >}}