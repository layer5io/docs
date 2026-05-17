---
title: Helm Kanvas Snapshot
description: Helm CLI plugin to visually render a snapshot of your Helm charts.
display_title: false
categories: [kanvas]
---
<img style="text-align: left; position:relative; display:inline; height: 32px; width: 32px;" src="/kanvas/concepts/images/helm-chart-color.svg" /> The **Kanvas Snapshot Helm Plugin** allows users to generate a visual snapshot of their Helm charts directly from the command line. It simplifies the process of creating Meshery Snapshots, providing a visual representation of packaged Helm charts. This plugin integrates with Meshery Cloud and GitHub Actions to automate the workflow of snapshot creation, which is especially useful for Helm users who need to quickly visualize their chart configurations.

Helm charts can be complex, especially when custom configurations are applied via `values.yaml` files. This Meshery extension bridges the gap between Helm chart configurations and their visual representation by converting Helm charts into **Kanvas Snapshots**. These snapshots can be received either via email or as a URL displayed directly in the terminal.

### Features

1. **Snapshot Generation:** Create visual snapshots of Helm charts, complete with associated resources.
2. **Synchronous/Asynchronous Delivery:** Choose between receiving snapshots via email or directly in the terminal.
3. **Seamless Integration:** Leverages Meshery Cloud and GitHub Actions to handle snapshot rendering.
4. **Support for Packaged Charts:** Works with both packaged `.tar.gz` charts and unpackaged Helm charts.

## Installation and Use

To install the Kanvas Snapshot Helm Plugin, use the following steps:

### Prerequisites

- `helm` must be installed on your system.
- (Optional) A free [Layer5 Cloud](https://cloud.layer5.io) user account.

**Plugin Installation**

1. Run the following command to install the Helm Kanvas Snapshot plugin:

<pre class="codeblock-pre">
  <div class="codeblock">
     <div class="clipboardjs"> helm plugin install https://github.com/meshery/helm-kanvas-snapshot </div>
   </div>
</pre>

3. Verify the installation by running:


<pre class="codeblock-pre">
  <div class="codeblock">
     <div class="clipboardjs">helm plugin list</div>
   </div>
</pre>

   You should see the Kanvas Snapshot listed as `helm-kanvas-snapshot`.

4. Set up the required environment variables (see the [Environment Variables](#environment-variables) section).

### Usage

Once the plugin is installed, you can generate a snapshot using either a packaged or unpackaged Helm chart.


<pre class="codeblock-pre">
  <div class="codeblock">
     <div class="clipboardjs">helm snapshot --f &lt;chart-URI&gt; [--name &lt;snapshot-name&gt;] [--email &lt;email&gt;]</div>
   </div>
</pre>

- **`-f`**, **`--file`**: (required) path or URL to the Helm chart (required).
- **`--name`**: (optional) name for the snapshot. If not provided, a name will be auto-generated based on the chart name.
- **`-e`**, **`--email`**: (optional) email address to notify when snapshot is ready. If not provided, a link to the snapshot will be displayed in the terminal.

**Example**

To generate a snapshot for a Helm chart located at `https://meshery.github.io/meshery.io/charts/meshery-v1.0.20.tgz`, you can use:

<pre class="codeblock-pre">
  <div class="codeblock">
     <div class="clipboardjs">helm snapshot -f https://meshery.github.io/meshery.io/charts/meshery-v1.0.20.tgz --name meshery-chart</div>
   </div>
</pre>