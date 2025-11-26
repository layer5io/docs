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

<h5><p align="center"><i>If you're using Layer5 products or if you like the project, please <a href="https://github.com/layer5io/layer5/stargazers">★</a> this repository to show your support! 🤩</i></p></h5>

---

## 📚 Table of Contents

- [About Layer5](#about-layer5)
- [Documentation Overview](#documentation-overview)
- [Getting Started](#getting-started)
  - [Running Locally with Golang](#with-golang)
  - [Running Locally with Docker](#with-docker)
- [Documentation Structure](#layer5-documentation-structure)
  - [Cloud Documentation](#cloud-docs)
  - [Kanvas Documentation](#kanvas-docs)
- [Contributing](#contributing-to-layer5-docs)
  - [Content Guidelines](#editing-markdown-content)
  - [Working with Images](#uploading-images-to-the-site)
  - [Using Alerts](#adding-alerts-to-the-site)
- [Community](#join-the-layer5-community)
- [License](#license)

---

## 🚀 About Layer5

[Layer5](https://layer5.io) is the enterprise-grade cloud native platform for engineering teams. Our cloud native application and infrastructure management software enables engineers to expect more from their infrastructure. 

### What We Do

We embrace **developer-defined infrastructure** and empower teams to:

- 🔧 **Developers** - Change how you write applications with cloud native patterns and practices
- ⚙️ **Operators** - Rethink how you run modern infrastructure with automated operations
- 📊 **Product Owners** - Regain full control over your product portfolio with comprehensive visibility

### Key Products

- **[Meshery](https://meshery.io)** - The cloud native manager for service meshes and beyond
- **[Kanvas](https://kanvas.layer5.io)** - Visual designer for cloud native infrastructure
- **[Layer5 Cloud](https://cloud.layer5.io)** - Collaborative platform for infrastructure management

---

## 📖 Documentation Overview

Welcome to the **Layer5 Documentation** repository! This site powers [docs.layer5.io](https://docs.layer5.io), providing comprehensive documentation and developer resources for all Layer5 products.

<p align="center">
  <a href="https://docs.layer5.io">
    <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDVtYW5wNG95MGF0MjN1bDY3YzE5c3VhbDZvNTh4NTZjZWFjeHdkMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5DHlcg3bQ7HtgjnaHc/giphy.gif" alt="Layer5 Documentation Website - Main Page Preview" width="90%" />
  </a>
  <br/>
  <em>Preview of the Layer5 Documentation main page</em>
</p>

### What You'll Find Here

- **Tutorials** - Step-by-step guides for common tasks
- **Conceptual Guides** - Deep dives into architecture and design
- **Reference Documentation** - API references and technical specifications
- **Best Practices** - Recommended patterns and workflows

### Target Audience

Our documentation serves diverse personas with varying needs:

| Persona | Focus Area | Documentation Needs |
|---------|-----------|-------------------|
| **Beginners** | Getting Started | Tutorials, quick starts, fundamentals |
| **Developers** | Integration & Customization | API docs, code examples, SDKs |
| **Operators** | Deployment & Management | Installation guides, operations, troubleshooting |
| **Security Specialists** | Security & Compliance | Security features, authentication, authorization |
| **Contributors** | Open Source Development | Contributing guides, architecture, development setup |

---

## 🛠️ Getting Started

Choose your preferred development environment to run the documentation site locally:

### With Golang

**Prerequisites:**
- Go v1.21.0 or higher
- Hugo Extended (v0.120.4 or higher) - [Download here](https://github.com/gohugoio/hugo/releases/tag/v0.120.4)

**Setup Steps:**

1. **Clone the repository:**
```bash
   git clone https://github.com/layer5io/docs.git
   cd docs
```

2. **Install dependencies:**
```bash
   make setup
```

3. **Run the development server:**
```bash
   make site
```

4. **View the site:**
   Open your browser to [http://localhost:1313](http://localhost:1313)

**Note:** Run `make setup` after pulling new changes from GitHub. For subsequent runs, `make site` is sufficient.

### With Docker

**Prerequisites:**
- Docker Desktop v4.24+ or Docker Engine with Docker Compose v2.22+

**Quick Start:**

1. **Clone and run:**
```bash
   git clone https://github.com/layer5io/docs.git
   cd docs
   make docker
```

2. **View the site:**
   Open your browser to [http://localhost:1313](http://localhost:1313)

> [!IMPORTANT]  
> This requires Docker Desktop version **4.24** or later, or Docker Engine with Docker Compose version [**2.22**](https://docs.docker.com/compose/file-watch/) or later.

---

## 📋 Layer5 Documentation Structure

Our documentation is organized to provide comprehensive coverage across all Layer5 products and services.

<details>
  <summary><h3>☁️ Cloud Documentation</h3></summary>

#### Getting Started

Learn the fundamentals of Layer5 Cloud:

- **[Setting up Layer5 Account](https://docs.layer5.io/cloud/getting-started/setup)** - Create your personal account, import/create designs, collaborate through workspaces
- **[Creating Designs from Catalog](https://docs.layer5.io/cloud/getting-started/catalog)** - Use pre-built templates from the Meshery Catalog

#### Core Concepts

Understanding Layer5 Cloud architecture:

- **[Architecture Overview](https://docs.layer5.io/cloud/concepts)** - System components and relationships
- **[Design Principles](https://docs.layer5.io/cloud/concepts/principles)** - Core concepts driving the platform

#### Identity & Access Management

Comprehensive identity management:

- **[Organizations](https://docs.layer5.io/cloud/identity/organizations)** - Managing organization structure and permissions
- **[Teams](https://docs.layer5.io/cloud/identity/teams)** - Team creation and permission management  
- **[Users](https://docs.layer5.io/cloud/identity/users)** - User administration and access control

#### Security

Enterprise-grade security features:

- **[API Tokens](https://docs.layer5.io/cloud/security/tokens)** - Authentication for REST API access
- **[Keychains](https://docs.layer5.io/cloud/security/keychains)** - Secure key collection management
- **[Keys](https://docs.layer5.io/cloud/security/keys)** - Atomic units of access control
- **[Roles](https://docs.layer5.io/cloud/security/roles)** - Permission mapping and role-based access

#### Cloud Catalog

Discover and share cloud native patterns:

- **[Catalog Overview](https://docs.layer5.io/cloud/catalog)** - Public catalog for architectures and design patterns
- **[Publishing Designs](https://docs.layer5.io/cloud/catalog/publishing)** - Share your patterns with the community
- **[Using Templates](https://docs.layer5.io/cloud/catalog/templates)** - Leverage existing patterns

#### Workspaces

Collaborative team environments:

- **[Workspace Fundamentals](https://docs.layer5.io/cloud/workspaces)** - Virtual spaces for team collaboration
- **[Resource Management](https://docs.layer5.io/cloud/workspaces/resources)** - Managing workspace resources
- **[Access Control](https://docs.layer5.io/cloud/workspaces/access)** - Controlling workspace permissions

#### Tutorials

Hands-on learning guides:

- **[Kanvas Snapshots](https://docs.layer5.io/cloud/tutorials/snapshots)** - GitHub integration for pull request visualization
- **[Sharing Workspaces](https://docs.layer5.io/cloud/tutorials/sharing)** - Collaborative workspace management
- **[User Recognition](https://docs.layer5.io/cloud/tutorials/recognition)** - Celebrating achievements and milestones

#### Self-Hosted Deployment

Private cloud deployment:

- **[Installation Guide](https://docs.layer5.io/cloud/self-hosted)** - Deploy Layer5 Cloud in your environment
- **[Configuration](https://docs.layer5.io/cloud/self-hosted/config)** - Customizing your deployment
- **[Remote Support](https://docs.layer5.io/cloud/self-hosted/support)** - Getting help from Layer5

#### API Reference

Low-level technical documentation:

- **[REST API](https://docs.layer5.io/cloud/reference/rest-api)** - Complete API endpoint reference
- **[Authentication](https://docs.layer5.io/cloud/reference/auth)** - API authentication methods
- **[Rate Limits](https://docs.layer5.io/cloud/reference/limits)** - Understanding API limits

</details>

<details>
  <summary><h3>🎨 Kanvas Documentation</h3></summary>

#### Getting Started with Designs

Build cloud native infrastructure visually:

- **[Starting from Patterns](https://docs.layer5.io/kanvas/getting-started/patterns)** - Using operational patterns for deployments
- **[Creating Relationships](https://docs.layer5.io/kanvas/getting-started/relationships)** - Connecting components meaningfully
- **[Working with Components](https://docs.layer5.io/kanvas/getting-started/components)** - Understanding infrastructure entities
- **[Starting from Scratch](https://docs.layer5.io/kanvas/getting-started/scratch)** - Building custom designs

#### Exploring Designer Mode

Visual design capabilities:

- **[Design Reviews](https://docs.layer5.io/kanvas/designer/reviews)** - Collaborative review workflows with comments
- **[Whiteboarding](https://docs.layer5.io/kanvas/designer/whiteboard)** - Freestyle drawing and diagramming
- **[Export Designs](https://docs.layer5.io/kanvas/designer/export)** - Backup and share your work

#### Working with Components

Infrastructure as code, visually:

- **[Component Library](https://docs.layer5.io/kanvas/components)** - Available infrastructure components
- **[Custom Components](https://docs.layer5.io/kanvas/components/custom)** - Creating your own components
- **[Component Properties](https://docs.layer5.io/kanvas/components/properties)** - Configuring component behavior

#### Navigating Operator Mode

Operations and deployment:

- **[Operator Overview](https://docs.layer5.io/kanvas/operator)** - Managing running infrastructure
- **[Deployment Workflows](https://docs.layer5.io/kanvas/operator/deploy)** - Deploying designs to clusters
- **[Monitoring](https://docs.layer5.io/kanvas/operator/monitor)** - Real-time infrastructure insights

#### Core Tasks

Essential workflows:

- **[Whiteboarding](https://docs.layer5.io/kanvas/tasks/whiteboard)** - Freestyle design without constraints
- **[Validating Designs](https://docs.layer5.io/kanvas/tasks/validate)** - Ensuring design correctness
- **[Deploying Designs](https://docs.layer5.io/kanvas/tasks/deploy)** - Moving designs to production
- **[Cloning Designs](https://docs.layer5.io/kanvas/tasks/clone)** - Duplicating existing designs

#### Reference

Technical references:

- **[Keyboard Shortcuts](https://docs.layer5.io/kanvas/reference/shortcuts)** - Speed up your workflow
- **[Troubleshooting](https://docs.layer5.io/kanvas/reference/troubleshooting)** - Common issues and solutions

</details>

---

## 🤝 Contributing to Layer5 Docs

We welcome contributions from everyone! Whether you're fixing typos, improving documentation, or adding new content, your help makes Layer5 better.

### Quick Start for Contributors

1. **Find an issue:** Browse [open issues](../../issues) or check issues labeled [`help-wanted`](../../labels/help%20wanted)
2. **Fork and clone:** Create your own fork and clone it locally
3. **Make changes:** Edit documentation, add content, or fix issues
4. **Submit PR:** Open a pull request with your improvements

For detailed contribution guidelines, see [CONTRIBUTING.md](./CONTRIBUTING.md).

### Editing Markdown Content

All documentation is written in Markdown and located in the `/content` directory.

**Creating a New Page:**

1. Create a file with `.md` extension in `site/<subdirectory>`
2. Add YAML frontmatter:
```yaml
---
title: 'Your Page Title'
description: "A clear, concise description of the page content"
permalink: /path/to/page
category: documentation-section
---
```

**Key Frontmatter Fields:**

- `title` - Page title for HTML `<title>` tag
- `description` - Page description for HTML meta tags
- `permalink` - Canonical URL path for the page
- `category` - Documentation section or category
- `redirect_from` - Previous URL paths (if page moved)

### Uploading Images to the Site

**Image Syntax:**
```markdown
![Alt text describing image](/path/to/image.svg)
```

Or using HTML:
```html
<img src="/path/to/image.svg" alt="Descriptive alt text" />
```

**Important Notes:**

- ✅ Always use **complete image paths** for correct rendering on subpages
- ✅ Add `data-modal="false"` to `<img>` tags to prevent modal popups (e.g., for logos)
- ✅ Images without `data-modal="false"` will open in a modal on click

**Example:**
```html
<img src="/images/logo.svg" alt="Layer5 Logo" data-modal="false" />
```

### Adding Alerts to the Site

Alerts help highlight important information in documentation.

**Alert Syntax:**
```markdown
{{< alert type="success" title="Note" >}} Your message here {{< /alert >}}
```

**Alert Types:**

| Type | Purpose | Usage |
|------|---------|-------|
| `danger` | Security warnings | Critical security information |
| `warning` | Cautions | Important warnings needing attention |
| `info` | Informational | General information |
| `note` | Neutral notices | Neutral information |
| `success` | Positive info | Confirmations and positive messages |

**Examples:**
```markdown
{{< alert type="danger" title="Security Warning" >}}
Never commit API keys to version control.
{{< /alert >}}

{{< alert type="info" >}}
This feature requires Docker Desktop 4.24 or later.
{{< /alert >}}

{{< alert type="success" title="Pro Tip" >}}
Use keyboard shortcuts to speed up your workflow!
{{< /alert >}}
```

**Note:** If no `title` is specified, the title defaults to the type name (e.g., "Info", "Warning"). Using an invalid alert type will default to the "success" style.

### Contribution Best Practices

- ✅ **Keep PRs focused** - One issue or feature per pull request
- ✅ **Write clear commit messages** - Describe what and why, not just what
- ✅ **Test locally** - Verify your changes render correctly
- ✅ **Follow style guides** - Maintain consistency with existing documentation
- ✅ **Add context** - Explain why changes are needed in PR descriptions

---

## 🌟 Join the Layer5 Community

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

<div>&nbsp;</div>

### 🎯 Getting Involved

Our projects are community-driven and welcome collaboration from everyone! 

**New to Open Source?**
- 📖 Read our [Community Welcome Guide](https://docs.google.com/document/d/17OPtDE_rdnPQxmk2Kauhm3GwXF1R5dZ3Cj8qZLKdo5E/edit)
- 💬 Join our [Slack workspace](http://slack.layer5.io) 
- 🎫 Grab a [`help-wanted`](https://github.com/issues?q=is%3Aopen+is%3Aissue+archived%3Afalse+(org%3Alayer5io+OR+org%3Ameshery+OR+org%3Alayer5labs+OR+org%3Aservice-mesh-performance+OR+org%3Aservice-mesh-patterns+OR+org%3Ameshery-extensions)+label%3A%22help+wanted%22) or [`good-first-issue`](https://github.com/issues?q=is%3Aopen+is%3Aissue+archived%3Afalse+org%3Alayer5io+org%3Ameshery+org%3Alayer5labs+org%3Aservice-mesh-performance+org%3Aservice-mesh-patterns+label%3A%22good+first+issue%22) to get started

<p style="clear:both;">
<a href ="https://layer5.io/community/meshmates"><img alt="MeshMates" src=".github/readme/images/layer5-community-sign.png" style="margin-right:10px; margin-bottom:15px;" width="28%" align="left"/></a>
<h3>Find your MeshMate</h3>

<p>
  <strong>MeshMates</strong> are experienced Layer5 community members who will help you learn your way around, discover live projects, and expand your community network. Become a <strong>Meshtee</strong> today!
</p>

<p>
  🤝 <strong>What MeshMates Offer:</strong>
</p>

- Personal guidance through the Layer5 ecosystem
- Help finding projects that match your interests
- Code review and technical mentorship  
- Introduction to community practices and culture
- Networking opportunities with other contributors

Find out more on the [Layer5 community](https://layer5.io/community) page.

</p>

<div>&nbsp;</div>

### 💬 Connect With Us

<a href="https://slack.meshery.io">
<picture align="right">
  <source media="(prefers-color-scheme: dark)" srcset=".github/readme/images//slack-dark-128.png"  width="110px" align="right" style="margin-left:10px;margin-top:10px;">
  <source media="(prefers-color-scheme: light)" srcset=".github/readme/images//slack-128.png" width="110px" align="right" style="margin-left:10px;padding-top:5px;">
  <img alt="Shows an illustrated light mode meshery logo in light color mode and a dark mode meshery logo dark color mode." src=".github/readme/images//slack-128.png" width="110px" align="right" style="margin-left:10px;padding-top:13px;">
</picture>
</a>

**Communication Channels:**

- 💬 **Slack** - [Join our Slack](http://slack.layer5.io) for real-time discussions
- 🐦 **Twitter** - Follow [@layer5](https://twitter.com/layer5) for updates
- 📺 **YouTube** - Subscribe to [Layer5 channel](https://www.youtube.com/Layer5io?sub_confirmation=1)
- 💡 **Forum** - Ask questions on [discuss.layer5.io](https://discuss.layer5.io)
- 📧 **Newsletter** - Get monthly updates delivered to your inbox

<p align="center">
<i>Not sure where to start?</i> Grab an open issue with the <a href="https://github.com/issues?q=is%3Aopen+is%3Aissue+archived%3Afalse+(org%3Alayer5io+OR+org%3Ameshery+OR+org%3Alayer5labs+OR+org%3Aservice-mesh-performance+OR+org%3Aservice-mesh-patterns+OR+org%3Ameshery-extensions)+label%3A%22help+wanted%22">help-wanted label</a>.
</p>

---

## 📄 License

This repository and all contributions are licensed under the [Apache 2.0 License](LICENSE). By contributing to this project, you agree to license your contributions under the same license.

---

<p align="center">
  <strong>Built with ❤️ by the Layer5 community</strong><br/>
  <a href="https://layer5.io">Website</a> • 
  <a href="https://docs.layer5.io">Documentation</a> • 
  <a href="https://slack.layer5.io">Slack</a> • 
  <a href="https://twitter.com/layer5">Twitter</a> • 
  <a href="https://www.youtube.com/Layer5io">YouTube</a>
</p>