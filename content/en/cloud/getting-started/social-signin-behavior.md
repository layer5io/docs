---
title: Behavior of Linking Social Sign-ins
description: Explains how Layer5 Cloud handles linking multiple social sign-in accounts.
---

# Behavior of Linking Social Sign-ins

Layer5 Cloud allows users to authenticate using third-party providers such as Google and GitHub. This document outlines the expected behavior when linking multiple accounts.

##  Linking Two Accounts with Existing Designs

If both accounts have existing Meshery Designs:

- **Designs from both accounts are retained.**
- The currently signed-in account becomes the **primary account**.
- Designs from the linked (secondary) account are **migrated** and merged into the primary account's dashboard.
- If designs have identical names, unique suffixes (e.g., timestamps) are appended to avoid name collisions.
- **No design data is lost** in the process.

##  Linking Multiple Social Accounts of the Same Type

- Layer5 Cloud currently **does not support linking multiple accounts of the same provider type**.
- For instance, you **cannot link two different Google accounts** to the same Layer5 Cloud account.
- Attempting to link a second account of the same provider will prompt a **confirmation to replace** the existing linked account.

---

For managing your linked accounts, navigate to [Account Settings](https://cloud.layer5.io/account/settings).
