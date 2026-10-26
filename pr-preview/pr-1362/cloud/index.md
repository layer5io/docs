# Cloud Documentation

> Layer5 Cloud provides a powerful platform for managing and deploying your cloud infrastructure with flexibility and ease.





<div class="pageinfo">

<h2 id="understanding-the-layer5-ecosystem" class="heading-link">
  Understanding the Layer5 Ecosystem
  <a href="#understanding-the-layer5-ecosystem" class="heading-anchor" aria-label="Permalink to this heading">🔗</a>
</h2>
<a class="highlight-box" style="display:flex; gap:1.5rem; text-decoration:none; color:inherit;">
  <span style="min-width:50px; align-self:center; line-height:1.85rem;"><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 141.73 141.73"><title>5-light-bg</title><rect id="_Path_" data-name="&lt;Path&gt;" x="79.63" y="23.97" width="36.93" height="17.79" style="fill:#00b39f"/><path id="_Path_2" data-name="&lt;Path&gt;" d="M119.92,83.9V76.53c0-8.49-7.14-15.37-15.94-15.37H44.38V56.31H22.56v21H98.1V83.9Z" style="fill:#00b39f"/><polygon id="_Path_3" data-name="&lt;Path&gt;" points="44.38 50.5 44.38 41.76 73.6 41.76 73.6 23.97 22.56 23.97 22.56 50.5 44.38 50.5" style="fill:#00d3a9"/><path id="_Path_4" data-name="&lt;Path&gt;" d="M98.1,89.62V100H68.88v17.79h36a14.77,14.77,0,0,0,15-14.49V89.62Z" style="fill:#00d3a9"/><path id="_Path_5" data-name="&lt;Path&gt;" d="M42.63,90.58V100H62.85v17.79h-26a14.77,14.77,0,0,1-15-14.49V90.58Z" style="fill:#00b39f"/></svg></span>
  <span style="margin:auto; color:#ccc; line-height:1.85rem;">
    <strong>Layer5 Cloud</strong> is the identity provider and remote provider for Kanvas and Meshery. It owns accounts, organizations, teams, workspaces, roles, and the catalog, and it stores every design and design version. It is available as a hosted service or self-hosted.
  </span>
</a>
<a href="/pr-preview/pr-1362/kanvas/" class="hidden-highlight-box" style="display:flex; gap:1.5rem; text-decoration:none; color:inherit;">
  <span style="min-width:50px; align-self:center; line-height:1.85rem;"><img src="/pr-preview/pr-1362/images/logos/kanvas-icon-color.svg" alt="Kanvas logo" style="height:65px; width:65px; border:0; background:transparent;"></span>
  <span style="margin:auto; color:#ccc; line-height:1.85rem;">
    <strong>Kanvas</strong> is a visual designer and operator for Kubernetes and multi-cloud infrastructure. It runs as an extension inside Meshery and uses Layer5 Cloud to store, share, and publish designs.
  </span>
</a>

</div>

## What is Layer5 Cloud?

Layer5 Cloud is the identity, tenancy, and collaboration service behind Kanvas and Meshery. It signs users in, organizes them into organizations, teams, and workspaces, decides what each of them may do, and stores the designs they create and share. Layer5 Cloud runs as a hosted service and as a [self-hosted](/pr-preview/pr-1362/cloud/guides/self-hosted/) deployment.

Meshery Server, running in your environment, is what talks to your Kubernetes clusters and performs every dry-run, deploy, and undeploy. Kanvas is an extension that runs inside Meshery. Kanvas sends its requests to Meshery Server, which forwards design, catalog, and sharing requests to Layer5 Cloud. Real-time collaboration signaling is the only direct path from the browser to Layer5 Cloud.

## Why use Layer5 Cloud?

