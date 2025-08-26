---
title: "REST APIs Examples"
weight: 5
description: >
  An advanced guide to how to use our Academy REST APIs to retrieve various statistics/information.
categories: [Academy]

---

The following examples demonstrate how to retrieve information from the Academy REST APIs.

## Get the total number of registered learners in Academy


Use the Layer5 Cloud API to retrieve the *total* number of registered learners. Pass your [Security Token](https://docs.layer5.io/cloud/security/tokens/) as a Bearer token in the `Authorization` header (as shown in [Authenticating with API](https://docs.layer5.io/cloud/reference/api-reference/#authenticating-with-the-api)). The response JSON includes an array of user objects.


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