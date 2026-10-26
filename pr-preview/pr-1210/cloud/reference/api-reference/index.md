# Cloud API

> REST APIs for integrating with and extending Layer5 Cloud.



To create integrations, retrieve data, and automate your cloud native infrastructure, build with the Layer5 Cloud REST API.

Every endpoint lives under `/api` on the host of your Layer5 Cloud deployment. Hosted Layer5 Cloud uses `https://cloud.layer5.io/api`. A self-hosted deployment uses `https://<your-cloud-host>/api`.

## Authenticating with the API

In order to authenticate to Layer5 Cloud's REST API, you need to generate and use a [security token](/pr-preview/pr-1210/cloud/concepts/identity-and-security/tokens/). Visit your [user account's security tokens](https://cloud.layer5.io/security/tokens) and generate a long-lived token. Security tokens remain valid until you revoke them, and you can issue as many as you need.

A token belongs to your user account, not to an organization. One token reaches every organization you are a member of. What a token can do is the same as what you can do: every guarded endpoint checks that you hold the required permission in the organization the request runs in. See [Default Permissions](/pr-preview/pr-1210/cloud/reference/default-permissions/).

When a request has no `Authorization` header, Layer5 Cloud reads the browser session cookie instead. Scripts and integrations always send the header. A request with a missing or invalid credential receives HTTP 401. The body is JSON, `{"message": "user must be logged in to perform this operation"}`.

To authenticate with the API, pass the token as a bearer token in the `Authorization` header. For example, in cURL:

```bash
curl <protocol>://<Layer5-cloud-hostname>/api/identity/users/profile \
-H "Authorization: Bearer <token>"
```

- Replace `<protocol>` with `http` or `https` depending on your Layer5 Cloud instance.
- Replace `<Layer5-cloud-hostname>` with the hostname or IP address of your hosted Layer5 Cloud instance. For example, [`https://cloud.layer5.io`](https://cloud.layer5.io).
- Replace the path with the API endpoint you want to access.
- Replace `<token>` with the security token you generated.

## Specifying Organization Context







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">API Tokens are User-Scoped</h4>
  
      <p>Layer5 Cloud API tokens are scoped to your user account, not to a specific organization. This means a single API token provides access to all organizations you are a member of. For users who belong to multiple organizations, you need to explicitly specify which organization your API requests should operate on.</p>
<p>This is similar to how <a href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens">GitHub Personal Access Tokens</a> work, where a single token grants access to all repositories and organizations the user has access to.</p>

  
</div>



A guarded request runs in one organization. Layer5 Cloud resolves the organization from these sources, in this order:

1. The request's host. A request that arrives on an organization's custom domain runs in that organization, and the sources below are not consulted. Requests to the deployment's own address skip this step.
2. The `X-Current-Orgid` request header.
3. The organization saved in your user preferences.
4. The organization saved in your browser session (browser clients only).

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



### Using the X-Current-Orgid Header {#using-the-layer5-current-orgid-header}

Include the `X-Current-Orgid` header with your organization's ID to specify the target organization for a request:








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
        <pre tabindex="0"><code>const token = &#34;Your-Token&#34;;
const orgId = &#34;Your-Organization-ID&#34;;

async function listEnvironments() {
  const res = await fetch(&#34;https://cloud.layer5.io/api/environments&#34;, {
    method: &#34;GET&#34;,
    headers: {
      Authorization: `Bearer ${token}`,
      &#34;X-Current-Orgid&#34;: orgId,
    },
  });
  const data = await res.json();
  console.log(data);
}

listEnvironments();</code></pre>
    </div>
    <div class="tab-pane fade"
        id="tabs-04-02" role="tabpanel" aria-labelled-by="tabs-04-02-tab" tabindex="4">
        <pre tabindex="0"><code>import requests

url = &#34;https://cloud.layer5.io/api/environments&#34;
headers = {
    &#34;Authorization&#34;: &#34;Bearer &lt;Your-Token&gt;&#34;,
    &#34;X-Current-Orgid&#34;: &#34;&lt;Your-Organization-ID&gt;&#34;
}

res = requests.get(url, headers=headers)
print(res.json())</code></pre>
    </div>
</div>


### Setting Organization and Workspace Preferences

To make an organization the default for every request that omits the header, save it in your user preferences:








<ul class="nav nav-tabs" id="tabs-5" role="tablist">
  <li class="nav-item">
      <button class="nav-link active"
          id="tabs-05-00-tab" data-bs-toggle="tab" data-bs-target="#tabs-05-00" role="tab"
          aria-controls="tabs-05-00" aria-selected="true">
        cURL
      </button>
    </li><li class="nav-item">
      <button class="nav-link"
          id="tabs-05-01-tab" data-bs-toggle="tab" data-bs-target="#tabs-05-01" role="tab"
          aria-controls="tabs-05-01" aria-selected="false">
        JavaScript
      </button>
    </li><li class="nav-item">
      <button class="nav-link"
          id="tabs-05-02-tab" data-bs-toggle="tab" data-bs-target="#tabs-05-02" role="tab"
          aria-controls="tabs-05-02" aria-selected="false">
        Python
      </button>
    </li>
</ul>

<div class="tab-content" id="tabs-5-content">
    <div class="tab-pane fade show active"
        id="tabs-05-00" role="tabpanel" aria-labelled-by="tabs-05-00-tab" tabindex="5">
        <pre tabindex="0"><code># Set organization and workspace preferences
curl -X PUT &#34;https://cloud.layer5.io/api/identity/users/preferences&#34; \
 -H &#34;Authorization: Bearer &lt;Your-Token&gt;&#34; \
 -H &#34;Content-Type: application/json&#34; \
 -d &#39;{
   &#34;selectedOrganizationId&#34;: &#34;&lt;Your-Organization-ID&gt;&#34;,
   &#34;selectedWorkspaceForOrganizations&#34;: {
     &#34;&lt;Your-Organization-ID&gt;&#34;: &#34;&lt;Your-Workspace-ID&gt;&#34;
   }
 }&#39;</code></pre>
    </div>
    <div class="tab-pane fade"
        id="tabs-05-01" role="tabpanel" aria-labelled-by="tabs-05-01-tab" tabindex="5">
        <pre tabindex="0"><code>const token = &#34;Your-Token&#34;;

