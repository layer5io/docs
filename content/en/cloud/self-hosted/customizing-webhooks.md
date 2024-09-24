---
title: Customizing Webhooks
description: "Layer5 Cloud uses webhooks to automate approval flows and email notifications. This guide will help you customize and add your own custom webhooks."
categories: [Self-Hosted]
weight: 1
---

### Overview

Layer5 offers on-premises installation of its [Meshery Remote Provider](https://docs.meshery.io/extensibility/providers), Layer5 Cloud. In this guide, we will walk through configurable webhooks that Layer5 Cloud uses internally to automate tasks and how you can customize these webhooks to integrate with your existing tools.

## Customize and add your own custom webhook

Layer5 Cloud's webhook configurations are managed through environment variables defined in **.env** files. Here's how you can customize them:

### Step 1: Locate the **.env** File

Found **.env** files in the `config` directory of your Layer5 Cloud installation. These file contains environment variables that control various aspects of the application, including webhook URLs.

### Step 2: Define Custom Webhooks in the **.env** file

Add your custom webhook URLs to the **.env** file by modifying the existing variables. Here is an example of how the **.env** file should look:

```ini
# Other configuration variables

# Webhooks
# Below is the list of webhooks that Layer5 Cloud uses internally.
# You can replace the values of these variables with your own webhook URLs.

# Triggers when a user fills the help and support form.  
WEBHOOK_HELP_AND_SUPPORT="https://your-custom-webhook-url.com/help-support"

# Webhook to send an email notification to the user when they receive a Kanvas entitlement
WEBHOOK_MESHMAP_ENTITLEMENT="https://your-custom-webhook-url.com/kanvas-entitlement"

# Webhook to send an update email upon signup request approval or denial.
WEBHOOK_SIGNUP_REQUEST="https://your-custom-webhook-url.com/signup-request"

```

It is advisable not to change variable names to avoid potential conflicts. If you are customizing the remote provider to support additional webhooks, you can add new variables following the naming convention starting with WEBHOOK.

### Step 4: Applying the Configuration

After updating the **.env** file, apply the changes to your Layer5 Cloud installation. This typically involves restarting the services.

### Step 5: Testing the Webhooks

Once the configuration is applied, test the webhooks to ensure they are functioning correctly. You can trigger each webhook by performing the associated actions (e.g., filling out the help and support form, triggering a Kanvas entitlement, or processing a signup request).
