---
title: Understanding Meshery Relationships
weight: 4
type: docs
description: >
  Meshery uses relationships to map how interconnected components interact.
categories: [Designer]
tags: [designs, relationships, components]
aliases:
  - /meshmap/concepts/relationships
---

## What are Meshery Relationships?
Relationships define the nature of interaction between interconnected components in Meshery. They represent various types of connections and dependencies between components no matter the genealogy of the relationship such as parent, siblings, binding.

## Types of Relationships

Relationships are categorized into different kinds, types, and subtypes, so that can be expressive of the specific manner in which one or more components relate to one another.

Here is a list of the different types of relationships that Meshery supports:

### 1. Edge Relationships

Edge relationships indicate the possibility of traffic flow between two components. They enable communication and interaction between different Components within the system. There are 4 subtypes of the edge relationship.

**i. Edge-Network:**

The Edge-Network relationship type configures the networking between one or more components. This deals with IP addresses and DNS names and provides stable endpoints for communication. For instance, a “Service” provides a stable endpoint for accessing multiple replicas of a “Deployment”. Here's a visual representation of this kind of relationship.
   
  ![example of edge-network relationship](./EdgeNetworkRelationship.svg)
   
**ii. Edge-Firewall**

This acts as intermediary for communications which include standard networking protocols like TCP and UDP. It can enforce network policies to control traffic between components, for example between two Pods.
   
   ![example of edge-firewall relationship](./edge_firewall_relationship_pod_to_pod.svg)
   
**iii. Edge-Mount**

   This subtype addresses the storage and access possibility between involved components. For example, a “PersistentVolume” can be mounted to a “Pod” to provide persistent storage for the pod’s data.
   
   ![example of edge-mount relationship](./EdgeMountRelationship.svg)
   
**iv. Edge-Permission**

   This defines the permissions for components if they can have a possible relationship with other components. It ensures that only authorized components can interact with each other. For example, a “Role” can define permissions for Components to access specific resources.
   
   ![example of edge-permission relationship](./edge_permission_relationship_cluster_role_service_account.svg)


### 2. Hierarchical Relationships

Hierarchical relationships involve either an ancestral connection of the components (i.e. the creation/deletion of a component higher up affects the existence of the components below in the lineage) or a connection which involves the inheritence of features from one component to the other. There are 2 subtypes of the hierarchical relationship.

**i. Hierarchical-Inventory**

  This is a relationship between components where the configuration settings of one component, known as the parent, are combined or integrated with the configuration settings of another component, known as the child. This implies that changes or updates made to the parent component can affect or influence the configuration of the child component. Here's an example of a Hierarchical-Inventory relationship
   
   ![example of edge-permission relationship](./Hierachical_Inventory_Relationships.svg)
   
**ii. Hierarchical-Parent**

A parent-child relationship implies that the parent component must be present or established before the child component can be created. For instance, in Kubernetes, a 'Namespace' can serve as a parent to 'Pods' within that namespace. Therefore, the namespace must be created beforehand for pods to be deployed within it. Here's an example of a Hierarchical-Parent relationship
   
   ![example of edge-permission relationship](./Hierarchical_Parent_Relationship.svg)

### 3. TagSets Relationships

These represent relationships between components of same Labels or Annotations key/value pairs. Labels and Annotations are two different types of Tags. Labels are often used to identify components and are visible on the design canvas. Annotations are often used to provide additional information about components.

![example of Tag sets](./tags.png)