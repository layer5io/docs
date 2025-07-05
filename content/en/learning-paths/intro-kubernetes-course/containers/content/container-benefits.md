---
docType: "Chapter"
id: "Container Benefits"
chapterTitle: "Container Benefits"
description: ""
lectures: 4
title: "Container Benefits"
weight: 3
---
{{< chapterstyle >}}

<h2 class="chapter-sub-heading">Container Benefits</h2>

1. **dev and ops separation of concerns** create application container images at build/release time rather than deployment time, thereby decoupling applications from infrastructure

{{< image src="/images/learning-path/intro-kubernetes/containers/c1_l3_1.png" width="100%" align="center" alt="DevOps" >}}

2. **continuous development, integration, and deployment** provides for reliable and frequent container image build and deployment with quick and efficient rollbacks – due to image immutability

{{< image src="/images/learning-path/intro-kubernetes/containers/c1_l3_2.png" width="100%" align="center" alt="Mutable vs Immutable" >}}

3. **environmental consistency across dev, test, and prod** runs the same on a laptop as it does on an on-premises server, virtualized server, and in the cloud

4. **OS distribution and cloud portability** runs on Ubuntu, RHEL, CoreOS, on major public clouds, on-premises, and anywhere else

5. **resource utilization and isolation benefits** higher efficiency and density due to better utilization and predictable application performance due to isolation

6. **loosely coupled, distributed, elastic microservices** applications are broken into smaller, independent pieces and can be deployed and managed dynamically – not a monolithic stack running on one big single-purpose machine

7. **agile application creation and deployment** increased ease and efficiency of container image creation compared to VM image use

8. <strong>application-centric management</strong> raises abstraction level:
   <ul>
     <li>from running applications on an OS using virtual hardware</li>
     <li>to running applications on an OS using logical resources</li>
   </ul>

{{< /chapterstyle >}}