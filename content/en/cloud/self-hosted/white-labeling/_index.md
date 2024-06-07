---
title: White-labeling (Rebranding)
weight: 1
categories: [Self-Hosted]
description: >
  Customize the appearance and branding of your engineering platform powered by Layer5 Cloud. 
---

You can change the logo, color scheme, domain name, and other aspects of the user interface to match your own identity and preferences. White-labeling enables you to offer a seamless and consistent experience to your customers, partners, or internal users who access your service mesh platform. White-labeling also helps you to differentiate your platform from other Layer5 Cloud users and competitors, and to enhance your brand recognition and loyalty.

## Customizing Themes

The Layer5 Cloud dashboard can be customized with your own branding, including your full-sized logo, logo mark, and color scheme.

{{< cardpane >}}
{{% card header="Dashboard Example" footer="<i>Example: CNCF branding on Dashboard</i>" %}}
This example includes a custom branding with colors and full-sized logo.
![white-label-dashboard-example.png](./images/white-label-dashboard-example.png)
{{% /card %}}
{{% card header="Catalog Example" footer="<i>Example: CNCF branding in Catalog</i>" %}}
This example includes a custom branding with colors and full-sized logo.
![white-label-catalog-example.png](./images/white-label-catalog-example.png)
{{% /card %}}
{{< /cardpane >}}

### Organization Preference

Layer5 Cloud supports customizing themes on a per organization basis. This includes the ability to upload your own logo and define your own color scheme. Your logo will be displayed in the top left corner of the dashboard. Both a full-sized logo and a logo mark are supported.

As an [Organization Administrator](/cloud/security/roles/organization-roles/), you can add your organization's logo to the global navigation bar, which supports a large, horizontal logo for desktop users and a small, square logo for mobile users. The logo appears at the top of each user's window for all Layer5 Cloud pages within your organization.

{{% card header="Prefrence Example" footer="<i>Example: Selection of theme</i>" %}}
This example shows how to customize through different themes
![white-label-catalog-example.png](./images/pref-selection.gif)
{{% /card %}}

### Custom Logos

You can upload your own logo for your organization. Logo appears in upper left corner of all Layer5 Cloud pages. All teams, workspaces, and users in your organization will use these custom logos.

Your custom logos will optionally be visible to external users if you choose to customize your login screen. Otherwise, your custom logos will only be visible to users within your organization.

If you use a mobile device, the logo mark will be visible.

#### Logo Image Requirements

Logo images must be either in SVG, PNG or GIF format. GIF images can be animated, but are not recommended given their distraction to users. The maximum file size for each image is 500 KB.
<pre>
Horizontal logo: 389 width x 32 height pixels
</pre>
If you upload a smaller or larger image, the image is resized to exactly 389 x 32 pixels. If the aspect ratio does not match, then the image will be distorted. For example, a 132 x 132 pixel image expands to 389 x 32 pixels, causing distortion.

<!-- Insert example logo here -->
<pre>
Square logo (mark):  32 width x 32 height pixels
</pre>
{{% card header="Square Logo Example" footer="<i>Example: CNCF branding on Dashboard</i>" %}}
<p>
This example includes a custom branding with colors and logo mark as would be displayed on a mobile device.</p>
<div style="width: 500px; height: 200px; overflow: hidden;">
  <img src="./images/white-label-dashboard-responsive-example.png"
  width="100%"
  style="margin-top:-.25rem;
    margin-left:-.25rem;border-radius:.25rem;
    object-fit: fill;" />
</div>
{{% /card %}}

### Uploading Your Logo

On the [Organizations page](https://meshery.layer5.io/identity/organizations), you can upload your custom logo for your organization.

1. Go to Menu and then [**Identity** > **Organization**].
1. To open the Edit window, click the pencil icon next to the organization name.
1. Click Select file to upload and select the logo image on your computer. You'll see a preview your logo.
1. Click Save, if satisfied. You may change your custom logo images at any time.

## Custom Domain Name and Login Screen

Layer5 Cloud supports customizing the login screen based on custom domain name. Redirect your users to your own domain name. For example, if your domain name is `mycompany.com`, you can redirect users to `meshery.mycompany.com`.

Example: <https://meshery.layer5.io/signup?program=cncf>

{{< youtube id=hZuhmP7lenk title="Example: Replace the Layer5 logo with your own logo." >}}
<br />
_Example: Layer5 Cloud custom branding on login screen with CNCF branding._
