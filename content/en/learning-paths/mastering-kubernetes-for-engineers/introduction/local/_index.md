---
docType: "Course"
title: "Creation of a local cluster"
description: "Create Local kubernetes cluster"
lectures: 0
courseTitle: "Creation of a local cluster"
themeColor: "#00B39F"
weight: 1
cardImage: ""

---

{{< chapterstyle >}}

Using a local cluster is very handy to get started with Kubernetes, or to test things quickly. In this example, we'll use [K3s](https://k3s.io), a lightweight Kubernetes distribution (5 's' fewer than k8s :) ). K3s is a certified distribution, well-suited for IoT, Edge computing, and which works well with huge servers.

In this section, we'll use [Multipass](https://multipass.run) to create an Ubuntu virtual machine and install k3s on this one. Multipass is a convenient tool to launch Ubuntu VM on Mac/Linux/Windows; it can be installed on your environment following [the documentation](https://canonical.com/multipass/install).

#### info
We use Multipass as it is handy and lightweight, but feel free to use the tool you're the most comfortable with. If you use another tool, please just make sure to adapt the commands below.


We'll only create a single node Kubernetes cluster in this section.

## Pre-requisite

On your local machine, [install kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl). It's the essential tool for communicating with a Kubernetes cluster from the command line.

## Creating an Ubuntu VM

Once you've installed Multipass, create an Ubuntu 24.04 virtual machine named *k3s* with 2G of memory allocated. This process should take a few tens of seconds.

```bash
multipass launch --name k3s --memory 2G
```

Then get the IP address of the newly created VM.

```bash
IP=$(multipass info k3s | grep IP | awk '{print $2}')
```

## Installing k3s

Run the following command to install k3s the VM. This process should also take a few tens of seconds.

```bash
multipass exec k3s -- bash -c "curl -sfL https://get.k3s.io | sh -"
```

#### info
The command `curl -sfL https://get.k3s.io | sh -`, used to install k3s comes from the official [k3s](https://k3s.io) documentation


## Getting the kubeconfig file

Retrieve the configuration file generated during Kubernetes installation on your local machine:

```bash
multipass exec k3s sudo cat /etc/rancher/k3s/k3s.yaml > k3s.cfg.tmp
```

In this file, replace the local IP address (127.0.0.1) with the IP address of the VM you created. This IP address should be in the $IP environment variable.

```bash
cat k3s.cfg.tmp | sed "s/127.0.0.1/$IP/" > k3s.cfg
```

Then set the *KUBECONFIG* environment variable to point to the previously retrieved configuration file:

```bash
export KUBECONFIG=$PWD/k3s.cfg
```

### Info
This environment variable configures the *kubectl* binary so it can communicate with the cluster.


You can now communicate with the cluster's API Server.

List of the cluster's node (only one in this example):

```bash
kubectl get nodes
```

List of the Pods running in the cluster:

```bash
kubectl get pods -A
```

You'll use this local cluster to do the exercises of the [next section](../resources/).

{{< /chapterstyle >}}