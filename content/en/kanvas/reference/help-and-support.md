---
title: Help and Support
description: |
  How Kanvas submits support requests, and the two preconditions - a remote provider and a signed-in identity - that Help and Support requires.
weight: 20
---

Kanvas offers a **Help and Support** form for sending a support request to the Layer5 team. You can open it from the Help menu, and from the **Get Help** action in Kanvas's troubleshooting panel.

## How a support request is delivered

A support request never leaves your browser for a third party. Kanvas submits the form to Meshery Server, which forwards it to your provider's support intake:

```text
Kanvas (browser)  ->  Meshery Server extension proxy  ->  Remote provider support webhook
```

For [Layer5 Cloud](/cloud) that intake is Layer5's support queue. For a self-hosted Layer5 Cloud deployment it is whatever endpoint the operator has configured - see [Customizing Webhooks](/cloud/guides/self-hosted/customizing-webhooks).

## Help and Support requires a remote provider

Because the submission travels through Meshery Server's extension proxy, Help and Support only works when Meshery is connected to a [remote provider](https://docs.meshery.io/extensibility/providers). Under the **local** provider (`None`) Meshery Server has no support intake to forward to, and the extension proxy returns `501 Not Implemented`.

This puts Help and Support in line with every other Cloud-bound Kanvas capability - [sharing designs and views](/kanvas/designer/sharing), the [catalog](/cloud/concepts/catalog), and resource access - all of which likewise require a remote provider.

**If Help and Support fails under the local provider:** switch Meshery to a remote provider (Meshery UI, **Providers** in the profile menu, then sign in) and submit the request again. If you cannot switch providers, reach the Layer5 team through the [community forum](https://discuss.layer5.io) or [Slack](https://slack.layer5.io) instead.

## Help and Support requires a signed-in identity

Every support request carries the requester's name and email so the team can reply. Kanvas resolves your signed-in profile when you open Help and Support, rather than asking you to retype it:

- While the profile is being fetched, the dialog shows a loading state and the form is not yet available for input.
- Once the profile resolves, the form appears, pre-addressed with your identity.
- If the profile cannot be resolved - an expired or degraded session, for example - the form is not shown and nothing is submitted, because a support request with no way to reply is of no use.

**If the form does not appear:** sign in to your provider again, then reopen Help and Support. If it still does not appear, see [Troubleshooting Kanvas](/kanvas/reference/troubleshooting).

## Type of Inquiry

Each request carries a **Type of Inquiry** - one of **Support**, **Community**, **Account**, or **Commercial** - which the support intake uses to route your request. **Support** is selected by default. These are the same categories used by the Layer5 Cloud Help and Support form, so a request raised from Kanvas is triaged exactly like one raised from Layer5 Cloud.

If a submission fails, your subject, description, and type of inquiry are preserved so you can retry without retyping them.
