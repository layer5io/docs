---
title: Dry Running a Design
description: >
  A dry run simulates the deployment of your design in the selected target environment without making any actual changes.
weight: 3
categories: [Designer]
tags: [designs]
aliases:
  - /meshmap/tasks/designs/dry-running-a-design
---

A dry run in Meshery simulates the deployment of your design in the selected target environment without making any actual changes. This step is highly beneficial as it helps identify potential issues before they occur, ensuring a smoother and more reliable deployment process.

## Performing Dry Run

1. Navigate to the **Actions** button at the top of the Design canvas.

2. Click on the **Dry Run** icon.

3. Review the results to identify any potential issues.

4. Make necessary adjustments to your configuration based on the feedback provided by the dry run.

5. Re-run the dry run to ensure all issues have been resolved.

## Dry Run Errors

### Invalid Field Value

This error indicates that a field has an invalid value. For example, when configuring a Kubernetes Service, the fields `spec.ports[0].port` and `spec.ports[0].targetPort` may have invalid values of 0. These values must be between 1 and 65535, inclusive.

![Invalid Field Value Error](/kanvas/getting-started/images/dry-running-designs/invalid-field-value-1.png)

![Invalid Field Value Details](/kanvas/getting-started/images/dry-running-designs/invalid-field-value-2.png)

### Missing Required Field

This error occurs when a required field in the configuration has not been provided. Ensure all required fields are properly configured before running the dry run.

![Missing Required Field Error](/kanvas/getting-started/images/dry-running-designs/missing-field.png)

### Missing Dependencies

This error occurs because a Kubernetes Custom Resource Definition (CRD) should have been deployed first before attempting to deploy a component that relies on it.

To resolve this, ensure that all necessary dependencies, such as CRDs, are deployed before deploying the components that rely on them.

![Missing Dependencies Error](/kanvas/getting-started/images/dry-running-designs/missing-resource.png)
