# Use ConfigMaps and Secrets


> Inject configuration from a ConfigMap and a credential from a Secret into a MySQL Pod, as environment variables and as mounted files, and verify each binding in the running container.


In this tutorial you design a MySQL Pod that takes its database name from a ConfigMap and its root password from a Secret, deploy it to a cluster, and prove from inside the container that each value arrived. Separating configuration and credentials from the container image is how one image runs unchanged in every environment, and knowing exactly how Kubernetes delivers those values tells you why a changed setting sometimes reaches a running container and sometimes does not.

## What you will learn

- How a ConfigMap and a Secret store key-value data, and why a Secret's values are base64-encoded rather than encrypted.
- The two ways a Pod consumes them: environment variables resolved once at container start, and mounted volumes that the kubelet keeps up to date.
- That a Pod refers to a ConfigMap or Secret by name and key, and that nothing checks the reference until the container starts.
- How Kanvas validates, dry-runs, and deploys a design, and what Operator shows for Secret data.

## Before you begin

- A Kanvas environment with a Kubernetes cluster connected to Meshery. Use [Meshery Playground](https://play.meshery.io), a shared live cluster, or a self-hosted Meshery with a connected cluster. Hosted kanvas.new has no cluster actions: Validate, Deploy, and Undeploy there open a self-hosted feature prompt.
- Familiarity with Pods and the Kanvas Designer. If this is your first Kanvas tutorial, complete the [Kubernetes Pods tutorial](/pr-preview/pr-1341/kanvas/tutorials/kubernetes/kubernetes-pods/) first.
- A short unique suffix for your object names and labels, such as your initials plus a number (`jd42`). Playground is shared with other users, so this tutorial writes names as `mysql-<suffix>`; replace `<suffix>` everywhere with yours.

## The scenario

You build three components and connect them by name references in the Pod spec:

```text
ConfigMap  mysql-config-<suffix>   data: database = tutorialdb
Secret     mysql-secret-<suffix>   data: root-password = <base64 of strongpassword>
    |                                   |
    |  env MYSQL_DATABASE               |  env MYSQL_ROOT_PASSWORD
    |  volume at /etc/app-config        |  volume at /etc/db-secret
    v                                   v
Pod        mysql-<suffix>   container mysql (image mysql:8.0)
```

The official MySQL image reads `MYSQL_ROOT_PASSWORD` to set the root password and `MYSQL_DATABASE` to create a database on first start, so a working login and a database named `tutorialdb` prove that both environment bindings work. The mounted files prove the volume bindings.

## Create the ConfigMap

1. Start a new design and name it, for example `configmaps-secrets-<suffix>`. Kanvas saves the design automatically a few seconds after each change; there is no Save button.
2. Add a **ConfigMap** component from the Kubernetes model. Its configurator opens beside it.
3. Set the name to `mysql-config-<suffix>`. Leave the namespace as `default`.
4. Under **Data**, add one entry with key `database` and value `tutorialdb`.
5. On the configurator's **Labels** tab, add the label `owner` with your suffix as the value. You use this label to find your objects in Operator.

**What just happened.** A ConfigMap is a plain key-value object for non-sensitive configuration. It holds strings (or binary data under `binaryData`) up to 1 MiB in total, and it does nothing on its own: a Pod has to ask for its keys. Kanvas renders the configurator from the ConfigMap's schema and checks your change against that schema in the background.

**Check your work.** The ConfigMap sits on the canvas with no warning badge. A yellow triangle badge means a schema warning; select it to jump to the field.

## Create the Secret

1. Encode the password. In any terminal, run:

    ```shell
    echo -n 'strongpassword' | base64
    ```

    The output is `c3Ryb25ncGFzc3dvcmQ=`. The `-n` matters: without it, `echo` adds a newline that becomes part of the password.

2. Add a **Secret** component. Set the name to `mysql-secret-<suffix>` and the type to `Opaque`.
3. Under **Data**, add one entry with key `root-password` and value `c3Ryb25ncGFzc3dvcmQ=`.
4. On the **Labels** tab, add the same `owner` label.

**What just happened.** A Secret has the same key-value shape as a ConfigMap, and values under `data` must be base64-encoded. **Base64 is an encoding, not encryption.** Anyone who can read the Secret object can recover the value with `echo c3Ryb25ncGFzc3dvcmQ= | base64 -d`. What protects a Secret in a cluster is RBAC on who may read Secrets, encryption at rest configured on the API server, and the kubelet keeping Secret volumes in memory instead of on disk. If you prefer not to encode values yourself, the `stringData` field accepts plain text and the API server encodes it for you.

The value is also stored in your design. Kanvas creates new designs with public visibility, so anyone who can open the design can read and decode the value. Use throwaway values like the one in this tutorial, and never put a production credential in a design.

**Check your work.** Decode the value you typed to confirm it round-trips to `strongpassword`. A value that is not valid base64 passes Validate but fails when the cluster checks the Secret in the next phase.

## Build the Pod

1. Add a **Pod** component. Set the name to `mysql-<suffix>` and add the `owner` label on the **Labels** tab.
2. Add one container with name `mysql`, image `mysql:8.0`, and a container port of `3306`.
3. Add an environment variable named `MYSQL_ROOT_PASSWORD`. Leave its value empty and set **Value From** to a **Secret Key Ref** with name `mysql-secret-<suffix>` and key `root-password`.
4. Add a second environment variable named `MYSQL_DATABASE`, with **Value From** set to a **Config Map Key Ref** with name `mysql-config-<suffix>` and key `database`. Use the ConfigMap reference here, not a Secret reference: each reference type looks only in its own kind of object.
5. In the Pod spec, add two volumes:
    - `app-config`, of type **Config Map**, with name `mysql-config-<suffix>`.
    - `db-secret`, of type **Secret**, with secret name `mysql-secret-<suffix>`.
6. On the `mysql` container, add two volume mounts:
    - `app-config` at mount path `/etc/app-config`, read-only.
    - `db-secret` at mount path `/etc/db-secret`, read-only.

**What just happened.** The Pod now consumes the same data in two ways:

| Delivery | What the container sees | When a changed value reaches the container |
|---|---|---|
| Environment variable (`valueFrom`) | `MYSQL_DATABASE=tutorialdb`, `MYSQL_ROOT_PASSWORD=strongpassword` | Only when the container restarts. The kubelet resolves the values once, at start. |
| Volume | One file per key: `/etc/app-config/database`, `/etc/db-secret/root-password` | Eventually, without a restart. The kubelet refreshes mounted files periodically (not for `subPath` mounts). |

Both deliver decoded values: the container never sees base64. Each binding is a reference by object name and key. Kanvas Validate checks each component against its own schema only, and a server-side dry run of a Pod does not look up the objects it references, so a misspelled name or key surfaces only when the container tries to start.

**Check your work.** The design holds three components and no warning badges. The Pod's container shows two environment variables and two volume mounts.

## Validate, dry run, and deploy

1. Run **Validate** from the **Actions** menu. Validate runs in your browser against each component's schema and does not contact the cluster. Its findings are advisory; they never block a deploy.
2. Run **Dry Run**. Kanvas sends each component to the cluster's API server as a server-side dry run, which applies the cluster's real validation without persisting anything.
3. Run **Deploy**. Select the environment that holds your cluster connection, review the dry-run result, and deploy.

**What just happened.** Deploy creates each object, or replaces it in place if it already exists, and labels it with the design's id. Components with no declared dependency on each other are applied in parallel, so the Pod can reach the cluster before its ConfigMap and Secret do. In that case the Pod briefly reports `CreateContainerConfigError` and then starts on its own once the kubelet retries.

**Check your work.** The summary at the end of the deploy lists `Deployed ConfigMap "mysql-config-<suffix>"`, `Deployed Secret "mysql-secret-<suffix>"`, and `Deployed Pod "mysql-<suffix>"`. A `Failed to deploy` row carries an error card with the cluster's reason. A dry-run error names the component and field, for example an invalid label value or a Secret value that is not base64; select the error to open the configurator at that field.

## Verify the bindings

1. Switch to Operator. Opening Operator with the design loaded shows a view scoped to this design, which lists the objects carrying the design's id label: your ConfigMap, Secret, and Pod. Operator draws a snapshot, so if the Pod is still starting, change a filter or reopen the view to fetch fresh state.
2. Select the Pod. Its status chip reads `Running` once MySQL has started, which takes up to a minute. The container details list its environment variables and its volume mounts marked `(RO)`. For variables set from a reference, Operator shows the reference, not the value.
3. Select the Secret. Operator shows its type, `Opaque`, and does not display its data values.
4. Start a terminal session on the Pod (**Initiate Terminal Session**). Kanvas opens a `/bin/sh` shell in the container. The terminal sends one line at a time when you press Enter, so run commands one per line:

    ```shell
    printenv MYSQL_DATABASE
    cat /etc/app-config/database
    cat /etc/db-secret/root-password
    mysql -uroot -p"$MYSQL_ROOT_PASSWORD" -e "SHOW DATABASES;"
    ```

    With `kubectl` access to the cluster, `kubectl exec mysql-<suffix> -- printenv MYSQL_DATABASE` and the equivalent commands give the same answers.

**What just happened.** The first two commands print `tutorialdb`: the ConfigMap reached the container as a variable and as a file. The third prints `strongpassword`, decoded, which shows that anyone who can exec into a Pod can read its mounted Secrets. The last command logs in with the password from the Secret and lists `tutorialdb` among the databases, which MySQL created from the ConfigMap value on first start.

**Check your work.** If the Pod reports `CreateContainerConfigError` and stays there, a referenced name or key does not match: compare the Pod's references with the ConfigMap and Secret names and keys. If `mysql` answers `Access denied`, the stored password differs from what you expect, most often because the base64 value was encoded with a trailing newline.

Operator's **Download** action saves the complete object as JSON, and for a Secret that includes its `data`. Treat downloaded Secret files as sensitive.

## Change a value

1. Return to Designer and change the ConfigMap's `database` value to `otherdb`.
2. Deploy again. Deploy replaces the ConfigMap in place.
3. After a minute or two, run the first two commands from the previous phase again.

**What just happened.** `cat /etc/app-config/database` now prints `otherdb`, because the kubelet refreshed the mounted file. `printenv MYSQL_DATABASE` still prints `tutorialdb`, because environment variables are fixed when the container starts. MySQL also keeps its existing databases: `MYSQL_DATABASE` applies only to the first initialization. This difference is the main reason to mount configuration that must change at runtime as files.

Most fields of a running Pod, including its environment variables, cannot be changed in place. When you change the Pod itself, Deploy reports success but the running Pod keeps its old spec. To apply a Pod change, Undeploy and deploy again, or manage the Pod through a Deployment, which replaces Pods when its template changes.

## Clean up

Run **Undeploy** from the **Actions** menu in Designer. Undeploy deletes each component in the design from the cluster by kind and name: the Pod, the ConfigMap, and the Secret. It removes nothing that the design does not contain, and it deletes any object of the same kind and name in that namespace, whoever created it, which is another reason for unique names on a shared cluster.

Because the design stores the Secret value, delete the design too if you no longer need it.

## What you learned

- A ConfigMap holds configuration and a Secret holds credentials, both as key-value data. Secret values are base64-encoded, which hides nothing; access control and encryption at rest protect them.
- A Pod consumes either one through environment variables, fixed at container start, or through mounted files, which update without a restart.
- References are by name and key and are checked only when the container starts, so a typo shows up as `CreateContainerConfigError`, not as a validation error.
- Kanvas Validate checks schemas in the browser, Dry Run checks against the cluster without persisting, and Deploy creates or replaces each object. Operator shows a Secret's type but not its values.

## Next steps

- [Schedule Work with CronJobs](/pr-preview/pr-1341/kanvas/tutorials/kubernetes/exploring-kubernetes-cronjobs/) - run a container on a schedule and watch the Jobs and Pods it creates.
- [Deploy a Design](/pr-preview/pr-1341/kanvas/guides/deploying/deploying-designs/) - the full Validate, Dry Run, Deploy, and Undeploy reference for everyday use.
- [Operator](/pr-preview/pr-1341/kanvas/concepts/operator/) - how Operator discovers cluster resources and what its views show.

