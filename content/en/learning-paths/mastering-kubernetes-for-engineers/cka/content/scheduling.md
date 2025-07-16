---
docType: "Chapter"
id: "scheduling"
chapterTitle: "Scheduling Pods"
description: "Learn Pod placement strategies using labels, taints, affinities and more."
lectures: 10
title: "Scheduling Pods"
weight: 4
---

{{< chapterstyle >}}

<p>This section is a refresher that provides an overview of the main properties involved in the scheduling phase. At the end of this section, please complete the exercises to apply these concepts.</p>

<h2>Purpose</h2>
<hr>

<p>The scheduling step is where Kubernetes decides on which Node a Pod will run on. The Scheduler, running on the control plane, is the process in charge of this action.</p>

{{< image src="/images/learning-path/cka/scheduling/scheduling.png" width="100%" align="center" alt="" >}}

<p>There are various properties/items which can influence the scheduling decision, including:</p>

<ul>
<li><code>nodeName</code></li>
<li><code>nodeSelector</code></li>
<li><code>nodeAffinity</code></li>
<li><code>podAffinity / podAntiAffinity</code></li>
<li><code>topologySpreadConstraints</code></li>
<li><code>taint / toleration</code></li>
<li><code>available resources</code></li>
<li><code>priorityClass</code></li>
<li><code>runtimeClass</code></li>
</ul>

<h2>nodeName</h2>
<hr>

{{< image src="/images/learning-path/cka/scheduling/nodeName.png" width="100%" align="center" alt="" >}}

<p>The <code>nodeName</code> property bypasses the scheduling process, indicating directly in the Pod's specification the name of the Node this Pod must be deployed to.</p>

<h2>nodeSelector</h2>
<hr>

{{< image src="/images/learning-path/cka/scheduling/nodeSelector.png" width="100%" align="center" alt="" >}}

<p>The <code>nodeSelector</code> property uses Node's labels to schedule a Pod.</p>

<h2>nodeAffinity</h2>
<hr>

<p>The <code>nodeAffinity</code> property also uses Node's label. Still, it is more granular than <code>nodeSelector</code> as it can use the following operators on the labels: <strong>In</strong>, <strong>NotIn</strong>, <strong>Exists</strong>, <strong>DoesNotExist</strong>, <strong>Gt</strong>, and <strong>Lt</strong>.</p>

<p>Two rules are available when using <code>nodeAffinity</code>:</p>

<ul>
<li><code>requiredDuringSchedulingIgnoredDuringExecution</code> defines a <strong>hard constraint</strong>: if the scheduler does not manage to schedule the Pod according to the specification, then the Pod will remain in Pending</li>
<li><code>preferredDuringSchedulingIgnoredDuringExecution</code> defines a <strong>soft constraint</strong>: if the scheduler does not manage to schedule the Pod, according to the specification, then it will do its best to schedule it anyway, even if the requirements are not satisfied</li>
</ul>

<h3>Example:</h3>

```yaml
spec:
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
        - matchExpressions:
          - key: kubernetes.io/e2e-az-name Pod must be scheduled on a node having the label
            operator: In kubernetes.io/e2e-az-name with the value e2e-az1 or e2e-az2
            values:
            - e2e-az1
            - e2e-az2
      preferredDuringSchedulingIgnoredDuringExecution:
      - weight: 1
        preference:
          matchExpressions: Pod preferably scheduled on a node having the label
          - key: disktype disktype with the value ssd
            operator: In
            values:
            - ssd
```

<h2>podAffinity / podAntiAffinity</h2>
<hr>

<p>We use the <code>podAffinity</code> and <code>podAntiAffinity</code> properties to schedule a Pod based on the labels of already existing Pods.</p>

<p>It uses the same rules as the <code>nodeAffinity</code> property:</p>
<ul>
<li><code>requiredDuringSchedulingIgnoredDuringExecution</code> defines a <strong>hard constraint</strong></li>
<li><code>preferredDuringSchedulingIgnoredDuringExecution</code> defines a <strong>soft constraint</strong></li>
</ul>

<p>It also uses a property named <code>topologyKey</code> to specify geographical preferences (among other things):</p>
<ul>
<li><code>hostname</code></li>
<li><code>region</code></li>
<li><code>az</code></li>
<li>...</li>
</ul>

<h3>Example 1</h3>

<p>The following Deployment's Pods cannot all be created on a cluster with less than 4 Nodes as it specifies that two Pods with the <code>app: cache</code> label must not be on the same Node.</p>

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cache
spec:
  replicas: 4
  selector:
    matchLabels:
      app: cache
  template:
    metadata:
      labels:
        app: cache
    spec:
      containers:
      - name: redis
        image: redis:6
      affinity:
        podAntiAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
          - labelSelector:
              matchExpressions:
              - key: app
                operator: In
                values:
                - cache
            topologyKey: "kubernetes.io/hostname"
```

<h3>Example 2</h3>

<p>The following specification illustrates the usage of both <code>podAffinity</code> and <code>podAntiAffinity</code> properties.</p>

```yaml
spec:
  affinity:
    podAffinity:
      requiredDuringSchedulingIgnoredDuringExecution: Pod must be scheduled on a node which is in the availability
      - labelSelector: zone where already exists a Pod with the label security: S1
          matchExpressions:
          - key: security
            operator: In
            values:
            - S1
        topologyKey: failure-domain.beta.kubernetes.io/zone
    podAntiAffinity:
      preferredDuringSchedulingIgnoredDuringExecution: Pod should not be scheduled on a node where already exists
      - podAffinityTerm: a Pod with the label security: S2
          labelSelector:
            matchExpressions:
            - key: security
              operator: In
              values:
              - S2
          topologyKey: kubernetes.io/hostname
