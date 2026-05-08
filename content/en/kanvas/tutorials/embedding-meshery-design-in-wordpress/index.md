---
title: Embedding a Meshery Design in a WordPress Post
description: >
  Learn how to embed a Meshery Design in a WordPress post using the Embed option in Kanvas.
weight: 8
categories: [Designer, Tutorials]
tags: [designs, embedding, wordpress]
aliases:
  - /meshmap/tutorials/embedding-meshery-design-in-wordpress
  - /guides/tutorials/embedding-meshery-design-in-wordpress
---

## Introduction

In this tutorial, we will learn how to embed a **Meshery Design** in a WordPress post using the **Embed** option in **Kanvas**.

This tutorial assumes that you have created a design or have an existing one. If not, you can use one of the numerous public designs available in **Kanvas** for this tutorial.

1. Expand the **Designs** menu on the left.

   ![Expand Designs](./expand-designs-kanvas.png)

2. Click the **Quick actions** button to the left of the design (inverted ellipsis) and select **Export Design**.

   ![Export Design](./quickaction-exportdesign.png)

3. Click the download icon next to **Embed Design** from the list.

   ![Embed Design](./embeddesign.png)

4. This will show the `js` file to download and the HTML code snippet to copy.

   ![Embed Design HTML](./embeddesign-HTML.png)

5. Now, head over to WordPress and begin by uploading the `js` file to it. Ideally you will upload it to Media.

   ![Upload to WordPress](./upload-js-wordpress.png)

6. Next, click on the uploaded file in WordPress and copy the File URL. You will need this later.

   ![Copy URL](./copy-url.png)

7. Open the WordPress post where you want to embed the design in edit mode and add a _Custom HTML_ block.

   ![Add Custom HTML](./add-custom-html.png)

8. Paste the following CSS code as it is, followed by the **Embed Code** copied from **Kanvas**. Update the script source value to the URL copied from WordPress.

   ```html
   <style>
     .embed-design-container {
       width: 100%;
       border-radius: 1rem;
       margin: 1rem;
       overflow: hidden;
       margin-inline: auto;
       height: 35rem;
     }
     .embed-canvas-container {
       background-color: gray;
     }
   </style>
   ```

   The final _Custom HTML_ should look something like this:

   ```html
   <style>
     .embed-design-container {
       width: 100%;
       border-radius: 1rem;
       margin: 1rem;
       overflow: hidden;
       margin-inline: auto;
       height: 35rem;
     }
     .embed-canvas-container {
       background-color: gray;
     }
   </style>
   <!-- Learn more at https://docs.layer5.io/kanvas/designer/export-designs/#exporting-as-embedding -->
   <div id="embedded-design-a1376b51-d2c4-4ef8-8337-6dc2c24fa939"></div>
   <script src="https://yourwordpressdomain/wp-content/uploads/2025/01/embedded-design-tutorial-exploring-kubernetes-pod.js" type="module" ></script>
   ```

   ![Meshery Design Custom HTML](./meshery-design-custom-html.png)

9. Click **Preview** to validate that the design is rendered.

   ![Embedded Design Preview](./embedded-design-preview.png)

10. Publish the WordPress post and share.
