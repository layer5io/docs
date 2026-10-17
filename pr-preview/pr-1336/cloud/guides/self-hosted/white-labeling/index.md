# White-label Layer5 Cloud

> Present Layer5 Cloud under your own brand: theme, logos, contact links, custom domains, and sender address. Covers what the deployment owner configures, what each organization configures, and how branded sign-in behaves.



White-labeling lets the people who use your deployment see your brand, not Layer5's: your logo and colors in the product, your support and legal links on sign-in pages and in email footers, your domain in the address bar, and your address on the mail they receive. Branding is set per organization, so a provider that hosts many organizations can give each its own identity.

White-labeling is part of the Managed Service Provider capability of the Enterprise plan.












































































































































































































































































































































































































































































<div class="feature-tiers">

<table class="feature-tiers-table">
  <caption>Support and Deployment</caption>
  <thead>
    <tr>
      <th scope="col">Capability</th>
      <th scope="col">What it does</th>
      <th scope="col">Free</th>
      <th scope="col">Team Designer</th>
      <th scope="col">Team Operator</th>
      <th scope="col">Enterprise</th>
    </tr>
  </thead>
  <tbody>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    <tr>
      <th scope="row">Managed Service Provider</th>
      <td>White Label: Customize the appearance and branding of your engineering platform powered by Cloud.
<br /><br />Multi-tenancy: Hierarchical organizations, teams, users and customizable permissioning.</td>
      
      
      <td class="tier-cell"><span aria-hidden="true">-</span><span class="sr-only">Not included</span></td>
      
      <td class="tier-cell"><span aria-hidden="true">-</span><span class="sr-only">Not included</span></td>
      
      <td class="tier-cell"><span aria-hidden="true">-</span><span class="sr-only">Not included</span></td>
      
      <td class="tier-cell"><span aria-hidden="true">&#10003;</span><span class="sr-only">Included</span></td>
      
    </tr>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
  </tbody>
</table>

</div>


You do not need to self-host to white-label. A hosted organization can use the same theme, logos, links, domain, and mail settings. Self-hosting adds one thing: you also decide the provider-level defaults that every organization inherits.

## What you can brand, and who sets it

