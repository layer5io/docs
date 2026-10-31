---
title: Cloud API
description: >
  REST APIs for integrating with and extending Layer5 Cloud.
categories: [reference]
tags: [extensibility]
---

To create integrations, retrieve data, and automate your cloud native infrastructure, build with the Layer5 Cloud REST API.

Every endpoint lives under `/api` on the host of your Layer5 Cloud deployment. Hosted Layer5 Cloud uses `https://cloud.layer5.io/api`. A self-hosted deployment uses `https://<your-cloud-host>/api`.

Some route families are rate limited per caller. See [Rate limits]({{< ref "cloud/reference/api-reference/rate-limits.md" >}}) for the limits and how to handle HTTP 429.

## Authenticating with the API

In order to authenticate to Layer5 Cloud's REST API, you need to generate and use a [security token]({{< ref "cloud/concepts/identity-and-security/tokens.md" >}}). Visit your [user account's security tokens](https://cloud.layer5.io/security/tokens) and generate a long-lived token. Security tokens remain valid until you revoke them, and you can issue as many as you need.

A token belongs to your user account, not to an organization. One token reaches every organization you are a member of. What a token can do is the same as what you can do: every guarded endpoint checks that you hold the required permission in the organization the request runs in. See [Default Permissions]({{< ref "cloud/reference/default-permissions.md" >}}).

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

{{< alert type="info" title="API Tokens are User-Scoped" >}}
Layer5 Cloud API tokens are scoped to your user account, not to a specific organization. This means a single API token provides access to all organizations you are a member of. For users who belong to multiple organizations, you need to explicitly specify which organization your API requests should operate on.

This is similar to how [GitHub Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) work, where a single token grants access to all repositories and organizations the user has access to.
{{< /alert >}}

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

{{< alert type="warning" title="Check the header name" >}}Layer5 Cloud reads `X-Current-Orgid` only. A header with any other name, including `layer5-current-orgid`, has no effect, and the request silently falls back to your saved organization.{{< /alert >}}

### Using the X-Current-Orgid Header {#using-the-layer5-current-orgid-header}

Include the `X-Current-Orgid` header with your organization's ID to specify the target organization for a request:

{{< tabpane >}}
{{< tab header="cURL"  >}}
curl -X GET "https://cloud.layer5.io/api/environments" \
 -H "Authorization: Bearer <Your-Token>" \
 -H "X-Current-Orgid: <Your-Organization-ID>"

{{< /tab >}}

{{< tab header="JavaScript" >}}

const token = "Your-Token";
const orgId = "Your-Organization-ID";

async function listEnvironments() {
  const res = await fetch("https://cloud.layer5.io/api/environments", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Current-Orgid": orgId,
    },
  });
  const data = await res.json();
  console.log(data);
}

listEnvironments();

{{< /tab >}}

{{< tab header="Python" >}}

import requests

url = "https://cloud.layer5.io/api/environments"
headers = {
    "Authorization": "Bearer <Your-Token>",
    "X-Current-Orgid": "<Your-Organization-ID>"
}

res = requests.get(url, headers=headers)
print(res.json())

{{< /tab >}}

{{< /tabpane >}}

### Setting Organization and Workspace Preferences

To make an organization the default for every request that omits the header, save it in your user preferences:

{{< tabpane >}}
{{< tab header="cURL"  >}}
# Set organization and workspace preferences
curl -X PUT "https://cloud.layer5.io/api/identity/users/preferences" \
 -H "Authorization: Bearer <Your-Token>" \
 -H "Content-Type: application/json" \
 -d '{
   "selectedOrganizationId": "<Your-Organization-ID>",
   "selectedWorkspaceForOrganizations": {
     "<Your-Organization-ID>": "<Your-Workspace-ID>"
   }
 }'

{{< /tab >}}

{{< tab header="JavaScript" >}}

const token = "Your-Token";

async function setPreferences() {
  const res = await fetch("https://cloud.layer5.io/api/identity/users/preferences", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      selectedOrganizationId: "<Your-Organization-ID>",
      selectedWorkspaceForOrganizations: {
        "<Your-Organization-ID>": "<Your-Workspace-ID>",
      },
    }),
  });
  const data = await res.json();
  console.log(data);
}

setPreferences();

{{< /tab >}}

{{< tab header="Python" >}}

import requests
import json

url = "https://cloud.layer5.io/api/identity/users/preferences"
headers = {
    "Authorization": "Bearer <Your-Token>",
    "Content-Type": "application/json"
}
payload = {
    "selectedOrganizationId": "<Your-Organization-ID>",
    "selectedWorkspaceForOrganizations": {
        "<Your-Organization-ID>": "<Your-Workspace-ID>"
    }
}

res = requests.put(url, headers=headers, data=json.dumps(payload))
print(res.json())

{{< /tab >}}

{{< /tabpane >}}

- `selectedOrganizationId` is the default organization. The key is case-insensitive.
- `selectedWorkspaceForOrganizations` maps an organization ID to the workspace that receives the designs you save in it. When an organization has no saved workspace, Layer5 Cloud uses the first workspace available.
- A preference key that the request does not mention keeps its stored value. A key the server does not recognize, such as `selectedOrganization` or `selectedWorkspace`, is ignored.
- You cannot change your badges through this endpoint.

## API Example

The following example demonstrates how to retrieve information from the Academy REST APIs.

### Get the total number of registered learners in Academy

Use the Layer5 Cloud API to retrieve the *total* number of registered learners. The Academy curricula endpoint is public. It needs no token. It returns curricula, each with its registration count. The path is `/api/academy/curricula`.


{{< tabpane >}}
{{< tab header="cURL"  >}}
curl -s "https://cloud.layer5.io/api/academy/curricula" \
  | jq '[.data[].registration_count] | add'

{{< /tab >}}

{{< tab header="JavaScript" >}}

async function getTotalLearners() {
  const res = await fetch("https://cloud.layer5.io/api/academy/curricula");
  const data = await res.json();
  const total = data.data.reduce((sum, path) => sum + path.registration_count, 0);
  console.log(total);
}

getTotalLearners();

{{< /tab >}}

{{< tab header="Python" >}}

import requests

url = "https://cloud.layer5.io/api/academy/curricula"

res = requests.get(url)
data = res.json()
total = sum(item["registration_count"] for item in data["data"])
print(total)

{{< /tab >}}

{{< tab header="Golang" >}}

package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

type Path struct {
	RegistrationCount int `json:"registration_count"`
}

type Response struct {
	Data []Path `json:"data"`
}

func main() {
	url := "https://cloud.layer5.io/api/academy/curricula"

	req, _ := http.NewRequest("GET", url, nil)

	client := &http.Client{}
	res, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer res.Body.Close()

	body, _ := io.ReadAll(res.Body)

	var response Response
	if err := json.Unmarshal(body, &response); err != nil {
		panic(err)
	}

	total := 0
	for _, path := range response.Data {
		total += path.RegistrationCount
	}

	fmt.Println(total)
}

{{< /tab >}}

{{< /tabpane >}}

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
| 429 | You called a rate-limited route family faster than its limit. Wait the number of seconds in the `Retry-After` header, then retry. See [Rate limits]({{< ref "cloud/reference/api-reference/rate-limits.md" >}}). |
| 500 | The server could not complete the request. |

Branch on the status code first, then parse the body defensively. The generated [REST API Reference]({{< ref "cloud/reference/api-reference/rest.md" >}}) documents 401 responses as plain text, but the authentication layer answers with JSON.