```

<h2>TopologySpreadConstraints</h2>
<hr>

<p>The <code>topologySpreadConstraints</code> property defines how to spread Pods across a cluster topology, ensuring application resiliency.</p>

<p>The following Deployment uses the <code>topologySpreadConstraints</code> property to ensure Pods are correctly balanced between AZ and Node.</p>

{{< image src="/images/learning-path/cka/scheduling/topologySpreadConstraint.png" width="100%" align="center" alt="" >}}

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: www
spec:
  replicas: 4
  selector:
    matchLabels:
      app: www
  template:
    metadata:
      labels:
        app: www
    spec:
      containers:
      - name: nginx
        image: nginx:1.24
      topologySpreadConstraints:
      - maxSkew: 1 The difference in the number of matching Pods between
        topologyKey: "kubernetes.io/hostname" any two nodes should be no more than 1 (maxSkew)
        whenUnsatisfiable: ScheduleAnyway
        labelSelector:
          matchLabels:
            app: www
      - maxSkew: 1 Ensures that the Pods are spread across different
        topologyKey: "topology.kubernetes.io/zone" availability zones
        whenUnsatisfiable: ScheduleAnyway
        labelSelector:
          matchLabels:
            app: www
```

<h2>Taints & Tolerations</h2>
<hr>

<p>In contrast to the properties we saw earlier, we use a <strong>Taint</strong> to prevent certain Pods from being scheduled on a node. A Pod must tolerate a Taint, using a <code>toleration</code> property, to be scheduled on a Node having that Taint.</p>

<p>A Taint has 3 properties:</p>
<ul>
<li><code>key</code>: it can be arbitrary string content, same format as labels</li>
<li><code>value</code>: it can be an arbitrary string content, same format as labels</li>
<li><code>effect</code>: among <code>NoSchedule</code>, <code>PreferNoSchedule</code> and <code>NoExecute</code></li>
</ul>

<p>By default, a kubeadm cluster sets a Taint on the control plane Nodes. This Taint prevents a Pod from being deployed on these Nodes unless the Pod explicitly tolerates this Taint.</p>

<p>The following command lists the Taints existing on the controlplane Node.</p>

```bash
$ kubectl get no controlplane -o jsonpath='{.spec.taints}' | jq
[
  {
    "effect": "NoSchedule",
    "key": "node-role.kubernetes.io/control-plane"
  }
]
```

<p>When creating the following Deployment, with 10 replicas of nginx Pods, none of the Pods will land on the controlplane because of this specific Taint.</p>

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: www
spec:
  replicas: 10
  selector:
    matchLabels:
      app: www
  template:
    metadata:
      labels:
        app: www
    spec:
      containers:
      - image: nginx:1.24
        name: nginx
```

<p>We must add a toleration for the Taint, so the scheduler can schedule Pods on the controlplane.</p>

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: www
spec:
  replicas: 10
  selector:
    matchLabels:
      app: www
  template:
    metadata:
      labels:
        app: www
    spec:
      tolerations:
      - key: node-role.kubernetes.io/control-plane
        effect: NoSchedule
      containers:
      - image: nginx:1.24
        name: nginx
```

<h2>PriorityClass</h2>
<hr>

<p>A <code>PriorityClass</code> is a Kubernetes resource that defines the priority of Pods. It influences scheduling decisions and preemption - meaning that higher-priority Pods can evict lower-priority ones if resources are scarce. A PriorityClass can be preempting (default behavior) or non-preempting, depending on the <code>preemtionPolicy</code> property.</p>

<p>The following specifications define a high-priority PriorityClass and a Pod using it.</p>

```yaml
apiVersion: scheduling.k8s.io/v1
kind: PriorityClass
metadata:
  name: high-priority
value: 1000000
globalDefault: false
---
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: nginx
    image: nginx
  priorityClassName: high-priority
```

<h2>RuntimeClass</h2>
<hr>

<p>A <code>RuntimeClass</code> allows to have multiple container runtimes in the cluster, and to select the one which best fits a workload. There are several container runtimes, each one of them addresses specific use cases, including:</p>

<ul>
<li><a href="https://containerd.io/">Containerd</a> is a general-purpose container runtime (CNCF Graduated)</li>
<li><a href="https://github.com/cri-o/cri-o">CRI-O</a> is a light container runtime focusing on Kubernetes (CNCF Graduated)</li>
<li><a href="https://gvisor.dev/">GVisor</a> is used to run an unsecure workload in a sandbox</li>
<li><a href="https://katacontainers.io/">Kata-Container</a> uses Micro VMs for workload isolation</li>
<li><a href="https://firecracker-microvm.github.io/">Firecracker</a> uses Micro VMs, mainly for serverless</li>
<li><a href="https://wasmedge.org/">WasmEdge</a> is dedicated to run Wasm workload</li>
</ul>

<p>In a Pod specification, we can specify the container runtime configuration needed by this workload. The scheduler ensures that Pods are placed on Nodes that support the required container runtime configuration.</p>

<p>Let's say our cluster already has a RuntimeClass named <code>gvisor</code>, then we can use it in the Pod specification as follows.</p>

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: nginx
    image: nginx
  runtimeClass: gvisor
```

---

<h2>Practice</h2>
<hr>

<p>You can now jump to the <a href="./exercises/">Exercises part</a> to learn and practice the concepts above.</p>

{{< /chapterstyle >}}