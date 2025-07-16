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

<p>This section details some Day-2 operations, the main ones being the cluster upgrade and etcd backup/restore. At the end of this section, please complete the exercises in the order provided.</p>

<h2>Process to upgrade a kubeadm cluster</h2>
<hr>

<p>Upgrading a kubeadm cluster is a very well-documented process. First, we upgrade the control plane Nodes, one at a time, following these steps:</p>

<ul>
<li>change package repository</li>
<li>get a version to upgrade to</li>
<li>upgrade kubeadm binary</li>
<li>run the upgrade</li>
<li>drain the Node</li>
<li>upgrade kubelet & kubectl</li>
<li>uncordon the Node</li>
</ul>

<p>Next, we upgrade the worker Nodes, one at the time, following these steps:</p>

<ul>
<li>change package repository</li>
<li>upgrade kubeadm binary</li>
<li>run the upgrade</li>
<li>drain the Node</li>
<li>upgrade kubelet</li>
<li>uncordon the Node</li>
</ul>

<h2>About etcd</h2>
<hr>

<p><a href="https://etcd.io">etcd</a> is a distributed key-value store. It is considered the brain of Kubernetes as it contains all the information about the cluster's resources.</p>

<p>An highly available Kubernetes cluster requires multiple etcd instances. In that case the RAFT consensus algorithm maintains consistency between these instances.</p>

<p><a href="http://thesecretlivesofdata.com">The Secret Live Of Data</a> is a great resource to understand how RAFT works.</p>

<h2>Communicating with etcd</h2>
<hr>

<p>From the control plane Node, we can communicate with etcd using the etcdctl utility. This binary is installed on your Node.</p>

<p>The example below gets the etcd status.</p>

```bash
sudo ETCDCTL_API=3 etcdctl \
--endpoints localhost:2379 \
--cert=/etc/kubernetes/pki/apiserver-etcd-client.crt \
--key=/etc/kubernetes/pki/apiserver-etcd-client.key \
--cacert=/etc/kubernetes/pki/etcd/ca.crt \
endpoint health
```

<p>This one lists the members of the etcd cluster.</p>

```bash
sudo ETCDCTL_API=3 etcdctl \
--endpoints localhost:2379 \
--cert=/etc/kubernetes/pki/apiserver-etcd-client.crt \
--key=/etc/kubernetes/pki/apiserver-etcd-client.key \
--cacert=/etc/kubernetes/pki/etcd/ca.crt \
member list
```

<h2>Creating a backup</h2>
<hr>

<p>To back up etcd, we need to run the following command which creates the file snapshot.db in the current folder.</p>

```bash
$ sudo ETCDCTL_API=3 etcdctl snapshot save \
--endpoints localhost:2379 \
--cacert /etc/kubernetes/pki/apiserver-etcd-client.crt \
--cert /etc/kubernetes/pki/apiserver-etcd-client.key \
--key /etc/kubernetes/pki/etcd/ca.key \
snapshot.db
```

<p>Next, we verify the backup.</p>

```bash
$ sudo ETCDCTL_API=3 etcdctl \
--write-out=table snapshot status snapshot.db
```

<h2>Restore</h2>
<hr>

<p>The restoration process requires several steps.</p>

<p>First, we restore a backup in the <code>/var/lib/etcd-snapshot</code> folder, this one has to be different from the one used by default, which is <code>/var/lib/etcd</code>.</p>

```bash
$ sudo ETCDCTL_API=3 etcdctl snapshot restore \
--endpoints localhost:2379 \
--cacert /etc/kubernetes/pki/etcd/server.crt \
--key /etc/kubernetes/pki/apiserver-etcd-client.crt \
--cert /etc/kubernetes/pki/apiserver-etcd-client.key \
--data-dir /var/lib/etcd-snapshot \
snapshot.db
```

<p>Next, we stop the API Server. This step is important as we don't want the API Server to mess up while etcd is not available. As the API Server is a static Pod, directly managed by kubelet, we just need to move its specification to another folder so that kubelet delete the Pod.</p>

```bash
sudo mv /etc/kubernetes/manifests/kube-apiserver.yaml /etc/kubernetes/
```

<p>Next, we update the etcd manifests, specifying the folder from which it needs to get its data.</p>

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

<p>Then, once etcd is running, we restart the API Server, moving its specification back to the <code>/etc/kubernetes/manifests</code> folder.</p>

```bash
sudo mv /etc/kubernetes/kube-apiserver.yaml /etc/kubernetes/manifests/
```

---

<h2>— Practice —</h2>
<hr>

<p>You can now jump to the <a href="./exercises/">Exercises part</a> to perform these Day-2 operations and a couple of other manipulations on your cluster.</p>

{{< /chapterstyle >}}