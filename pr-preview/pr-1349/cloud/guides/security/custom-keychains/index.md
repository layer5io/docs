# Build a Custom Keychain


> Group keys into a keychain, change its keys, and delete it. A role must include the keychain before it grants anything.



A custom keychain bundles the keys that a custom role needs. This guide creates a keychain, changes its keys, and deletes it. It is written for Provider Admins and self-hosted operators, because only a Provider Admin can create, change, or delete a keychain, or include it in a role. For the model, read the [Keychains concept](/pr-preview/pr-1349/cloud/concepts/identity-and-security/keychains/).

## Before you start

- You need the Provider Admin role. The interface also checks the **Create Keychain**, **Edit Keychain**, and **Delete Keychain** permissions for the matching controls. Provider Admin holds all three. No other default role does.
- A keychain does nothing until a role includes it. Creating and editing roles is a Provider Admin action. On hosted Layer5 Cloud an organization cannot complete this path alone. On a self-hosted deployment, your Provider Admins can.
- Keychains are not organization-scoped. A role that includes your keychain grants its keys to every user who holds that role, in every organization.

## Create a keychain

Open the Keychains tab under Security and create a keychain. Give it a name and choose the keys it bundles. Layer5 Cloud creates the keychain and adds each key to it. If adding a key fails, the interface reports it as "Failed to add key to keychain". Open the keychain and confirm every key you chose is present.

You are recorded as the keychain's owner. The Keychains list shows system keychains and the keychains you own, so other administrators do not see it in their list. Any Provider Admin can still edit or delete it through the server, and ownership grants no right to change it.

## Change the keys in a keychain

**Needs:** the Provider Admin role. The interface also requires Edit Keychain.

Open the keychain's update dialog, rename it, or change the selected keys. The interface adds and removes only the difference. Removing a key stops that key flowing to every role that includes the keychain, immediately.

## Use the keychain

Add the keychain to a role. See the [Roles concept](/pr-preview/pr-1349/cloud/concepts/identity-and-security/roles/) for how roles bundle keychains and how users receive roles. Only a Provider Admin can assign a keychain to a role. The change applies to the role in every organization, because roles are global.

Test with a user who holds the role: sign in as that user in a specific organization and confirm the controls the keys govern are enabled.

## Delete a keychain

**Needs:** the Provider Admin role. The interface also requires Delete Keychain.

Delete the keychain from its row and confirm in the "Delete Keychain" dialog. Deleting removes the keychain's key mappings. The keychain stops granting anything at once, for every role that included it.

As with every keychain, only a Provider Admin can edit or delete a default keychain. Do not change a default keychain unless you intend to change permissions for every user who holds a default role.

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| The Keychains tab shows a permission error | You lack View Keychains in the selected organization. | Ask an Organization Admin to check your role. |
| Create Keychain is disabled | You lack the Create Keychain key. | Use a Provider Admin account. |
| `403` with code `meshery_cloud-1108` or `meshery_cloud-3336` | You are not a Provider Admin for the whole deployment. Keychains and their assignment to roles apply across the whole provider. | Ask a Provider Admin to make the change. |
| A user still lacks a capability | The keychain is not on the user's role, or the user holds the role in a different organization. | Add the keychain to the role, and check the role is held in the organization in use. |

