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

<p>This section is a refresher that provides an overview of the primary Kubernetes resources related to storage. At the end of this section, please complete the exercises to put these concepts into practice.</p>

<h2>Volume</h2>
<hr>

<p>Volume is a property that can be defined in a Pod's specification (at <code>.spec.volumes</code>) and mounted in a container's filesystem (<code>.spec.containers.volumeMounts</code>). It allows decoupling a container from the storage solution and containers of the same pod to share data.</p>

<p>Among the available types of volumes:</p>

<ul>
<li><code>emptyDir</code></li>
<li><code>configMap</code></li>
<li><code>Secret</code></li>
<li><code>hostPath</code></li>
<li><code>downwardAPI</code></li>
</ul>

<p>The following specification defines a MongoDB Pod with an <code>emptyDir</code> volume mounted at <code>/data/db</code> in the container filesystem. It allows the data to persist outside the container's filesystem but still on the host filesystem.</p>

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

<p><strong>Note:</strong> We should not use a volume for persistent storage; instead we should use PersistentVolume and PersistentVolumeClaim.</p>

<h2>PersistentVolume</h2>
<hr>

<p>A PersistentVolume (PV) is a resource used to provide storage, either statically or dynamically. It decouples an application from the storage solution.</p>

<p>Various types of PersistentVolume are available, including:</p>

<ul>
<li><code>cephfs</code></li>
<li><code>csi</code></li>
<li><code>fc</code></li>
<li><code>hostPath</code></li>
<li><code>iscsi</code></li>
<li><code>local</code></li>
<li><code>nfs</code></li>
<li><code>rbd</code></li>
</ul>

<p>The main properties of a PV are the following:</p>

<h3>volumeMode</h3>
<p>Defines how the volume is presented to a Pod:</p>
<ul>
<li><code>Filesystem</code> (default)</li>
<li><code>Block</code></li>
</ul>

<h3>accessModes</h3>
<p>Specifies how we can mount the volume in the Pod:</p>
<ul>
<li><code>ReadWriteOnce (RWO)</code>: the volume can be mounted as read-write by a single Node</li>
<li><code>ReadOnlyMany (ROX)</code>: the volume can be mounted as read-only by multiple Nodes at the same time</li>
<li><code>ReadWriteMany (RWX)</code>: the volume can be mounted as read-write by multiple Nodes at the same time</li>
<li><code>ReadWriteOncePod (RWOP)</code>: the volume can be mounted as read-write by a single Pod only</li>
</ul>

<h3>persistentVolumeReclaimPolicy</h3>
<p>Defines what happens to the PersistentVolume after the associated PersistentVolumeClaim is deleted:</p>
<ul>
<li><code>Retain</code> (default if manually created): the PersistentVolume is not deleted, a manual data recovery is possible</li>
<li><code>Delete</code> (default if dynamically created): the PersistentVolume and the underlying storage are deleted</li>
</ul>

<p>The specification below defines a PersistentVolume that will be tied to a single Node and offer 1G of storage from this Node's filesystem.</p>

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

<h2>PersistentVolumeClaim</h2>
<hr>

<p>A PersistentVolumeClaim (PVC) is a storage request. It specifies the storage requirements regarding size and access mode, and is bound to a PersistentVolume that meets those requirements.</p>

<p>The following specification defines a PersistentVolumeClaim, which requests 500 MB of storage with a RWO mode.</p>

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

<p>A Pod can request storage by referencing the PVC in its specification as follows. When a PVC is bound to a PV, the PV is mounted into the container's filesystem.</p>

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

<h2>StorageClass</h2>
<hr>

<p>A StorageClass defines how to dynamically create PersistentVolumes without needing to pre-provision them.</p>

<p>More information in the official documentation at <a href="https://kubernetes.io/docs/concepts/storage/">https://kubernetes.io/docs/concepts/storage/</a></p>

---

<h2>Practice</h2>
<hr>

<p>You can now jump to the <a href="./exercises/">Exercises part</a> to learn and practice the concepts above.</p>

{{< /chapterstyle >}}