<p style="text-align:center;" align="center">
      <picture align="center">
         <source media="(prefers-color-scheme: dark)" srcset="./.github/readme/images/layer5-light-no-trim.svg">
         <source media="(prefers-color-scheme: light)" srcset="./.github/readme/images/layer5-no-trim.svg">
         <img align="center" src="./.github/assets/images/layer5/layer5-no-trim.svg" alt="Shows a dark layer5 logo in light mode and a white logo in dark mode" width="45%"/>
      </picture>
</p>

<p align="center">
<a href="https://github.com/layer5io/docs/graphs/contributors" alt="GitHub contributors">
<img src="https://img.shields.io/github/contributors/layer5io/layer5.svg" /></a>
<a href="https://github.com/issues?q=is%3Aopen+is%3Aissue+archived%3Afalse+(org%3Alayer5io+OR+org%3Ameshery+OR+org%3Alayer5labs+OR+org%3Aservice-mesh-performance+OR+org%3Aservice-mesh-patterns+OR+org%3Ameshery-extensions)+label%3A%22help+wanted%22" alt="Help wanted GitHub issues">
<img src="https://img.shields.io/github/issues/layer5io/layer5/help%20wanted.svg?color=%23DDDD00" /></a>
<a href="https://slack.layer5.io" alt="Slack">
<img src="https://img.shields.io/badge/Slack-@layer5.svg?logo=slack" /></a>
<a href="https://twitter.com/layer5" alt="Twitter Follow">
<img src="https://img.shields.io/twitter/follow/layer5.svg?label=Follow+Layer5&style=social" /></a>
<a href="https://github.com/layer5io/layer5/blob/master/LICENSE" alt="License">
<img src="https://img.shields.io/github/license/layer5io/layer5.svg" /></a>
</p>

<h5><p align="center"><i>If you’re using Layer5 products or if you like the project, please <a href="https://github.com/layer5io/layer5/stargazers">★</a> this repository to show your support! 🤩</i></p></h5>

# About Layer5

