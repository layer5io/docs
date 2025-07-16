---
docType: "Course"
title: "Practice"
lectures: 1
courseTitle: "Storage"
themeColor: "#00B39F"
weight: 4
cardImage: ""
---
{{< chapterstyle >}}


## Persist the VotingApp's databases

By default, k3s comes with the default StorageClass named *local-path* which can be verified using the following command.

```bash
$ kubectl get storageclass
NAME                   PROVISIONER             RECLAIMPOLICY   VOLUMEBINDINGMODE      ALLOWVOLUMEEXPANSION   AGE
local-path (default)   rancher.io/local-path   Delete          WaitForFirstConsumer   false                  1h4m
```

1. In a file named *pvc-redis.yaml*, define the specification for a *PersistentVolumeClaim* with the following characteristics:

- name: redis
- ReadWriteOnce mode
- request for 1G storage

Then modify the *redis* Deployment specification by adding a volume based on this *PersistentVolumeClaim*, and use the *volumeMounts* instruction to ensure that the associated *PersistentVolume* is mounted in the */data* directory of the redis container.

2. In a file named *pvc-db.yaml* containing the specification for a *PersistentVolumeClaim* with the following characteristics:  

    - name: db
    - ReadWriteOnce mode
    - request for 1G of storage

    Then modify the *db* Deployment specification by adding a volume based on this *PersistentVolumeClaim*, and use the *volumeMounts* instruction to ensure that the associated *PersistentVolume* is mounted in the */var/lib/postgresql/data* directory of the postgres container.

3. Deploy the application defined in these specifications and verify that it is working correctly.

4. List the *PersistentVolumeClaim* resources. What do you observe?

5. Delete the application.

<br/>
<details>
<summary markdown="span">Solution</summary>

1. The specification to define the *PersistentVolumeClaim* named *redis*:

``` yaml {filename="pvc-redis.yaml"}
apiVersion: v1
kind: PersistentVolumeClaim
metadata: 
  name: redis
spec: 
  accessModes:
    - ReadWriteOnce
  resources:
    requests: 
      storage: 1Gi
```

The *redis* Deployment is modified as follows:

``` yaml {filename="deploy-redis.yaml"}
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
          volumeMounts:
          - name: data
            mountPath: /data
      volumes:
      - name: data
        persistentVolumeClaim:
          claimName: redis
```

2. The specification to define the *PersistentVolumeClaim* named *db*:

``` yaml {filename="pvc-db.yaml"}
apiVersion: v1
kind: PersistentVolumeClaim
metadata: 
  name: db
spec: 
  accessModes:
    - ReadWriteOnce
  resources:
    requests: 
      storage: 1Gi
```

The *db* Deployment is modified as follows:

``` yaml {filename="deploy-db.yaml"}
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
              valueFrom:
                secretKeyRef:
                  name: db
                  key: password
          volumeMounts:
          - name: data
            mountPath: /var/lib/postgresql/data
          ports:
            - containerPort: 5432
              name: postgres
      volumes:
      - name: data
        persistentVolumeClaim: 
          claimName: db
```

3. Deploy the application using the following command from the *manifests* directory:

``` bash
kubectl apply -f .
```

Using the IP address of one of the cluster nodes, you can access the vote and result interfaces via ports *31000* and *31001* respectively.

4. You can list the *PersistentVolumeClaim* resources and observe that a *PersistentVolume* has been created for each of the 2 PVCs.

List of *PersistentVolumeClaims*:
``` bash
$ kubectl get pvc
NAME                          STATUS   VOLUME                                     CAPACITY  ACCESS MODES   STORAGECLASS   AGE
persistentvolumeclaim/redis   Bound    pvc-789e3c5c-4402-4b96-b09d-ee441e8ade1d   1Gi       RWO            local-path     39s
persistentvolumeclaim/db      Bound    pvc-75b9a32c-eab5-4452-a9b8-12d41dd74e7a   1Gi       RWO            local-path     39s
```

List of *PersistentVolumes*:
``` bash
$ kubectl get pv
NAME                                                        CAPACITY  ACCESS MODES   RECLAIM POLICY   STATUS   CLAIM           STORAGECLASS   REASON   AGE
persistentvolume/pvc-789e3c5c-4402-4b96-b09d-ee441e8ade1d   1Gi       RWO            Delete           Bound    default/redis   local-path              32s
persistentvolume/pvc-75b9a32c-eab5-4452-a9b8-12d41dd74e7a   1Gi       RWO            Delete           Bound    default/db      local-path              32s
```

5. Delete the application using the following command from the *manifests* directory:

``` bash
kubectl delete -f .
```

</deatils>

{{< /chapterstyle >}}