# Help and Support


> What the Kanvas Help Center offers, which support channel each plan includes, and the two preconditions the support form requires - a remote provider and a signed-in identity.


Kanvas gives you two ways to get help without leaving the canvas: the **Help Center**, a single place for documentation, learning material and community channels, and the **support form**, which sends a request to the Layer5 team. This page lists what each one contains, which support channels each plan includes, and the conditions the support form needs to work.

## Help Center

The Help Center is a dialog with eight entries. Open it from the canvas context menu or from the help control in the whiteboard dock. It also opens from the **Get Help** action in the [troubleshooting](/pr-preview/pr-1320/kanvas/guides/troubleshooting/) panel.

| Entry | What it gives you |
|---|---|
| Documentation | These docs, opened in a new tab. |
| Video Tutorials | The Layer5 video library, opened in a new tab. |
| Quick Tips | An in-app tour of the core Kanvas workflow: placing and configuring components, connecting and grouping them, loading and combining designs, sharing, validating, deploying and undeploying, and collaborating. In Operator mode it covers filtering the resources under observation, health and details, quick operations, performance tests, the terminal and log streaming. |
| Academy | Structured learning paths in Layer5 Cloud, opened in a new tab. |
| Discussion Forum | The community forum at [discuss.layer5.io](https://discuss.layer5.io). |
| Slack | The Layer5 community Slack at [slack.layer5.io](https://slack.layer5.io). |
| Keyboard Shortcuts | A side panel listing shortcuts for Designer and Operator modes. The full list is in [Keyboard Shortcuts](/pr-preview/pr-1320/kanvas/reference/keyboard-shortcuts/). |
| Support | Opens the support form described below. |

The Help Center footer shows the installed Kanvas version and links to that version's release notes.

## Support channels by plan

Every plan includes community support. Standard and Premium support add direct contact with the Layer5 team. The table below is rendered from the product feature list and updates with it.
















































































































































































































































































































































































































































































<div class="feature-tiers">

<table class="feature-tiers-table">
  <caption>Support and Deployment</caption>
  <thead>
    <tr>
      <th scope="col">Capability</th>
      <th scope="col">What it does</th>
      <th scope="col">Free</th>
      <th scope="col">Team Designer</th>
      <th scope="col">Team Operator</th>
      <th scope="col">Enterprise</th>
    </tr>
  </thead>
  <tbody>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    <tr>
      <th scope="row">Community Support</th>
      <td>Get help with most of your questions and issues in our Community Forum.</td>
      
      
      <td class="tier-cell"><span aria-hidden="true">&#10003;</span><span class="sr-only">Included</span></td>
      
      <td class="tier-cell"><span aria-hidden="true">&#10003;</span><span class="sr-only">Included</span></td>
      
      <td class="tier-cell"><span aria-hidden="true">&#10003;</span><span class="sr-only">Included</span></td>
      
      <td class="tier-cell"><span aria-hidden="true">&#10003;</span><span class="sr-only">Included</span></td>
      
    </tr>
    
    
    
    
    
    
    <tr>
      <th scope="row">Standard Support</th>
      <td>Support can help you troubleshoot issues you run into. Get support via email.</td>
      
      
      <td class="tier-cell"><span aria-hidden="true">-</span><span class="sr-only">Not included</span></td>
      
      <td class="tier-cell"><span aria-hidden="true">&#10003;</span><span class="sr-only">Included</span></td>
      
      <td class="tier-cell"><span aria-hidden="true">&#10003;</span><span class="sr-only">Included</span></td>
      
      <td class="tier-cell"><span aria-hidden="true">&#10003;</span><span class="sr-only">Included</span></td>
      
    </tr>
    
    
    
    
    
    
    
    
    
    
    
    <tr>
      <th scope="row">Premium Support</th>
      <td>With Premium, get a 2-hour SLA and 24/7 web and phone support.</td>
      
      
      <td class="tier-cell"><span aria-hidden="true">-</span><span class="sr-only">Not included</span></td>
      
      <td class="tier-cell"><span aria-hidden="true">-</span><span class="sr-only">Not included</span></td>
      
      <td class="tier-cell"><span aria-hidden="true">-</span><span class="sr-only">Not included</span></td>
      
      <td class="tier-cell"><span aria-hidden="true">&#10003;</span><span class="sr-only">Included</span></td>
      
    </tr>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
  </tbody>
</table>

</div>


For the channels themselves, see [Layer5 Cloud support](/pr-preview/pr-1320/cloud/reference/support/).

## How a support request is delivered

A support request never leaves your browser for a third party. Kanvas submits the form to Meshery Server, which forwards it to your provider's support intake:

```text
Kanvas (browser)  ->  Meshery Server extension proxy  ->  Remote provider support webhook
```

For [Layer5 Cloud](/pr-preview/pr-1320/cloud/) that intake is Layer5's support queue, the same one the Layer5 Cloud Help and Support form uses, so a request raised from Kanvas is triaged exactly like one raised from Layer5 Cloud. For a self-hosted Layer5 Cloud deployment it is whatever endpoint the operator has configured - see [Customizing Webhooks](/pr-preview/pr-1320/cloud/guides/self-hosted/customizing-webhooks/).

## Requirements

### A remote provider

Because the submission travels through Meshery Server's extension proxy, the support form only works when Meshery is connected to a [remote provider](https://docs.meshery.io/extensibility/providers). Under the **local** provider, Meshery Server has no support intake to forward to, and the extension proxy returns `501 Not Implemented`. This matches every other provider-bound Kanvas capability, including [sharing](/pr-preview/pr-1320/kanvas/guides/collaborating/sharing-designs/), the catalog and views.

If the form fails under the local provider, switch Meshery to a remote provider and submit again. If you cannot switch, reach the Layer5 team through the [community forum](https://discuss.layer5.io) or [Slack](https://slack.layer5.io).

### A signed-in identity

Every request carries the requester's name and email so the team can reply. Kanvas resolves your signed-in profile when you open the form instead of asking you to retype it:

- While the profile loads, the dialog shows a loading state and the form is unavailable.
- When the profile resolves, the form appears addressed with your identity.
- When the profile cannot be resolved, for example because the session expired, the form does not appear and nothing is submitted. A request with no way to reply has no value.

If the form does not appear, sign in to your provider again and reopen it. If it still does not appear, see [Troubleshooting Kanvas](/pr-preview/pr-1320/kanvas/guides/troubleshooting/).

## Type of inquiry

Each request carries a type that the support intake uses to route it.

| Type | Default |
|---|---|
| Support | Yes |
| Community | No |
| Account | No |
| Commercial | No |

If a submission fails, Kanvas keeps your subject, description and type so you can retry without retyping them.