- **Sign-in and identity.** Users create an account with an email address and password, with GitHub, or with Google. An organization that configures its own identity providers, including a generic OIDC provider, offers those instead. A signed-in user can link a GitHub or Google account to an existing profile, so either method signs in to the same profile. Email sign-ups verify their address before password sign-in works. After an email sign-up, Layer5 Cloud signs you in immediately, and opening the verification link verifies the address.
- **Tenancy.** Organizations own teams and workspaces. A team belongs to the organization it is created in, a workspace can hold any number of teams, and a team can belong to several workspaces. At first successful sign-in, every new user receives a default organization, team, and workspace: they hold the Organization Admin role on the organization, the Team Admin role on the team, and own the workspace.
- **Authorization.** Roles, keys, and keychains decide what each user may do. A key is a single permission, a keychain groups keys, and a role carries keychains. Users hold roles within an organization, so the same person can have different permissions in different organizations. Built-in roles cover the provider, organization, team, and workspace levels. See [Identity and Security](/pr-preview/pr-1362/cloud/concepts/identity-and-security/).
- **Design storage and sharing for Kanvas.** Layer5 Cloud persists every Kanvas design and every version of it, records who each design is shared with, and keeps the event log. A design belongs to at most one workspace at a time. Real-time collaboration in Kanvas starts with a signaling service that Layer5 Cloud hosts. After participants connect, edits synchronize directly between their browsers.
- **The catalog.** Anyone can browse the [catalog](/pr-preview/pr-1362/cloud/concepts/catalog/). A signed-in user with the Clone Design permission can clone a published or public design into their own workspace, download it, or open it in Kanvas on the [Meshery Playground](https://playground.meshery.io). Opening a design in the Playground does not clone it.
- **Remote provider for Meshery Server.** Users sign in to Meshery through Layer5 Cloud, Meshery Server registers itself as a connection owned by the signed-in user, and Layer5 Cloud returns a capabilities document that tells Meshery which features to enable for that user. Every new user holds the Kanvas role, which enables the Kanvas extension when their Meshery Server connects.
- **Academy.** [Academy](/pr-preview/pr-1362/cloud/academy/) delivers learning paths, challenges, and certifications, and gives content creators the tools to build and publish their own.

## What Layer5 Cloud does not do

- **Cluster deploy and cluster management stay with Meshery Server.** Meshery Server talks to your Kubernetes clusters through Meshery Operator and MeshSync, and performs every dry-run, deploy, and undeploy.
- **Kanvas runs inside Meshery.** Kanvas sends its requests to Meshery Server, which forwards design, catalog, and sharing requests to Layer5 Cloud. Real-time collaboration signaling is the only direct path from the browser to Layer5 Cloud.

[Concepts](/pr-preview/pr-1362/cloud/concepts/) explains how the building blocks relate, including how Layer5 Cloud, Meshery Server, and Kanvas divide the work.

## Plans

Layer5 sells four plans: Free, Team Designer, Team Operator, and Enterprise, each with monthly and annual billing. In subscription and entitlement records the Free plan is named Personal. Entitlements follow the organization's plan. Current prices are on the [pricing page](https://layer5.io/pricing).

Layer5 Cloud enforces one plan limit: components per design. The recorded limits are 100 on Free, 200 on Team Designer, 100 on Team Operator, and 300 on Enterprise. Saving or importing a design over the active plan's limit is refused with `Design exeeds maximum limit of N components supported by your current plan`. When an organization holds more than one active subscription, the highest component limit among them applies. An organization with no active subscription cannot save or import a design: the request fails with HTTP 500 and `Org is not entitled to adding components to a design`.

Other recorded quantities (relationships per design, image size, designs per workspace, workspaces per organization) are listed by `GET /api/entitlement/features` and are not enforced. For workspaces per organization on the Free plan, the plan records disagree: the monthly billing record sets 1 and the annual billing record sets 10. Authorization is by permission key. An action your role does not grant is refused with HTTP 403 even when the plan includes the capability. See [Subscriptions and billing](/pr-preview/pr-1362/cloud/getting-started/getting-started-with-layer5-account/#subscriptions-and-billing) for how a subscription is started, upgraded, and canceled.

<!-- <div><a id="td-block-7" class="td-anchor-no-extra-offset"></a></div>
<section class="row td-box td-box--dark td-box--height-auto">
<div class="col">
<div class="row">


<div class="col-lg-4 mb-5 mb-lg-0 text-center">
<div class="mb-4 h1">
  <i class="fas fa-lightbulb"></i>
</div>
<h4 class="h3">Fastest OS <strong>on the planet</strong>!</h4>
<div class="mb-0">
<p>The new <strong>TechOS</strong> operating system is an open source project. It is a new project, but with grand ambitions.
Please follow this space for updates!</p>

</div>

</div>

<div class="col-lg-4 mb-5 mb-lg-0 text-center">
<div class="mb-4 h1">
  <i class="fas fa-brands fa-github"></i>
</div>
<h4 class="h3">Contributions welcome!</h4>
<div class="mb-0">
<p>We do a <a href="https://github.com/gohugoio/hugo/pulls">Pull Request</a> contributions workflow on <strong>GitHub</strong>. New users are always welcome!</p>

</div>
<p><a href="https://github.com/gohugoio/hugo">Read more</a></p>
</div>

<div class="col-lg-4 mb-5 mb-lg-0 text-center">
<div class="mb-4 h1">
  <i class="fas ./featured-background.png"></i>
</div>
<h4 class="h3">Kanvas</h4>
<div class="mb-0">
<p><strong>Kanvas</strong> provides a visual interface that allows users to create and edit Kubernetes manifests, charts and pipelines, as well as monitor the performance and health of their clusters. Kanvas aims to simplify the complexity of Kubernetes and make it accessible to more users, similar to how Figma democratized design tools for web and mobile applications.</p>

</div>
<p><a href="/kanvas">Read more</a></p>
</div>

</div>
</div>
</section>
 -->

