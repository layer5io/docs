---
docType: "Chapter"
id: "History of Application Deployments"
chapterTitle: "History of Application Deployments"
description: ""
lectures: 4
title: "History of Application Deployments"
weight: 4
---
{{< chapterstyle >}}

<h2 class="chapter-sub-heading">History of Application Deployments</h2>

{{< image src="/images/learning-path/intro-kubernetes/containers/c1_l4_1.png" width="100%" align="center" alt="Application Deployments" >}}

<h2 class="chapter-sub-heading">Traditional Deployment</h2>

Early on, organizations ran applications on physical servers. There was no way to define resource boundaries for applications in a physical server, and this caused resource allocation issues. For example, if multiple applications run on a physical server, there can be instances where one application would take up most of the resources, and as a result, the other applications would underperform. A solution for this would be to run each application on a different physical server. But this did not scale as resources were underutilized, and it was expensive for organizations to maintain many physical servers.

<h2 class="chapter-sub-heading">Virtualized Deployment</h2>

As a solution, virtualization was introduced. It allows you to run multiple Virtual Machines (VMs) on a single physical server's CPU. Virtualization allows applications to be isolated between VMs and provides a level of security as the information of one application cannot be freely accessed by another application. Virtualization allows better utilization of resources in a physical server and allows better scalability because an application can be added or updated easily, reduces hardware costs, and much more. With virtualization, you can present a set of physical resources as a cluster of disposable virtual machines. Each VM is a full machine running all the components, including its own operating system, on top of the virtualized hardware.

<h2 class="chapter-sub-heading">Container Deployment</h2>

Containers are similar to VMs, but they have relaxed isolation properties to share the Operating System (OS) among the applications. Therefore, containers are considered lightweight. Similar to a VM, a container has its own file system, share of CPU, memory, process space, and more. As they are decoupled from the underlying infrastructure, they are portable across clouds and OS distributions.

<h3 class="chapter-sub-heading">App Deployment</h3>
<p>Video: Application Deployment Overview</p>
<div style="border: 2px solid #ccc; border-radius: 8px; padding: 10px; background-color: #1e1e1e; box-shadow: 0 4px 12px rgba(0,0,0,0.3); margin-top: 1em; margin-bottom: 1em; width: 75%; height:50%; display: block; margin: auto;">
    <video width="100%" height="100%" autoplay controls>
        <source src="https://sos-de-fra-1.exo.io/exoscale-academy/videos/sks_starter_vid0.mp4?1752340619870" type="video/mp4">
        Your browser does not support the video tag.
    </video>
</div>

{{< /chapterstyle >}}