| What | Set by | Where it appears | Details |
| --- | --- | --- | --- |
| Theme colors and four logos (desktop, mobile, dark desktop, dark mobile) | Organization Administrator | The signed-in product, and sign-in, sign-up, and error pages on the organization's own domain | [Branding](/pr-preview/pr-1336/cloud/guides/organizations/org-management/#branding) |
| Contact and legal links | Organization Administrator, or the Provider Organization for defaults | Sign-in pages and email footers | [Contact information in email](#contact-information-in-email-notifications) |
| Custom domain | Provider Admin | The address users reach the organization at | [Configure a custom domain](#configuring-a-subdomain) |
| Sign-in providers | Organization Administrator | The consent screen of Google, GitHub, or your OIDC provider | [Identity Services](/pr-preview/pr-1336/cloud/guides/self-hosted/planning/identity-services/) |
| Sender address and mail server | Organization Administrator | The `From` address of invitations and notifications | [Bring Your Own Mail Server](/pr-preview/pr-1336/cloud/guides/organizations/org-management/bring-your-own-mail-server/) |
| Dashboard layout | Organization Administrator | The widgets every member sees on the dashboard | [Dashboard layout](#dashboard-layout) |

Theme colors accept only hexadecimal values, and each logo can be at most 500 KB. Layer5 Cloud rejects a color or an oversized logo with an error that names it. The full rules are in [Branding](/pr-preview/pr-1336/cloud/guides/organizations/org-management/#branding).

For the named combinations of domain and identity provider (Hosted, Branded, and White-Label) and when to choose each, see [Organization Configuration Scenarios](/pr-preview/pr-1336/cloud/guides/organizations/configuration-scenarios/).

## Contact information in email notifications

White-labeling reaches past the browser. The footer of every transactional email, including invitations, welcome mail, role changes, catalog publish decisions, design comment mentions, and email verification and recovery codes, is built from the organization's contact information instead of Layer5's.

The same five link fields drive the sign-in pages and the email footers:

| Field | Where it appears in email |
| --- | --- |
| Support Email | The "email" contact link in the footer |
| Discussion Forum URL | The "forum" contact link and the forum icon |
| Slack URL | The "slack" contact link and the Slack icon |
| Privacy Policy URL | The "privacy policy" link in the footer's legal line |
| Terms of Service URL | The "terms of service" link in the footer's legal line |

### How each field is resolved

Resolution is per field. Layer5 Cloud resolves each of the five fields independently, in this order:

1. The organization's own value, when it has set that field.
2. The Provider Organization's value for that field.
3. The Layer5 default in the email template: `support@layer5.io`, `discuss.meshery.io`, `slack.layer5.io`, and the Layer5 Cloud legal pages.

Filling in one field never blanks the others. A field that is empty or only whitespace counts as unset.

On a self-hosted deployment, the second tier is your Provider Organization, not Layer5. Set the five fields on your Provider Organization once, and every organization that has not set its own gives its users your support channels and legal pages, never Layer5's.

### Value formats

Layer5 Cloud normalizes each value before it renders it, so every link works from a mail client:

- A root-relative value such as `/legal/privacy-policy.html` resolves against the organization's own host: its custom domain when it has one, and the deployment's base URL otherwise.
- A bare email address becomes a `mailto:` link.
- Absolute `http://`, `https://`, `mailto:`, and `tel:` values are used as given.
- `javascript:`, `data:`, and protocol-relative (`//host`) values are dropped, and the field falls back as if it were unset.

The message footer and the sender address are separate. By default every message leaves through the deployment's shared mail server, so a fully branded email still arrives from the shared address. An organization that registers its own mail server sends from its own domain. See [Bring Your Own Mail Server](/pr-preview/pr-1336/cloud/guides/organizations/org-management/bring-your-own-mail-server/).

## Custom domain and sign-in

A custom domain makes an organization reachable at an address such as `meshery.example.com`, with the organization's branding on the sign-in, sign-up, and error pages. Users can still reach the organization through your deployment's own address.

Setting a custom domain involves three parties: you, as Provider Admin, who assign it; the owner of the DNS zone, who points it at your deployment; and your ingress, which must accept the hostname.

### Configuring a subdomain {#configuring-a-subdomain}

1. **Assign the domain.** A Provider Admin enters the domain in the organization's settings. Only a Provider Admin can set a new domain; an organization administrator can only clear one. Layer5 Cloud checks the format and uniqueness when you save, and does not look the name up in DNS. See [Domain](/pr-preview/pr-1336/cloud/guides/organizations/org-management/#domain) for the validation rules. Lookups are cached for five minutes, and every organization change clears the affected entry immediately.
2. **Point DNS at your deployment.** Create a `CNAME` record that points the custom hostname to your deployment's hostname. For example, point `hub.example.org` to `cloud.example.com`. Use an internationalized name in its Punycode form.
3. **Let the ingress accept the host.** Add the custom hostname to `ingress.hosts` with the same paths as your main host, and add it to `ingress.tls` with a certificate that covers it. The chart routes only the hosts you list.
4. **Set `env.proto` to `https`.** The server builds redirects to the custom domain from that value.
5. **Verify.** Confirm the record resolves to your deployment with `dig hub.example.org CNAME +short`, then open the custom address and confirm the organization's sign-in page loads.












<div class="alert alert-warning" role="alert">
  <h4 class="alert-heading">Do not use wildcard DNS records</h4>
  
      A wildcard record such as <code>*.example.org</code> puts you at risk of domain takeover, even when you assign the apex domain. A name nested below an assigned name, such as <code>b.a.example.org</code>, is still covered by the wildcard, and anyone who can claim it can serve content as you. Create one record per hostname.
  
</div>



Removing the domain, by clearing the field, takes the organization off that address. Users who rely on the old address lose access through it, so plan the change with the organization.












<div class="alert alert-warning" role="alert">
  <h4 class="alert-heading">Changing a custom domain can break Academy content</h4>
  
      If the organization uses an external Academy, a change of custom domain also requires renaming its organization folder in the Academy content repository to match. See <a href="/pr-preview/pr-1336/cloud/academy/creating-content/extending-the-academy/">Extending the Academy</a>.
  
</div>



### Social sign-in on a custom domain {#social-sign-in-on-a-custom-domain}

Social sign-in with Google and GitHub works on every custom domain, with no per-organization setup. This holds whether the custom domain is a subdomain of your deployment's base domain (its registrable domain, for example `example.com`) or a fully custom domain on a different base domain. In every case the Google and GitHub buttons appear next to email-and-password sign-in, and they complete through the deployment's default identity providers.

An organization brings its own identity provider only to change whose OAuth application and consent screen users see, to gain its own rate limits and audit trail, or to form a separate authentication boundary. It is never needed to make social sign-in available. Organizations that share an identity provider share one authentication boundary regardless of how their hostnames look. See [The identity provider is the security boundary](/pr-preview/pr-1336/cloud/guides/self-hosted/planning/identity-services/#the-identity-provider-is-the-security-boundary).

Signup on a fully custom domain is exempt from reCAPTCHA, because the deployment's reCAPTCHA keys are registered for its own hostname.

## Dashboard layout

An organization administrator can choose which prebuilt widgets appear on the dashboard of every member, and how they are arranged and sized. A change is private until the administrator publishes it, and a reset returns the dashboard to the default layout. Each prebuilt widget can appear only once on a dashboard.

## Frequently asked questions

**Do I need to self-host to white-label?** No. Themes, logos, links, domains, and mail settings are available to hosted organizations too.

**Must users use the custom address?** No. Users can always sign in through your deployment's own address and reach their organization.

**Do people need to be signed in to open a link that contains the custom address?** Yes, signed in through that address. A signed-out person who opens the link is asked to sign in and is then sent on to it.

**The custom domain works for colleagues but not for me.** A local proxy, VPN, or network accelerator may intercept the request before it reaches the network. Test from a network without them.

