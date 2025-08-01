---
docType: "Chapter"
id: "deploying-meshery-designs"
chapterTitle: "Deploying Meshery Designs"
description: "This chapter covers the steps for deploying Meshery Designs, including validation, dry-run, environment selection, and deployment. It explains how to carry out these actions, addresses possible errors, and provides remediation strategies. Additionally, it covers how to use the Notification Center for troubleshooting errors and viewing the deployment status."
lectures: 4
weight: 2
title: "Deploying Meshery Designs"
---

{{< chapterstyle >}}

<h2 class="chapter-sub-heading">Introduction</h2>

Deploying Meshery designs is a common and essential task for managing your infrastructure and workloads. Having a thorough understanding of this procedure and Meshery’s design deployment behavior is key to ensuring that your component configurations work as intended in a live Kubernetes environment. Meshery’s design deployment process not only attests to the validity of your configuration, but also offers a seamless transition from Designer mode to Visualizer mode, where you can visually inspect your deployment, and begin to manage live-running deployments in your environment.

Meshery’s deployment process encompasses four steps: validation, dry-run, environment selection, and finally, executing the deployment itself.

This chapter guides you through each of these four steps. Along the way, you will learn what a successful step looks like, understand common failure scenarios, and go through strategies for troubleshooting and resolving any issues that might arise. Additionally, you will learn about Meshery’s [Notification Center](https://docs.meshery.io/guides/infrastructure-management/notification-management) and how to best use it to your advantage.

**Prerequisites**

1. Ensure you have one or more Meshery designs available.

1. Access to Meshery ([Self-Hosted](https://docs.meshery.io/installation) or [Meshery Playground](https://docs.meshery.io/installation/playground)).

<h2 class="chapter-sub-heading">Action Button</h2>

There are two modes on the Actions button:

1. Clicking on the word **Actions** presents a set of choices, each labeled with its respective action. Selecting an option opens a modal window, providing detailed guidance.

1. Clicking on the Action drop-down icon reveals a list of icons. Selecting an icon allows seasoned users to perform actions with a single click, bypassing the modal interaction.

In this chapter, we focus on utilizing the first option to provide a comprehensive view of the deployment process.

{{< image src="/images/learning-path/meshery-deploy/action.png" width="100%" align="center" >}}

<h2 class="chapter-sub-heading">Design Validation</h2>

Validation is the first step in deploying designs with Meshery. While optional, it is highly recommended as it helps identify and resolve possible misconfigurations upfront.

<h3 class="chapter-sub-heading">How Validation Works</h3>

Meshery uses static analysis to verify your design. It checks all components within your design and all configured and unconfigured properties of your components against well-defined schemas based on [Meshery Models](https://docs.meshery.io/concepts/logical/models).

This comprehensive validation ensures that:

1. The design adheres to the expected structure and format.
1. All components are valid and recognized by Meshery.
1. There are no missing required configurations.

<h3 class="chapter-sub-heading">Performing Validation</h3>

1. To validate your design, navigate to the Actions button at the top of the Design canvas.

1. Click on the **Validate** Icon.

   {{< image src="/images/learning-path/meshery-deploy/performing-validation.png" width="100%" align="center" >}}

   If the validation is successful, you will see a modal displaying the number of components validated and the number of annotations, similar to the one shown below:

   {" "}

   {{< image src="/images/learning-path/meshery-deploy/successful-validation.png" width="100%" align="center" >}}

<h3 class="chapter-sub-heading">Handling Validation Errors</h3>

If your design fails validation checks, the modal will indicate the number of errors detected. Each error will provide specific information about the component or annotation that caused the failure. Use this detailed feedback to identify and correct the issues in your design before proceeding with the deployment.

<h3 class="chapter-sub-heading">Validation Errors</h3>

A common validation error is:

1. **Missing Required Field**: This happens when a required field is not provided. For example, in the image below, the first error indicates that the field ".spec.template.spec.containers.0.env.0" must have a value.

   {{< image src="/images/learning-path/meshery-deploy/validation-error.png" width="100%" align="center" >}}

To troubleshoot and remediate validation issues:

1. Click on the error on the modal.
1. This will open the configuration tab of the component that has that error.
1. Fix the configuration using the error details provided.
1. Re-run validation after any significant changes to your design to ensure all issues are resolved.

The validation process is confined to schema-based checks within Meshery and does not require communication with your target environment. The Dry Run step, however, does involve this communication. Let’s explore the Dry Run step next.

<h2 class="chapter-sub-heading">Design Dry Run</h2>

A dry run in Meshery simulates the deployment of your design in the selected target environment _without_ making any actual changes. This step is highly beneficial as it helps identify potential issues before they occur, ensuring a smoother and more reliable deployment process.

<h3 class="chapter-sub-heading">Performing Dry Run</h3>

1. Navigate to the **Actions** button at the top of the Design canvas.
1. Click on the **Dry Run** icon.
1. Review the results to identify any potential issues.
1. Make necessary adjustments to your configuration based on the feedback provided by the dry run.
1. Re-run the dry run to ensure all issues have been resolved.

   {{< image src="/images/learning-path/meshery-deploy/successful-dry-run.png" width="100%" align="center" >}}

<h3 class="chapter-sub-heading">Examples of Dry Run Errors</h3>

Some examples of dry run errors are:

1. **Invalid Field Value**: The error message indicates that a field has an invalid value. For instance, in the image below, the fields "spec > ports[0] > port" and "spec > ports[0] > targetPort" have invalid values of 0. These values must be between 1 and 65535, inclusive.

   {{< image src="/images/learning-path/meshery-deploy/dr-invalid-field1.png" width="100%" align="center" >}}
   {{< image src="/images/learning-path/meshery-deploy/dr-invalid-field2.png" width="100%" align="center" >}}

1. **Missing Required Field**

   {{< image src="/images/learning-path/meshery-deploy/missing-field.png" width="100%" align="center" >}}

1. **Missing Dependencies**: In this case, the error occurs because a Kubernetes [Custom Resource Definition](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/) (CRD) should have been deployed first before attempting to deploy this component.

   To resolve this, ensure that all necessary dependencies, such as CRDs, are deployed before deploying the components that rely on them.

   {{< image src="/images/learning-path/meshery-deploy/missing-resource.png" width="100%" align="center" >}}

<h2 class="chapter-sub-heading">Environment Selection</h2>

[Meshery Environments](https://docs.layer5.io/cloud/spaces/environments) are logical groups of [Connections](https://docs.meshery.io/concepts/logical/connections) which include GitHub integrations, Prometheus connections, and Kubernetes Clusters and so on managed by Meshery. To make your Kubernetes connections available for selection, you need to assign them to an environment and link that environment to your current [workspace](https://docs.layer5.io/cloud/spaces/workspaces). _Note: Environments can be assigned to one or more Workspaces._

<h3 class="chapter-sub-heading">Adding an Environment During Deployment</h3>

During deployment, you will be required to select an environment.

You can add an environment through the deployment modal by following these steps:

1. Click on **Add Environments**

   {{< image src="/images/learning-path/meshery-deploy/add-env.png" width="100%" align="center" >}}

1. Select **Create** and put in a name for the environment, _e.g.Development_, and **Save**.

   {{< image src="/images/learning-path/meshery-deploy/create-env.png" width="100%" align="center" >}}

1. After creating the environment you add connections to the environment, here we want to add a Kubernetes cluster. Click on the **arrows** icon to open the Development Resources modal.

   {{< image src="/images/learning-path/meshery-deploy/assign-conn.png" width="100%" align="center" >}}

   **Available Connections** on the left side shows a list of Kubernetes clusters that are currently managed by Meshery.

   {{< image src="/images/learning-path/meshery-deploy/kube-conn.png" width="100%" align="center" >}}

{{< alert type="note" title="Add Kubernetes Connections" >}}
If you do not have any **Kubernetes connections** available, refer to this documentation on how to manage your clusters with Meshery: [Managing Kubernetes Clusters with Meshery](https://docs.meshery.io/installation/kubernetes).
{{< /alert >}}

1. Select a cluster, and use the arrow to assign just the selected connections and save.

<h3 class="chapter-sub-heading">Missing Connections</h3>

During the deployment, if a connection has not yet been added to your environment, it will appear as shown below.

{{< image src="/images/learning-path/meshery-deploy/missing-con.png" width="100%" align="center" >}}

In this scenario, to add a new environment.

1. Navigate to the left sidebar of Meshery
1. Click on the **Lifecycle** dropdown and you will see the **Environment** Icon under it
1. Click on it and you can follow the same steps we mentioned above to add a connection to your environment.

<h3 class="chapter-sub-heading">Selecting an Environment for an Existing Connection</h3>

Another way to add a connection to an Environment is by selecting an environment for an existing connection. To do this:

1. Click on the **Lifecycle** icon to view a list of connections with their attributes, including environments, kind (type of connection), and connection status.

1. Identify the desired connection. Under the **Environment** section, click the dropdown menu to add and select the environment you want to associate with your connection.

   {{< image src="/images/learning-path/meshery-deploy/env-conn.png" width="100%" align="center" >}}

<h3 class="chapter-sub-heading">Verifying Kubernetes Connections</h3>

The Kubernetes connection icon at the top right corner of the screen shows the list of connected Kubernetes clusters.
Clicking on the icon will invoke an ad hoc connectivity test between your Meshery Server and the specific Kubernetes cluster. Should this check fail, verify the health of your Meshery Operator deployment within that cluster.

{{< image src="/images/learning-path/meshery-deploy/conn-list.png" width="100%" align="center" >}}

<h3 class="chapter-sub-heading">Environment Error</h3>

If your environment is not properly set up before deployment, you may encounter the error below.

{{< image src="/images/learning-path/meshery-deploy/env-error.png" width="100%" align="center" >}}

To handle this error follow the suitable steps for adding a connection to your environment as previously discussed.

<h2 class="chapter-sub-heading">Deployment</h2>

At this stage, you deploy your resources to your available Kubernetes cluster connection(s) managed by Meshery. 
First, ensure the connections to your clusters are established and configured correctly, placing them in the appropriate environments. This ensures you have control over your deployment strategy.

<h3 class="chapter-sub-heading">Kubernetes Cluster Management using Meshery</h3>

Meshery Server [deploys](https://docs.meshery.io/installation) as a single container. Whether the Meshery Server container is deployed in a stand-alone Docker host or inside a Kubernetes cluster, Meshery Server is fully capable of **managing multiple Kubernetes clusters**. For more information on how Meshery Server connects to and continually synchronizes with your Kubernetes cluster(s), see [Meshery Operator](https://docs.meshery.io/concepts/architecture/operator) and [MeshSync](https://docs.meshery.io/concepts/architecture/meshsync).

{{< alert type="note" title="Understanding Meshery Operator and Kubernetes Cluster Relationships" >}}
**One-to-One Relationship**: There is a one-to-one relationship between a Meshery Operator and a Kubernetes cluster. This means each Meshery Operator is associated with exactly one Kubernetes cluster. This applies whether the cluster is a managed cluster (like the one you’re adding as a connection) or the cluster where the Meshery Server is deployed.

  **Many-to-One Relationship**: There is a many-to-one relationship between Meshery Operator and Meshery Server. Multiple Meshery Operators can be associated with a single Meshery Server. This means a single Meshery Server can manage several Kubernetes clusters through different Meshery Operators.

  In summary, while each Kubernetes cluster has its own Meshery Operator, a single Meshery Server can interact with multiple Kubernetes clusters through these Operators.
{{< /alert >}}

<h3 class="chapter-sub-heading">Available Clusters</h3>

{{< alert type="note" title="Playground Users" >}}
Users of Meshery Playground should see a pre-registered Kubernetes connection, representing the sandbox cluster available with the playground environment.
{{< /alert >}}

You have the option of using the live cluster provided by Meshery Playground or connecting your own Kubernetes cluster using your kubeconfig file. During deployment, these clusters will be available as connections for you to select.

<h3 class="chapter-sub-heading">Deploying Designs</h3>

1. To deploy a design, navigate to the Actions button at the top of the Design canvas.
1. Click on the **Deploy** icon.
1. This opens a modal that will take you through all the steps before the final deployment.
1. Click on **Open In Visualizer** to see the pre-filtered view of the deployed resources in the cluster.
1. Click **Finish**.

   {{< image src="/images/learning-path/meshery-deploy/success-deploy.png" width="100%" align="center" >}}

<h3 class="chapter-sub-heading">Deployment Errors</h3>

1. **Missing Namespace**: This error occurs when you attempt to create a Kubernetes resource without specifying a namespace. Kubernetes requires that all resources have an associated namespace.

   {{< image src="/images/learning-path/meshery-deploy/missing-ns.png" width="100%" align="center" >}}

1. **Empty Label Selector**: This error indicates an empty label selector.

   {{< image src="/images/learning-path/meshery-deploy/empty-ls.png" width="100%" align="center" >}}

<h3 class="chapter-sub-heading">Troubleshooting Errors</h3>

When reviewing validation, dry run, or deployment issues, you’ll notice specific error codes denoted from time to time.

As a system, Meshery itemizes different errors that occur and assigns a unique error code to each along with details on how to remediate the issue at hand.

For the comprehensive list of error codes refer to [Error Code Reference](https://docs.meshery.io/reference/error-codes) in the Meshery documentation.

If you encounter persistent issues, consider consulting the [Meshery Community forum](https://discuss.layer5.io/c/meshery/5).

{{< image src="/images/learning-path/meshery-deploy/error-code.png" width="100%" align="center" >}}

<h3 class="chapter-sub-heading">Using the Notification Center for Troubleshooting</h3>

The Notification Center in Meshery helps manage events during the deployment process. It provides real-time updates and alerts on the status of the deployment. This feature can be particularly useful for troubleshooting, as it:

1. Displays immediate feedback on the success or failure of each deployment step.

1. Highlights specific error messages and codes, helping you quickly identify and understand issues.

1. Offers links to detailed documentation and guides for resolving common problems.

1. Keeps a log of past notifications, allowing you to track and review previous errors and their resolutions.

{{< image src="/images/learning-path/meshery-deploy/notification.png" width="100%" align="center" >}}

{{< image src="/images/learning-path/meshery-deploy/notification-center.png" width="100%" align="center" >}}

By actively monitoring the Notification Center, you can promptly address issues as they arise, ensuring a smoother deployment process. Learn more about [Managing Events with the Notification Center](https://docs.meshery.io/guides/events-management).

<h2 class="chapter-sub-heading">Undeploy</h2>

To undeploy the resources

1. Navigate to the Actions button at the top of the Meshery Design canvas.
1. Click on the **Undeploy** icon.

   {{< image src="/images/learning-path/meshery-deploy/undeploy.png" width="100%" align="center" >}}


<h2 class="chapter-sub-heading">Conclusion</h2>

In this chapter, you learned how to effectively deploy Meshery designs, ensuring your resources are deployed in the correct environment. You started by validating your designs to ensure configurations adhere to Kubernetes API specifications and best practices. Next, you did a dry run to simulate deployments without making actual changes. You also explored how to select and configure environments to manage Kubernetes connections seamlessly, and finally, how to deploy resources to your preferred cluster.

Throughout these steps, you encountered common errors and learned how to address them. During these steps, you learned how to use Meshery's Notification Center to troubleshoot issues, helping you through the deployment process.

{{< /chapterstyle >}}