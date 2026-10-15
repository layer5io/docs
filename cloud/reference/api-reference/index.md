# Cloud API

> How to authenticate to the Layer5 Cloud REST API, choose the organization a request runs in, page through results, and handle errors.


The Layer5 Cloud REST API lets you build integrations, retrieve data, and automate your infrastructure. This page states the conventions every endpoint shares: base URL, authentication, organization context, pagination, and errors. For the list of endpoints, see the [REST API Reference](/cloud/reference/api-reference/rest/).

## Base URL

Every endpoint lives under `/api` on the host of your Layer5 Cloud deployment.

| Deployment | Base URL |
|---|---|
| Hosted Layer5 Cloud | `https://cloud.layer5.io/api` |
| Self-hosted | `https://<your-cloud-host>/api` |

## Authentication

Authenticate with a [security token](/cloud/concepts/identity-and-security/tokens/). Send it as a bearer token in the `Authorization` header:

```bash
curl https://cloud.layer5.io/api/identity/users/profile \
  -H "Authorization: Bearer <token>"
```

When a request has no `Authorization` header, Layer5 Cloud reads the browser session cookie instead. Scripts and integrations always send the header.

A token belongs to your user account, not to an organization. One token reaches every organization you are a member of, the way a GitHub personal access token reaches every repository its owner can. A request with a missing or invalid credential receives HTTP 401.

What a token can do is the same as what you can do: every guarded endpoint checks that you hold the required permission in the organization the request runs in. See [Roles and Permissions](/cloud/reference/default-permissions/).

## Organization context

A guarded request runs in one organization. Layer5 Cloud resolves the organization from these sources, in this order:

1. The `X-Current-Orgid` request header.
2. The organization saved in your user preferences.
3. The organization saved in your browser session (browser clients only).

Header names are case-insensitive. The first source that holds a value wins.

| Condition | Result |
|---|---|
| The value is the ID of an organization you belong to | The request runs in that organization. |
| The value is not a valid ID, or names an organization you do not belong to | Layer5 Cloud ignores it and runs the request with no organization scope. This is not an error by itself. The endpoint decides what to return. |
| The value is `all` | The request spans every organization, but only for callers who hold the View All Organizations permission (Provider Admin by default). For everyone else Layer5 Cloud ignores `all`. |
| A Provider Admin names an organization they do not belong to | The request runs in that organization. |







<div class="alert alert-custom" style="border-color: #EBC017;" role="alert">
  <h4 class="alert-heading" style="color: #EBC017;">Check the header name</h4>
  
      Layer5 Cloud reads <code>X-Current-Orgid</code> only. A header with any other name, including <code>layer5-current-orgid</code>, has no effect, and the request silently falls back to your saved organization.
  
</div>







<ul class="nav nav-tabs" id="tabs-4" role="tablist">
  <li class="nav-item">
      <button class="nav-link active"
          id="tabs-04-00-tab" data-bs-toggle="tab" data-bs-target="#tabs-04-00" role="tab"
          aria-controls="tabs-04-00" aria-selected="true">
        cURL
      </button>
    </li><li class="nav-item">
      <button class="nav-link"
          id="tabs-04-01-tab" data-bs-toggle="tab" data-bs-target="#tabs-04-01" role="tab"
          aria-controls="tabs-04-01" aria-selected="false">
        JavaScript
      </button>
    </li><li class="nav-item">
      <button class="nav-link"
          id="tabs-04-02-tab" data-bs-toggle="tab" data-bs-target="#tabs-04-02" role="tab"
          aria-controls="tabs-04-02" aria-selected="false">
        Python
      </button>
    </li>
</ul>

<div class="tab-content" id="tabs-4-content">
    <div class="tab-pane fade show active"
        id="tabs-04-00" role="tabpanel" aria-labelled-by="tabs-04-00-tab" tabindex="4">
        <pre tabindex="0"><code>curl -X GET &#34;https://cloud.layer5.io/api/environments&#34; \
  -H &#34;Authorization: Bearer &lt;Your-Token&gt;&#34; \
  -H &#34;X-Current-Orgid: &lt;Your-Organization-ID&gt;&#34;</code></pre>
    </div>
    <div class="tab-pane fade"
        id="tabs-04-01" role="tabpanel" aria-labelled-by="tabs-04-01-tab" tabindex="4">
        <pre tabindex="0"><code>const res = await fetch(&#34;https://cloud.layer5.io/api/environments&#34;, {
  headers: {
    Authorization: `Bearer ${token}`,
    &#34;X-Current-Orgid&#34;: orgId,
  },
});
const data = await res.json();</code></pre>
    </div>
    <div class="tab-pane fade"
        id="tabs-04-02" role="tabpanel" aria-labelled-by="tabs-04-02-tab" tabindex="4">
        <pre tabindex="0"><code>import requests

