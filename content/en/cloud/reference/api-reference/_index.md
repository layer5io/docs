---
title: Cloud API
description: How to authenticate to the Layer5 Cloud REST API, choose the organization a request runs in, page through results, and handle errors.
weight: 40
diataxis: reference
categories: [reference]
tags: [api, extensibility]
---

The Layer5 Cloud REST API lets you build integrations, retrieve data, and automate your infrastructure. This page states the conventions every endpoint shares: base URL, authentication, organization context, pagination, and errors. For the list of endpoints, see the [REST API Reference]({{< ref "cloud/reference/api-reference/rest.md" >}}).

## Base URL

Every endpoint lives under `/api` on the host of your Layer5 Cloud deployment.

| Deployment | Base URL |
|---|---|
| Hosted Layer5 Cloud | `https://cloud.layer5.io/api` |
| Self-hosted | `https://<your-cloud-host>/api` |

## Authentication

Authenticate with a [security token]({{< ref "cloud/concepts/identity-and-security/tokens.md" >}}). Send it as a bearer token in the `Authorization` header:

```bash
curl https://cloud.layer5.io/api/identity/users/profile \
  -H "Authorization: Bearer <token>"
```

When a request has no `Authorization` header, Layer5 Cloud reads the browser session cookie instead. Scripts and integrations always send the header.

A token belongs to your user account, not to an organization. One token reaches every organization you are a member of, the way a GitHub personal access token reaches every repository its owner can. A request with a missing or invalid credential receives HTTP 401.

What a token can do is the same as what you can do: every guarded endpoint checks that you hold the required permission in the organization the request runs in. See [Roles and Permissions]({{< ref "cloud/reference/default-permissions.md" >}}).

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

{{< alert type="warning" title="Check the header name" >}}Layer5 Cloud reads `X-Current-Orgid` only. A header with any other name, including `layer5-current-orgid`, has no effect, and the request silently falls back to your saved organization.{{< /alert >}}

{{< tabpane >}}
{{< tab header="cURL" >}}
curl -X GET "https://cloud.layer5.io/api/environments" \
  -H "Authorization: Bearer <Your-Token>" \
  -H "X-Current-Orgid: <Your-Organization-ID>"
{{< /tab >}}
{{< tab header="JavaScript" >}}
const res = await fetch("https://cloud.layer5.io/api/environments", {
  headers: {
    Authorization: `Bearer ${token}`,
    "X-Current-Orgid": orgId,
  },
});
const data = await res.json();
{{< /tab >}}
{{< tab header="Python" >}}
import requests

res = requests.get(
    "https://cloud.layer5.io/api/environments",
    headers={
        "Authorization": "Bearer <Your-Token>",
        "X-Current-Orgid": "<Your-Organization-ID>",
    },
)
print(res.json())
{{< /tab >}}
{{< /tabpane >}}

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

Branch on the status code first, then parse the body defensively. The generated [REST API Reference]({{< ref "cloud/reference/api-reference/rest.md" >}}) documents 401 responses as plain text, but the authentication layer answers with JSON.

## Example: count Academy registrations

The Academy curricula endpoint is public. It needs no token. It returns curricula, each with its registration count.

{{< tabpane >}}
{{< tab header="cURL" >}}
curl -s "https://cloud.layer5.io/api/academy/curricula" \
  | jq '[.data[].registration_count] | add'
{{< /tab >}}
{{< tab header="Python" >}}
import requests

res = requests.get("https://cloud.layer5.io/api/academy/curricula")
total = sum(item["registration_count"] for item in res.json()["data"])
print(total)
{{< /tab >}}
{{< /tabpane >}}

The result is a single number, the total registrations across the curricula returned.
