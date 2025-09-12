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
<a href="https://cloud.layer5.io/system/api/docs" target="_blank">Open API Endpoints in new window <i class="fa fa-external-link" aria-hidden="true"></i></a>
{{< /alert >}}

## API Example

The following example demonstrate how to retrieve information from the Academy REST APIs.

### Get the total number of registered learners in Academy

Use the Layer5 Cloud API to retrieve the *total* number of registered learners. Pass your [Security Token](https://docs.layer5.io/cloud/security/tokens/) as a Bearer token in the `Authorization` header (as shown in [Authenticating with API](/cloud/reference/api-reference/#authenticating-with-the-api)). The response JSON includes an array of user objects.


{{< tabpane >}}
{{< tab header="cURL"  >}}
curl -s -X GET "https://cloud.layer5.io/api/academy/cirricula"  \
 -H "Authorization: Bearer <Your-Token>"  \
  | jq '[.data[].registration_count] | add'

{{< /tab >}}

{{< tab header="JavaScript" >}}

const token = "Your-Token"

async function getTotalLearners() {
  const res = await fetch("https://cloud.layer5.io/api/academy/cirricula", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  const total = data.data.reduce((sum, path) => sum + path.registration_count, 0);
  console.log(total);
}

getTotalLearners();

{{< /tab >}}

{{< tab header="Python" >}}

import requests

url = "https://cloud.layer5.io/api/academy/cirricula"
headers = {"Authorization": "Bearer <Your-Token>"}

res = requests.get(url, headers=headers)
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
	url := "https://cloud.layer5.io/api/academy/cirricula"

	req, _ := http.NewRequest("GET", url, nil)
	req.Header.Set("Authorization", "Bearer <your-token>")

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

This returns the number of Total registered learners:
```
130
``` 
