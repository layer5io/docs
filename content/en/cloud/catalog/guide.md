---
title: Catalog Management
weight: 3
description: "A guide to managing items in the Meshery Catalog. Learn how to view, filter, edit, unpublish, delete, download, and clone your designs."
categories: [Catalog]
tags: [Designer]
---

The [Meshery Catalog](https://cloud.layer5.io/catalog) serves as your central hub for well-architected cloud native patterns and best practices templates. Here, you can browse, discover, and share designs with the wider community.

![Catalog main page view](/cloud/catalog/images/catalog-view.gif)

## Viewing Catalog Items

The main catalog page displays all available designs in an organized, searchable format.

### Top Performers
At the top of the Catalog page, you'll find the **Top Performers** section. This provides a snapshot of the full Leaderboard, highlighting the most popular designs based on various [metrics](/cloud/catalog/metrics/).
-   To see the complete rankings, click the **Open Leaderboard** button.
-   You can toggle the visibility of this section using the **Hide Performers** / **Show Performers** button.

{{< alert type="info" title="Learn More About Leaderboard" >}}
To learn more about Leaderboard, see the [Leaderboard documentation](/cloud/catalog/leaderboard/).
{{< /alert >}}

### Grid View

The grid view offers a visual, card-based layout that's ideal for browsing designs by their visual appearance. Each card provides key information at a glance:

- **Class:** The banner in the top-left corner shows the design's classification (e.g., Official)
- **Type:** The tag in the top-right corner indicates the design's category (e.g., Deployment)
- **Metrics:** A row of icons at the bottom displays key usage statistics (Opens, Downloads, Deploys, Clones, Shares)
- **Detailed Information (on hover):** When you hover over a card, it flips to reveal more details, including the author, design version, technologies used, and the last updated time

![Catalog card view with metrics](/cloud/catalog/images/card-view.png)

{{< alert type="info" title="Understanding Design Metrics" >}}
To better understand what these Metrics represent, you can learn more about [design metrics](/cloud/catalog/metrics/).
{{< /alert >}}

### Table View

Table view provides a dense, list-based format that's ideal for sorting and comparing items based on specific metrics. To customize the information displayed in this view, click the **View Columns icon** and select the attributes you want to see, such as Author, Created At, or Downloads.

![Catalog table view](/cloud/catalog/images/design-view.gif)

{{< alert type="info" title="Choose Your Preferred View" >}}
Both the grid and table views provide the same set of management capabilities, so you can pick the layout that best suits your task.
{{< /alert >}}

## Filtering and Sorting Catalog Items

The filter bar on the left helps you narrow down the catalog to find exactly what you need. You can sort the entire catalog or apply specific filters.

#### Sort By
You can order all items in the catalog based on different criteria, such as alphabetically, by most recently updated, or by popularity metrics like most cloned or downloaded.

#### Owner
Filter designs based on their owner, whether it's your entire Organization, specific Teams, or an individual Author.

### Class

The `Class` filter helps you find content based on its level of support and verification:
  - **Official:** Content produced and fully supported by Meshery maintainers. This represents the highest level of support and is considered the most reliable.
  - **Verified:** Content produced by partners and verified by Meshery maintainers. While not directly maintained by Meshery, it has undergone a verification process to ensure quality and compatibility.
  - **Community:** Content produced and shared by Meshery users. This includes a wide range of content with varying levels of support and reliability.

#### Technology and Type
These filters correspond to the metadata authors provide when they publish designs. They allow you to find items based on the technologies they use or the function they perform.
  - **Technology:** A list of technologies included in the design, like `Argo CD`, `AWS API Gateway`, or `Apache ShardingSphere`.
  - **Type:** The category of the design, such as `deployment`, `observability`, `resiliency`, or `traffic-management`.

## Viewing Design Details

When you click on any design in the catalog, you'll see its detail page. This page provides a complete overview of the design's purpose, technical details, and how you can use it.

### Metadata

- **Class, Created By, and Dates:** See the design's classification (e.g., Official), its original author, and when it was created and last updated
- **Version:** The design's version number. This increments automatically each time the design is updated
- **Visibility:** The status of the design. For all items found in the public catalog, this will be Published

As you scroll down the page, you will find other useful sections:

- **Caveats and Considerations:** Specific stipulations to consider and known behaviors to be aware of when using this design
- **Similar Designs by Type:** At the bottom, other designs of the same type, helping you discover other relevant patterns

## Actions

You can perform various actions on each design in the catalog.

### Open in Playground

Clicking **Open in Playground** loads the design directly into [Kanvas](https://kanvas.new/).

### Clone

Cloning creates a personal, editable copy of the design in your own workspace. This is useful when you want to use an existing public design as a starting point for your own customizations.

When you clone a design:
- The new copy will appear in your **My Designs** tab
- Its name will be appended with `(Copy)` to distinguish it from the original
- The visibility of the cloned design is set to **Private** by default, so only you can see it until you decide to publish it

### Download

The **Download** button allows you to save the design to your local machine as a `Meshery Design (YAML)` file. This is useful for offline backups, version control with Git, or sharing the file directly.

> For more advanced use cases, Meshery also supports exporting designs into other formats. To learn more, see the guide on [Exporting Designs](/kanvas/designer/export-designs/).

### Edit

After you've published a design, you might need to update its metadata or descriptive information. Clicking the **Edit** button opens a modal window where you can make your changes.

You can modify the following fields:
- **Type:** Change the design's category
- **Technology:** Add or remove associated technology tags
- **Description:** Update the main purpose and intended uses of the design
- **Caveats and Considerations:** Revise any special stipulations or known behaviors

![Design edit modal](/cloud/catalog/images/design-edit.png)

{{< alert type="warning" title="Immutable Properties" >}}
Some properties of a published design are immutable and cannot be changed through the edit screen:
- **Name:** The original name of the published design cannot be modified
- **Visibility:** You cannot change a published design's visibility directly. To remove it from public view, you must **Unpublish** the item instead
{{< /alert >}}

### Unpublish

If you no longer want a design to be publicly visible in the catalog, you can use the **Unpublish** button. This action removes the design from the public catalog but does not delete it. It will remain in your workspace as a private design.

{{< alert type="info" title="Permissions Required" >}}
Editing/Unpublish catalog items requires specific user roles and permissions. Learn more: [Default Permissions documentation](/cloud/reference/default-permissions/).
{{< /alert >}}