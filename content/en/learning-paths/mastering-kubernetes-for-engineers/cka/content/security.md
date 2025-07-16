---
docType: "Chapter"
id: "security"
chapterTitle: "Security"
description: "Create Network Policies and RBAC rules."
lectures: 10
title: "Security"
weight: 7
---

{{< chapterstyle >}}

<p>This section is a refresher that provides an overview of the main concepts of security in Kubernetes. At the end of this section, please complete the exercises to put these concepts into practice.</p>

<h2>Authentication & Authorization</h2>
<hr>

{{< image src="/images/learning-path/cka/security/rbac.png" width="100%" align="center" alt="" >}}

<h3>Authentication: several methods</h3>

<p>Kubernetes offers multiple methods to authenticate users against the API Server:</p>

<ul>
<li>Client certificates</li>
<li>Bearer tokens</li>
<li>HTTP basic auth</li>
<li>OpenID Connect</li>
<li>Proxy</li>
</ul>

<p>To authenticate an application running in a Pod, Kubernetes relies on ServiceAccounts resources.</p>

<h3>Authentication: admin kubeconfig</h3>

<p>When we create a cluster, an admin kubeconfig file is generated, similar to the following one.</p>

```yaml
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: LS0tLS1CR…0tLS0tCg==
    server: https://10.55.133.216:6443
  name: kubernetes
contexts:
- context:
    cluster: kubernetes
    user: kubernetes-admin
  name: kubernetes-admin@kubernetes
current-context: kubernetes-admin@kubernetes
kind: Config
preferences: {}
users:
- name: kubernetes-admin
  user:
    client-certificate-data: LS0tLS1CRU...0tLS0tCg==
    client-key-data: LS0tLS1CRU...0tLS0tCg==
```

<p>This file contains a public/private key pair used for authentication against the API Server. We can use OpenSSL commands to get details about the public key (x509 certificate).</p>

{{< image src="/images/learning-path/cka/security/certificate.png" width="100%" align="center" alt="" >}}

<p>The following screenshot shows the Subject used in the certificate:</p>
<ul>
<li><strong>"O = system:master"</strong> indicates this certificate is related to the system:master group</li>
<li><strong>"CN= kubernetes-admin"</strong> indicates it is related to the kubernetes-admin user</li>
</ul>

<p>Using this certificate to communicate with the API Server will authenticate us as the kubernetes-admin belonging to the system:master group. This is a specific case, as the group system:master provides full access to the cluster.</p>

<p>The admin kubeconfig file is not the only kubeconfig file generated during the cluster creation step. As we'll see in the next section, each component that needs to communicate with the API Server has its kubeconfig file (and associated access rights).</p>

<h3>Authentication: control-plane components</h3>

<p>The following picture illustrates how the control plane components communicate with each other.</p>

{{< image src="/images/learning-path/cka/security/control-plane.png" width="100%" align="center" alt="" >}}

<p>The /etc/kubernetes folder contains the following files to ensure this communication is secured.</p>

<ul>
<li>kubeconfig files to authenticate internal components against the API Server</li>
<li>Certificates and private keys to ensure communication is using TLS; they are located in /etc/kubernetes/pki</li>
</ul>

```bash
$ sudo tree /etc/kubernetes
/etc/kubernetes
├── admin.conf
├── controller-manager.conf
├── kubelet.conf
├── manifests
│   ├── etcd.yaml
│   ├── kube-apiserver.yaml
│   ├── kube-controller-manager.yaml
│   └── kube-scheduler.yaml
├── pki
│   ├── apiserver-etcd-client.crt
│   ├── apiserver-etcd-client.key
│   ├── apiserver-kubelet-client.crt
│   ├── apiserver-kubelet-client.key
│   ├── apiserver.crt
│   ├── apiserver.key
│   ├── ca.crt
│   ├── ca.key
│   ├── etcd
│   │   ├── ca.crt
│   │   ├── ca.key
│   │   ├── healthcheck-client.crt
│   │   ├── healthcheck-client.key
│   │   ├── peer.crt
│   │   ├── peer.key
│   │   ├── server.crt
│   │   └── server.key
│   ├── front-proxy-ca.crt
│   ├── front-proxy-ca.key
│   ├── front-proxy-client.crt
│   ├── front-proxy-client.key
│   ├── sa.key
│   └── sa.pub
├── scheduler.conf
└── super-admin.conf
```

<p>For information purposes, the following table gives the subject of the certificates embedded in each kubeconfig file.</p>

<table>
<thead>
<tr>
<th>file</th>
<th>subject</th>
</tr>
</thead>
<tbody>
<tr>
<td>admin.conf</td>
<td>O = system:masters, CN=kubernetes-admin</td>
</tr>
<tr>
<td>super-admin.conf</td>
<td>O = system:masters, CN = kubernetes-super-admin</td>
</tr>
<tr>
<td>controller-manager.conf</td>
<td>CN = system:kube-controller-manager</td>
</tr>
<tr>
<td>kubelet.conf</td>
<td>O = system:nodes, CN = system:node:NODE_NAME</td>
</tr>
<tr>
<td>scheduler.conf</td>
<td>CN = system:kube-scheduler</td>
</tr>
</tbody>
</table>

