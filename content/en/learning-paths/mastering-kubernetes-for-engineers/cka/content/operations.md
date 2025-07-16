---
docType: "Chapter"
id: "operations"
chapterTitle: "Operations"
description: "Perform cluster upgrade and backup/restore of etcd."
lectures: 10
title: "Operations"
weight: 9
---

{{< chapterstyle >}}

This section details some Day-2 operations, the main ones being the cluster upgrade and etcd backup/restore. At the end of this section, please complete the exercises in the order provided.

## Process to upgrade a kubeadm cluster
---

Upgrading a kubeadm cluster is a very well-documented process. First, we upgrade the control plane Nodes, one at a time, following these steps:

- change package repository
- get a version to upgrade to
- upgrade kubeadm binary
- run the upgrade
- drain the Node
- upgrade kubelet & kubectl
- uncordon the Node

Next, we upgrade the worker Nodes, one at the time, following these steps:

- change package repository
- upgrade kubeadm binary
- run the upgrade
- drain the Node
- upgrade kubelet
- uncordon the Node

## About etcd
---

[etcd](https://etcd.io) is a distributed key-value store. It is considered the brain of Kubernetes as it contains all the information about the cluster's resources.

An highly available Kubernetes cluster requires multiple etcd instances. In that case the RAFT consensus algorithm maintains consistency between these instances.

[The Secret Live Of Data](http://thesecretlivesofdata.com) is a great resource to understand how RAFT works.

## Communicating with etcd
---

From the control plane Node, we can communicate with etcd using the etcdctl utility. This binary is installed on your Node.

The example below gets the etcd status.

```bash
sudo ETCDCTL_API=3 etcdctl \
--endpoints localhost:2379 \
--cert=/etc/kubernetes/pki/apiserver-etcd-client.crt \
--key=/etc/kubernetes/pki/apiserver-etcd-client.key \
--cacert=/etc/kubernetes/pki/etcd/ca.crt \
endpoint health
```

This one lists the members of the etcd cluster.

```bash
sudo ETCDCTL_API=3 etcdctl \
--endpoints localhost:2379 \
--cert=/etc/kubernetes/pki/apiserver-etcd-client.crt \
--key=/etc/kubernetes/pki/apiserver-etcd-client.key \
--cacert=/etc/kubernetes/pki/etcd/ca.crt \
member list
```

## Creating a backup
---

To back up etcd, we need to run the following command which creates the file snapshot.db in the current folder.

```bash
$ sudo ETCDCTL_API=3 etcdctl snapshot save \
--endpoints localhost:2379 \
--cacert /etc/kubernetes/pki/apiserver-etcd-client.crt \
--cert /etc/kubernetes/pki/apiserver-etcd-client.key \
--key /etc/kubernetes/pki/etcd/ca.key \
snapshot.db
```

Next, we verify the backup.

```bash
$ sudo ETCDCTL_API=3 etcdctl \
--write-out=table snapshot status snapshot.db
```

## Restore
---

The restoration process requires several steps.

First, we restore a backup in the `/var/lib/etcd-snapshot` folder, this one has to be different from the one used by default, which is `/var/lib/etcd`.

```bash
$ sudo ETCDCTL_API=3 etcdctl snapshot restore \
--endpoints localhost:2379 \
--cacert /etc/kubernetes/pki/etcd/server.crt \
--key /etc/kubernetes/pki/apiserver-etcd-client.crt \
--cert /etc/kubernetes/pki/apiserver-etcd-client.key \
--data-dir /var/lib/etcd-snapshot \
snapshot.db
```

Next, we stop the API Server. This step is important as we don't want the API Server to mess up while etcd is not available. As the API Server is a static Pod, directly managed by kubelet, we just need to move its specification to another folder so that kubelet delete the Pod.

```bash
sudo mv /etc/kubernetes/manifests/kube-apiserver.yaml /etc/kubernetes/
```

Next, we update the etcd manifests, specifying the folder from which it needs to get its data.

```yaml
…
volumes:
- hostPath:
    path: /etc/kubernetes/pki/etcd
    type: DirectoryOrCreate
  name: etcd-certs
- hostPath:
    path: /var/lib/etcd-snapshot <- New location of data
    type: DirectoryOrCreate
  name: etcd-data
```

Then, once etcd is running, we restart the API Server, moving its specification back to the `/etc/kubernetes/manifests` folder.

```bash
sudo mv /etc/kubernetes/kube-apiserver.yaml /etc/kubernetes/manifests/
```

## — Practice —
---

You can now jump to the [Exercises part](./exercises/) to perform these Day-2 operations and a couple of other manipulations on your cluster.

{{< /chapterstyle >}}