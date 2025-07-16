---
docType: "Course"
title: "Learn"
lectures: 1
courseTitle: "Configuration"
themeColor: "#00B39F"
weight: 2
cardImage: ""
---
{{< chapterstyle >}}
## Configuration resources

There are 2 type of configuration resources:
- a ConfigMap is used to manage configuration data
- a Secret is used to manage sensitive data

ConfigMap and Secret contain one or more key / value pairs. Each resource can be consumed in a Pod
- via a mount point in a container's filesystem
- via environment variables

{{< image src="/images/learning-path/intro-kubernetes/resources/configuraion/learn/pod.png" align="center" width="100%" alt="Pod using a ConfigMap and a Secret" >}}

## ConfigMap

### Mounting a ConfigMap into a container's filesystem

The following nginx configuration file defines a server which listens on port 80 and forwards all the requests to the port 5000 of the api service.

```yaml
user www-data;
worker_processes 4;
pid /run/nginx.pid;
events {
  worker_connections 768;
}
http {
 server {
   listen *:80;
   location / {
     proxy_pass http://api:5000;
   }
 }
}
```

The following specification defines ConfigMap which provides the nginx configuration file within the cluster, allowing Pods to use it:

``` yaml {filename="nginx.config"}
apiVersion: v1
kind: ConfigMap
metadata: 
  name: nginx-config
data:
  nginx.conf: |
    user www-data;
    worker_processes 4;
    pid /run/nginx.pid;
    events {
      worker_connections 768;
    }
    http {
      server {
        listen *:80;
        location / {
          proxy_pass http://api:5000;
        }
      }
    }
```

As this ConfigMap contains a file, we can use it in a Pod mounting it into the container's filesystem. The following specification defines a Pod with a single container running the *nginx:1.20* image.

``` yaml
apiVersion: v1
kind: Pod
metadata:
  name: proxy
spec:
  containers:
  - name: proxy
    image: nginx:1.20
    ports:
    - containerPort: 80
```

To give access to the nginx configuration file existing in the *nginx-config* ConfigMap:

- we define a volume based on the ConfigMap
- we mount this volume in the container’s filesystem

The new version of the Pod specification is as follows:

``` yaml
apiVersion: v1
kind: Pod
metadata:
  name: proxy
spec:
  containers:
  - name: proxy
    image: nginx:1.20
    ports:
    - containerPort: 80
    volumeMounts:            # (1)
    - name: config
      mountPath: "/etc/nginx/"
  volumes:                   # (2)
  - name: config
    configMap:
      name: nginx-config
```

1. Volume mounted in the container's filesystem

2. Definition of the volume allowing to consume the content of the ConfigMap

### Injecting a ConfigMap via environment variables

The following specification defines a ConfigMap containing 2 key / value pairs:
- env: production
- log_level: warning

``` yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-cfg
  namespace: default
data:
  env: production
  log_level: WARNING
```

The content of this ConfigMap can be injected in the container's environment variables as follows:

``` yaml
apiVersion: v1
kind: Pod
metadata:
  name: api
spec:
  containers:
  - name: api
    image: org/api:1.2
    env:
    - name: LOG_LEVEL    # (1) 
      valueFrom:
        configMapKeyRef:
          name: app-cfg
          key: log_level
    - name: ENV          # (2) 
      valueFrom:
        configMapKeyRef:
          name: app-cfg
          key: env
```

1. Container's LOG_LEVEL env var with value retrieved from the ConfigMap's log_level key

2. Container's ENV env var with value retrieved from the ConfigMap's env key

## Secret

### Role and usage

A Secret is used to manage sensitive data.  

There are different types of Secret including:
- Generic
- Docker-registry
- TLS

The content of a Secret is not encrypted in etcd by default but can be encrypted using an EncryptionConfiguration resource

### Secret of type generic

Let's consider a dummy connection string to connect to a MongoDB database: `mongodb://admin:45fe3efa@mgserv1.org/mgmt`. For this sensitive piece of information to be used in a Pod we first encode it in base64:

``` bash
$ echo -n "mongodb://admin:45fe3efa@mgserv1.org/mgmt" | base64
bW9uZ29kYjovL2FkbWluOjQ1ZmUzZWZhQG1nc2VydjEub3JnL21nbXQ=
```

Then we create a Secret defining a key / value pair using the resulting encoded value:

``` yaml
apiVersion: v1
kind: Secret
metadata:
  name: mongo
data:
  mongo: bW9uZ29kYjovL2FkbWluOjQ1ZmUzZWZhQG1nc2VydjEub3JnL21nbXQ=
```

To consume the content of the Secret in a Pod, we can either mount it in the container's filesystem as a volume, or we can inject it in environment variables:

- Mounting the Secret's content as a Volume

``` yaml
apiVersion: v1
kind: Pod
metadata:
  name: api
spec:
  containers:
  - name: api
    image: api:1.2
    volumeMounts:
    - name: creds
      mountPath: /etc/creds
  volumes:
  - name: creds
    secret:
      secretName: mongo
```

- Injecting the Secret's content in environment variables

``` yaml
apiVersion: v1
kind: Pod
metadata:
  name: api
spec:
  containers:
  - name: api
    image: api:1.2
    env:
    - name: MONGO_URL
      valueFrom:
        secretKeyRef:
          name: mongo
          key: mongo
```

## Using a Secret in the VotingApp

The previous exercise left the app with the following components:

{{< image src="/images/learning-path/intro-kubernetes/resources/configuraion/learn/votingapp-1.png" align="center" width="100%" alt="VotingApp" >}}

We will now add a Secret to store the password required to connect to the PostgreSQL database.

{{< image src="/images/learning-path/intro-kubernetes/resources/configuraion/learn/votingapp-2.png" align="center" width="100%" alt="VotingApp" >}}

{{< /chapterstyle >}}