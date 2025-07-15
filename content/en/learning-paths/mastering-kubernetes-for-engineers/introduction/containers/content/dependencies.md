---
docType: "Chapter"
id: "Dependencies"
chapterTitle: "Dependencies"
description: ""
lectures: 7
title: "Dependencies"
weight: 7
---


{{< chapterstyle >}}

<h2 class="chapter-sub-heading">Dealing with Dependencies</h2>
<h3 class="chapter-sub-heading">Installing Dependencies ...</h3>
... on Ubuntu

```bash
# Install repository
$ curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash –sudo apt-get update
# Install NodeJS
$ sudo apt-get install -y nodejs
# Install Dependencies of the app
$ npm install
```
<h3 class="chapter-sub-heading">Running ...</h3>
... the application

```bash
# Download or Upload app.js to the server somehow…
# Run
$ node app.js
```

<h3 class="chapter-sub-heading">Dependencies</h3>
<p>Video: Dependencies </p>
<div style="border: 2px solid #ccc; border-radius: 8px; padding: 10px; background-color: #1e1e1e; box-shadow: 0 4px 12px rgba(0,0,0,0.3); margin-top: 1em; margin-bottom: 1em; width: 75%; height:50%; display: block; margin: auto;">
    <video width="100%" height="100%" autoplay controls>
        <source src="https://sos-de-fra-1.exo.io/exoscale-academy/videos/sks_starter_vid3.mp4?1752341753956" type="video/mp4">
        Your browser does not support the video tag.
    </video>
</div>

{{< /chapterstyle >}}