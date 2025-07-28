---
docType: "Course"
title: "Troubleshooting"
description: "This section presents some common deployment errors and how to troubleshoot them."
lectures: 0
courseTitle: "Troubleshooting"
themeColor: "#00B39F"
weight: 1
cardImage: ""

---

This section presents some common deployment errors and how to troubleshoot them.

## Pod stuck in Pending state

A Pod can remain in Pending state for various reasons.

```bash
kubectl get po
NAME                                       READY   STATUS    RESTARTS   AGE
www                                        0/1     Pending   0          6s
```

To get more information about the root cause, run the following command (replacing the placeholders with the name of the Pod and the name of the Namespace in which it is running).

```bash
kubectl describe pod POD_NAME -n NAMESPACE
```

### The Pod requires more resources than available

Let's consider a Pod named *www* for which the *describe* command returns information similar to the following.

```bash
$ kubectl describe po www
...
Events:
  Type     Reason            Age   From               Message
  ----     ------            ----  ----               -------
  Warning  FailedScheduling  110s  default-scheduler  0/2 nodes are available: 2 Insufficient cpu, 2 Insufficient memory. preemption: 0/2 nodes are available: 2 No preemption victims found for incoming pod.
```

This means the Pod's specification requests more resources than currently available. There are several cases:

- the Pod's container actually needs this amount of resources
  
  In this case, adding a Node with more resources could fix the issue

- the requests were not configured currently and are higher than what is needed

  In this case, decreasing the resources requests (for memory and/or CPU), so it fits the application needs, should be explored. The Pod specification below shows these properties for a simple nginx container. 

```yaml {filename="pod.yaml"}
apiVersion: v1
kind: Pod
metadata:
  labels:
    run: www
  name: www
spec:
  containers:
  - image: nginx:1.24
    name: www
    resources:
      requests:
        memory: 4G     # memory and cpu requests are taken into account during the scheduling phase
        cpu: 2         # decreasing the amount of mempry and cpu may fix the issue in some cases
```

### The Pod has a placement constraint that cannot be satisfied

Some Pods need to be scheduled on a specific type of Nodes; for instance, an ML/AI workload usually needs to run on a Node with a GPU. These schedule constraints can be defined in the Pod specification as in the example below.

```yaml {filename="pod-ml.yaml"}
apiVersion: v1
kind: Pod
metadata:
  name: ml
spec:
  containers:
  - image: myMLApp:1.4.2
    name: ml
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
        - matchExpressions:
          - key: node.kubernetes.io/instance-type
            operator: In
            values:
            - gpua5000     # This Pod needs to be deployed on a node with 
            - gpu3080ti    # a 3080TI or a A5000 GPU
```

When run on a cluster which does not have this type of Node, this Pod will remain in *Pending* state, the output of the *describe* command being similar to the one below.

```bash
$ kubectl describe pod ml
...
Events:
  Type     Reason            Age   From               Message
  ----     ------            ----  ----               -------
  Warning  FailedScheduling  11s   default-scheduler  0/2 nodes are available: 2 node(s) didn't match Pod's node affinity/selector. preemption: 0/2 nodes are available: 2 Preemption is not helpful for scheduling.
```

To fix this issue, we could either:
- modify the Pod specification referencing a GPU instance type existing in the cluster
- add a new Node into the cluster, this one of the type defined in the Pod specification

### The Pod needs storage that cannot be created

Some Pods need persistent storage to store data; for instance, a database needs to persist data on a real storage, not in the container's file system. This is done through the usage of a PersistentVolumeClaim resource, which is referenced in the Pod specification.

The example below defines a Pod running *MongoDB* and persisting its data via a PVC named *mongo-data*.



```yaml {filename="pod.yaml"}
    apiVersion: v1
    kind: Pod
    metadata:
      name: mongo
    spec:
      containers:
      - image: mongo:6
        name: mongo
      volumes:
      - name: data
        persistentVolumeClaim:
          claimName: mongo-data
```

  

```yaml {filename="pvc.yaml"}
    apiVersion: v1
    kind: PersistentVolumeClaim
    metadata:
      name: mongo-data
    spec:
      storageClassName: manual
      accessModes:
        - ReadWriteOnce
      resources:
        requests:
          storage: 1Gi
```


- Non-existing StorageClass

There may be situation where the *describe* command returns an error message similar to the following one. This indicates that no PersistentVolume could be created and associated to the PVC.

```bash
...
Events:
  Type     Reason            Age   From               Message
  ----     ------            ----  ----               -------
  Warning  FailedScheduling  43m   default-scheduler  0/1 nodes are available: pod has unbound immediate PersistentVolumeClaims. preemption: 0/1 nodes are available: 1 Preemption is not helpful for scheduling.
```

Using the *describe* command on the PVC may provide additional information. In the example below, the error is due to an invalid name for the StorageClass.

```bash
$ kubectl describe pvc mongo-data
...
Events:
  Type     Reason              Age                     From                         Message
  ----     ------              ----                    ----                         -------
  Warning  ProvisioningFailed  3m22s (x481 over 166m)  persistentvolume-controller  storageclass.storage.k8s.io "manual" not found
```

We can change the PVC definition, using the name of an existing StorageClass (*local-path* in this example).

```yaml {filename="pvc.yaml"}
    apiVersion: v1
    kind: PersistentVolumeClaim
    metadata:
      name: mongo-data
    spec:
      storageClassName: local-path
      accessModes:
        - ReadWriteOnce
      resources:
        requests:
          storage: 1Gi
```

After recreating the PVC using the updated specification, the PVC should be bound to a PV, and the Pod should transition to the *Running* state.

- There may be other reasons which prevent the underlying PV to be created such as capacity limits of the underlying storage
