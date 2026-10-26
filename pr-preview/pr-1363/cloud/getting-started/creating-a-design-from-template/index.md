# Creating a Design from Meshery Catalog Templates


> With this guide, you can create amazing cloud native designs for your infrastructure from already available templates in the meshery catalog.


The [catalog](https://cloud.layer5.io/catalog) is a public collection of designs for cloud native infrastructure. Browsing it needs no account. Cloning does. This page walks through finding a design, trying it without changing anything, and cloning it into your workspace as a private copy.

##  Cloning a design from a template in the Meshery Catalog

Cloning needs the Clone Design permission. These built-in roles hold it, and they also hold View Designs: the User role, Team Admin, Workspace Admin, Organization Admin, and Provider Admin. If your role lacks Clone Design, the clone action is shown disabled.

1. Open the [catalog](https://cloud.layer5.io/catalog). You can do this before you have an account. To clone, sign in to [Layer5 Cloud](https://cloud.layer5.io) first. If you do not have an account, follow [Setting up a Layer5 account](/pr-preview/pr-1363/cloud/getting-started/getting-started-with-layer5-account/).
2. Search by technology or type. Sort by **Most Cloned** or **Most Downloaded** to see what other people rely on most. Each design card shows a summary. Opening a design shows its full details. You can also download a design to work with it outside Layer5 Cloud.
3. Pick the organization and the workspace the copy should land in, for example **My Workspace** in **My Organization**. A clone lands in the workspace you have selected, in the organization you have selected. You must have one specific organization selected. Cloning in the all-organizations scope is refused.
4. Clone the design from its catalog entry.

Layer5 Cloud then creates your copy:

| Property of the clone | Value |
|---|---|
| Name | The original name followed by " (Copy)", for example "My App (Copy)" |
| Owner | You |
| Visibility | Private to you |
| Location | Your selected workspace in your selected organization |
| Content | The original's catalog data and file location, converted to the current design format |

Cloning also counts toward the original: Layer5 Cloud records a clone event on the original design, which feeds the catalog's **Most Cloned** sort and the catalog leaderboard. If this is the first design you own, your profile earns the first-design badge.

You can also publish your own design to the catalog.

## Open a design in the Playground

Before you commit to a copy, open the design in the Playground. **Open in Playground** opens the design in a new browser tab in Kanvas on the [Meshery Playground](https://playground.meshery.io/), loaded straight from the catalog. Nothing is cloned and nothing lands in your workspace.

## When cloning is refused

| Situation | Result |
|---|---|
| The design is not Published or Public | Refused with HTTP 403 ("unauthorized to clone design"). Only published or public designs can be cloned. |
| The all-organizations scope is selected | Refused with HTTP 400 ("Creating designs is not allowed for orgID all"). |
| No organization is selected | Refused with HTTP 400 ("orgID is not provided"). |
| Your role lacks Clone Design | The clone action is disabled. |

## What a clone is

A clone is a separate, private design that you own. It starts from the original's content and lives in your workspace, where you work on it like any other design you own. Opening a design in the Playground creates nothing in your account.

Your copy is ready when a design named after the original with " (Copy)" appended appears in the workspace you selected, owned by you and private.

To move that copy into a workspace your team shares, follow [Set up your organization](/pr-preview/pr-1363/cloud/getting-started/#set-up-your-organization). To edit it, open [Kanvas](/pr-preview/pr-1363/kanvas/). How the catalog publishes and lists designs is covered in [Catalog](/pr-preview/pr-1363/cloud/concepts/catalog/).

