---
docType: "Course"
title: "Learn"
lectures: 1
courseTitle: "Storage"
themeColor: "#00B39F"
weight: 2
cardImage: ""
---
{{< chapterstyle >}}

## Storage in Kubernetes

The following items are related to data storage in Kubernetes:

- Volume : shares data between containers in a Pod
- PersistentVolume (PV) : storage resource
- PersistentVolumeClaim (PVC) : request for storage
- StorageClass : dynamique storage provisioning
- StatefulSet : used to manage stateful applications

## PersistentVolume / PersistentVolumeClaim

A PersistentVolume provides the storage, it can be provisioned either statically (by an administrator) or dynamically (by a StorageClass).  
A PersistentVolumeClaim is a request for storage, it decouples an application from the storage solution and allows storage to be consumed by a Pod

{{< image src="/images/learning-path/intro-kubernetes/resources/storage/learn/storage.png" align="center" width="100%" alt="Storage" >}}


## StorageClass

A StorageClass is a resource which allows PV to be dynamically created. It is referenced within the specification of a PVC.

{{< image src="/images/learning-path/intro-kubernetes/resources/storage/learn/storageClass.png" align="center" width="100%" alt="StorageClass" >}}

## Provisioning with a StorageClass

The local cluster, based on k3s, used in this section has a default storage class based on the *local-path* provisioner. It allows to create storage on the VM filesystem. The specification of this StorageClass is the following one:

``` yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: local-path
provisioner: rancher.io/local-path
reclaimPolicy: Delete
volumeBindingMode: WaitForFirstConsumer
...
```


This StorageClass should not be used in a production environment.


In order to use this StorageClass, we define a PVC (PersistentVolumeClaim) referencing the StorageClass:

``` yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mysql-pv-claim
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: local-path
  resources:
    requests:
      storage: 1Gi
```

Next we reference this PVC in our application:

``` yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mysql
spec:
  selector:
    matchLabels:
      app: mysql
  template:
    metadata:
      labels:
        app: mysql
    spec:
      containers:
      - image: mysql:5.6
        name: mysql
        env:
        - name: MYSQL_ROOT_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mysql-pass
              key: password
        volumeMounts:
        - name: mysql-storage
          mountPath: /var/lib/mysql
      volumes:
      - name: mysql-storage
        persistentVolumeClaim:
          claimName: mysql-pv-claim
```

Creating the Deployment and the PVC triggers the creation of a PV of 1G in size.

## Using Storage in the VotingApp

The previous exercise left the app with the following components:

{{< image src="/images/learning-path/intro-kubernetes/resources/storage/learn/votingapp-1.png" align="center" width="100%" alt="VotingApp" >}}

We will now use the existing StorageClass and define PVCs to request storage for both databases used in the VotingApp:

{{< image src="/images/learning-path/intro-kubernetes/resources/storage/learn/votingapp-2.png" align="center" width="100%" alt="VotingApp" >}}

{{< /chapterstyle >}}