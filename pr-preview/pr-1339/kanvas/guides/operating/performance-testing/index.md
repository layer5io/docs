# Run a Performance Test


> Generate load against a Service or Ingress from the Operator canvas using a performance profile, and read the results.


Operator mode shows a live picture of your clusters. A performance test adds the missing signal: how a service responds under load. You select a Service or Ingress on the canvas, Kanvas seeds a test from it, and Meshery runs the load and keeps the result as a reusable performance profile.

## Before you start

- **Operator mode on a Meshery you run.** The hosted kanvas.new site does not offer Operator mode.
- **A target Meshery Server can reach.** Meshery Server generates the load, not your browser and not the cluster. The address you test must be routable from wherever Meshery Server runs. A `ClusterIP` address is reachable from inside the cluster only.
- **Performance permissions.** The form needs **View performance profiles** to appear, and the Run Test button needs **Run test**. See [Permissions by Role](/pr-preview/pr-1339/kanvas/reference/permissions/).

## Start a test

The action is named **Initiate Performance Test** and is offered on **Service** and **Ingress** resources only, the kinds that expose an endpoint. It is not offered on pods, deployments, or any other kind. Right-click the resource, or select it and use the action in the header of the Details panel.

The Performance panel opens on the canvas at 400 px wide, floating and minimizable. Only one performance panel exists: starting a test from a second resource replaces the target of the open panel. The panel hosts the Meshery performance test form, so the fields, profiles, and results are the same ones Meshery provides. Opening the panel generates no load. Nothing runs until you press **Run Test**.

## What Kanvas pre-fills

| Setting | Seeded value |
|---|---|
| Profile name | `<Kind> - <component name>`, for example `Service - checkout` |
| URL to test | The first endpoint derived from the resource, or empty |
| Concurrent requests | 10 |
| Queries per second | 20 |
| Duration | 30s |
| Load generator | `fortio` |

Change any value before you run. The form also accepts request headers, cookies, content type, request body, additional load generator options as JSON, and a certificate for TLS endpoints.

### How the URL is derived

For a Service, Kanvas builds an endpoint from the service's type and ports and seeds the first one. A service with several ports yields several endpoints; edit the URL to test another port.

| Service type | Seeded URL |
|---|---|
| `ClusterIP` (also when no type is set) | `http://<clusterIP>:<port>` |
| `LoadBalancer` | `http://<ingress IP or hostname>:<port>`. Empty until the cloud assigns an address. |
| `ExternalName` | `http://<externalName>:<port>` |
| `NodePort` | Empty. Kanvas does not know node addresses. Enter `http://<node address>:<nodePort>`. |
| Headless (`clusterIP: None`) | Seeds `http://None:<port>`. Replace it with a real address. |

For an Ingress, the URL is always empty. Enter the host and path you want to test. The seeded scheme is always `http`; change it to `https` for TLS endpoints.

## Run it and read the result

1. Edit the seeded values.
2. Press **Run Test**. Meshery first saves the settings as a performance profile (the toast reads `Performance profile <name> has been created`), then submits the load test (`Load test has been submitted`).
3. A countdown runs for the test duration. The results then render in the same panel, with a way back to the form.

The same profile can be selected and re-run later, which is what makes a test repeatable before and after a change. Results are stored in Meshery's performance results history, not in Kanvas. Profiles, schedules, comparisons between runs, and how results are interpreted are covered in [Performance Management](https://docs.meshery.io/guides/performance-management) in the Meshery documentation.

## Validation and failure modes

| Message | Meaning |
|---|---|
| `Please enter a valid URL along with protocol` | The URL needs a scheme such as `http://`. |
| `Please enter a valid JSON string` | The additional options field is not valid JSON. |
| Duration rejected | Duration must be positive and end in `h`, `m`, or `s`. |
| `Failed to create performance profile` | The profile could not be saved, so the test did not start. |
| `Load test did not run with msg: <message>` | The load generator reported a failure. The message names the cause, often an unreachable endpoint. |
| `Connection to the server got disconnected. Load test might be running in the background. Please check the results page in a few.` | The result stream dropped. The test may still finish; check the results page in Meshery. |
| Permission denied block or disabled Run Test | Your role lacks **View performance profiles** or **Run test**. |
| Empty panel | The host Meshery did not supply the performance form. Use a Meshery release that includes it. |

Kanvas does not pre-check that the endpoint is reachable.

## Related

- [Resource Details](/pr-preview/pr-1339/kanvas/reference/resource-details/) shows the live state of the resource you are testing.
- [Performance Limits](/pr-preview/pr-1339/kanvas/reference/performance/) covers the limits of Kanvas itself on large designs.

