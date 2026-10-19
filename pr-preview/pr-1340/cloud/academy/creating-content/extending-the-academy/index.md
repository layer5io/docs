# Extend the Academy


> Go beyond plain Markdown in your Academy content with inline HTML and CSS, organization-specific Hugo shortcodes, embedded Kanvas designs, and branded award emails.



Academy content is Markdown in your organization's Git repository, built with Hugo into your organization's Academy. Markdown covers most lessons. When a lesson needs a custom layout, a reusable component, or a live design, you extend the content in your own repository without touching the shared theme.

This page covers what you can extend and the limits of each extension. It assumes a working content repository. If you do not have one yet, start with [Create a Learning Path](/pr-preview/pr-1340/cloud/academy/creating-content/creating-your-learning-path/).

## Availability

Publishing your own Academy content is an Enterprise-tier capability. Your organization also needs an Academy configuration from Layer5 before it can publish. Without one, the Instructor Console shows its "not configured" state and the extensions below have nowhere to deploy. See [Roles and Permissions](/pr-preview/pr-1340/cloud/reference/default-permissions/) for who can use the console.

## What you can extend

| Extension | Where it lives | Scope |
| --- | --- | --- |
| Inline HTML and CSS | Your Markdown pages | The page that contains it |
| Custom shortcode | `layouts/shortcodes/<organization-id>/` in your repository | Every page in your organization's content |
| Embedded Kanvas design | A shortcode in your page | The page that contains it |
| Branded award emails | Organization settings in Layer5 Cloud | Every badge and certificate email your organization sends |

You cannot replace the theme's layouts, archetypes, or site-wide styles from a content repository. You can customize shortcodes only. Request theme changes through the theme's issue tracker.

## Keep your files in your organization's directory

Each organization's files live under a directory named for its organization ID, which the Template Creator shows on its final step. The Academy build keeps organizations apart by that directory name, so content or shortcodes placed outside it are not part of your Academy. Use the same ID for the content directory and for the shortcode directory.

## Mix HTML and CSS with Markdown

Markdown pages accept raw HTML. Use it for layout that Markdown cannot express, such as columns, callout boxes, or styled tables.

```markdown
## Why this matters

Standard **Markdown** works above and below the block.

<div class="lesson-note" style="padding: 1rem; border-left: 4px solid #00b39f;">
  <strong>Note:</strong> Use inline HTML for one-off layout.
</div>
```

Leave a blank line between a raw HTML block and the Markdown that follows it. Without the blank line, Hugo does not parse the next Markdown element and it renders as literal text. Markdown inside an HTML element is parsed only when blank lines separate it from the tags, so write short content inside HTML elements in HTML.

Style with inline `style` attributes, with CSS classes you define in a shortcode's `<style>` block, or with the theme's existing classes. Inline styles apply to one element. CSS in a shortcode applies wherever the shortcode renders.

## Create a custom shortcode

A shortcode is a reusable template that takes parameters and returns HTML. Define it once and call it from any page in your organization's content.

1. Create the template at `layouts/shortcodes/<organization-id>/callout.html` in your content repository.

   ```html
   <style>
   .org-callout {
     padding: 1rem;
     margin: 1rem 0;
     border-left: 4px solid #00b39f;
   }
   </style>
   <div class="org-callout">
     <strong>{{ .Get "title" | default "Note" }}:</strong> {{ .Inner }}
   </div>
   ```

2. Call it from a page by its file name, without the extension. The tags below are escaped for display. Write them as `{{< callout title="Heads up" >}}` and `{{< /callout >}}`.

   ```markdown
   {{< callout title="Heads up" >}}
   Back up the design before you scale it down.
   {{< /callout >}}
   ```

Hugo reads `{{ .Get "title" }}` as a named parameter and `{{ .Inner }}` as the content between the opening and closing tags. A shortcode written without a closing tag cannot use `.Inner`. The Academy supports the full Hugo shortcode feature set. See the [Hugo shortcode documentation](https://gohugo.io/content-management/shortcodes/).







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Name collisions</h4>
  
      Choose names that do not match a shortcode the theme already provides. Use a prefix that is specific to your organization.
  
</div>



## Embed a Kanvas design

The Academy renders live Kanvas designs inside a lesson with the `meshery-design-embed` shortcode, so learners inspect a real topology instead of a screenshot. See the publishing diagram in [Create a Learning Path](/pr-preview/pr-1340/cloud/academy/creating-content/creating-your-learning-path/#publish) for a working embed.

## Award emails

When a learner earns a badge or a certificate, Layer5 Cloud sends an email on behalf of your organization. Both messages draw their branding from your organization's settings, including your logo, colors, and contact links. See [White-label Layer5 Cloud](/pr-preview/pr-1340/cloud/guides/self-hosted/white-labeling/) for how to set them.

| | Badge email | Certificate email |
| --- | --- | --- |
| Sent when | A badge is awarded | The learner passes the final assessment of content that defines a certificate |
| Subject | Names the organization that awarded the badge | Congratulations on receiving your certificate title certificate from organization name |
| Recipient | The learner | The learner, addressed by first and last name |
| Learner can turn it off | Yes, through the badge assignment and updates notification preference | No |
| Links | Learner's public profile | The certificate's public page on your organization's Academy |

The certificate link points to your organization's custom domain when one is set. Otherwise it points to the deployment's base address. If the branding settings cannot be read when the email is sent, the email still goes out with default branding. A failure to send the certificate email is logged and does not undo the completion or the certificate.

Anonymous users never receive a badge email.