<h3>Authentication: ServiceAccount</h3>

<p>When a Pod needs to access the API Server, it must use a resource of type ServiceAccount. The following YAML specification defines a ServiceAccount named viewer.</p>

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: viewer
```

<p>We can manually create a token for this ServiceAccount.</p>

```bash
kubectl create token viewer
```

<p>This command returns a token similar to the following one:</p>

```
eyJhbGciOiJSUzI1NiIsImtpZCI6IlRwSU85ZXdWUFp0SlpjaDBjekl6ZTNaNGRuUTZSVDFiV2dyWVhqbGwyRDAifQ.eyJhdWQiOlsiaHR0cHM6Ly9rdWJlcm5ldGVzLmRlZmF1bHQuc3ZjLmNsdXN0ZXIubG9jYWwiXSwiZXhwIjoxNzQ1NDk5OTUyLCJpYXQiOjE3NDU0OTYzNTIsImlzcyI6Imh0dHBzOi8va3ViZXJuZXRlcy5kZWZhdWx0LnN2Yy5jbHVzdGVyLmxvY2FsIiwianRpIjoiMTE1OTgzZjYtOWE3Ny00ZmY1LWE4OGQtMTc2ODg3N2YxYmE3Iiwia3ViZXJuZXRlcy5pbyI6eyJuYW1lc3BhY2UiOiJkZWZhdWx0Iiwic2VydmljZWFjY291bnQiOnsibmFtZSI6InZpZXdlciIsInVpZCI6IjY2NmE3NWNkLWRkZGUtNDAzYi1iZmE0LWM0MjIxNWI1OTA1YiJ9fSwibmJmIjoxNzQ1NDk2MzUyLCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6ZGVmYXVsdDp2aWV3ZXIifQ.CGYbqWDj3KaEGPgU_pV6sL1wRf3IU56AlpljLxUO6tvpbkK7Z6le8FI5zdwp_04LgcWnHLo5-hsZiyJxmeKYXhsb3CASkI0Vvumfsb8kahIiJxVXIE-PfzKNlxampuubc3mG4q9h1s0M_Y-PubMdl4TkBoLMjujxbsTtPqpD2joxyZ2YB7ys7DiGp-BjQwXwwaxOniSwd0l_tyEAlX0UTy0qjmjjuMBJKQTLDzwPJXWCAXbeAMULsnsosS21sWyimmVMz6HQ8S4MttkMSg8eZ1IW-LPPn3Hfs0lBLRYeVRBn6qe4l7qxgCfgj57GfYgEWGy5BO9uaAAGcHVBdTacAQ
```

<p>From <a href="https://jwt.io">jwt.io</a> we can get the content of this JWT token and see that it authenticates the ServiceAccount named viewer within the default Namespace. We could use this token manually to call the API Server, but when a Pod is using a ServiceAccount a dedicated token is automatically created and mounted into its containers' filesystem.</p>

{{< image src="/images/learning-path/cka/security/jwt.png" width="100%" align="center" alt="" >}}

<h2>Authorization: RBAC (Role Based Access Control)</h2>
<hr>

<p>In the previous section, we covered the authentication mechanisms that allow the API Server to verify a user's or an application's identity. Now, we'll look at the resources used to grant permissions.</p>

{{< image src="/images/learning-path/cka/security/rbac-resources.png" width="100%" align="center" alt="" >}}

<h3>Authorization: Role / RoleBinding</h3>

<p>A Role resource defines permissions in a Namespace. A RoleBinding associates this Role with an identity which can be a user, a group, or a ServiceAccount.</p>

<p>The following example defines a Role that grants read-only access to Pods in the development Namespace. The RoleBinding associates this Role with a user named bob: if a user has a certificate whose subject is bob, then he will be granted the permission to list and get information about Pods in the development Namespace.</p>

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: development
  name: dev-pod-reader
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "list"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: dev-pod-reader
  namespace: development
subjects:
- kind: User
  name: bob
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: dev-pod-reader
  apiGroup: rbac.authorization.k8s.io
```

<h3>Authorization: ClusterRole / ClusterRoleBinding</h3>

<p>The ClusterRole and ClusterRoleBinding resources are similar to the Role and RoleBinding ones, except that they are global to the cluster instead of being limited to a Namespace.</p>

