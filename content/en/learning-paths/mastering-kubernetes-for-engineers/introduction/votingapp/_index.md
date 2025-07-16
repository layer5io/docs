---
docType: "Course"
title: "Voting App"
description: "This section provides an introduction to Kubernetes, its architecture, and how it is used in modern software development."
lectures: 6
courseTitle: "Voting App"
themeColor: "#00B39F"
weight: 1
cardImage: "/images/learning-path/intro-kubernetes/Resources/configuration.png"

---
The VotingApp is mainly used for demos and follows a microservices architecture. While it may not adhere to all architectural best practices, it is a good example of an application that utilizes various languages and databases. It helps in learning concepts related to Docker and Kubernetes. The VotingApp consists of 7 microservices, as illustrated in the following diagram:

![](./images/)
{{< image src="/images/learning-path/intro-kubernetes/voting-app/architecture.png" align="center" width="100%" alt="Architecture" >}}

- vote-ui: A Vue.js frontend that allows users to choose between Cat and Dog
- vote: A backend API built with Python / Flask
- redis: A database where votes are stored
- worker: A service that retrieves votes from Redis and stores the results in a Postgres database
- db: The Postgres database where vote results are stored
- result: A backend that sends the scores to a user interface via websocket
- result-ui: An Angular frontend that displays the voting results

The container images for each microservice are available in the [DockerHub](https://hub.docker.com/u/voting). Their tags follow the Semantic Versioning pattern (vX.Y.Z). You can see the application running at [https://vote.votingapp.xyz](https://vote.votingapp.xyz).

Since the VotingApp is packaged in a [Helm Chart](https://gitlab.com/voting-application/helm) and distributed in the [Docker Hub](https://hub.docker.com/repository/docker/lucj/votingapp/general), it's ready to be deployed on Kubernetes.

