---
title: REST API
description: >
  Low-level ReST API reference for extending Layer5 Cloud.
weight: 1
categories: [Reference]
tags: [extensibility]
---

To create integrations, retrieve data, and automate your cloud native infrastructure, build with the Layer5 Cloud REST API.

## Authenticating with the API

In order to authenticate to Layer5 Cloud's REST API, you need to generate and use a [security token](../security/tokens). Visit your [user account's security tokens](https://cloud.layer5.io/security/tokens) and generate a long-lived security token. Security tokens are without expiration date. You can generate as many tokens as you like. You can also revoke them at any time.

To authenticate with the API, pass the token as a bearer token in the `Authorization` header. For example, in cURL:

```bash
curl <protocol>://<Layer5-cloud-hostname>/<API> \
-H "Authorization: Bearer <token>"
```

- Replace `<protocol>` with `http` or `https` depending on your Layer5 Cloud instance.
- Replace `<Layer5-cloud-hostname>` with the hostname or IP address of your hosted Layer5 Cloud instance. For example, [`https://cloud.layer5.io`](https://cloud.layer5.io).
- Replace `<API>` with the API endpoint you want to access. For example, `/api/identity/users/profile`.
- Replace `<token>` with the security token you generated.

## All API Endpoints

{{< alert type="info" >}}
<a href="https://cloud.layer5.io/system/api/docs">Open API Endpoints in new window <i class="fa fa-external-link" aria-hidden="true"></i></a>
{{< /alert >}}

## API Examples
See [Academy REST API Examples](/cloud/academy/rest-apis-examples/) for working code snippets in cURL, JavaScript, Python, and Go.