res = requests.get(
    &#34;https://cloud.layer5.io/api/environments&#34;,
    headers={
        &#34;Authorization&#34;: &#34;Bearer &lt;Your-Token&gt;&#34;,
        &#34;X-Current-Orgid&#34;: &#34;&lt;Your-Organization-ID&gt;&#34;,
    },
)
print(res.json())</code></pre>
    </div>
</div>


### Save a default organization and workspace

To make an organization the default for every request that omits the header, save it in your user preferences:

```bash
curl -X PUT "https://cloud.layer5.io/api/identity/users/preferences" \
  -H "Authorization: Bearer <Your-Token>" \
  -H "Content-Type: application/json" \
  -d '{
    "selectedOrganizationId": "<Your-Organization-ID>",
    "selectedWorkspaceForOrganizations": {
      "<Your-Organization-ID>": "<Your-Workspace-ID>"
    }
  }'
```

- `selectedOrganizationId` is the default organization. The key is case-insensitive.
- `selectedWorkspaceForOrganizations` maps an organization ID to the workspace that receives the designs you save in it. When an organization has no saved workspace, Layer5 Cloud uses the first workspace available.
- A preference key that the request does not mention keeps its stored value. A key the server does not recognize, such as `selectedOrganization`, is ignored.
- You cannot change your badges through this endpoint.

## Pagination

List endpoints that paginate accept these query parameters.

| Parameter | Default | Behavior |
|---|---|---|
| `page` | `0` | Zero-based page number. A negative value becomes `0`. |
| `pageSize` | `10` | Items per page. The maximum is `100`; a larger value becomes `100`, and zero or a negative value becomes `10`. |
| `order` | Endpoint-specific | Sort field and direction, for example `updated_at desc`. |
| `search` | None | Filters items by text. |

The response carries the current page, the page size, the total count, and the array of items.

## Errors

An error response is identified by its HTTP status code. The body takes one of three shapes, depending on the endpoint.

| Shape | Where you see it | Example |
|---|---|---|
| JSON with `message` | Authentication failures and some middleware refusals | `{"message": "user must be logged in to perform this operation"}` |
| JSON with `error` | Permission refusals and endpoints that report structured errors. May also carry `code`, `severity`, `probableCause`, and `suggestedRemediation`. | `{"error": "You do not hold the permission this action requires in this organization", "code": "..."}` |
| Plain text | Endpoints that report a short message, for example a malformed request body | `malformed request body` |

| Status | Meaning |
|---|---|
| 400 | The request is malformed or a required parameter is missing. |
| 401 | The credential is missing, invalid, or expired. |
| 403 | You do not hold the permission the endpoint requires in the organization of the request. |
| 500 | The server could not complete the request. |

Branch on the status code first, then parse the body defensively. The generated [REST API Reference](/cloud/reference/api-reference/rest/) documents 401 responses as plain text, but the authentication layer answers with JSON.

## Example: count Academy registrations

The Academy curricula endpoint is public. It needs no token. It returns curricula, each with its registration count.




<ul class="nav nav-tabs" id="tabs-6" role="tablist">
  <li class="nav-item">
      <button class="nav-link active"
          id="tabs-06-00-tab" data-bs-toggle="tab" data-bs-target="#tabs-06-00" role="tab"
          aria-controls="tabs-06-00" aria-selected="true">
        cURL
      </button>
    </li><li class="nav-item">
      <button class="nav-link"
          id="tabs-06-01-tab" data-bs-toggle="tab" data-bs-target="#tabs-06-01" role="tab"
          aria-controls="tabs-06-01" aria-selected="false">
        Python
      </button>
    </li>
</ul>

<div class="tab-content" id="tabs-6-content">
    <div class="tab-pane fade show active"
        id="tabs-06-00" role="tabpanel" aria-labelled-by="tabs-06-00-tab" tabindex="6">
        <pre tabindex="0"><code>curl -s &#34;https://cloud.layer5.io/api/academy/curricula&#34; \
  | jq &#39;[.data[].registration_count] | add&#39;</code></pre>
    </div>
    <div class="tab-pane fade"
        id="tabs-06-01" role="tabpanel" aria-labelled-by="tabs-06-01-tab" tabindex="6">
        <pre tabindex="0"><code>import requests

res = requests.get(&#34;https://cloud.layer5.io/api/academy/curricula&#34;)
total = sum(item[&#34;registration_count&#34;] for item in res.json()[&#34;data&#34;])
print(total)</code></pre>
    </div>
</div>


The result is a single number, the total registrations across the curricula returned.

