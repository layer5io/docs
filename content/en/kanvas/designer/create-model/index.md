---
title: Create Model
description: >
  This guide will walk you through the process of creating a new model in Meshery.
weight: 3
categories: [Designer]
tags: [designs, relationships, components, models]
format: [video]
aliases:
  - /meshmap/designer/create-model
---

## Overview

Meshery Models are a way to represent the architecture of a system or application. Models are defined in JSON and can be used to visualize the components and relationships between them. This guide will walk you through the process of creating a new model.

Meshery Components are the building blocks of a model. Each component represents a different part of the system or application. Components can be anything from a database to a microservice to a server. Relationships define how components interact with each other. For example, a database component might have a relationship with a microservice component that represents the microservice’s dependency on the database.

## Creating your first Meshery Model

The following instructions are a no-fluff guide to creating your own Meshery Models quickly. For more detailed information, see the [Contributing to Models](/project/contributing/contributing-models) documentation.

The URL Import feature allows you to generate models in Meshery by providing URLs to source repositories or package registries. Here's how to use it:

#### 1. Access the Model Generation Interface

Navigate to Kanvas [Designer](https://playground.meshery.io/extension/meshmap). From bottom dock click on shape or component tab. Click the "Create Model" icon to begin creating a new model.

<img src="./create-model.png" alt="kanvas model generate" width="600" style="margin-bottom: 25px;">

#### 2. Configure Model Details

Enter the required information for your model:

- **Model Name:** Should be in lowercase with hyphens. For example, cert-manager.
- **Display Name:** How you want your model to be named. For example, Cert Manager.

[![registry generate model name](/assets/img/registry/url-import-model-name.png)](/assets/img/registry/url-import-model-name.png)

#### 3. Set Model Categorization

Choose appropriate category and subcategory for your model from the dropdown menus. If your model doesn't fit existing categories, select "Uncategorized". This helps organize models in the registry and makes them easier to find.

[![registry generate model categorization](/assets/img/registry/url-import-category.png)](/assets/img/registry/url-import-category.png)

#### 4. Configure Model Styling

Customize your model's appearance:

- Upload logos for both dark and light themes
- Set primary and secondary colors for visual elements
- Select a shape for the model's icon in the UI

Note: If you don't provide custom styling, Meshery's default values will be used. You can change these later in the model definition.

[![registry generate model styling](/assets/img/registry/url-import-model-styling.png)](/assets/img/registry/url-import-model-styling.png)

#### 5. Provide Source Location

You can provide either a GitHub repository URL or an ArtifactHub package URL as your source:

**For GitHub repositories:**
Enter a URL in the format: `git://github.com/[organization or username]/[repository]/[branch]/path/to/crds`
For example: `git://github.com/cert-manager/cert-manager/master/deploy/crds`

**For ArtifactHub packages:**
Enter a URL in the format: `https://artifacthub.io/packages/search?ts_query_web={model-name}`

**Pro tip:** Check the `sourceURL` column in the [Meshery Integration Sheet](https://docs.google.com/spreadsheets/d/1DZHnzxYWOlJ69Oguz4LkRVTFM79kC2tuvdwizOJmeMw) and try one of the listed sources.

[![registry generate model source selection](/assets/img/registry/url-import-github-url.png)](/assets/img/registry/url-import-github-url.png)

#### 6. Additional Settings

Before finishing, you can:

- Choose to register the model immediately for instant availability in Meshery instance.
- Specify if the model is for visual annotation only

{% include alert.html type="light" title="Visual Annotation Models" content="When a model is marked for visual annotation only, it means the model will be used purely for visualization and diagramming purposes within Meshery's interface, rather than for actual infrastructure management." %}

[![registry generate model additional settings](/assets/img/registry/url-import-model-additional-settings.png)](/assets/img/registry/url-import-model-additional-settings.png)

After completing these steps, click "Finish" to generate your model. Once generated, you can find your model in the Registry section (if you checked "Register Model Immediately") else it'll download the generated model in an archive, ready for use in your Meshery environment.

## Importing a Model

You can import a model from a URL or a local file. To import a model, click on the "Import Model" button in the Kanvas Designer. You can then provide the URL or select a local file to import.

Once the model is imported, you can view and edit it in the Kanvas Designer. You can also export the model to a local file or a URL.

You can access import models near creating models in the Kanvas Designer. Click on the "Import Model" button to begin.

### Importing a Model from a File:

Select a local file to import. Supported formats include `.tar`, `.tar.gz`, and `.tgz`. For more details on the file structure you can export our existing models from registry.

1. Select the **File Import** option.

<img src="./file-import.png" alt="File import model" width="600" style="margin-bottom: 25px;">

2. Click on **File Broswer** button to select a local file.
3. Click the **Import** button to import the model.
4. New generated model will be appear in either shape or component picker.

### Importing a Model from a URL:

Enter the URL of the model you want to import. A direct URL to a single model file, for example: https://raw.githubusercontent.com/your-model-file.tar. Supported formats include `.tar`, `.tar.gz`, and `.tgz`.

1. Select the **URL Import** option.

<img src="./url-import.png" alt="URL import model" width="600" style="margin-bottom: 25px;">

2. Enter the URL of the model you want to import.
3. Click the **Import** button to import the model.
4. New generated model will be appear in either shape or component picker.

### Importing a Model from CSV:

Upload separate CSV files for model definitions, components, and their relationships.

The CSV Import feature allows you to generate models in Meshery by providing template CSV files that define your model structure, components, and relationships. Here's a comprehensive guide on how to use this feature:

1. Select the "Import from CSV" option.
2. Prepare your CSV files: You'll need three essential CSV files to define your model. You can download the template CSV files from the download icon in the top right corner of model. Each file serves a specific purpose:

   - **Model CSV:** Defines your model's core metadata, including name, version, and general properties.
   - **Components CSV:** Describes the individual components that make up your model.
   - **Relationships CSV:** Specifies how different components interact and connect with each other.

   **Pro tip:** Look at existing models in the [Meshery Integration Sheet](https://docs.google.com/spreadsheets/d/1DZHnzxYWOlJ69Oguz4LkRVTFM79kC2tuvdwizOJmeMw) to understand how to structure your CSV files effectively.

3. Upload Models, Components, and Relationships CSV:

   - Click the "Choose File" button to select your respective CSV files from your local machine.
   - Ensure that you upload the Model CSV first, followed by the Components CSV, and finally the Relationships CSV.

4. Click the "Import" button to generate your model based on the provided CSV files.
5. The model will be appear in either shape or component picker.

**Congratulations! You have successfully created a new model.**

### Contributing a Model Definition

1. Fork the [meshery/meshery.io](https://github.com/meshery/meshery.io) repository.
2. Create a new branch in your fork of the meshery/meshery.io repository.
3. Add your model definition to the `collections/_models` directory.
4. Create a pull request to the meshery/meshery.io repository.
5. Once your pull request is merged, your model will be available in the next Meshery release.
