# Manage Designs

> Task guides for the life of a design file - import, save, clone, export, embed, publish, and delete.


A design is a single record in Layer5 Cloud. It has one owner, lives in one workspace, and carries a visibility (private, public, or published) and a version. These guides cover each way a design enters, changes state, and leaves that record.

Two defaults shape everything below. A design saved for the first time is public, whatever visibility the client requests. Every save of an existing design raises its patch version by one (0.0.1, 0.0.2, and so on).

| Goal | Guide |
|---|---|
| Bring in a manifest, Helm chart, Compose file, Kustomize project, or design, or merge one design into another | [Import and Merge Designs](/pr-preview/pr-1337/kanvas/guides/designs/import-designs/) |
| Understand autosave, the save indicator, Save as, and plan limits | [Save Designs](/pr-preview/pr-1337/kanvas/guides/designs/saving-designs/) |
| Start from a public or published design | [Clone a Design](/pr-preview/pr-1337/kanvas/guides/designs/cloning-a-design/) |
| Back up a design or hand it to other tools | [Export Designs](/pr-preview/pr-1337/kanvas/guides/designs/export-designs/) |
| Show a design on another site | [Embed Designs](/pr-preview/pr-1337/kanvas/guides/designs/embedding-designs/) |
| Make a design available in the catalog | [Publish Designs](/pr-preview/pr-1337/kanvas/guides/designs/publishing-designs/) |
| Remove a design permanently | [Delete a Design](/pr-preview/pr-1337/kanvas/guides/designs/deleting-a-design/) |

For the exact formats Kanvas accepts and produces, see [Supported Import and Export Formats](/pr-preview/pr-1337/kanvas/reference/supported-formats/). To share a design with specific people, see [Share Designs](/pr-preview/pr-1337/kanvas/guides/collaborating/sharing-designs/).

## Where designs go

Every new design lands in exactly one workspace: the workspace you have selected for the current organization, or the first workspace you can see in that organization. If the organization has no workspace, saving, importing, and cloning fail. Creating a design is refused while the organization selector is set to all.

Anonymous users on kanvas.new can create, save, and import designs. Those designs move to the account when the user signs in. Sharing and publishing require an account.

