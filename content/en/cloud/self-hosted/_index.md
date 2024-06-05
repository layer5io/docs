---
title: Self-Hosted
weight: 10
categories: [Self-Hosted]
description: >
  Keep your MeshMap designs internal to your workplace. Get remote support from Layer5 when you need it.
---

![self-hosted](images/self-hosted.svg "image-right-no-shadow")

## On-premises Deployment of Layer5 Cloud

Layer5 Cloud is a collection of services that can be deployed on-premises. The following diagram illustrates the architecture of Layer5 Cloud.

![self-hosted-deployment](images/self-hosted-deployment.svg "image-center-no-shadow")

## Considerations of Self-Hosted Deployments

### White-labeling (Rebranding)

Customize the appearance and branding of your engineering platform powered by Layer5 Cloud. You can change the logo, color scheme, domain name, and other aspects of the user interface to match your own identity and preferences. White-labeling enables you to offer a seamless and consistent experience to your customers, partners, or internal users who access your service mesh platform. White-labeling also helps you to differentiate your platform from other Layer5 Cloud users and competitors, and to enhance your brand recognition and loyalty.

### Considerations of Peer-to-Peer Communication

Layer5 Cloud offers central coordination for real-time user presence and its multi-player experience and does so by propagating document (e.g. designs, views, and so on) updates peer-to-peer to all users using WebRTC. This allows for real-time collaboration without the need for a central server. The signaling server is only used to establish the initial connection between peers. The signaling server does not have access to the content of the document.

Characteristics of the peer-to-peer communication include:

- Fast message propagation
-Encryption and authorization over untrusted signaling servers
- No setup required, public signaling servers are available
- Very little server load
- Not suited for a large amount of collaborators on a single document (each peer is connected to each other)

![meshmap-collaboration-networking](images/meshmap-collaboration-networking.svg "image-center-no-shadow")

#### Default Configuration

By default, Layer5 Cloud uses the public signaling server provided by Layer5. This server is hosted by Layer5 and is available to all users. The server is not able to see the content of the documents, but it can see the metadata of the documents (title, list of users, etc.).

##### Default Number of Supported Users

Minimum: 20
Maximum: 34

Layer5 Cloud uses a min and max range for the total number of users in multi-player mode in one document at-a-time in order to prevent users forming clusters (groups), that can't connect to other users. The min and max range is randomly selected for each document editing session.

### Considerations of Air-Gapped Deployments

Meshery acknowledges the importance of air-gapped deployments and ensures content support for such environments. Content registered should be available even in the absence of internet connectivity, thus aligning with Meshery's commitment to versatile deployment scenarios.
