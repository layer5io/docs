<!-- ---
title: xxx Component Badges
description: >
Learn to interpret component badges, the small visual indicators that provide at-a-glance information about a component's status in both Designer and Operator modes.
weight: 3
categories: [Designer]
tags: [designs]
---

(understand 感觉用的太多了，有别的吗)

Ever wondered what those little icons in the corners of your components are? Think of them as your component's real-time status display. These indicators, called **badges**, give you at-a-glance information about everything from configuration errors to live performance.

What a badge tells you depends on your current mode: **Designer** or **Operator**. This guide will walk you through how to read and use them effectively in both contexts.

### The xx Behind the Layout

Before diving into the details, it helps to understand the consistent layout of the badges. They are always placed in four distinct quadrants around a component, with each corner having a specific purpose. This creates a consistent visual language, so you always know where to look for certain types of information.

{{< figure src="/path/to/your/master-design-plan.png" title="Component Badge Layout Philosophy" alt="Diagram showing the four quadrants and their general purpose." >}}

- **The "Problem Corner" (Bottom-Left):** This is your go-to spot for status checks. It consistently reports on issues, whether they are potential errors during the design phase or real-time failures in operation.
- **Composition and Contents (Bottom-Right):** This quadrant answers the question, "What is this component made of?" It lists the contents or "inventory" of the component.
- **Identity and Origin (Top-Left):** As the natural starting point for reading, this corner is reserved for primary metadata, telling you what a component is and where it came from.
- **Contextual Actions (Top-Right):** This area is used for helpful, but non-critical, secondary actions like linking to external documentation.

### Badges in Designer Mode

When you're in Designer Mode, your main goal is to build a valid and deployable blueprint. The badges here act as your assistants, helping you catch issues early.

{{< figure src="/path/to/designer-mode-diagram.png" title="Badges in Designer Mode" alt="Diagram of component badges in Designer Mode." >}}

#### Validation and Deployment Errors

This is arguably the most helpful badge when designing. It flags any invalid configurations in your components, so you can fix them *before* deploying.

> This badge provides instant feedback on syntax errors, missing fields, or other validation issues found through static analysis or a dry-run attempt.

If you see an error badge, you can often click on it or the component to navigate directly to the configuration field that needs your attention, helping you resolve issues quickly.

{{< figure src="/images/resolve-error.gif" title="Resolving a validation error" alt="Animation showing a user clicking an error badge and fixing the configuration." >}}

#### Design Inventory

The inventory in Designer Mode shows you other components that are logically bundled as part of your main component's blueprint. Think of it as the "included accessories" or "side dishes" that go with your "main dish."

- For example, a `Deployment` design might have a `ConfigMap` and a `Secret` in its inventory, as they are essential for its configuration.

#### External Hyperlink

This provides a convenient shortcut to external resources. You might find a link here to the official Kubernetes documentation for that component, saving you a trip to your browser.

### Badges in Operator Mode

Once your design is deployed, you enter Operator Mode to monitor its live status. Here, the badges switch context to provide real-time operational data.

{{< figure src="/path/to/operator-mode-diagram.png" title="Badges in Operator Mode" alt="Diagram of component badges in Operator Mode." >}}

#### Design Link

Ever looked at a running service and wondered, "Which version of the design is this running?" The Design Link badge answers that. It provides a direct link back to the exact Meshery design that was used to deploy this instance, which is invaluable for troubleshooting and traceability.

#### Health, Performance, and Policy

This is your live monitoring feed. It gives you an immediate visual cue about the health and status of your running instance. You'll see indicators here for:
- **Health:** Whether the instance is passing its liveness and readiness probes (e.g., green for healthy, red for failed).
- **Performance:** High-level metrics like CPU or memory pressure.
- **Policy:** Whether the instance is compliant with any configured security or operational policies.

#### Live Inventory

{{< alert type="info" title="Key Distinction" >}}
The Inventory in Operator Mode shows **real-time running resources** (e.g., the number of active Pods). This is different from the design-time inventory, which only shows what's in the blueprint.
{{< /alert >}}

This is one of the most useful operational badges. For a Kubernetes `Deployment`, for instance, this badge will show you the ready-state of its Pods (e.g., `Pods: 3/3`), so you know instantly if your desired number of replicas are up and running.

### Best Practices

- **Zero-Error Deployments:** Make it a habit to resolve all `Validation and Deployment Errors` in Designer Mode before you deploy. A clean slate here significantly increases the chance of a successful deployment.
- **Trace, Don't Guess:** When troubleshooting a problem in a running service, always use the `Design Link` in Operator Mode first. It ensures you are looking at the correct source configuration and avoids accidentally modifying the wrong design.

badge的总设计理念

图：总设计理念

大致解释一下：

design mode

图：design mode图

每个角的内容粘贴过来

error
点击之后会跳转到需要填写的位置，帮助你找到哪里不对
/images/reslove-error.gif

opearte mode

图： operate mode图

每个角的内容粘贴过来：

best pracitse：
先确保每个compoennt都没有warning或者error之后再depoly



 -->
