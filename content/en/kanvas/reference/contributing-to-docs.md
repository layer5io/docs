---
title: Contributing to Layer5 Docs
weight: 10
description: A detailed contribution guide for Layer5 Docs.
aliases:
  - /meshmap/reference/contributing-to-docs
---

Welcome to the GitHub repository for Layer5's documentation website!

The docs website is hosted at <https://docs.layer5.io>.

We use [Hugo](https://gohugo.io/) with the [google/docsy](https://github.com/google/docsy) theme for styling and site structure, and [Netlify](https://www.netlify.com/) to manage the deployment of the site.

## Quickstart

Here's a quick guide to updating the docs:

1. Fork the [layer5io/docs repository](https://github.com/layer5io/docs) on GitHub.

2. Make your changes and send a pull request (PR).

3. If you're not yet ready for a review, add "WIP" to the PR name to indicate it's a work in progress.

4. Wait for the automated PR workflow to do some checks.
   When it's ready, you should see a comment like this: `deploy/netlify — Deploy preview ready!`

5. Click **Details** to the right of "Deploy preview ready" to see a preview of your updates.

6. Continue updating your doc and pushing your changes until you're happy with the content.

7. When you're ready for a review, add a comment to the PR, remove any holds or "WIP" markers, and assign a reviewer/approver. See the [Layer5 contributor guide](https://layer5.io/community/handbook/contribution).

If you need more help with the GitHub workflow, follow  this [guide to a standard GitHub workflow](https://github.com/layer5io/docs/blob/master/CONTRIBUTING-gitflow.md).

## Local development

This section will show you how to develop the website locally, by running a local Hugo server.

### Install Hugo

To install Hugo, follow the [instructions for your system type](https://gohugo.io/getting-started/installing/).

**NOTE:** we recommend that you use Hugo version `v0.140.2`, as this is currently the version we deploy to Netlify.

For example, using homebrew to install hugo on macOS or linux:

```bash
# WARNING: this may install a newer version than `v0.140.2`
brew install hugo
```

### Install Node Packages

If you plan to make changes to the site styling, you need to install some **node libraries** as well.
(See the [Docsy setup guide](https://www.docsy.dev/docs/getting-started/#install-postcss) for more information)

You can install the same versions we use in Netlify (defined in `package.json`) with the following command:

```bash
npm install -D
```

### Run local hugo server

Follow the usual GitHub workflow of forking the repository on GitHub and then cloning your fork to your local machine.

1. **Fork** the [layer5io/docs repository](https://github.com/layer5io/docs) in the GitHub UI.

2. Clone your fork locally:

    ```bash
    git clone git@github.com:<your-github-username>/docs.git
    cd website/
    ```

3. Initialize the Docsy submodule:

    ```bash
    git submodule update --init --recursive
    ```

4. Install Docsy dependencies:

    ```bash
    # NOTE: ensure you have node 18 installed
    (cd themes/docsy/ && npm install)
    ```

5. Start your local Hugo server:

    ```bash
    hugo server -D
    ```

6. You can access your website at [http://localhost:1313/](http://localhost:1313/)

### Useful docs

* [User guide for the Docsy theme](https://www.docsy.dev/docs/getting-started/)
* [Hugo installation guide](https://gohugo.io/getting-started/installing/)
* [Hugo basic usage](https://gohugo.io/getting-started/usage/)
* [Hugo site directory structure](https://gohugo.io/getting-started/directory-structure/)
* [hugo server reference](https://gohugo.io/commands/hugo_server/)

## Menu structure

The site theme has one Hugo menu (`main`), which defines the top navigation bar. You can find and adjust the definition
of the menu in the [site configuration file](https://github.com/layer5io/docs/blob/master/hugo.toml).

The left-hand navigation panel is defined by the directory structure under the [`content/en` directory](https://github.com/layer5io/docs/tree/master/content/en).

A `weight` property in the _front matter_ of each page determines the position of the page relative to the others in the same directory.
The lower the weight, the earlier the page appears in the section.

Here is an example `_index.md` file:

```md
+++
title = "Getting Started with Layer5"
description = "Overview"
weight = 1
+++
```

## Docsy Theme

We use the [Docsy](https://www.docsy.dev/) theme for the website.
The theme files are managed with a [git submodule](https://git-scm.com/book/en/v2/Git-Tools-Submodules) in the `themes/docsy` directory.

**Do not change these files**, they are not actually inside this repo, but are part of the [google/docsy](https://github.com/google/docsy) repo.

To update referenced docsy commit, run the following command at the root of the repo:

```bash
# for example, to update docsy to v0.6.0
# WARNING: updating the docsy version will require you to update our overrides
#          check under: `layouts/partials` and `assets/scss`
git -C themes/docsy fetch --tags
git -C themes/docsy checkout tags/v0.6.0
```

## Documentation style guide

For guidance on writing effective documentation, see the style guide for the Layer5 docs.

### Overriding theme styles

The theme holds its styles in the [`assets/scss` directory](https://github.com/layer5io/docs/tree/master/assets/scss).

**Do not change these files**, they are not actually inside this repo, but are part of the [google/docsy](https://github.com/google/docsy) repo. These files are managed as a Git submodule and may be updated or replaced when the theme is upgraded. Any changes made directly to the theme files will be lost during updates and are not preserved in version control.

You can override the default styles and add new ones:

* To override templates or layouts, place your files in the main project directory (e.g., `layouts/partials/`) instead of editing the theme files under `themes/docsy/`.
* Use the same file name and relative path as the theme. Hugo will look for files in the project first and fall back to the theme if no override is found.
  
  For example, to override the theme’s navigation bar template:

  ```
  Project override:    layouts/partials/navbar.html  
  Theme default:       themes/docsy/layouts/partials/navbar.html
  ```

* To customize SCSS variables, update the `_variables_project.scss` file in the `assets/scss/` directory. This file overrides the theme’s SCSS variables and can also be used to redefine Bootstrap variables.
* For adding custom CSS rules, use the `_styles_project.scss` file in the same `assets/scss/` directory.

### Image styling

By default, Markdown images are written like this:

```markdown
![Alt text](/path/to/image.png)
```

These are rendered with:
* `max-width: 70%` of the viewport
* `max-height: 80vh` of the viewport height
* centered block layout

This default styling works well for most landscape (horizontal) images. However, if an image is very tall, narrow, or otherwise looks awkward, you can override the default by embedding raw HTML and specifying a custom size:

```html
<img src="./images/example.png" alt="Example description" style="max-width: 40vw; max-height: 60vh; display: block; margin: 1rem auto;" />
```

### Additional resources

* **Bootstrap image utilities:**  
  <https://getbootstrap.com/docs/4.0/content/images/>  
* **Bootstrap utilities (borders, floats, etc.):**  
  <https://getbootstrap.com/docs/4.0/utilities/>  

## Using Hugo shortcodes

Sometimes it's useful to define a snippet of information in one place and reuse it wherever we need it.
For example, we want to be able to refer to the minimum version of various frameworks/libraries throughout the docs,
without causing a maintenance nightmare.

For this purpose, we use Hugo's "shortcodes".
Shortcodes are similar to Django variables. You define a shortcode in a file, then use a specific markup
to invoke the shortcode in the docs. That markup is replaced by the content of the shortcode file when the page is built.

To create a shortcode:

1. Add an HTML file in the `/docs/layouts/shortcodes/` directory.
   The file name must be short and meaningful, as it determines the shortcode you and others use in the docs.

2. For the file content, add the text and HTML markup that should replace the shortcode markup when the web page is built.

To use a shortcode in a document, wrap the name of the shortcode in braces and percent signs like this:

```code
  { {% shortcode-name %}}
```

The shortcode name is the file name minus the `.html` file extension.

**Example:** The following shortcode defines the minimum required version of Kubernetes:

* File name of the shortcode:

  ```
  kubernetes-min-version.html
  ```

* Content of the shortcode:

  ```
  1.8
  ```

* Usage in a document:

  ```
  You need Kubernetes version 1.28 or later.
  ```

The following shortcode defines the minimum required version of Kubernetes:

* File name of the shortcode:

  ```
  kubernetes-min-version.html
  ```

Useful Hugo docs:

* [Shortcode templates](https://gohugo.io/templates/shortcode-templates/)
* [Shortcodes](https://gohugo.io/content-management/shortcodes/)

## Versioning of the docs

For each stable release, we create a new branch for the relevant documentation.
For example, the documentation for the v0.2 stable release is maintained in the `v0.2-branch`.
Each branch has a corresponding Netlify website that automatically syncs each merged PR.

The versioned sites follow this convention:

* `docs.layer5.io` always points to the current _master branch_
* `master.docs.layer5.io` always points to GitHub head
* `vXXX-YYY.docs.layer5.io` points to the release at vXXX.YYY-branch

We also hook up each version to the dropdown on the website menu bar.

Whenever any documents reference any source code, you should use the version shortcode in the links, like so:

```
https://github.com/layer5io/docs/blob/master/scripts/gke/deploy.sh
```

This ensures that all the links in a versioned webpage point to the correct branch.

## Markdown

Text can be **bold**, _italic_, or ~~strikethrough~~. [Links](https://gohugo.io) should be blue with no underlines (unless hovered over).

There should be whitespace between paragraphs. Vape migas chillwave sriracha poutine try-hard distillery. Tattooed shabby chic small batch, pabst art party heirloom letterpress air plant pop-up. Sustainable chia skateboard art party banjo cardigan normcore affogato vexillologist quinoa meggings man bun master cleanse shoreditch readymade. Yuccie prism four dollar toast tbh cardigan iPhone, tumblr listicle live-edge VHS. Pug lyft normcore hot chicken biodiesel, actually keffiyeh thundercats photo booth pour-over twee fam food truck microdosing banh mi. Vice activated charcoal raclette unicorn live-edge post-ironic. Heirloom vexillologist coloring book, beard deep v letterpress echo park humblebrag tilde.

90's four loko seitan photo booth gochujang freegan tumeric listicle fam ugh humblebrag. Bespoke leggings gastropub, biodiesel brunch pug fashion axe meh swag art party neutra deep v chia. Enamel pin fanny pack knausgaard tofu, artisan cronut hammock meditation occupy master cleanse chartreuse lumbersexual. Kombucha kogi viral truffaut synth distillery single-origin coffee ugh slow-carb marfa selfies. Pitchfork schlitz semiotics fanny pack, ugh artisan vegan vaporware hexagon. Polaroid fixie post-ironic venmo wolf ramps **kale chips**.

> There should be no margin above this first sentence.
>
> Blockquotes should be a lighter gray with a border along the left side in the secondary color.
>
> There should be no margin below this final sentence.

## First Header 2

This is a normal paragraph following a header. Knausgaard kale chips snackwave microdosing cronut copper mug swag synth bitters letterpress glossier **craft beer**. Mumblecore bushwick authentic gochujang vegan chambray meditation jean shorts irony. Viral farm-to-table kale chips, pork belly palo santo distillery activated charcoal aesthetic jianbing air plant woke lomo VHS organic. Tattooed locavore succulents heirloom, small batch sriracha echo park DIY af. Shaman you probably haven't heard of them copper mug, crucifix green juice vape _single-origin coffee_ brunch actually. Mustache etsy vexillologist raclette authentic fam. Tousled beard humblebrag asymmetrical. I love turkey, I love my job, I love my friends, I love Chardonnay!

Deae legum paulatimque terra, non vos mutata tacet: dic. Vocant docuique me plumas fila quin afuerunt copia haec o neque.

On big screens, paragraphs and headings should not take up the full container width, but we want tables, code blocks and similar to take the full width.

Scenester tumeric pickled, authentic crucifix post-ironic fam freegan VHS pork belly 8-bit yuccie PBR&B. **I love this life we live in**.

## Second Header 2

> This is a blockquote following a header. Bacon ipsum dolor sit amet t-bone doner shank drumstick, pork belly porchetta chuck sausage brisket ham hock rump pig. Chuck kielbasa leberkas, pork bresaola ham hock filet mignon cow shoulder short ribs biltong.

### Header 3

```
This is a code block following a header.
```

Next level leggings before they sold out, PBR&B church-key shaman echo park. Kale chips occupy godard whatever pop-up freegan pork belly selfies. Gastropub Belinda subway tile woke post-ironic seitan. Shabby chic man bun semiotics vape, chia messenger bag plaid cardigan.

#### Header 4

* This is an unordered list following a header.
* This is an unordered list following a header.
* This is an unordered list following a header.

##### Header 5

1. This is an ordered list following a header.
2. This is an ordered list following a header.
3. This is an ordered list following a header.

###### Header 6

| What      | Follows         |
|-----------|-----------------|
| A table   | A header        |
| A table   | A header        |
| A table   | A header        |

----------------

There's a horizontal rule above and below this.

----------------

Here is an unordered list:

* Liverpool F.C.
* Chelsea F.C.
* Manchester United F.C.

And an ordered list:

1. Michael Brecker
2. Seamus Blake
3. Branford Marsalis

And an unordered task list:

* [x] Create a Hugo theme
* [x] Add task lists to it
* [ ] Take a vacation

And a "mixed" task list:

* [ ] Pack bags
* Don’t forget your passport!
* [ ] Travel!

And a nested list:

* Jackson 5
  * Michael
  * Tito
  * Jackie
  * Marlon
  * Jermaine
* TMNT
  * Leonardo
  * Michelangelo
  * Donatello
  * Raphael

Definition lists can be used with Markdown syntax. Definition headers are bold.

Name
: Godzilla

Born
: 1952

Birthplace
: Japan

Color
: Green

----------------

Tables should have bold headings and alternating shaded rows.

| Artist            | Album           | Year |
|-------------------|-----------------|------|
| Michael Jackson   | Thriller        | 1982 |
| Prince            | Purple Rain     | 1984 |
| Beastie Boys      | License to Ill  | 1986 |

If a table is too wide, it should scroll horizontally.

| Artist            | Album           | Year | Label       | Awards   | Songs     |
|-------------------|-----------------|------|-------------|----------|-----------|
| Michael Jackson   | Thriller        | 1982 | Epic Records | Grammy Award for Album of the Year, American Music Award for Favorite Pop/Rock Album, American Music Award for Favorite Soul/R&B Album, Brit Award for Best Selling Album, Grammy Award for Best Engineered Album, Non-Classical | Wanna Be Startin' Somethin', Baby Be Mine, The Girl Is Mine, Thriller, Beat It, Billie Jean, Human Nature, P.Y.T. (Pretty Young Thing), The Lady in My Life |
| Prince            | Purple Rain     | 1984 | Warner Brothers Records | Grammy Award for Best Score Soundtrack for Visual Media, American Music Award for Favorite Pop/Rock Album, American Music Award for Favorite Soul/R&B Album, Brit Award for Best Soundtrack/Cast Recording, Grammy Award for Best Rock Performance by a Duo or Group with Vocal | Let's Go Crazy, Take Me With U, The Beautiful Ones, Computer Blue, Darling Nikki, When Doves Cry, I Would Die 4 U, Baby I'm a Star, Purple Rain |
| Beastie Boys      | License to Ill  | 1986 | Mercury Records | No awards, but this table cell is wide | Rhymin & Stealin, The New Style, She's Crafty, Posse in Effect, Slow Ride, Girls, (You Gotta) Fight for Your Right, No Sleep Till Brooklyn, Paul Revere, Hold It Now, Hit It, Brass Monkey, Slow and Low, Time to Get Ill |

----------------

Code snippets like `var foo = "bar";` can be shown inline.

Also, `this should vertically align` ~~`with this`~~ ~~and this~~.

Code can also be shown in a block element.

```
foo := "bar";
bar := "foo";
```

Code can also use syntax highlighting.

```go
func main() {
  input := `var foo = "bar";`

  lexer := lexers.Get("javascript")
  iterator, _ := lexer.Tokenise(nil, input)
  style := styles.Get("github")
  formatter := html.New(html.WithLineNumbers())

  var buff bytes.Buffer
  formatter.Format(&buff, style, iterator)

  fmt.Println(buff.String())
}
```

```
Long, single-line code blocks should not wrap. They should horizontally scroll if they are too long. This line should be long enough to demonstrate this.
```

Inline code inside table cells should still be distinguishable.

| Language    | Code               |
|-------------|--------------------|
| Javascript  | `var foo = "bar";` |
| Ruby        | `foo = "bar"{`      |

----------------

Small images should be shown at their actual size.

![](https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Picea_abies_shoot_with_buds%2C_Sogndal%2C_Norway.jpg/240px-Picea_abies_shoot_with_buds%2C_Sogndal%2C_Norway.jpg)

Large images should always scale down and fit in the content container.

![](https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Picea_abies_shoot_with_buds%2C_Sogndal%2C_Norway.jpg/1024px-Picea_abies_shoot_with_buds%2C_Sogndal%2C_Norway.jpg)

_The photo above of the Spruce Picea abies shoot with foliage buds: Bjørn Erik Pedersen, CC-BY-SA._

## Components

### Alerts

{{< alert >}}This is an alert.{{< /alert >}}
{{< alert title="Note" >}}This is an alert with a title.{{< /alert >}}
{{% alert title="Note" %}}This is an alert with a title and **Markdown**.{{% /alert %}}
{{< alert color="success" >}}This is a successful alert.{{< /alert >}}
{{< alert color="warning" >}}This is a warning.{{< /alert >}}
{{< alert color="warning" title="Warning" >}}This is a warning with a title.{{< /alert >}}

## Another Heading

Add some sections here to see how the ToC looks like. Bacon ipsum dolor sit amet t-bone doner shank drumstick, pork belly porchetta chuck sausage brisket ham hock rump pig. Chuck kielbasa leberkas, pork bresaola ham hock filet mignon cow shoulder short ribs biltong.

### This Document

Inguina genus: Anaphen post: lingua violente voce suae meus aetate diversi. Orbis unam nec flammaeque status deam Silenum erat et a ferrea. Excitus rigidum ait: vestro et Herculis convicia: nitidae deseruit coniuge Proteaque adiciam _eripitur_? Sitim noceat signa _probat quidem_. Sua longis _fugatis_ quidem genae.

### Pixel Count

Tilde photo booth wayfarers cliche lomo intelligentsia man braid kombucha vaporware farm-to-table mixtape portland. PBR&B pickled cornhole ugh try-hard ethical subway tile. Fixie paleo intelligentsia pabst. Ennui waistcoat vinyl gochujang. Poutine salvia authentic affogato, chambray lumbersexual shabby chic.

### Contact Info

Plaid hell of cred microdosing, succulents tilde pour-over. Offal shabby chic 3 wolf moon blue bottle raw denim normcore poutine pork belly.

### External Links

Stumptown PBR&B keytar plaid street art, forage XOXO pitchfork selvage affogato green juice listicle pickled everyday carry hashtag. Organic sustainable letterpress sartorial scenester intelligentsia swag bushwick. Put a bird on it stumptown neutra locavore. IPhone typewriter messenger bag narwhal. Ennui cold-pressed seitan flannel keytar, single-origin coffee adaptogen occupy yuccie williamsburg chillwave shoreditch forage waistcoat.

```
This is the final element on the page and there should be no margin below this.
```

### Footnotes

This is a superscript number for your footnote. [^1]

[^1]: This is a footnote.
