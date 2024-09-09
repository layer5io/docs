---
title: Integrations
description: >
  Enhance your cloud-native management experience with Meshery Integrations.
weight: 7
categories: [Spaces]
---

# Integrations Overview

Meshery provides a rich set of integrations designed to simplify and enhance your cloud-native management workflows. These integrations allow you to connect Meshery with various tools and platforms, making it easier to manage, visualize, and collaborate on your infrastructure across different environments. Below is a detailed overview of the supported integrations, how they work, and best practices for using them effectively.

---

### GitHub Integration

**Description:**  
With the GitHub integration, you can effortlessly manage your infrastructure using GitOps principles. Connect your GitHub account to Meshery and import your existing Helm Charts, Docker Compose applications, and Kubernetes manifests. This integration allows you to visually configure and customize your cloud-native infrastructure directly from within Meshery. Once configured, you can save and share your design patterns to GitHub, choosing between public or private repositories.

**Key Benefits:**
- **Seamless Import:** Bring in your Helm Charts, Docker Compose files, Kubernetes manifests or Meshery Designs directly into Meshery.
- **GitOps Management:** Automate your infrastructure management by leveraging GitHub as a source of truth.
- **Version Control:** Keep track of all changes made to your infrastructure with GitHub’s version control capabilities.

**Get Started:**  
To begin using the GitHub integration, refer to the [Meshery GitHub Integration Guide](https://docs.meshery.io/extensibility/integrations/github) for step-by-step instructions.

---

### Meshery Server Integration

**Description:**  
Meshery’s integration with its own server allows you to manage multiple Meshery instances running within your organization. By connecting to the Meshery server, you can oversee all Meshery deployments, ensuring consistent management and operation across different teams and projects.

**Key Benefits:**
- **Centralized Management:** Oversee all Meshery instances from a single interface.
- **Consistency:** Ensure uniform management practices across different environments.
- **Scalability:** Easily scale your Meshery deployments as your organization grows.

**Get Started:**  
For more information on how to connect your Meshery server, visit the [Meshery Core Integration Documentation](https://docs.meshery.io/extensibility/integrations/meshery-core).

---

### Kubernetes Integration

**Description:**  
Meshery’s Kubernetes integration provides you with a comprehensive platform to manage and visualize your Kubernetes clusters. By connecting your Kubernetes clusters to Meshery, you enable collaborative management, making it easier for teams to work together on cluster operations. This integration supports quick setup and deep management capabilities, allowing you to oversee the health and performance of your clusters effectively.

**Key Benefits:**
- **Collaborative Management:** Multiple team members can work together on Kubernetes cluster management.
- **Visualization:** Gain a clear, visual overview of your cluster’s status and performance.
- **Ease of Use:** Quickly set up and start managing your clusters with Meshery’s intuitive interface.

**Get Started:**  
Check out the [Kubernetes Integration Guide](https://docs.meshery.io/extensibility/integrations/kubernetes) to get your clusters connected and managed through Meshery.

---

### Prometheus Integration

**Description:**  
Integrating Prometheus with Meshery brings powerful observability and analytics capabilities to your cloud-native environment. This integration allows you to connect Prometheus and manage performance reports directly within Meshery. You can track performance test results, monitor node resource metrics, and much more, all from a single, unified interface.

**Key Benefits:**
- **Observability:** Gain deep insights into your system’s performance metrics.
- **Performance Management:** Monitor and analyze performance test results within Meshery.
- **Unified Dashboard:** Manage Prometheus metrics alongside other cloud-native resources from within Meshery.

**Get Started:**  
To learn how to connect Prometheus with Meshery, visit the [Prometheus Integration Guide](https://docs.meshery.io/extensibility/integrations/prometheus).

---

### Best Practices

To maximize the benefits of Meshery integrations, consider the following best practices:

1. **Use GitOps for Infrastructure as Code (IaC):**  
   Integrate with GitHub to maintain your infrastructure as code. Use Meshery to automate deployments and manage your cloud-native environments by following GitOps principles.

2. **Centralize Management Across Environments:**  
   Leverage the Meshery Server integration to manage all your Meshery instances in a centralized manner. This ensures consistent management practices and better resource allocation across environments.

3. **Collaborative Cluster Management:**  
   When using the Kubernetes integration, involve your entire team in the management of clusters. Use Meshery’s visualization tools to keep everyone informed about the cluster’s health and performance.

4. **Implement Continuous Monitoring:**  
   With Prometheus integrated, continuously monitor your cloud-native infrastructure. Set up alerts and dashboards within Meshery to keep track of key performance indicators (KPIs) and respond to issues proactively.

5. **Secure Access with Credentials:**
Always ensure that managed connections are secured using appropriate credentials. Meshery offers built-in security features to safely manage access tokens and secrets. You can read more about how to set up credentials or utilize roles for secure access by visiting the following link: Meshery Security: Roles and Credentials Setup.

---

### Summary

Meshery’s integrations empower you to manage your cloud-native infrastructure with greater efficiency and collaboration. By following best practices, you can ensure that your integrations are set up securely and effectively, enabling seamless workflows across your team. For detailed guidance on setting up and using these integrations, refer to the respective documentation links provided.
