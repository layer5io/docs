---
title: Layer5
description: >
  Explore tutorials and documentation by product in the docs.layer5.io website; documentation and developer resources of Layer5 products.
---

{{< blocks/cover title="" image_anchor="top" height="full" >}}

<div class="dash-sign-container">
<h1 class="dashboard">Expect more from your infrastructure</h1>

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
<a class="btn btn-lg btn-primary me-3 mb-4 l5btn" href="/kanvas" aria-label="Kanvas Docs"
onmouseover="changeImage('Kanvas', 'images/logos/kanvas-light.svg')" onmouseout="restoreImage('Kanvas', 'images/logos/kanvas-alt.svg')">
    <img id="Kanvas" src="images/logos/kanvas-alt.svg" alt="Layer5 Kanvas Docs Logo" />
    Kanvas Docs
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

<h1 style="margin:6.5rem auto 1.5rem auto">Discover your way forward</h1>
<div class= "product-section">
<div class="gap-20px flex-col">
<div class="flex-row gap-20px">
<div class="playground-card grow-1">
<a href="https://playground.meshery.io">
  <div class="landing-card">
    <div class= "playground-section playground-logo">
      <span class="landing-card-title">Meshery playground</span>
      <p>Use Meshery Playground to explore a new way of DevOps - visual and collaborative configuration management for your infrastructure.</p>
    </div>
  </div>
</a></div>

<div class="catalog-card">
<a href="https://meshery.layer5.io/catalog">
  <div class="landing-card">
    <div class= "catalog-section catalog-logo">
      <span class="landing-card-title">Meshery Catalog</span>
      <p>Discover top-quality cloud native services for your infrastructure with the Cloud Native Catalog. Discover best practices and upgrade your Kubernetes management practices.</p>
    </div>
  </div>
</a></div>
</div>

<div class="handbook-card">
<a href="https://layer5.io/community/handbook">
    <div class= "handbook-section landing-card">
      <div class= "landing-card-text">
        <span class="landing-card-title">Community Handbook</span>
        <p>Use Meshery Playground to explore a new way of DevOps - visual and collaborative configuration management for your infrastructure.</p>
      </div>
      <div class= "handbook-image">
        <img src="images/landing/handbook.png" alt="Community Handbook Image" />
      </div>
    </div>
</a>
</div>
</div>

<div class="forum-card">
<a href="https://discuss.layer5.io">
      <div class="forum-section landing-card">
        <div class="landing-card-text">
            <span class="landing-card-title">Discussion forum</span>
            <p>Cloud Native Management of developer-defined infrastructure. Join the open source-first community of cloud native engineers.</p>
        </div>
        <div class="forum-image">
            <img src="images/landing/discuss.png" alt="Discussion Forum Image" />
        </div>
      </div>
</a>
</div>

</div>
<!-- Wrapper close -->

<div class="dash-tangle"></div>
<div class="dash-ircle-container">
  <div class="dash-ircle"></div>
</div>

{{< /blocks/cover >}}

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
