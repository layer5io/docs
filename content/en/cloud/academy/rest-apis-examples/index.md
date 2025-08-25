---
title: "REST APIs EXAMPLES"
weight: 5
description: >
  An advanced guide to how to use our Academy REST API to retrieve various statistics / information.
categories: [Academy]

---

The following examples demonstrate how to retrieve statistics from the Academy REST API.

## Get the number of active learners 

Use the Layer5 Cloud API to retrieve the number of *active* learners. Pass your [security token](https://docs.layer5.io/cloud/security/tokens/) as a Bearer token in the `Authorization` header (as shown in [Authenticating with API](https://docs.layer5.io/cloud/reference/api-reference/#authenticating-with-the-api)). The response JSON includes an array of user objects.

## Example: cURL Request

```bash
curl -s -X GET "https://cloud.layer5.io/api/identity/users/online" \
  -H "Authorization: Bearer <your-token>” \
  | jq 'length'
```

This returns the number of active learners.
```
30
``` 

## Example: JavaScript (Node.js)

```javascript
const token = "your-token"

fetch("https://cloud.layer5.io/api/identity/users/online", {
  headers: { "Authorization": "Bearer " + token }
})
  .then(res => res.json())
  .then(users => {
    console.log("Active learners:", users.length);
    // users is an array of {id, user_id, first_name, last_name, ...}
  });
```

This will print the number of active learners like this:

```
30
```

## Example: Python Client

```python
import requests

url = "https://cloud.layer5.io/api/identity/users/online"
headers = {"Authorization": "Bearer <your-token>"}

resp = requests.get(url, headers=headers)
online_users = resp.json()
print("Active Learners:", len(online_users))

```

This will output:

```
Active Learners: 30
```


## Example: Go

```go
package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

func main() {
	url := "https://cloud.layer5.io/api/identity/users/online"
	req, _ := http.NewRequest("GET", url, nil)
	req.Header.Set("Authorization", "Bearer <your-token>")

	client := &http.Client{}
	resp, _ := client.Do(req)
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)
	var users []map[string]interface{}
	json.Unmarshal(body, &users)

	fmt.Println("Active users:", len(users))
}

```

This will output something like:

```
Active users: 30
```


