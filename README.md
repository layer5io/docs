# Layer5 Product Documentation
Explore tutorials and documentation by product in the docs.layer5.io website; documentation and developer resources of Layer5 products.

## Contributions Welcome!

If you find a typo or you feel like you can improve the HTML, CSS, or JavaScript, we welcome contributions. Feel free to open issues or pull requests like any normal GitHub project, and we'll merge it in 🚀

### Running the Site Locally

The website can be run locally through Golang (Hugo) or Docker. If you choose to run through Docker, everything will be a little bit slower due to the additional overhead, so for frequent contributors it may be worth it to use Golang.

### With Docker

Running the site locally is simple. Provided you have Docker installed, clone this repo, run `make docker`, and then visit http://localhost:3000.

The docker image is pre-built with all the website dependencies installed, which is what makes it so quick and simple, but also means if you need to change dependencies and test the changes within Docker, you'll need a new image. If this is something you need to do, you can run make build-image to generate a local Docker image with updated dependencies, then make website-local to use that image and preview.

### With Golang

If your local development environment has a supported version (v1.21.0+) of Golang installed, next you'll need to install extended hugo version as it has necessary SCSS/SASS support. Find all the hugo packages here: https://github.com/gohugoio/hugo/releases/tag/v0.120.4

Now to setup and run the site locally run: 

`make setup` followed by `make site`

...and then visit http://localhost:1313.

If you pull down new code from GitHub, you will occassionally need run `make setup` again. Otherwise, there's no need to re-run `make setup` each time the site is run, you can just run `make site` to get it going and have it automatically reload as you make and save site edits.

### Editing Markdown Content

Documentation content is written in Markdown and you'll find all files listed under the /content directory.

To create a new page with Markdown, create a file ending in `.md` in a `site/<subdirectory>`. The path in the content directory will be the URL route. For example, `site/docs/hello.md` will be served from the `/docs/hello` URL.

```yaml
---
title: 'My Title'
description: "A thorough, yet succinct description of the page's contents"
---
```
The significant keys in the YAML frontmatter are:

`title` (string) - This is the title of the page that will be set in the HTML title.
`description` (string) - This is a description of the page that will be set in the HTML description.
`permalink` (string - relative file path) - canoncial location of the page
`category` (string) - section to which the page belongs.
`redirect_from` (string - relative file path) - in case the page was previously available elsewhere

<div>&nbsp;</div>

### Uploading Images to the site
To display images in a pop-up modal, use the following syntax: `![alt text](/path/to/image.svg)`. 

**Note-> For images to show correctly on subpages, always provide the complete image path**

<hr/>

<a name="contributing"></a><a name="community"></a>
Our projects are community-built and welcome collaboration. 👍 Be sure to see the <a href="https://docs.google.com/document/d/17OPtDE_rdnPQxmk2Kauhm3GwXF1R5dZ3Cj8qZLKdo5E/edit">Layer5 Community Welcome Guide</a> for a tour of resources available to you and jump into our <a href="http://slack.layer5.io">Slack</a>!

<p style="clear:both;">
<a href ="https://layer5.io/community/meshmates"><img alt="MeshMates" src=".github/readme/images/layer5-community-sign.png" style="margin-right:10px; margin-bottom:15px;" width="28%" align="left"/></a>
<h3>Find your MeshMate</h3>

<p>MeshMates are experienced Layer5 community members, who will help you learn your way around, discover live projects and expand your community network. 
Become a <b>Meshtee</b> today!</p>

Find out more on the <a href="https://layer5.io/community">Layer5 community</a>. <br />
<br /><br /><br /><br />
</p>

<div>&nbsp;</div>

<a href="https://slack.meshery.io">

<picture align="right">
  <source media="(prefers-color-scheme: dark)" srcset=".github/readme/images//slack-dark-128.png"  width="110px" align="right" style="margin-left:10px;margin-top:10px;">
  <source media="(prefers-color-scheme: light)" srcset=".github/readme/images//slack-128.png" width="110px" align="right" style="margin-left:10px;padding-top:5px;">
  <img alt="Shows an illustrated light mode meshery logo in light color mode and a dark mode meshery logo dark color mode." src=".github/readme/images//slack-128.png" width="110px" align="right" style="margin-left:10px;padding-top:13px;">
</picture>
</a>


<a href="https://meshery.io/community"><img alt="Layer5 Community" src=".github/readme/images//community.svg" style="margin-right:8px;padding-top:5px;" width="140px" align="left" /></a>

<p>
✔️ <em><strong>Join</strong></em> any or all of the weekly meetings on <a href="https://calendar.google.com/calendar/b/1?cid=bGF5ZXI1LmlvX2VoMmFhOWRwZjFnNDBlbHZvYzc2MmpucGhzQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20">community calendar</a>.<br />
✔️ <em><strong>Watch</strong></em> community <a href="https://www.youtube.com/playlist?list=PL3A-A6hPO2IMPPqVjuzgqNU5xwnFFn3n0">meeting recordings</a>.<br />
✔️ <em><strong>Access</strong></em> the <a href="https://drive.google.com/drive/u/4/folders/0ABH8aabN4WAKUk9PVA">Community Drive</a> by completing a community <a href="https://layer5.io/newcomer">Member Form</a>.<br />
✔️ <em><strong>Discuss</strong></em> in the <a href="https://discuss.layer5.io">Community Forum</a>.<br />
✔️<em><strong>Explore more</strong></em> in the <a href="https://layer5.io/community/handbook">Community Handbook</a>.<br />
</p>
<p align="center">
<i>Not sure where to start?</i> Grab an open issue with the <a href="https://github.com/issues?q=is%3Aopen+is%3Aissue+archived%3Afalse+org%3Alayer5io+org%3Ameshery+org%3Aservice-mesh-performance+org%3Aservice-mesh-patterns+label%3A%22help+wanted%22+">help-wanted label</a>.</p>