<p>The following specifications define a ClusterRole which grants read access to resources of type Secret in the entire cluster and a ClusterRoleBinding that associates this ClusterRole to the ServiceAccount named viewer. If a Pod uses the viewer ServiceAccount, then its containers will have the right to read the cluster's Secrets.</p>

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: secret-reader
rules:
- apiGroups: [""]
  resources: ["secrets"]
  verbs: ["get", "list"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: dev-pod-reader
subjects:
- kind: ServiceAccount
  name: viewer
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: secret-reader
  apiGroup: rbac.authorization.k8s.io
```

<h3>Authorization: usage of a ServiceAccount</h3>

<p>To use a ServiceAccount, we can define the serviceAccountName property in the Pod's specification as follows.</p>

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: monitoring
spec:
  containers:
  - image: lucj/mon:1.2
    name: mon
  serviceAccountName: viewer
```

<h2>SecurityContext</h2>
<hr>

<p>The SecurityContext property defines privileges and access controls at the Pod or container level.</p>

<p>When defined at the <strong>Pod level</strong>, we can use the following properties:</p>

<ul>
<li><strong>fsGroup</strong>: specifies a group ID that all containers in the Pod use for accessing mounted volumes</li>
<li><strong>runAsGroup</strong>: sets the primary group ID for all container processes</li>
<li><strong>runAsNonRoot</strong>: ensures that containers must run as a non-root user</li>
<li><strong>runAsUser</strong>: sets the user ID to run all processes in the Pod</li>
<li><strong>seLinuxOptions</strong>: defines SELinux labels to apply to the Pod</li>
<li><strong>supplementalGroups</strong>: specifies additional group IDs for processes in the Pod</li>
<li><strong>sysctls</strong>: allows setting kernel parameters (sysctls) for the Pod</li>
</ul>

<p>When defined at the <strong>container level</strong>, we can use the following properties:</p>

<ul>
<li><strong>allowPrivilegeEscalation</strong>: indicates whether a process can gain more privileges than its parent</li>
<li><strong>capabilities</strong>: adds or removes Linux capabilities for the container process</li>
<li><strong>privileged</strong>: grants the container full access to the host</li>
<li><strong>procMount</strong>: controls how /proc is mounted in the container</li>
<li><strong>readOnlyRootFilesystem</strong>: if set to true, makes the container's root filesystem read-only</li>
<li><strong>runAsGroup</strong>: sets the primary group ID for the container process</li>
<li><strong>runAsNonRoot</strong>: ensures the container runs as a non-root user</li>
<li><strong>runAsUser</strong>: sets the user ID to run the container process</li>
<li><strong>seLinuxOptions</strong>: applies SELinux labels to the container</li>
</ul>

<h3>Example</h3>

<p>The following Pod specification defines a securityContext property both at the Pod and at the container level.</p>

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: demo
spec:
  securityContext:
    runAsUser: 1000
    runAsGroup: 3000
    fsGroup: 2000
  containers:
  - name: api
    image: registry.gitlab.com/web-hook/api:v1.0.39
    securityContext:
      allowPrivilegeEscalation: false
      readOnlyRootFilesystem: true
      runAsUser: 10000
      runAsNonRoot: true
      seccompProfile:
        type: RuntimeDefault
      capabilities:
        drop:
        - ALL
```

<h2>Network Policy</h2>
<hr>

<p>By default, Pods created in separate Namespaces can communicate with each other. To control Pod-to-Pod communications, Kubernetes has a NetworkPolicy resource. Based on Pod's labels, it can restrict ingress and egress communication for the selected Pods.</p>

<p>The example below defines a NetworkPolicy restricting the database Pod to receive traffic from the backend Pod only.</p>

{{< image src="/images/learning-path/cka/security/netpol.png" width="100%" align="center" alt="" >}}

<p>The example below (from Kubernetes documentation) is more complex. It illustrates the full capabilities of NetworkPolicies.</p>

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: test-network-policy
  namespace: default
spec:
  podSelector:
    matchLabels:
      role: db
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - ipBlock:
        cidr: 172.17.0.0/16
        except:
        - 172.17.1.0/24
    - namespaceSelector:
        matchLabels:
          project: myproject
    - podSelector:
        matchLabels:
          role: frontend
    ports:
    - protocol: TCP
      port: 6379
  egress:
  - to:
    - ipBlock:
        cidr: 10.0.0.0/24
    ports:
    - protocol: TCP
      port: 5978
```

<p>It defines a NetworkPolicy for Pods with the label <code>role: db</code> managing incoming and outgoing traffic for those Pods.</p>

<p>It authorizes <strong>incoming traffic from</strong> (logical OR):</p>
<ul>
<li>Pods with IP addresses in a specific range</li>
<li>Pods within a namespace</li>
<li>Pods with specific labels in the current namespace</li>
</ul>

<p>It also authorizes <strong>outgoing traffic to</strong> (logical OR):</p>
<ul>
<li>Pods with IP addresses in a specific range</li>
<li>Pods within a specific namespace</li>
<li>Pods with specific labels in the current namespace</li>
</ul>

<p>Both incoming and outgoing traffic are limited to specific ports.</p>

---

<h2>Practice</h2>
<hr>

<p>You can now jump to the <a href="./exercises/">Exercises part</a> to learn and practice the concepts above.</p>

{{< /chapterstyle >}}