---
title: Understanding Meshery Relationships
weight: 4
type: docs
description: >
  Meshery uses relationships to map how interconnected components interact.
categories: [Designer]
tags: [designs, relationships, components]
---

## What are Meshery Relationships?
Relationships define the nature of interaction between interconnected components in Meshery. They represent various types of connections and dependencies between components no matter the genealogy of the relationship such as parent, siblings, binding.

## Types of Relationships

Relationships are categorized into different kinds, types, and subtypes, so that can be expressive of the specific manner in which one or more components relate to one another.

Here is a list of the different types of relationships that Meshery supports:

1. Edge
  Edge relationships indicate the possibility of traffic flow between two components. They enable communication and interaction between different Components within the system.
   1. Edge-Network
      The Edge-Network relationship type configures the networking between one or more components. This deals with IP addresses and DNS names and provides stable endpoints for communication. For instance, a “Service” provides a stable endpoint for accessing multiple replicas of a “Deployment”. Here's a visual representation of this kind of relationship.
   
      ![example of edge-network relationship](./EdgeNetworkRelationship.svg)
   
1. Edge-Firewall
   An example of this relationship is that between two Pods.
   
   ![example of edge-firewall relationship](./edge_firewall_relationship_pod_to_pod.svg)
   
1. Edge-Mount
   Here's an example of an Edge-Mount relationship.
   
   ![example of edge-mount relationship](./EdgeMountRelationship.svg)
   
1. Edge-Permission
   Here's an example of an Edge-Permission relationship
   
   ![example of edge-permission relationship](./edge_permission_relationship_cluster_role_service_account.svg)
   
1. Hierarchical-Inventory
   Here's an example of a Hierarchical-Inventory relationship
   
   ![example of edge-permission relationship](./Hierachical_Inventory_Relationships.svg)
   
1. Hierarchical-Parent
   Here's an example of a Hierarchical-Parent relationship
   
   ![example of edge-permission relationship](./Hierarchical_Parent_Relationship.svg)