async function setPreferences() {
  const res = await fetch(&#34;https://cloud.layer5.io/api/identity/users/preferences&#34;, {
    method: &#34;PUT&#34;,
    headers: {
      Authorization: `Bearer ${token}`,
      &#34;Content-Type&#34;: &#34;application/json&#34;,
    },
    body: JSON.stringify({
      selectedOrganizationId: &#34;&lt;Your-Organization-ID&gt;&#34;,
      selectedWorkspaceForOrganizations: {
        &#34;&lt;Your-Organization-ID&gt;&#34;: &#34;&lt;Your-Workspace-ID&gt;&#34;,
      },
    }),
  });
  const data = await res.json();
  console.log(data);
}

setPreferences();</code></pre>
    </div>
    <div class="tab-pane fade"
        id="tabs-05-02" role="tabpanel" aria-labelled-by="tabs-05-02-tab" tabindex="5">
        <pre tabindex="0"><code>import requests
import json

url = &#34;https://cloud.layer5.io/api/identity/users/preferences&#34;
headers = {
    &#34;Authorization&#34;: &#34;Bearer &lt;Your-Token&gt;&#34;,
    &#34;Content-Type&#34;: &#34;application/json&#34;
}
payload = {
    &#34;selectedOrganizationId&#34;: &#34;&lt;Your-Organization-ID&gt;&#34;,
    &#34;selectedWorkspaceForOrganizations&#34;: {
        &#34;&lt;Your-Organization-ID&gt;&#34;: &#34;&lt;Your-Workspace-ID&gt;&#34;
    }
}

