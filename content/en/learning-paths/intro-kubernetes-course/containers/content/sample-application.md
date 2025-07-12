---
docType: "Chapter"
id: "Sample Application"
chapterTitle: "Sample Application"
description: ""
lectures: 5
title: "Sample Application"
weight: 5
---


{{< chapterstyle >}}

<h2 class="chapter-sub-heading">Sample Application using Node.js</h2>

This sample app demonstration shows how traditional software deployment looks. A little JavaScript spins up a web server and runs the sample app on the server. It demonstrates how easy it is to run web-based applications, but still, you need to install and run Node.js beforehand. In addition, you have to use the proper versions of the software components in place and take care of all dependencies (runtime environments, libraries, ...). Otherwise, the app will not run or will not run properly.

This is the source code of our sample app:

```javascript
const express = require("express")
const app = express()
const port = 3000
app.get('/', (req, res) => { res.send("Hello World!") })
app.listen(port, () => {
  console.log("Example app listening at http://localhost:3000")
})
```
Take the code into action:

```bash
node app.js
```

The application at work, displaying Hello World!:

{{< image src="/images/learning-path/intro-kubernetes/containers/c1_l5_1.png" width="100%" align="center" alt="NodeJS App" >}}

{{< /chapterstyle >}}