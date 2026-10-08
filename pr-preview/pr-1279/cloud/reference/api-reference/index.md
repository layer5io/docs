# Cloud API

> REST APIs for integrating with and extending Layer5 Cloud.



To create integrations, retrieve data, and automate your cloud native infrastructure, build with the Layer5 Cloud REST API.

## Authenticating with the API

In order to authenticate to Layer5 Cloud's REST API, you need to generate and use a [security token](/pr-preview/pr-1279/cloud/concepts/identity-and-security/tokens/). Visit your [user account's security tokens](https://cloud.layer5.io/security/tokens) and generate a long-lived token. Security tokens remain valid until you revoke them, and you can issue as many as you need.

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



There are two ways to control the organization context for your API requests:

### Using the `layer5-current-orgid` Header

Include the `layer5-current-orgid` header with your organization's ID to specify the target organization for a request:








<ul class="nav nav-tabs" id="tabs-2" role="tablist">
  <li class="nav-item">
      <button class="nav-link active"
          id="tabs-02-00-tab" data-bs-toggle="tab" data-bs-target="#tabs-02-00" role="tab"
          aria-controls="tabs-02-00" aria-selected="true">
        cURL
      </button>
    </li><li class="nav-item">
      <button class="nav-link"
          id="tabs-02-01-tab" data-bs-toggle="tab" data-bs-target="#tabs-02-01" role="tab"
          aria-controls="tabs-02-01" aria-selected="false">
        JavaScript
      </button>
    </li><li class="nav-item">
      <button class="nav-link"
          id="tabs-02-02-tab" data-bs-toggle="tab" data-bs-target="#tabs-02-02" role="tab"
          aria-controls="tabs-02-02" aria-selected="false">
        Python
      </button>
    </li>
</ul>

<div class="tab-content" id="tabs-2-content">
    <div class="tab-pane fade show active"
        id="tabs-02-00" role="tabpanel" aria-labelled-by="tabs-02-00-tab" tabindex="2">
        <pre tabindex="0"><code>curl -X GET &#34;https://cloud.layer5.io/api/environments&#34; \
 -H &#34;Authorization: Bearer &lt;Your-Token&gt;&#34; \
 -H &#34;layer5-current-orgid: &lt;Your-Organization-ID&gt;&#34;</code></pre>
    </div>
    <div class="tab-pane fade"
        id="tabs-02-01" role="tabpanel" aria-labelled-by="tabs-02-01-tab" tabindex="2">
        <pre tabindex="0"><code>const token = &#34;Your-Token&#34;;
const orgId = &#34;Your-Organization-ID&#34;;

async function listEnvironments() {
  const res = await fetch(&#34;https://cloud.layer5.io/api/environments&#34;, {
    method: &#34;GET&#34;,
    headers: {
      Authorization: `Bearer ${token}`,
      &#34;layer5-current-orgid&#34;: orgId,
    },
  });
  const data = await res.json();
  console.log(data);
}

listEnvironments();</code></pre>
    </div>
    <div class="tab-pane fade"
        id="tabs-02-02" role="tabpanel" aria-labelled-by="tabs-02-02-tab" tabindex="2">
        <pre tabindex="0"><code>import requests

url = &#34;https://cloud.layer5.io/api/environments&#34;
headers = {
    &#34;Authorization&#34;: &#34;Bearer &lt;Your-Token&gt;&#34;,
    &#34;layer5-current-orgid&#34;: &#34;&lt;Your-Organization-ID&gt;&#34;
}

res = requests.get(url, headers=headers)
print(res.json())</code></pre>
    </div>
</div>


### Setting Organization and Workspace Preferences

Alternatively, you can set your default organization and workspace using the Preferences API. This sets your user preferences so that subsequent API requests will use the specified organization and workspace context:








<ul class="nav nav-tabs" id="tabs-3" role="tablist">
  <li class="nav-item">
      <button class="nav-link active"
          id="tabs-03-00-tab" data-bs-toggle="tab" data-bs-target="#tabs-03-00" role="tab"
          aria-controls="tabs-03-00" aria-selected="true">
        cURL
      </button>
    </li><li class="nav-item">
      <button class="nav-link"
          id="tabs-03-01-tab" data-bs-toggle="tab" data-bs-target="#tabs-03-01" role="tab"
          aria-controls="tabs-03-01" aria-selected="false">
        JavaScript
      </button>
    </li><li class="nav-item">
      <button class="nav-link"
          id="tabs-03-02-tab" data-bs-toggle="tab" data-bs-target="#tabs-03-02" role="tab"
          aria-controls="tabs-03-02" aria-selected="false">
        Python
      </button>
    </li>
</ul>

<div class="tab-content" id="tabs-3-content">
    <div class="tab-pane fade show active"
        id="tabs-03-00" role="tabpanel" aria-labelled-by="tabs-03-00-tab" tabindex="3">
        <pre tabindex="0"><code># Set organization and workspace preferences
