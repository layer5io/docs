---
title: Reference
description: Low-level ReST API reference for extending Layer5 Cloud.
weight: 20
categories: [Reference]
tags: [extensibility]
---

<!-- {{% pageinfo %}}
Page under construction.
{{% /pageinfo %}} -->
## REST API Reference


### Authenticating with the API

In order to authenticate to Layer5 Cloud's REST API, you need to generate and use a [security token](../security/tokens). Visit your [user account's security tokens](https://meshery.layer5.io/security/tokens) and generate a long-lived security token. Security tokens are without expiration date. You can generate as many tokens as you like. You can also revoke them at any time.

To authenticate with the API, pass the token as a bearer token in the `Authorization` header. For example, in cURL:

```bash

curl protocol://<Layer5-cloud-hostname>/<API> \
-H "Authorization: Bearer <token>"

```

{{< alert title="Note" >}}
Replace `<Layer5-cloud-hostname>` with the hostname or IP address of your hosted Layer5 Cloud instance. For example, [`https://cloud.layer5.io`](https://cloud.layer5.io).

Replace `<API>` with the API endpoint you want to access. For example, [`/api/identity/users/profile`](https://cloud.layer5.io/api/identity/users/profile).

Replace `<token>` with the security token you generated.
{{< /alert >}}

### API Endpoints

See all the API endpoints in the [API Reference](https://meshery.layer5.io/system/api/docs).


<!-- ## First Header 2

This is a normal paragraph following a header. Knausgaard kale chips snackwave microdosing cronut copper mug swag synth bitters letterpress glossier **craft beer**. Mumblecore bushwick authentic gochujang vegan chambray meditation jean shorts irony. Viral farm-to-table kale chips, pork belly palo santo distillery activated charcoal aesthetic jianbing air plant woke lomo VHS organic. Tattooed locavore succulents heirloom, small batch sriracha echo park DIY af. Shaman you probably haven't heard of them copper mug, crucifix green juice vape *single-origin coffee* brunch actually. Mustache etsy vexillologist raclette authentic fam. Tousled beard humblebrag asymmetrical. I love turkey, I love my job, I love my friends, I love Chardonnay!

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

- [x] Create a Hugo theme
- [x] Add task lists to it
- [ ] Take a vacation

And a "mixed" task list:

- [ ] Pack bags
- ?
- [ ] Travel!

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
| Beastie Boys      | License to Ill  | 1986 | Mercury Records | noawardsbutthistablecelliswide | Rhymin & Stealin, The New Style, She's Crafty, Posse in Effect, Slow Ride, Girls, (You Gotta) Fight for Your Right, No Sleep Till Brooklyn, Paul Revere, Hold It Now, Hit It, Brass Monkey, Slow and Low, Time to Get Ill |

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


## Another Heading -->
