---
docType: "Chapter"
id: "import-designs"
chapterTitle: "Import Design Files and Merge"
description: "Here we will import the design files in Meshery Playground and learn how to merge designs."
lectures: 12
title: "Import Designs"
weight: 2
---

{{< chapterstyle >}}

1. In the left sidebar, click on the upward arrow symbol (import icon) to import the designs into Meshery.
2. In the modal that appears:
   - Enter a name for your design in the "Design File Name" field (e.g. `mysql-deployment`).
   - Select `Kubernetes Manifest` from the "Design Type" dropdown menu.

<br />
{{< image src="/images/learning-path/sql/wp1.png" width="100%" align="center" alt="" >}}

_Figure: Import modal_

- Choose `File Upload` for the upload method, and select the file you just downloaded.
- Then, click on `Import`.
  <br />
  {{< image src="/images/learning-path/sql/wp2.png" width="100%" align="center" alt="" >}}

_Figure: Import mysql-deployment_

3. Under the "Designs" tab, you will see the successfully imported `mysql-deployment` design.

   Clicking on the names of the designs on the `Designs` tab displays the visual representations of the various Kubernetes resources and their relationships on the canvas.

   <br />
   {{< image src="/images/learning-path/sql/wp3.png" width="100%" align="center" alt="" >}}

_Figure: Imported designs on canvas_

4. Now, follow the same steps to import the `wordpress-deployment` file.

<br />
{{< image src="/images/learning-path/sql/wp4.png" width="100%" align="center" alt="" >}}

_Figure: wordpress-deployment_

<h2 class="chapter-sub-heading">Merging the Designs</h2>

Next, you will combine the WordPress and MySQL designs into a single design file. By merging these designs, you can manage and deploy both resources together.

To merge the MySQL deployment design with the WordPress deployment design:

1. Click and drag the `mysql-deployment` design from the left panel and drop it onto the design canvas of the `wordpress-deployment`.

<br />
{{< image src="/images/learning-path/sql/wp5.png" width="100%" align="center" alt="" >}}

_Figure: drag and drop design_

2. This action will open a merge modal asking if you want to merge the design, Click on `Merge`.

<br />
{{< image src="/images/learning-path/sql/wp6.png" width="100%" align="center" alt="" >}}

_Figure: merge modal_

3. Click on `Save As` and enter `wordpress-mysql-deployment` as the new file name.

<br />
{{< image src="/images/learning-path/sql/wp7.png" width="100%" align="center" alt="" >}}

_Figure: save design_

{{< /chapterstyle >}}