[Layer5](https://layer5.io)'s cloud native application and infrastructure management software enables engineers to expect more from their infrastructure. We embrace _developer_-defined infrastructure. We empower developers to change how they write applications, support _operators_ in rethinking how they run modern infrastructure, and enable _product owners_ to regain full-control over their product portfolio.

## Contributions Welcome

<div>
<a href="https://meshery.io/community"><img alt="Layer5 Community" src=".github/readme/images//community.svg" style="margin-right:8px;padding-top:9px;" width="140px" align="left" /></a>
<p>
✔️ <em><strong>Join</strong></em> any or all of the weekly meetings on <a href="https://calendar.google.com/calendar/b/1?cid=bGF5ZXI1LmlvX2VoMmFhOWRwZjFnNDBlbHZvYzc2MmpucGhzQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20">community calendar</a>.<br />
✔️ <em><strong>Watch</strong></em> community <a href="https://www.youtube.com/Layer5io?sub_confirmation=1">meeting recordings</a>.<br />
✔️ <em><strong>Access</strong></em> the <a href="https://drive.google.com/drive/u/4/folders/0ABH8aabN4WAKUk9PVA">Community Drive</a> by completing a community <a href="https://layer5.io/newcomer">Member Form</a>.<br />
✔️ <em><strong>Discuss</strong></em> in the <a href="https://discuss.layer5.io">Community Forum</a>.<br />
✔️ <em><strong>Explore more</strong></em> in the <a href="https://layer5.io/community/handbook">Community Handbook</a>.<br />
</p>
</div>
Explore tutorials and documentation by product in the https://docs.layer5.io website; documentation and developer resources of Layer5 products.

If you find a typo or you feel like you can improve the HTML, CSS, or JavaScript, we welcome contributions. Feel free to open issues or pull requests like any normal GitHub project, and we'll merge it in 🚀

### Running the Site Locally

The website can be run locally through Golang (Hugo) or Docker. If you choose to run through Docker, everything will be a little bit slower due to the additional overhead, so for frequent contributors it may be worth it to use Golang.

### With Docker

Running the site locally is simple. Provided you have Docker installed, clone this repo, run `make docker`, and then visit <http://localhost:1313>.

> [!IMPORTANT]  
> This requires Docker Desktop version **4.24** or later, or Docker Engine with Docker
> Compose version [**2.22**](https://docs.docker.com/compose/file-watch/) or later.

### With Golang

If your local development environment has a supported version (v1.21.0+) of Golang installed, next you'll need to install extended Hugo version as it has necessary SCSS/SASS support. Find all the Hugo packages here: <https://github.com/gohugoio/hugo/releases/tag/v0.120.4>

Now to setup and run the site locally run:

`make setup` followed by `make site`

...and then visit <http://localhost:1313>.

If you pull down new code from GitHub, you will occasionally need to run `make setup` again. Otherwise, there's no need to re-run `make setup` each time the site is run, you can just run `make site` to get it going and have it automatically reload as you make and save site edits.

## Layer5 Documentation Structure

## High-Level Outline & Information Architecture for Layer5 Documentation

**Goal:** Offer comprehensive, organized, and accessible documentation for diverse audiences, from new users to expert contributors.

**Target Audience:**

- **Personas:** Beginners, developers, admins, operators, security specialists, contributors, users of all experience levels.
- **Needs:** Varied - learning fundamentals, managing tasks, understanding advanced concepts, contributing code.

## Cloud Docs

### Getting Started

- **Setting up Layer5 Account:** With a personal account on Layer5 Cloud, you can import or create infrastructural designs, collaborate with others through workspaces and teams, manage your organizations and more.
- **Creating a Design from Meshery Catalog Templates:** With this guide, you can create amazing cloud native designs for your infrastructure from already available templates in the meshery catalog.

### Concepts

An overview of Layer5 Cloud concepts and their relationships to one another.

### Identity

- **Organizations:** Organizations, Managing Organization Permissions
- **Teams:** Teams, Managing Teams Permissions
- **Users:** User Management, Managing User Permissions

### Security

- **Tokens:** API Tokens are used to authenticate to Layer5 Cloud’s REST API.
- **Keychains**: Keychains are a collection of keys
- **Keys**: Keys are the atomic unit of access control
- **Roles**: Roles map permissions to users.

### Catalog

The Cloud Catalog is a web-based, public catalog to facilitate easy sharing and discovery of common cloud native architectures and design patterns.

### Workspaces

Meshery Workspaces serve as a virtual space for your team-based work.

### Tutorials

- **Kanvas Snapshots**: Connect Kanvas to your GitHub repo and see changes pull request-to-pull request.
- **Sharing a Workspace**: Learn how to control access to workspaces and their resources.
- **Recognizing User and Contributor Milestones**: Showcasing user and contributor achievements

### Self-Hosted

Keep your Kanvas designs internal to your workplace. Get remote support from Layer5 when you need it.

### Reference

Low-level ReST API reference for extending Layer5 Cloud.

## Kanvas Docs

### Getting Started with Designs

- **Starting from a pattern:** A Pattern is an entity that augments the operational behavior of a deployed instance of a Design.
- **Creating Relationships:** Relationships identify and facilitate genealogy between Components.
- **Working with Components:** Components represent entities in the Meshery ecosystem, exposing capabilities of the underlying platform.
- **Starting from scratch:** Emphasize the underlying system behavior for each action you take.

### Exploring Designer

- **Reviewing Designs:** Learn how to leverage comments in Kanvas’s Designer Mode to enhance collaboration and streamline design reviews.
- **Whiteboarding:** Whiteboarding and Freestyle Drawing inside Kanvas
- **Export Designs:** How to export your designs for backup, sharing or offline use.

### Working with Components

Meshery Designs are descriptive, declarative characterizations of how your Kubernetes infrastructure should be configured

### Navigating Operator

Operator mode is for operating your Kubernetes clusters and cloud native infrastructure.

### Core Tasks

- **Whiteboarding:** Kanvas Designer supports freestyle design, meaning that you can customize the appearance and layout of your diagrams without any constraints.

- **Deploying Designs:** Validating Designs, Undeploying Designs, Deploying Designs, Cloning a Design

### Reference

- **Keyboard Shortcuts:** Learn the keyboard shortcuts for Kanvas to enhance your designing experience.

- **Troubleshooting Kanvas:** Learn to Troubleshoot the Kanvas

### Contribution Guidelines

A detailed contribution guide for Layer5 Docs.
Contributing to the docs.layer5.io

### Editing Markdown Content

Documentation content is written in Markdown and you'll find all files listed under the /content directory.

To create a new page with Markdown, create a file ending in `.md` in a `site/<subdirectory>`. The path in the content directory will be the URL route. For example, `site/docs/hello.md` will be served from the `/docs/hello` URL.

```yaml
---
title: 'My Title'
description: "A thorough, yet succinct description of the page's contents"
---
```

The significant keys in the YAML frontmatter are:

`title` (string) - This is the title of the page that will be set in the HTML title.
`description` (string) - This is a description of the page that will be set in the HTML description.
`permalink` (string - relative file path) - canonical location of the page
`category` (string) - section to which the page belongs.
`redirect_from` (string - relative file path) - in case the page was previously available elsewhere

<div>&nbsp;</div>

### Uploading Images to the site

To display images in a pop-up modal, use the following syntax: `![alt text](/path/to/image.svg)` or `<img src="" alt="" />`.

**Note:**
- For images to show correctly on subpages, always provide the complete image path.
- When using the `<img />` tag, add `data-modal="false"` to prevent the image from opening in a modal e.g. a [logo](https://github.com/layer5io/docs/blob/0bef5a9a05214a9dda10d8a68431e41f5a36676d/layouts/partials/footer.html#L9).

### Adding Alert to the site

Use the following Syntax to add an Alert:
`{{< alert type="success" title="Note" >}} Your Note {{< /alert >}}`

- `type="danger"`: Alert used to indicate something related to security.
- `type="info"`: Alert used to write some information.
- `type="warning"`: Alert used to indicate a warning that might need attention.
- `type="note"`: Alert used to indicate a neutral information.
- `type="success"`: Alert used to indicate a positive information.

By default, if you don't specify a `title="Your Title"`, the title will be the same as the type name.

**Note-> Using an invalid alert type will lead to the default alert being used (i.e. success).**

<hr/>

<a name="contributing"></a><a name="community"></a>
Our projects are community-driven and open to collaboration. 👍 Be sure to see the <a href="https://docs.google.com/document/d/17OPtDE_rdnPQxmk2Kauhm3GwXF1R5dZ3Cj8qZLKdo5E/edit">Layer5 Community Welcome Guide</a> for a tour of resources available to you. You can also join our <a href="http://slack.layer5.io">Slack</a> to get involved. 

<p style="clear:both;">
<a href ="https://layer5.io/community/meshmates"><img alt="MeshMates" src=".github/readme/images/layer5-community-sign.png" style="margin-right:10px; margin-bottom:15px;" width="28%" align="left"/></a>
<h3>Find your MeshMate</h3>

<p>
  MeshMates are experienced Layer5 community members who will help you learn your way around, discover live projects and expand your community network.
  Become a <b>Meshtee</b> today!
</p>

Find out more on the <a href="https://layer5.io/community">Layer5 community</a>. <br />
<br /><br /><br /><br />
</p>

<div>&nbsp;</div>

<a href="https://slack.meshery.io">

<picture align="right">
  <source media="(prefers-color-scheme: dark)" srcset=".github/readme/images//slack-dark-128.png"  width="110px" align="right" style="margin-left:10px;margin-top:10px;">
  <source media="(prefers-color-scheme: light)" srcset=".github/readme/images//slack-128.png" width="110px" align="right" style="margin-left:10px;padding-top:5px;">
  <img alt="Shows an illustrated light mode meshery logo in light color mode and a dark mode meshery logo dark color mode." src=".github/readme/images//slack-128.png" width="110px" align="right" style="margin-left:10px;padding-top:13px;">
</picture>
</a>
<div>
<a href="https://meshery.io/community"><img alt="Layer5 Community" src=".github/readme/images//community.svg" style="margin-right:8px;padding-top:9px;" width="140px" align="left" /></a>
<p>
✔️ <em><strong>Join</strong></em> any or all of the weekly meetings on <a href="https://calendar.google.com/calendar/b/1?cid=bGF5ZXI1LmlvX2VoMmFhOWRwZjFnNDBlbHZvYzc2MmpucGhzQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20">Community calendar</a>.<br />
✔️ <em><strong>Watch</strong></em> community <a href="https://www.youtube.com/playlist?list=PL3A-A6hPO2IMPPqVjuzgqNU5xwnFFn3n0">meeting recordings</a>.<br />
✔️ <em><strong>Access</strong></em> the <a href="https://drive.google.com/drive/u/4/folders/0ABH8aabN4WAKUk9PVA">Community Drive</a> by completing a community <a href="https://layer5.io/newcomer">Member Form</a>.<br />
✔️ <em><strong>Discuss</strong></em> in the <a href="https://discuss.layer5.io">Community Forum</a>.<br />
✔️ <em><strong>Explore more</strong></em> in the <a href="https://layer5.io/community/handbook">Community Handbook</a>.<br />
</p>
</div>
<p align="center">
<i>Not sure where to start?</i> Grab an open issue with the <a href="https://github.com/issues?q=is%3Aopen+is%3Aissue+archived%3Afalse+(org%3Alayer5io+OR+org%3Ameshery+OR+org%3Alayer5labs+OR+org%3Aservice-mesh-performance+OR+org%3Aservice-mesh-patterns+OR+org%3Ameshery-extensions)+label%3A%22help+wanted%22">help-wanted label</a>.</p>
