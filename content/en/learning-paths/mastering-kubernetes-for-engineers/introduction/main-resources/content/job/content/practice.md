---
docType: "Chapter"
title: "Practice"
lectures: 1
courseTitle: "Jobs & CronJobs"
themeColor: "#00B39F"
weight: 2
cardImage: ""
---
{{< chapterstyle >}}


## Use a CronJob to create dummy votes

1. In a file named *cronjob.yaml*, define the specification for a *CronJob* resource with the following characteristics:

- Name: seed
- Schedule: "* * * * *"
- Contains a single container with the image *voting/tools:latest* and an environment variable *NUMBER_OF_VOTES* set to 10

2. Deploy the application and verify, from the *resultui* interface, that 10 new votes are created every minute.

3. Delete the application.

<br/>
<details>
<summary markdown="span">Solution</summary>

1. The specification to define the *seed* CronJob is as follows:

    ``` yaml {filename="cronjob.yaml"}
    apiVersion: batch/v1
    kind: CronJob
    metadata:
      name: seed
    spec:
      schedule: "* * * * *"
      jobTemplate:
        metadata:
          name: seed
        spec:
          template:
            spec:
              containers:
              - image: voting/tools:latest
                name: seed
                env:
                - name: NUMBER_OF_VOTES
                  value: "10"
                imagePullPolicy: Always
              restartPolicy: OnFailure
    ```

2. Deploy the application with the following command from the *manifests* directory:

``` bash
kubectl apply -f .
```

Using the IP address of one of the cluster nodes, you can access the vote and result interfaces via ports *31000* and *31001* respectively. If you observe the *result* interface for a few minutes, you will see that 10 new votes are created every minute.

{{< image src="/images/learning-path/intro-kubernetes/resources/job/practice/result.png" align="center" width="100%" alt="Results" >}}

3. Delete the application with the following command from the *manifests* directory:

``` bash
kubectl delete -f .
```

</details>

{{< /chapterstyle >}}