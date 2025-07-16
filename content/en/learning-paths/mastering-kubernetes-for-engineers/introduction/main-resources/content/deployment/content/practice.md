---
docType: "Course"
title: "Practice"
lectures: 1
courseTitle: "Deployment"
themeColor: "#00B39F"
weight: 2
cardImage: ""
---
{{< chapterstyle >}}

## Use Deployments in the VotingApp

1. In the *votingapp* directory, replace each Pod specification with a Deployment specification with a single replica. Name these Deployment files *deploy-XXX.yaml* where XXX is the name of the microservice (*voteui*, *vote*, ...)

2. Deploy the application defined by these specifications

3. Access the vote and result interfaces via NodePort Services

4. Delete a Pod. What happens ?

5. Delete the application

<br/>
<details>
<summary markdown="span">Solution</summary>



  ```yaml
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    labels:
      app: vote-ui
    name: vote-ui
  spec:
    replicas: 1
    selector:
      matchLabels:
        app: vote-ui
    template:
      metadata:
        labels:
          app: vote-ui
      spec:
        containers:
          - image: voting/vote-ui:latest
            name: vote-ui
  ```



  ``` yaml
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    labels:
      app: vote
    name: vote
  spec:
    replicas: 1
    selector:
      matchLabels:
        app: vote
    template:
      metadata:
        labels:
          app: vote
      spec:
        containers:
          - image: voting/vote:latest
            name: vote
  ```


  ``` yaml
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    labels:
      app: redis
    name: redis
  spec:
    replicas: 1
    selector:
      matchLabels:
        app: redis
    template:
      metadata:
        labels:
          app: redis
      spec:
        containers:
          - image: redis:7.0.8-alpine3.17
            name: redis
  ```



  ``` yaml
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    labels:
      app: worker
    name: worker
  spec:
    replicas: 1
    selector:
      matchLabels:
        app: worker
    template:
      metadata:
        labels:
          app: worker
      spec:
        containers:
          - image: voting/worker:latest
            name: worker
  ```



  ``` yaml
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    labels:
      app: db
    name: db
  spec:
    replicas: 1
    selector:
      matchLabels:
        app: db
    template:
      metadata:
        labels:
          app: db
      spec:
        containers:
          - image: postgres:15.1-alpine3.17
            name: postgres
            env:
              - name: POSTGRES_PASSWORD
                value: postgres
            ports:
              - containerPort: 5432
                name: postgres
  ```



  ``` yaml
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    labels:
      app: result
    name: result
  spec:
    replicas: 1
    selector:
      matchLabels:
        app: result
    template:
      metadata:
        labels:
          app: result
      spec:
        containers:
          - image: voting/result:latest
            name: result
  ```



  ``` yaml
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    labels:
      app: result-ui
    name: result-ui
  spec:
    replicas: 1
    selector:
      matchLabels:
        app: result-ui
    template:
      metadata:
        labels:
          app: result-ui
      spec:
        containers:
          - image: voting/result-ui:latest
            name: result-ui
  ```





2. Deploy the application with the following command from the *votingapp* directory:

```bash
kubectl apply -f .
```

3. As before, using the IP address of one of the cluster nodes, you can access the vote and result interfaces via ports *31000* and *31001* respectively.

{{< image src="/images/learning-path/intro-kubernetes/resources/deployment/practice/vote.png" align="center" width="100%" alt="Vote" >}}


{{< image src="/images/learning-path/intro-kubernetes/resources/deployment/practice/result.png" align="center" width="100%" alt="Results" >}}

4. Each Pod is now managed by a Deployment. If a Pod is deleted, another Pod is automatically created to replace it.

List of Pods:
```bash
$ kubectl get po
NAME                         READY   STATUS    RESTARTS   AGE
db-647c8f548b-j7z79          1/1     Running   0          3m35s
redis-6f95f75d56-7gwjz       1/1     Running   0          3m35s
result-7f897b4d58-qqtt4      1/1     Running   0          3m35s
result-ui-5cdd74d999-q5tx7   1/1     Running   0          3m34s
vote-6c847fd45-fpprh         1/1     Running   0          3m35s
vote-ui-74849dd9b4-gwcq9     1/1     Running   0          3m35s
worker-8655654586-k44vw      1/1     Running   0          3m35s
```

Deleting a Pod (e.g., *worker*):

```bash
$ kubectl delete po worker-8655654586-k44vw 
pod "worker-8655654586-k44vw" deleted
```

A new Pod is automatically launched to replace the one that was deleted.

```bash
$ kubectl get po                                 
NAME                         READY   STATUS    RESTARTS   AGE
db-647c8f548b-j7z79          1/1     Running   0          5m15s
redis-6f95f75d56-7gwjz       1/1     Running   0          5m15s
result-7f897b4d58-qqtt4      1/1     Running   0          5m15s
result-ui-5cdd74d999-q5tx7   1/1     Running   0          5m14s
vote-6c847fd45-fpprh         1/1     Running   0          5m15s
vote-ui-74849dd9b4-gwcq9     1/1     Running   0          5m15s
worker-8655654586-mmzgh      1/1     Running   0          4s
```

A Deployment ensures that Pods are always present. If we had deleted a Pod that was not managed by a Deployment (a *Naked Pod*), no new Pod would be automatically created to replace it.

5. We delete the application with the following command:

```bash
kubectl delete -f .
```

</details>

{{< /chapterstyle >}}