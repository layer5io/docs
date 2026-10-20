# Platform Development


> Preview Academy content locally, develop the Academy theme against real content, and run an end-to-end build before you publish. Includes how the Academy repositories fit together.



The Academy is assembled from separate repositories for content, theme, and build. This page shows how to preview content on your machine, how to change the theme and see the result on real content, and how to run a production-like build before you publish. Most authors need only the first workflow. Theme development and end-to-end builds are for contributors to the platform itself.

## How the repositories fit together

| Repository | Role | Who touches it |
| --- | --- | --- |
| Content repository, such as the `academy-example` starter or an organization's own repository | Your learning paths, challenges, and certifications, plus the workflow that announces a new version | Content authors |
| `academy-theme` | Layouts, colors, fonts, and the standard shortcodes. Content repositories import it as a Go module, so you never fork it to author content. | Platform contributors |
| `academy-build` | The Hugo configuration for the production build. It pins the version of the theme and of every content module. | Platform maintainers |

The path from a content change to a live Academy has three stages:

1. **Release.** Publishing a release in your content repository runs a local build as a sanity check. If the build is clean, the workflow calls the Layer5 Cloud publish API with your organization ID and the release version. The workflow validates and notifies. It does not build the site.
2. **Build.** Layer5 Cloud dispatches the central build for your organization at that version. The build collects the theme and every content module, applies the theme to the content, and produces one static site.
3. **Deploy.** The build pushes the finished site to Layer5 Cloud, which serves it to learners.

If the build fails, the previous version of your Academy stays live. Set up the repository and its publish secrets as described in [Create a Learning Path](/pr-preview/pr-1350/cloud/academy/creating-content/creating-your-learning-path/). Start from the [`academy-example`](https://github.com/layer5io/academy-example) template.

## Prerequisites

- Git and a recent Go toolchain. Content repositories use Go modules to import the theme.
- The tools that `make setup` installs, including Hugo.
- For end-to-end testing: write access to the build repository and a staging Layer5 Cloud environment. Layer5 platform maintainers hold these.

## Preview content locally

Run these commands from a content repository. The official `layer5-academy` repository is a feature-complete example of a large content repository.

```bash
go mod tidy
make setup
make site
```

`go mod tidy` verifies the module dependencies. `make setup` installs the tools and modules. `make site` starts the Hugo development server. Open `http://localhost:1313/academy` to read your content.

Local preview shows structure, content, and links. It does not show your organization's branding, and it cannot score assessments, count attempts, or record progress, because those run on the Layer5 Cloud server. See [Add Assessments](/pr-preview/pr-1350/cloud/academy/creating-content/integrating-assessments-in-the-academy/#test-your-assessment).

## Develop the theme against real content

Point a content repository at your local copy of the theme with a Go module `replace` directive.

1. Change the theme in your local clone of `academy-theme`.
2. In the content repository's `go.mod`, add:

   ```go
   replace github.com/layer5io/academy-theme => ../academy-theme
   ```

3. Run `go mod tidy`, then restart `make site`. The preview now renders with your local theme.

Remove the `replace` line and run `go mod tidy` again before you commit. A committed `replace` points other contributors, and the build, at a path that exists only on your machine.

Content repositories customize shortcodes only. They cannot override layouts or archetypes. To request a layout, archetype, or theme change, open an issue against the theme repository.

## Run an end-to-end build against staging

Use this workflow when a change must be verified inside the Layer5 Cloud interface before release. Run every command from the root of a local `academy-build` clone.

1. Install dependencies once:

   ```bash
   make setup
   ```

2. Point the build at local copies of any repository you changed, by adding `replace` directives to its `go.mod`:

   ```go
   replace github.com/layer5io/academy-theme => ../academy-theme
   replace github.com/layer5io/layer5-academy => ../layer5-academy
   ```

3. Build for staging:

   ```bash
   make stg-build
   ```

4. Sync the generated files to the staging Layer5 Cloud environment:

   ```bash
   make sync-with-cloud
   ```

5. Verify the result in staging. The change appears after about 10 minutes.







<div class="alert alert-custom" style="border-color: #EBC017;" role="alert">
  <h4 class="alert-heading" style="color: #EBC017;">Local preview is not the final product</h4>
  
      Layer5 Cloud wraps the Academy content in its own interface. CSS class conflicts and differences in how JavaScript runs inside the larger application can make the final page look or behave differently from the local preview. Verify every change in staging before you treat it as done.
  
</div>



## Inspect a production-like build

To check the final output without syncing to Layer5 Cloud, build locally from `academy-build`:

```bash
make prod-build
```

The build writes static files, including the HTML and JSON that Layer5 Cloud serves, to `public/`. Inspect them to diagnose build-time problems before you deploy.

## Working practices

- **Remove local `replace` directives** from `go.mod` and run `go mod tidy` before every commit.
- **Test in widening circles.** Preview locally, run a production-like build, then verify in staging.
- **Commit before you test in staging**, so you can trace and revert the exact change that you tested.

