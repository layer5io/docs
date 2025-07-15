---
docType: "Chapter"
id: "Dockerfile"
chapterTitle: "Dockerfile"
description: ""
lectures: 9
title: "Dockerfile"
weight: 9
---


{{< chapterstyle >}}

<h2 class="chapter-sub-heading">Dockerfile</h2>

```yaml
FROM node:12-alpine * to be based on which other Docker image?

RUN apk add --no-cache python g++ make * install additional software

WORKDIR /app * create and use directory /app inside the container

COPY . . * 1st parameter: local directory (./ is the directory where the Dockerfile is) * 2nd parameter: target directory inside the container * → copy everything where the Dockerfile is in, into the container under /app

RUN npm install * dependencies for the application

CMD ["node", "src/index.js"] * run the app - just like when running outside a container
```
<h3 class="chapter-sub-heading">Dockerfile Theory</h3>
<p>Video: Dockerfile Theory </p>
<div style="border: 2px solid #ccc; border-radius: 8px; padding: 10px; background-color: #1e1e1e; box-shadow: 0 4px 12px rgba(0,0,0,0.3); margin-top: 1em; margin-bottom: 1em; width: 75%; height:50%; display: block; margin: auto;">
    <video width="100%" height="100%" autoplay controls>
        <source src="https://sos-de-fra-1.exo.io/exoscale-academy/videos/sks_starter_vid5.mp4?1752342254038" type="video/mp4">
        Your browser does not support the video tag.
    </video>
</div>
</br>
</br>
<h3 class="chapter-sub-heading">Dockerfile Practice</h3>
<p>Video: Dockerfile Practice </p>
<div style="border: 2px solid #ccc; border-radius: 8px; padding: 10px; background-color: #1e1e1e; box-shadow: 0 4px 12px rgba(0,0,0,0.3); margin-top: 1em; margin-bottom: 1em; width: 75%; height:50%; display: block; margin: auto;">
    <video width="100%" height="100%" controls>
        <source src="https://sos-de-fra-1.exo.io/exoscale-academy/videos/sks_starter_vid6.mp4?1752342254053" type="video/mp4">
        Your browser does not support the video tag.
    </video>
</div>
{{< /chapterstyle >}}