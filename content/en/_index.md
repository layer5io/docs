---
title: Layer5
description: >
  Explore tutorials and documentation by product in the docs.layer5.io website; documentation and developer resources of Layer5 products.
---

{{< blocks/cover title="" image_anchor="top" height="full" >}}

<div class="dash-sign-container">
<h1 class="dashboard">Expect More from Your Infrastructure</h1>

<a href="https://www.youtube.com/watch?v=034nVaQUyME&list=PL3A-A6hPO2IO_yzN83wSJJUNQActzCJvO&index=9" class="dash-sign">Design your path</a>
</div>
<div>
<h1 style="margin:4.5rem auto 1.5rem auto">Explore tutorials & documentation</h1>
<a class="btn btn-lg btn-primary me-3 mb-4 l5btn" href="/cloud" aria-label="Cloud Docs"
onmouseover="changeImage('layer5', 'images/logos/layer5-light.svg')" onmouseout="restoreImage('layer5', 'images/logos/5-light-no-trim.svg')">
    <img id="layer5" src="images/logos/5-light-no-trim.svg" alt="Layer5 Cloud Docs Logo" />
    Cloud Docs
    <i class="fas fa-arrow-alt-circle-right ms-2"></i>
</a>
<a class="btn btn-lg btn-primary me-3 mb-4 l5btn" href="/meshmap" aria-label="MeshMap Docs"
onmouseover="changeImage('Meshmap', 'images/logos/meshmap-light.svg')" onmouseout="restoreImage('Meshmap', 'images/logos/meshmap-alt.svg')">
    <img id="Meshmap" src="images/logos/meshmap-alt.svg" alt="Layer5 MeshMap Docs Logo" />
    MeshMap Docs
    <i class="fas fa-arrow-alt-circle-right ms-2"></i>
</a>
<a class="btn btn-lg btn-primary me-3 mb-4 l5btn" href="https://docs.meshery.io" aria-label="Meshery Docs"
onmouseover="changeImage('meshery', 'images/logos/meshery-light.svg')" onmouseout="restoreImage('meshery', 'images/logos/meshery-light-icon.svg')">
    <img id="meshery" src="images/logos/meshery-light-icon.svg" alt="Layer5 Meshery Docs Logo" />
    Meshery Docs
    <i class="fas fa-arrow-alt-circle-right ms-2"></i>
</a>
<a class="btn btn-lg btn-primary me-3 mb-4 l5btn" href="https://getnighthawk.dev" aria-label="Nighthawk Docs"
  onmouseover="changeImage('nighthawk', 'images/logos/nighthawk-light.svg')" onmouseout="restoreImage('nighthawk', 'images/logos/nighthawk-logo.svg')">
    <img id="nighthawk" src="images/logos/nighthawk-logo.svg" alt="Layer5 Nighthawk Docs Logo" />
    Nighthawk Docs
    <i class="fas fa-arrow-alt-circle-right ms-2"></i>
</a>
</div>

<div class="wrapper">
<div class= "product-section">

<div class="box">
<a href="https://playground.meshery.io">
  <div class="grid-card">
    <div class= "playground-section playground-logo">
      <span class="product-head">Meshery playground</span>
      <p>Use Meshery Playground to explore a new way of DevOps - visual and collaborative configuration management for your infrastructure.</p>
    </div>
  </div>
</a></div>

<div class="box">
<a href="https://meshery.layer5.io/catalog">
  <div class="grid-card">
    <div class= "catalog-section catalog-logo">
      <span class="product-head">Meshery Catalog</span>
      <p>Discover top-quality cloud native services for your infrastructure with the Cloud Native Catalog. Discover best practices and upgrade your Kubernetes management practices.</p>
    </div>
  </div>
</a></div>

<div class="box box3">
    <a href="https://discuss.layer5.io">
    <div class= "forum-section">
      <div class="grid-card">
      <span class="product-head">Discussion forum</span>
      <p>Cloud Native Management of developer-defined infrastructure. Join the open source-first community of cloud native engineers.</p>
      <img src="images/landing/discuss.png" alt="Discussion Forum Image" />
          </div>
    </div>
    </a></div>

<div class="box box4">
<a href="https://layer5.io/community/handbook">
    <div class= "handbook-section grid-card">
      <div class= "handbook-text">
        <span class="product-head">Community Handbook</span>
        <p>Use Meshery Playground to explore a new way of DevOps - visual and collaborative configuration management for your infrastructure.</p>
      </div>
      <div class= "handbook-image">
        <img src="images/landing/handbook.png" alt="Community Handbook Image" />
          </div></div>
    </a>
    </div>
    </div>

  </div> <!-- Wrapper close -->

<div class="dash-tangle"></div>
<div class="dash-ircle-container">
  <div class="dash-ircle"></div>
</div>

{{< /blocks/cover >}}

<!--
{{% blocks/section color="dark" type="row" %}}
{{% blocks/feature icon="fa-lightbulb" title="New chair metrics!" %}}
The Goldydocs UI now shows chair size metrics by default.

Please follow this space for updates!
{{% /blocks/feature %}}


{{% blocks/feature icon="fab fa-github" title="Contributions welcome!" url="https://github.com/google/docsy-example" %}}
We do a [Pull Request](https://github.com/google/docsy-example/pulls) contributions workflow on **GitHub**. New users are always welcome!
{{% /blocks/feature %}}


{{% blocks/feature icon="fab fa-twitter" title="Follow us on Twitter!" url="https://twitter.com/docsydocs" %}}
For announcement of latest features etc.
{{% /blocks/feature %}}


{{% /blocks/section %}}


{{% blocks/section %}}
This is the second section
{.h1 .text-center}
{{% /blocks/section %}}


{{% blocks/section type="row" %}}

{{% blocks/feature icon="fab fa-app-store-ios" title="Download **from AppStore**" %}}
Get the Goldydocs app!
{{% /blocks/feature %}}

{{% blocks/feature icon="fab fa-github" title="Contributions welcome!"
    url="https://github.com/google/docsy-example" %}}
We do a [Pull Request](https://github.com/google/docsy-example/pulls)
contributions workflow on **GitHub**. New users are always welcome!
{{% /blocks/feature %}}

{{% blocks/feature icon="fab fa-twitter" title="Follow us on Twitter!"
    url="https://twitter.com/GoHugoIO" %}}
For announcement of latest features etc.
{{% /blocks/feature %}}

{{% /blocks/section %}}


{{% blocks/section %}}
This is the another section
{.h1 .text-center}
{{% /blocks/section %}} -->
<script>
function changeImage(imgId, newSrc) {
    var img = document.getElementById(imgId);
    img.src = newSrc;
}

function restoreImage(imgId, originalSrc) {
    var img = document.getElementById(imgId);
    img.src = originalSrc;
}
</script>