res = requests.put(url, headers=headers, data=json.dumps(payload))
print(res.json())</code></pre>
    </div>
</div>


- `selectedOrganizationId` is the default organization. The key is case-insensitive.
- `selectedWorkspaceForOrganizations` maps an organization ID to the workspace that receives the designs you save in it. When an organization has no saved workspace, Layer5 Cloud uses the first workspace available.
- A preference key that the request does not mention keeps its stored value. A key the server does not recognize, such as `selectedOrganization` or `selectedWorkspace`, is ignored.
- You cannot change your badges through this endpoint.

## API Example

The following example demonstrates how to retrieve information from the Academy REST APIs.

### Get the total number of registered learners in Academy

Use the Layer5 Cloud API to retrieve the *total* number of registered learners. The Academy curricula endpoint is public. It needs no token. It returns curricula, each with its registration count. The path is `/api/academy/curricula`.











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
        JavaScript
      </button>
    </li><li class="nav-item">
      <button class="nav-link"
          id="tabs-06-02-tab" data-bs-toggle="tab" data-bs-target="#tabs-06-02" role="tab"
          aria-controls="tabs-06-02" aria-selected="false">
        Python
      </button>
    </li><li class="nav-item">
      <button class="nav-link"
          id="tabs-06-03-tab" data-bs-toggle="tab" data-bs-target="#tabs-06-03" role="tab"
          aria-controls="tabs-06-03" aria-selected="false">
        Golang
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
        <pre tabindex="0"><code>async function getTotalLearners() {
  const res = await fetch(&#34;https://cloud.layer5.io/api/academy/curricula&#34;);
  const data = await res.json();
  const total = data.data.reduce((sum, path) =&gt; sum + path.registration_count, 0);
  console.log(total);
}

getTotalLearners();</code></pre>
    </div>
    <div class="tab-pane fade"
        id="tabs-06-02" role="tabpanel" aria-labelled-by="tabs-06-02-tab" tabindex="6">
        <pre tabindex="0"><code>import requests

url = &#34;https://cloud.layer5.io/api/academy/curricula&#34;

res = requests.get(url)
data = res.json()
total = sum(item[&#34;registration_count&#34;] for item in data[&#34;data&#34;])
print(total)</code></pre>
    </div>
    <div class="tab-pane fade"
        id="tabs-06-03" role="tabpanel" aria-labelled-by="tabs-06-03-tab" tabindex="6">
        <pre tabindex="0"><code>package main

import (
	&#34;encoding/json&#34;
	&#34;fmt&#34;
	&#34;io&#34;
	&#34;net/http&#34;
)

type Path struct {
	RegistrationCount int `json:&#34;registration_count&#34;`
}

type Response struct {
	Data []Path `json:&#34;data&#34;`
}

func main() {
	url := &#34;https://cloud.layer5.io/api/academy/curricula&#34;

	req, _ := http.NewRequest(&#34;GET&#34;, url, nil)

	client := &amp;http.Client{}
	res, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer res.Body.Close()

	body, _ := io.ReadAll(res.Body)

	var response Response
	if err := json.Unmarshal(body, &amp;response); err != nil {
		panic(err)
	}

	total := 0
	for _, path := range response.Data {
		total += path.RegistrationCount
	}

	fmt.Println(total)
}</code></pre>
    </div>
</div>


The result is a single number, the total of `registration_count` across the curricula returned.

## Pagination

List endpoints that paginate accept these query parameters.

| Parameter | Default | Behavior |
|---|---|---|
| `page` | `0` | Zero-based page number. A negative value becomes `0`. |
| `pageSize` | `10` | Items per page. The maximum is `100`. A larger value becomes `100`, and zero or a negative value becomes `10`. |
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

Branch on the status code first, then parse the body defensively. The generated [REST API Reference](/pr-preview/pr-1210/cloud/reference/api-reference/rest/) documents 401 responses as plain text, but the authentication layer answers with JSON.