curl -X PUT &#34;https://cloud.layer5.io/api/identity/users/preferences&#34; \
 -H &#34;Authorization: Bearer &lt;Your-Token&gt;&#34; \
 -H &#34;Content-Type: application/json&#34; \
 -d &#39;{
   &#34;selectedOrganization&#34;: &#34;&lt;Your-Organization-ID&gt;&#34;,
   &#34;selectedWorkspace&#34;: &#34;&lt;Your-Workspace-ID&gt;&#34;
 }&#39;</code></pre>
    </div>
    <div class="tab-pane fade"
        id="tabs-03-01" role="tabpanel" aria-labelled-by="tabs-03-01-tab" tabindex="3">
        <pre tabindex="0"><code>const token = &#34;Your-Token&#34;;

async function setPreferences() {
  const res = await fetch(&#34;https://cloud.layer5.io/api/identity/users/preferences&#34;, {
    method: &#34;PUT&#34;,
    headers: {
      Authorization: `Bearer ${token}`,
      &#34;Content-Type&#34;: &#34;application/json&#34;,
    },
    body: JSON.stringify({
      selectedOrganization: &#34;&lt;Your-Organization-ID&gt;&#34;,
      selectedWorkspace: &#34;&lt;Your-Workspace-ID&gt;&#34;,
    }),
  });
  const data = await res.json();
  console.log(data);
}

setPreferences();</code></pre>
    </div>
    <div class="tab-pane fade"
        id="tabs-03-02" role="tabpanel" aria-labelled-by="tabs-03-02-tab" tabindex="3">
        <pre tabindex="0"><code>import requests
import json

url = &#34;https://cloud.layer5.io/api/identity/users/preferences&#34;
headers = {
    &#34;Authorization&#34;: &#34;Bearer &lt;Your-Token&gt;&#34;,
    &#34;Content-Type&#34;: &#34;application/json&#34;
}
payload = {
    &#34;selectedOrganization&#34;: &#34;&lt;Your-Organization-ID&gt;&#34;,
    &#34;selectedWorkspace&#34;: &#34;&lt;Your-Workspace-ID&gt;&#34;
}

res = requests.put(url, headers=headers, data=json.dumps(payload))
print(res.json())</code></pre>
    </div>
</div>


## API Example

The following example demonstrate how to retrieve information from the Academy REST APIs.

### Get the total number of registered learners in Academy

Use the Layer5 Cloud API to retrieve the *total* number of registered learners. Pass your [Security Token](https://docs.layer5.io/cloud/concepts/identity-and-security/tokens/) as a Bearer token in the `Authorization` header (as shown in [Authenticating with API](/pr-preview/pr-1279/cloud/reference/api-reference/#authenticating-with-the-api)). The response JSON includes an array of user objects.











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
    </li><li class="nav-item">
      <button class="nav-link"
          id="tabs-05-03-tab" data-bs-toggle="tab" data-bs-target="#tabs-05-03" role="tab"
          aria-controls="tabs-05-03" aria-selected="false">
        Golang
      </button>
    </li>
</ul>

<div class="tab-content" id="tabs-5-content">
    <div class="tab-pane fade show active"
        id="tabs-05-00" role="tabpanel" aria-labelled-by="tabs-05-00-tab" tabindex="5">
        <pre tabindex="0"><code>curl -s -X GET &#34;https://cloud.layer5.io/api/academy/cirricula&#34;  \
 -H &#34;Authorization: Bearer &lt;Your-Token&gt;&#34;  \
  | jq &#39;[.data[].registration_count] | add&#39;</code></pre>
    </div>
    <div class="tab-pane fade"
        id="tabs-05-01" role="tabpanel" aria-labelled-by="tabs-05-01-tab" tabindex="5">
        <pre tabindex="0"><code>const token = &#34;Your-Token&#34;

async function getTotalLearners() {
  const res = await fetch(&#34;https://cloud.layer5.io/api/academy/cirricula&#34;, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  const total = data.data.reduce((sum, path) =&gt; sum + path.registration_count, 0);
  console.log(total);
}

getTotalLearners();</code></pre>
    </div>
    <div class="tab-pane fade"
        id="tabs-05-02" role="tabpanel" aria-labelled-by="tabs-05-02-tab" tabindex="5">
        <pre tabindex="0"><code>import requests

url = &#34;https://cloud.layer5.io/api/academy/cirricula&#34;
headers = {&#34;Authorization&#34;: &#34;Bearer &lt;Your-Token&gt;&#34;}

res = requests.get(url, headers=headers)
data = res.json()
total = sum(item[&#34;registration_count&#34;] for item in data[&#34;data&#34;])
print(total)</code></pre>
    </div>
    <div class="tab-pane fade"
        id="tabs-05-03" role="tabpanel" aria-labelled-by="tabs-05-03-tab" tabindex="5">
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
	url := &#34;https://cloud.layer5.io/api/academy/cirricula&#34;

	req, _ := http.NewRequest(&#34;GET&#34;, url, nil)
	req.Header.Set(&#34;Authorization&#34;, &#34;Bearer &lt;your-token&gt;&#34;)

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


This returns the number of Total registered learners:
```
130
```

