---
title: Working with Designs
weight: 4
type: docs
description: >
  Kanvas Designs are descriptive, declarative characterizations of how your Kubernetes infrastructure should be configured.
categories: [designer]
tags: [designs]
aliases:
  - /meshmap/concepts
  - /kanvas/concepts/architecture/
---

## Designs

Designs are declarative, descriptive characterizations of how your Kubernetes infrastructure should be configured. Designs are versioned and can be shared with other users and teams. Designs are the primary tool for collaborative authorship of your infrastructure and services.

### Using Designs


### Controlling Access to Designs
A newly saved design is public, whatever visibility the client requests. Make it private before you put sensitive architecture in it. Subscribers do not get a different default at creation time.

{{< alert title="Google Docs Analogy" >}}Google Docs are a useful analogy for understanding designs. In many ways a Meshery design is like a single Google Doc in that they are collaboratively authored, versioned, permissioned and can move from workspace to workspace. Workspaces, a shared collection of designs, can be likened to a Google Drive, a shared collection of files.{{< /alert >}}


## How Kanvas runs

Kanvas is not a standalone service. It is an extension that runs inside Meshery. The Kanvas interface loads into Meshery UI, and a server-side plugin is loaded by Meshery Server. Kanvas sends every request to Meshery Server. Requests about connected clusters stay in Meshery. Requests for designs, views, the catalog, sharing, and support are forwarded to the remote provider, Layer5 Cloud. Kanvas does not call Layer5 Cloud directly, except for real-time collaboration: the browser connects to a signaling service hosted by Layer5 Cloud, and after that edits synchronize peer to peer over WebRTC.

Meshery Server, not the browser, talks to Kubernetes clusters, through Meshery Operator, MeshSync, and Meshery Broker. Under the local provider there is no remote service, so provider-bound features, including views, the catalog, sharing, and support requests, return HTTP 501 Not Implemented.

The hosted Kanvas at [kanvas.new](https://kanvas.new) is for authoring designs. Validate, dry-run, deploy, undeploy, connecting clusters, and Operator mode are not available there, signed in or not. Those actions open a prompt that directs you to the [Meshery Playground](https://playground.meshery.io) or a self-hosted Meshery. Share and publish open a sign-in prompt while you are anonymous. If the provider address is malformed, sign-in does not start and Kanvas shows "Sign-in could not start:" followed by the reason.

<figure>
  <img src="images/kanvas-meshery-provider-architecture.webp" alt="Meshery architecture with a remote provider and a local provider on the left, Meshery in the center, and Kubernetes clusters on the right" />
  <figcaption>Providers sit on the left, Meshery in the middle, and your clusters on the right.</figcaption>
</figure>
