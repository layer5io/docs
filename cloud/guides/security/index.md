# Security

> Guides for API tokens, sessions, and custom keychains: create and revoke credentials, sign out a session, and build a keychain.



These guides cover the security tasks in Layer5 Cloud. For how keys, keychains, and roles combine into permissions, read the [Keys](/cloud/concepts/identity-and-security/keys/) and [Keychains](/cloud/concepts/identity-and-security/keychains/) concepts. For defaults, lifetimes, and endpoints in one place, see the [Security Reference](/cloud/reference/security/).

| I want to | Go to | Permission needed |
| --- | --- | --- |
| Authenticate a script or CI job to Layer5 Cloud | [Create and Use an API Token](/cloud/guides/security/api-tokens/) | Create Token, Download Token |
| Stop a leaked or retired token from working | [Revoke an API Token](/cloud/guides/security/api-tokens/#revoke-a-token) | Delete Token |
| Rotate a token without breaking a pipeline | [Rotate a token](/cloud/guides/security/api-tokens/#rotate-a-token) | Create Token, Delete Token |
| See where I am signed in and end a session | [Review and Sign Out Sessions](/cloud/guides/security/sessions/) | View Sessions, Delete Token |
| Group keys into a custom keychain | [Build a Custom Keychain](/cloud/guides/security/custom-keychains/) | Create Keychain, Edit Keychain, Delete Keychain |

