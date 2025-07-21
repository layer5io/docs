---
docType: "Chapter"
id: "design-interpretation"
chapterTitle: "Interpreting the Edge Stack Meshery Design"
description: "This chapter explores the relationships between different components in the Ambassador Edge Stack (AES) system using a Kanvas design. It covers the roles and communication ports of each component, as well as the service account roles and relationships within the AES system."
lectures: 4
title: "Interpreting the Edge Stack Meshery Design"
weight: 3
---

{{< chapterstyle >}}

<h2 class="chapter-sub-heading">
  Exploring the Relationships Between Edge Stack Resources with a Kanvas Design
</h2>

<h3 class="chapter-sub-heading">Services and Deployments</h3>

The design below shows the traffic flow between some major components in the the Ambassador Edge Stack (AES) system.

{{< image src="/images/learning-path/edge-stack/es8.png" width="100%" align="center" alt="" >}}

The components include ;

2. edge-stack-agent Deployment
3. edge-stack Deployment
4. edge-stack-admin Service and
5. edge-stack Service

Let's take a look at the roles of each component and the ports used for communication.

1. **edge-stack Service**:This serves as the primary entry point for incoming traffic. It listens on ports 80 and 443, handling HTTP and HTTPS traffic respectively. This component routes the incoming requests to the appropriate internal services within the AES system.

2. **edge-stack-agent**: This is responsible for specific tasks within the AES system. It receives traffic from the edge-stack service on port 80/TCP. The agent handles various operational tasks, including diagnostics and reporting to the Ambassador Cloud.

3. **edge-stack-admin Service**: This Service provides administrative functions and health checks for the AES system. It communicates with the edge-stack component on port 8877/TCP for administrative purposes.

4. **edge-stack Deployment**:The edge-stack Deployment component is a core part of the Ambassador Edge Stack, handling the main processing and routing of traffic. It receives traffic from the edge-stack service on port 80/TCP and communicates with the edge-stack-admin component on port 8877/TCP for administrative tasks.

<h3 class="chapter-sub-heading">Service Account Roles</h3>

{{< image src="/images/learning-path/edge-stack/es9.png" width="100%" align="center" alt="" >}}
The diagram above shows one of the role assignments and service account relationships within
the Ambassador Edge Stack (AES) system. You can see that the Service Account (edge-stack) is
linked to both the ClusterRole (edge-stack) and the Role (edge-stack-apiext) through ClusterRoleBinding
and RoleBinding.

With the help of Kanvas, these connections become clear and easy to understand.

{{< meshery-design-embed src="/images/learning-path/embed-test/embedded-design-deployment-service.js" id="embedded-design-7b01cebf-b0f9-4c11-87e7-612d8fad10c8" >}}
{{< /chapterstyle >}}
