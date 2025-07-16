---
docType: "Course"
title: "Practice"
lectures: 1
courseTitle: "Pod"
themeColor: "#00B39F"
weight: 4
cardImage: ""
---
{{< chapterstyle >}}



## Run the VotingApp in Pods

1. Create the *votingapp* folder on your local machine. Inside this one, create the YAML files containing the Pod specifications for each microservice, following the instructions from the table below:

    | Microservice | File Name          | Pod Name   | Container Image         |
    | ---          | ---                | ---        | ---                     |
    | Vote UI      | pod-voteui.yaml    | vote-ui    | voting/vote-ui:latest   |
    | Vote         | pod-vote.yaml      | vote       | voting/vote:latest      |
    | Redis        | pod-redis.yaml     | redis      | redis:7.0.8-alpine3.17  |
    | Worker       | pod-worker.yaml    | worker     | voting/worker:latest    |
    | Postgres     | pod-db.yaml        | db         | postgres:15.1-alpine3.17|
    | Result       | pod-result.yaml    | result     | voting/result:latest    |
    | Result UI    | pod-resultui.yaml  | result-ui  | voting/result-ui:latest |

    For the *db* Pod, make sure to specify an environment variable *POSTGRES_PASSWORD* with the value *postgres*.

2. Deploy the application defined by all of these specifications

3. What do you notice ?

4. Delete the application

<br/>
<details>
<summary markdown="span">Solution</summary>

1. The specifications are as follows:




  ```yaml
  apiVersion: v1
  kind: Pod
  metadata:
    name: vote-ui
  spec:
    containers:
      - image: voting/vote-ui:latest
        name: vote-ui
  ```



  ``` yaml
  apiVersion: v1
  kind: Pod
  metadata:
    name: vote
  spec:
    containers:
      - image: voting/vote:latest
        name: vote
  ```



  ``` yaml
  apiVersion: v1
  kind: Pod
  metadata:
    name: redis
  spec:
    containers:
      - image: redis:7.0.8-alpine3.17
        name: redis
  ```



  ``` yaml
  apiVersion: v1
  kind: Pod
  metadata:
    name: worker
  spec:
    containers:
      - image: voting/worker:latest
        name: worker
        imagePullPolicy: Always
  ```

  ``` yaml
  apiVersion: v1
  kind: Pod
  metadata:
    name: db
  spec:
    containers:
    - image: postgres:15.1-alpine3.17
      name: postgres
      env:
        - name: POSTGRES_PASSWORD
          value: postgres
  ```



  ``` yaml
  apiVersion: v1
  kind: Pod
  metadata:
    name: result
  spec:
    containers:
      - image: voting/result:latest
        name: result
  ```

  ``` yaml
  apiVersion: v1
  kind: Pod
  metadata:
    name: result-ui
  spec:
    containers:
      - image: voting/result-ui:latest
        name: result-ui
  ```





2. The application can be launched with the following command:

```bash
kubectl apply -f votingapp
```


If a folder is specified, all the YAML files in that directory are created


3. What do you notice ?

Some Pods are in error:

```bash
$ kubectl get po
NAME        READY   STATUS             RESTARTS     AGE
db          1/1     Running            0            25s
redis       1/1     Running            0            25s
result      1/1     Running            0            25s
result-ui   0/1     CrashLoopBackOff   1 (4s ago)   24s
vote        1/1     Running            0            25s
vote-ui     0/1     CrashLoopBackOff   1 (3s ago)   25s
worker      1/1     Running            0            25s
```

If we take the *vote-ui* Pod as an example, the logs show that it cannot connect to *vote*:

```bash
$ kubectl logs vote-ui  
/docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration
/docker-entrypoint.sh: Looking for shell scripts in /docker-entrypoint.d/
/docker-entrypoint.sh: Launching /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh
10-listen-on-ipv6-by-default.sh: info: Getting the checksum of /etc/nginx/conf.d/default.conf
10-listen-on-ipv6-by-default.sh: info: Enabled listen on IPv6 in /etc/nginx/conf.d/default.conf
/docker-entrypoint.sh: Launching /docker-entrypoint.d/20-envsubst-on-templates.sh
/docker-entrypoint.sh: Launching /docker-entrypoint.d/30-tune-worker-processes.sh
/docker-entrypoint.sh: Configuration complete; ready for start up
2024/02/08 11:10:20 [emerg] 1#1: host not found in upstream "vote" in /etc/nginx/nginx.conf:44
nginx: [emerg] host not found in upstream "vote" in /etc/nginx/nginx.conf:44
```

Moreover, the logs from the *worker* Pod indicate that it cannot connect to the *Redis* Pod:

```bash
$ kubectl logs worker
...
Waiting for Redis dial tcp: lookup redis on 10.96.0.10:53: no such host
```

The Pods for the different microservices are created, but they cannot communicate with each other because we need to create Services. We will add this in the next step, which will allow us to have a fully functional application.

4. We delete the application with the following command:

```bash
kubectl delete -f votingapp
```

</details>

{{< /chapterstyle >}}