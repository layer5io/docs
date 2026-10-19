# Schedule Work with CronJobs


> Design a CronJob, deploy it, watch the Jobs and Pods it creates on schedule, change the schedule and redeploy, and clean up.


In this tutorial you design a CronJob that runs a small container every minute, deploy it, and watch Kubernetes turn the schedule into Jobs and the Jobs into Pods. Then you change the schedule in place and clean up. Scheduled work such as backups, report generation, and cache warming runs this way, and understanding the CronJob to Job to Pod chain is what lets you answer the two questions that matter in production: did it run, and where is its output.

## What you will learn

- How a CronJob creates a Job for each scheduled time, and how each Job creates a Pod that runs to completion.
- Why a Job's Pod must use `restartPolicy` `OnFailure` or `Never`.
- How the history limits decide how many finished Jobs stay in the cluster, and what `concurrencyPolicy` and `suspend` control.
- Why the objects a controller creates are not part of your design, and how to find them in Operator anyway.

## Before you begin

- A Kanvas environment with a Kubernetes cluster connected to Meshery. Use [Meshery Playground](https://play.meshery.io), a shared live cluster, or a self-hosted Meshery with a connected cluster. Hosted kanvas.new has no cluster actions: Validate, Deploy, and Undeploy there open a self-hosted feature prompt.
- Familiarity with Pods and the Kanvas Designer. If this is your first Kanvas tutorial, complete the [Kubernetes Pods tutorial](/pr-preview/pr-1326/kanvas/tutorials/kubernetes/kubernetes-pods/) first.
- A short unique suffix for names and labels, such as your initials plus a number (`jd42`). Playground is shared with other users; replace `<suffix>` everywhere with yours.
- About 15 minutes, most of it waiting for scheduled runs.

## The scenario

You build one component. Kubernetes builds the rest:

```text
CronJob  hello-<suffix>          schedule "*/1 * * * *"     (in your design)
   |  at each scheduled minute, the CronJob controller creates
   v
Job      hello-<suffix>-<n>                                 (not in your design)
   |  the Job controller creates
   v
Pod      hello-<suffix>-<n>-<random>   runs busybox, prints the date, exits
```

## Design the CronJob

1. Start a new design and name it, for example `cronjobs-<suffix>`. Kanvas saves the design automatically a few seconds after each change; see [Save Designs](/pr-preview/pr-1326/kanvas/guides/designs/saving-designs/) for how saving and versions work.
2. Add a **CronJob** component from the Kubernetes model. Set its name to `hello-<suffix>` and, on the **Labels** tab, add the label `owner` with your suffix as the value.
3. Set the schedule to `*/1 * * * *`, which means every minute.
4. Under the job template, set the Job's metadata label `owner: <suffix>`, and set the same label on the Pod template's metadata. Labels on the CronJob itself are not copied to the Jobs and Pods it creates; the template labels are.
5. In the Pod template spec, set the restart policy to `OnFailure` and add one container:
    - Name: `hello`
    - Image: `busybox:1.36`
    - Command: `/bin/sh`, `-c`, `date; echo Hello from the Kubernetes cluster`

**What just happened.** A CronJob is a Job factory. Its `schedule` uses standard cron syntax (minute, hour, day of month, month, day of week) and is evaluated in the time zone of the cluster's controller manager unless you set `timeZone`, such as `Europe/Berlin`. Its `jobTemplate` is a complete Job spec, and the Job's `template` is a complete Pod spec. A Job runs its Pod to completion, so the Pod's restart policy must be `OnFailure` (retry in the same Pod) or `Never` (create a new Pod on failure); the Pod default, `Always`, is rejected.

**Check your work.** The CronJob is on the canvas with no warning badge. If a yellow triangle badge appears, select it to jump to the field that does not match the schema.

## Validate, dry run, and deploy

1. Run **Validate** from the **Actions** menu. It checks the component against its schema in your browser and does not contact the cluster. Its findings are advisory.
2. Run **Dry Run**. The cluster's API server checks the CronJob with its full validation without persisting it.
3. Run **Deploy**, select the environment that holds your cluster connection, and deploy.

**What just happened.** The dry run is the first check that applies Kubernetes rules beyond the schema, such as the allowed restart policies and the cron syntax. Deploy creates the CronJob and labels it with the design's id. Nothing runs yet: the CronJob controller creates the first Job at the next scheduled minute.

**Check your work.** The deploy summary lists `Deployed CronJob "hello-<suffix>"`. If the dry run reports an error on the restart policy, set it to `OnFailure`. An error on the schedule means the cron expression is malformed. Select a dry-run error to open the configurator at that field.

## Observe the Jobs and Pods

1. Wait two or three minutes, then switch to Operator. With the design loaded, Operator opens a view scoped to the design, and that view shows only the CronJob: Kanvas puts the design's id label on the objects it applies, and the Jobs and Pods are created by Kubernetes, not by Kanvas.
2. To see the whole chain, filter the view by the label `owner=<suffix>`, or search for `hello-<suffix>`, and include the kinds CronJob, Job, and Pod. Search matches part of a resource name, and Job and Pod names start with the CronJob's name.
3. Select one of the Pods. Its status chip reads `Succeeded`: the container printed its message and exited with code 0.
4. Read the output of a run. Open a log session on one of the Pods (**Initiate Log Session**), or with `kubectl` access run `kubectl logs job/<job-name>`. The output is the date followed by `Hello from the Kubernetes cluster`.

Operator shows a snapshot of the cluster, fetched when you open a view, change a filter, or change the selected cluster. To see Jobs created since the last fetch, change a filter or reopen the view.

**What just happened.** Every minute the CronJob controller created a Job named after the CronJob and the scheduled time, and the Job controller created a Pod for it. Wait five minutes and fetch again: no more than three completed Jobs remain. The CronJob keeps `successfulJobsHistoryLimit` (default 3) successful Jobs and `failedJobsHistoryLimit` (default 1) failed Jobs, and deletes older ones together with their Pods. Keep these limits low on a busy schedule: finished Jobs and Pods stay in the cluster and count toward any object-count quota in the namespace.

Three more fields shape a CronJob's behavior:

| Field | Default | Effect |
|---|---|---|
| `concurrencyPolicy` | `Allow` | What happens when a run is due while the previous one is still running: `Allow` starts another, `Forbid` skips the new run, `Replace` stops the old run and starts the new one. |
| `suspend` | `false` | `true` stops new runs without deleting the CronJob. Runs already started finish. |
| `startingDeadlineSeconds` | none | How late a missed run may still start. A run that misses its deadline is skipped and counted as missed. |

**Check your work.** If no Jobs appear after several minutes, check the schedule and confirm the CronJob is not suspended. A Pod in `Error` or a Job that keeps retrying means the container failed: read its logs. A Pod stuck in `Pending` means the cluster could not schedule it or pull the image.

## Change the schedule and redeploy

1. Return to Designer and change the schedule to `*/2 * * * *`, every second minute.
2. Set `successfulJobsHistoryLimit` to `1`.
3. Deploy again.

**What just happened.** Deploy replaces an existing object in place, so the CronJob keeps its name and history and the controller uses the new schedule from the next run. After a few minutes Operator shows a new Job every two minutes and only one completed Job at a time. To pause the CronJob instead of changing its schedule, set `suspend` to `true` and deploy.

Changes to the job template apply only to Jobs created after the redeploy. Jobs and Pods that already exist keep the spec they were created with.

**Check your work.** In Operator, the CronJob's newest Jobs are two minutes apart, and older successful Jobs disappear after the next run.

## Clean up

Run **Undeploy** from the **Actions** menu in Designer. Undeploy deletes each component in the design by kind and name, which here is only the CronJob `hello-<suffix>`. The Jobs and Pods are not in the design. They are owned by the CronJob, and Kubernetes garbage collection removes owned objects after their owner is deleted. Fetch the Operator view again to confirm they are gone. If any remain, delete them with `kubectl delete jobs -l owner=<suffix>`.

Undeploy deletes any CronJob with the same name in that namespace, whoever created it, which is another reason to use unique names on a shared cluster. The design itself stays saved; delete it if you no longer need it.

## What you learned

- A CronJob creates a Job at each scheduled time, and each Job creates a Pod that runs to completion with restart policy `OnFailure` or `Never`.
- The history limits decide how many finished Jobs stay in the cluster; `concurrencyPolicy`, `suspend`, and `startingDeadlineSeconds` decide which runs start.
- Your design contains only the CronJob. Objects that controllers create carry the template labels, not the design's id, so you find them in Operator by label or name.
- Deploying a changed design replaces the CronJob in place; the new schedule and template apply to future runs.

## Next steps

- [Deploying WordPress and MySQL with Persistent Volumes](/pr-preview/pr-1326/kanvas/tutorials/kubernetes/wordpress-mysql-persistentvolume/) - keep data across Pod restarts with PersistentVolumeClaims.
- [Deploy a Design](/pr-preview/pr-1326/kanvas/guides/deploying/deploying-designs/) - the full Validate, Dry Run, Deploy, and Undeploy reference for everyday use.
- [Operator](/pr-preview/pr-1326/kanvas/concepts/operator/) - how Operator discovers cluster resources and what its views show.

