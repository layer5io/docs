---
title: Extending the Academy
weight: 2
description: >
   A high-level guide to understanding the architecture, features, and workflow for creating custom content on the Layer5 Academy platform.
categories: [Academy]
tags: [Designer]
---

The [Layer5 Cloud Academy](https://cloud.layer5.io/academy/content) is a modular learning management system (LMS) designed for building learning paths and interactive, hands-on challenges. It is deeply integrated into the Layer5 cloud ecosystem and **[Kanvas](https://kanvas.new/)** — a visual designer for cloud native infrastructure. This integration allows you to embed live visualizations, interactive designs, and contextual experiences directly into your courses.

This approach transforms learning from passive reading into active, hands-on practice.

![Example of Academy](./images/overview.png)

### Who Can Create Content

The ability to create, manage, and publish content is available to organizations on our **Enterprise Plan**. This plan includes full support for:

  - **Multi-tenancy:** Your content, users, and data are securely isolated from all other organizations.
  - **White-labeling:** You can brand the Academy with your own logo and color scheme.
  - **Customization:** You have complete control over the learning paths and challenges you create.

> You can learn more about our subscription plans on the [Layer5 Pricing](https://layer5.io/pricing) page.

### Content Creation Process

We believe you should always own your content. That’s why the Academy is designed around a Git-native workflow that avoids vendor lock-in.

Instead of using a restrictive web UI, you manage all your learning content within **your own Git repositories**. This gives you the full power of version control, collaboration through pull requests, and a workflow that your developers are already comfortable with. 

The entire experience is powered by **[Hugo](https://gohugo.io/)**, a powerful static site engine, but we've abstracted away the complexity. You and your team only need to write in simple Markdown.

{{< alert type="info" title="No Web Development Skills Needed" >}}
You don't need to be a web developer to create beautiful and effective learning content. The provided theme handles all the layouts, styling, and complex components, letting you focus solely on the quality of your material.
{{< /alert >}}

### Organizing Your Learning Paths

Your content is structured hierarchically to create a clear and logical learning experience for your users.

At the highest level, you have a **Learning Path**, which serves as a container for a specific specialization or topic. Each Learning Path is made up of one or more **Courses**, and each Course is further broken down into individual **Chapters**. This modular structure makes your content easy to navigate, manage, and update.

For example, a Learning Path titled "Mastering Kubernetes" might contain:
- A Course named "Core Concepts", which includes Chapters on "Pods", "Services", and "Deployments".
- Another Course named "Advanced Networking", with Chapters on "Ingress" and "Service Mesh".

{{< alert type="warning" title="Content Isolation" >}}
To ensure security and isolation, all of your content files must be placed within a directory named for your organization UUID. You'll learn the specifics of how to do this in our [hands-on tutorial](/cloud/academy/creating-your-learning-path/).
{{< /alert >}}
