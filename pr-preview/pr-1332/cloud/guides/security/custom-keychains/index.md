# Build a Custom Keychain


> Group keys into a keychain you own, change its keys, and delete it. A role must include the keychain before it grants anything.



A custom keychain bundles the keys that a custom role needs. This guide creates a keychain, changes its keys, and deletes it. It is written for Provider Admins and self-hosted operators, because only they can complete the whole path from keys to users. For the model, read the [Keychains concept](/pr-preview/pr-1332/cloud/concepts/identity-and-security/keychains/).

## Before you start

- You need the **Create Keychain**, **Edit Keychain**, and **Delete Keychain** permissions to use the matching controls. Provider Admin holds all three. No other default role does.
- A keychain does nothing until a role includes it. Creating and editing roles is a Provider Admin action. On hosted Layer5 Cloud an organization cannot complete this path alone. On a self-hosted deployment, your Provider Admins can.
- Keychains are not organization-scoped. A role that includes your keychain grants its keys to every user who holds that role, in every organization.

## Create a keychain

Open the Keychains tab under Security and create a keychain. Give it a name and choose the keys it bundles. Layer5 Cloud creates the keychain and adds each key to it. If adding a key fails, the interface reports it as "Failed to add key to keychain". Open the keychain and confirm every key you chose is present.

You own the keychain. The Keychains list shows system keychains and the keychains you own, so other administrators do not see it in their list. Provider Admins can still edit or delete it through the server.

## Change the keys in a keychain

**Needs:** Edit Keychain in the interface. On the server, you must be the keychain's owner or a Provider Admin.

Open the keychain's update dialog, rename it, or change the selected keys. The interface adds and removes only the difference. Removing a key stops that key flowing to every role that includes the keychain, immediately.

## Use the keychain

Add the keychain to a role. See the [Roles concept](/pr-preview/pr-1332/cloud/concepts/identity-and-security/roles/) for how roles bundle keychains and how users receive roles. Assigning a keychain to a role needs the **Assign Keychains to Roles** permission and changes the role for every organization, because roles are global.

Test with a user who holds the role: sign in as that user in a specific organization and confirm the controls the keys govern are enabled.

## Delete a keychain

**Needs:** Delete Keychain in the interface. On the server, you must be the keychain's owner or a Provider Admin.

Delete the keychain from its row and confirm in the "Delete Keychain" dialog. Deleting removes the keychain's key mappings. The keychain stops granting anything at once, for every role that included it.

Default keychains are owned by the system, so only a Provider Admin can edit or delete them. Do not change a default keychain unless you intend to change permissions for every user who holds a default role.

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| The Keychains tab shows a permission error | You lack View Keychains in the selected organization. | Ask an Organization Admin to check your role. |
| Create Keychain is disabled | You lack the Create Keychain key. | Use a Provider Admin account. |
| `403` naming "Provider Admin or Keychain Owner" | You are neither a Provider Admin nor the keychain's owner. | Ask the owner or a Provider Admin to make the change. |
| A user still lacks a capability | The keychain is not on the user's role, or the user holds the role in a different organization. | Add the keychain to the role, and check the role is held in the organization in use. |

