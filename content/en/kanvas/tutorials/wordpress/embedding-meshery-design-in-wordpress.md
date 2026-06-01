---
title: Embedding a Meshery Design in a WordPress Post
model: WordPress
params:
   kind: design
categories: [tutorials]
description: Learn how to Embed a Meshery Design in a WordPress Post
aliases:
- /kanvas/tutorials/embedding-meshery-design-in-wordpress
---

### Introduction

In this tutorial, we will learn how to embed a **Meshery Design** in a WordPress post using the **Embed** option in **Kanvas**.

This tutorial assumes that you have created a design or have an existing one. If not, you can use one of the numerous public designs available in **Kanvas** for this tutorial.

### Prerequisites

1. **WordPress**: A running WordPress instance or deployment, serving as the sample application for this tutorial.
1. **Meshery Catalog Extension**: The Meshery Catalog extension enabled within your Meshery environment to access pre-configured cloud-native design patterns.

### Steps

1. Expand the **Actions** menu on the left and select export.
   
   ![Expand Designs](/kanvas/tutorials/images/embedding-design-in-wordpress/expand-designs-kanvas.png)

2. Click the download icon next to **Embed Design**
   
   ![Export Design](/kanvas/tutorials/images/embedding-design-in-wordpress/quickaction-exportdesign.png)

3. This will show the `js` file to download and the HTML code snippet to copy.
   
   ![Embed Design](/kanvas/tutorials/images/embedding-design-in-wordpress/embeddesign-HTML.png)

4. Now, create a `js` folder in the path of your current WordPress theme

5. Next, copy the downloaded `js` file into this folder.
   
   ![Copy JS](/kanvas/tutorials/images/embedding-design-in-wordpress/copy-js.png)

6. To the following script, replace `design.js` with the name of the `js` file which you just downloaded. Once this is done,  go to the `functions.php` file in your current WordPress theme and copy the script.

   ```
   function kanvas_design_script() {
         $script_uri = get_template_directory_uri() . '/js/design.js';
         wp_enqueue_script_module(
                           'kanvas-design', 
                           $script_uri, 
                           array(), 
                           '1.1.0', 
               );
   }
   add_action('wp_enqueue_scripts', 'kanvas_design_script');
   ```

   ![Copy Script](/kanvas/tutorials/images/embedding-design-in-wordpress/copy-script.png)

7. Open the WordPress post where you want to embed the design in edit mode and add a _Custom HTML_ block.

   ![Copy URL](/kanvas/tutorials/images/embedding-design-in-wordpress/add-custom-html.png)

8. Paste the div element from the Embed Code copied from Kanvas. 

   ![Copy URL](/kanvas/tutorials/images/embedding-design-in-wordpress/add-embedded-html.png)

9. Click **Preview** to validate that the design is rendered.
   
   ![Copy URL](/kanvas/tutorials/images/embedding-design-in-wordpress/embedded-design-preview.png)

10. Publish the WordPress post and share.