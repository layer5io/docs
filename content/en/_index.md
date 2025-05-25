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
onmouseover="changeImage('Kanvas', 'images/logos/kanvas-light.svg')" onmouseout="restoreImage('Kanvas', 'images/logos/kanvas-icon-color.svg')">
    <img id="Kanvas" src="images/logos/kanvas-icon-color.svg" alt="Layer5 Kanvas Docs Logo" />
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

  <!-- Video Library -->
  <div class="playground-card grow-1">
    <a href="/videos">
    <!-- Wave Visualizer Background
    <canvas id="visualizer" style="position:absolute; top:0; left:0; margin:auto;  width:300px; height:300px;"></canvas> -->
      <div class="landing-card">
        <div class= "playground-section video-play-logo">
          <span class="landing-card-title">Video Library</span>
          <p>Give your brain a break from YAML. See Layer5 tools in-action.</p>
        </div>
      </div>
    </a>
  </div>

  <!-- <div class="playground-card grow-1">
    <a href="https://kanvas.new">
      <div class="landing-card">
        <div class= "playground-section playground-logo">
          <span class="landing-card-title">Kanvas</span>
          <p>Use Kanvas to explore a new way of DevOps - visual and collaborative configuration management for your infrastructure.</p>
        </div>
      </div>
    </a>
  </div> -->

<!-- Cloud Catalog -->
  <div class="catalog-card">
    <a href="https://cloud.layer5.io/catalog">
      <div class="landing-card">
        <div class= "catalog-section catalog-logo">
          <span class="landing-card-title" style="text-decoration:wrap">Patterns and Templates Catalog</span>
          <p>Discover best practices and uplevel your Kubernetes and Cloud configurations.</p>
        </div>
      </div>
    </a>
  </div>

</div>
<div class="flex-row gap-20px">

<!-- Learning Paths -->
  <div class="playground-card grow-1">
    <a href="https://cloud.layer5.io/academy/learning-paths">
      <div class="landing-card">
        <div class="catalog-section learning-path-logo">
          <span class="landing-card-title">Learning Paths</span>
          <p>Structured learning of Kubernetes, AWS, Azure, GCP, Meshery, and Kanvas with theoretical knowledge and hands-on, practical experience.</p>
        </div>
      </div>
    </a>
  </div>

  <!-- Badges -->
  <div class="catalog-card">
    <a href="https://badges.layer5.io">
      <div class="landing-card">
        <div class= "catalog-section recognition-program-logo">
          <span class="landing-card-title">Be Recognized</span>
          <p>Earn badges for your skills and knowledge in cloud native technologies.</p>
        </div>
      </div>
    </a>
  </div>

</div>

</div>
<div class="forum-card">
      <a href="https://discuss.layer5.io">
        <div class="forum-section landing-card">
          <div class="landing-card-text">
              <span class="landing-card-title">Discussion forum</span>
              <p>Get help. Find your answer on the forum. Share your knowledge with others.</p>
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

<!-- Wave Visualizer Script -->
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

<!-- Wave Visualizer Script -->
<script>
    const canvas = document.getElementById('visualizer');
    const ctx = canvas.getContext('2d');
    let time = 0;
    let waveData = Array(8).fill(0).map(() => ({
        value: Math.random() * 0.5 + 0.1,
        targetValue: Math.random() * 0.15 + 0.1,
        speed: Math.random() * .02 + 0.01
    }));

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function updateWaveData() {
        waveData.forEach(data => {
            if (Math.random() < 0.01) {
                data.targetValue = Math.random() * 0.7 + 0.1;
            }
            const diff = data.targetValue - data.value;
            data.value += diff * data.speed;
        });
    }

    function draw() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < 8; i++) {
            const freq = waveData[i].value * 7.0;
            ctx.beginPath();

            for (let x = 0; x < canvas.width; x += 1) {
                const normalizedX = (x / canvas.width) * 2 - 1;
                let px = normalizedX + i * 0.04 + freq * 0.03;
                let py = Math.sin(px * 10 + time) * Math.cos(px * 2) * freq * 0.1 * ((i + 1) / 8);
                const canvasY = (py + 1) * canvas.height / 2;

                if (x === 0) {
                    ctx.moveTo(x, canvasY);
                } else {
                    ctx.lineTo(x, canvasY);
                }
            }

            const intensity = Math.min(1, freq * 0.3);
            const r = 255 + intensity * 100;
            const g = 243 + intensity * 130;
            const b = 197;

            ctx.lineWidth = .1 + (i * 0.3);
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.6)`;
            ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.5)`;
            ctx.shadowBlur = 5;
            ctx.stroke();
            ctx.shadowBlur = 0;
        }
    }

    function animate() {
        time += 0.02;
        updateWaveData();
        draw();
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();
  </script>
  <!-- Wave Visualizer Script -->