---
docType: "Chapter"
id: "storage"
chapterTitle: "Storage"
description: "Understand StorageClass, PV and PVCs stateful applications."
lectures: 10
title: "Storage"
weight: 6
---

{{< chapterstyle >}}

This section is a refresher that provides an overview of the primary Kubernetes resources related to storage. At the end of this section, please complete the exercises to put these concepts into practice.

## Volume
---

Volume is a property that can be defined in a Pod's specification (at `.spec.volumes`) and mounted in a container's filesystem (`.spec.containers.volumeMounts`). It allows decoupling a container from the storage solution and containers of the same pod to share data.

Among the available types of volumes:

- `emptyDir`
- `configMap`
- `Secret`
- `hostPath`
- `downwardAPI`

The following specification defines a MongoDB Pod with an `emptyDir` volume mounted at `/data/db` in the container filesystem. It allows the data to persist outside the container's filesystem but still on the host filesystem.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mongo
spec:
  containers:
  - name: mongo
    image: mongo:7.0
    volumeMounts:
    - name: data
      mountPath: /data/db
  volumes:
  - name: data
    emptyDir: {}
```

**Note:** We should not use a volume for persistent storage; instead we should use PersistentVolume and PersistentVolumeClaim.

## PersistentVolume
---

A PersistentVolume (PV) is a resource used to provide storage, either statically or dynamically. It decouples an application from the storage solution.

Various types of PersistentVolume are available, including:

- `cephfs`
- `csi`
- `fc`
- `hostPath`
- `iscsi`
- `local`
- `nfs`
- `rbd`

The main properties of a PV are the following:

### volumeMode

Defines how the volume is presented to a Pod:

- `Filesystem` (default)
- `Block`

### accessModes

Specifies how we can mount the volume in the Pod:

- `ReadWriteOnce (RWO)`: the volume can be mounted as read-write by a single Node
- `ReadOnlyMany (ROX)`: the volume can be mounted as read-only by multiple Nodes at the same time
- `ReadWriteMany (RWX)`: the volume can be mounted as read-write by multiple Nodes at the same time
- `ReadWriteOncePod (RWOP)`: the volume can be mounted as read-write by a single Pod only

### persistentVolumeReclaimPolicy

Defines what happens to the PersistentVolume after the associated PersistentVolumeClaim is deleted:

- `Retain` (default if manually created): the PersistentVolume is not deleted, a manual data recovery is possible
- `Delete` (default if dynamically created): the PersistentVolume and the underlying storage are deleted

The specification below defines a PersistentVolume that will be tied to a single Node and offer 1G of storage from this Node's filesystem.

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv
spec:
  accessModes:
  - ReadWriteOnce
  capacity:
    storage: 1Gi
  hostPath:
    path: /tmp/data
```

## PersistentVolumeClaim
---

A PersistentVolumeClaim (PVC) is a storage request. It specifies the storage requirements regarding size and access mode, and is bound to a PersistentVolume that meets those requirements.

The following specification defines a PersistentVolumeClaim, which requests 500 MB of storage with a RWO mode.

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: pvc
spec:
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 500Mi
```

A Pod can request storage by referencing the PVC in its specification as follows. When a PVC is bound to a PV, the PV is mounted into the container's filesystem.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: db
spec:
  containers:
  - image: mongo:5.0
    name: mongo
    volumeMounts:
    - name: data
      mountPath: /data/db
  volumes:
  - name: data
    persistentVolumeClaim:
      claimName: pvc
```

## StorageClass
---

A StorageClass defines how to dynamically create PersistentVolumes without needing to pre-provision them.

More information in the official documentation at https://kubernetes.io/docs/concepts/storage/

## Practice
---

You can now jump to the [Exercises part](./exercises/) to learn and practice the concepts above.

{{< /chapterstyle >}}