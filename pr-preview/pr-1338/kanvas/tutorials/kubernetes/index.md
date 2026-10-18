# Kubernetes Tutorials

> Hands-on Kubernetes tutorials using Meshery Playground and Kanvas.


These tutorials teach core Kubernetes objects by building them in Kanvas, deploying them to a live cluster, and inspecting the result. Each one ends with real objects running in a cluster, so you learn both the Kubernetes concept and the Kanvas workflow that takes a design from the canvas to the cluster and back into view.

## The learning path

Work through the tutorials in order. The first five each introduce one kind of object. The last three combine many objects into complete applications and assume you know the earlier material.

| Tutorial | You build | Concept it teaches | Do first |
|---|---|---|---|
| [Explore Pods](/pr-preview/pr-1338/kanvas/tutorials/kubernetes/kubernetes-pods/) | A standalone NGINX Pod exposed by a NodePort Service | Pods, labels, your first deploy, and inspecting a running container | Nothing |
| [Explore Deployments](/pr-preview/pr-1338/kanvas/tutorials/kubernetes/kubernetes-deployments/) | A replicated NGINX Deployment that you scale and roll to a new image | Controllers, ReplicaSets, scaling, and rolling updates | Explore Pods |
| [Explore Services](/pr-preview/pr-1338/kanvas/tutorials/kubernetes/kubernetes-services/) | ClusterIP, NodePort, and LoadBalancer Services in front of a Deployment and Pods | Label selectors and what each Service type exposes | Explore Deployments |
| [ConfigMaps and Secrets](/pr-preview/pr-1338/kanvas/tutorials/kubernetes/kubernetes-configmaps-secrets/) | A Pod that reads configuration and credentials from the cluster | Separating configuration and sensitive data from container images | Explore Pods |
| [CronJobs](/pr-preview/pr-1338/kanvas/tutorials/kubernetes/exploring-kubernetes-cronjobs/) | A job that runs on a schedule | Jobs, cron schedules, and run-to-completion workloads | Explore Pods |
| [PHP guestbook with Redis](/pr-preview/pr-1338/kanvas/tutorials/kubernetes/deploy-php-redis/) | A web frontend backed by a Redis datastore | Multi-tier applications and service discovery between tiers | Explore Services |
| [WordPress and MySQL with persistent volumes](/pr-preview/pr-1338/kanvas/tutorials/kubernetes/wordpress-mysql-persistentvolume/) | A WordPress site and its MySQL database with durable storage | PersistentVolumes, PersistentVolumeClaims, and Secrets in a real application | ConfigMaps and Secrets |
| [Cassandra with a StatefulSet](/pr-preview/pr-1338/kanvas/tutorials/kubernetes/deploy-apache-cassandra-with-statefulset/) | A Cassandra ring | StatefulSets, stable network identity, and per-replica storage | WordPress and MySQL |

The single-object tutorials build every object by hand in the component configurator, so you see each field Kubernetes requires. The multi-object tutorials start from published Kubernetes example manifests that you import into Kanvas, which is how most teams bring existing applications into a design.

## What every tutorial requires

Every tutorial deploys to a real cluster, so you need a Kanvas environment backed by one:

- **Meshery Playground** at https://play.meshery.io, a shared live cluster that you use from your browser. Other people use the same cluster, so give every object a unique name and label.
- **A self-hosted Meshery** with at least one connected Kubernetes cluster.

Hosted Kanvas at kanvas.new has no cluster actions. You can draw the designs there, but Validate, Deploy, and Undeploy open a prompt to use Meshery Playground or self-host Meshery instead.

## How the pieces fit together

Each tutorial repeats the same loop: you configure components in Designer, check them with Validate and Dry Run, Deploy them to the cluster, and then inspect the live objects in Operator. The [Kubernetes request flow](/pr-preview/pr-1338/kanvas/concepts/kubernetes-request-flow/) explanation describes what happens inside the cluster when those objects receive traffic, and it is useful background before the Services tutorial.

