# Provider Initialization


> Reference for INIT_CONFIG, the setting that creates the provider organization and the first Provider Admin when a self-hosted deployment starts: format, fields, behavior, and failure modes.



A new deployment has no users, so nobody can sign in to administer it. Provider initialization solves that: when the server starts with `INIT_CONFIG` set, it creates the **provider organization** and its first **Provider Admin**. From that account, you create organizations, assign roles, and manage the deployment. See [Roles and Permissions](/pr-preview/pr-1326/cloud/reference/default-permissions/) for what a Provider Admin can do.

## Format

`INIT_CONFIG` holds a YAML document. In Helm, set it as a multiline string in `env.initConfig`, or load it from a file with `--set-file env.initConfig=provider-init.yaml`.

```yaml
organization:
  name: "Example Corp"
  description: "The provider organization for Example Corp."
  country: "United States"
  region: "North America"

user:
  first_name: "Ada"
  last_name: "Admin"
  email: "admin@example.com"
  username: "admin@example.com"
  password: "<initial password>"
```

| Field | Required | Meaning |
| --- | --- | --- |
| `organization.name` | Yes | Name of the provider organization. |
| `organization.description` | No | Description. |
| `organization.country` | No | Country. |
| `organization.region` | No | Region. |
| `user.first_name` | Yes | First name of the administrator. |
| `user.last_name` | Yes | Last name of the administrator. |
| `user.email` | Yes | Email address. It is the sign-in identifier. |
| `user.username` | No | Defaults to the email address. |
| `user.password` | Yes | Initial password. |

The provider organization always has the fixed identifier `11111111-1111-1111-1111-111111111111`. Every deployment uses the same one.

## What happens at startup

The server evaluates `INIT_CONFIG` on every start, after database migrations and before it reports ready.

1. **Not set.** Initialization is skipped.
2. **Set but invalid.** A missing required field or YAML that does not parse is logged as an error. The server keeps starting, with no provider administrator.
3. **The provider organization already exists.** Initialization is skipped, and any change to `INIT_CONFIG` is ignored.
4. **The provider organization does not exist.** The server runs these steps in order:
   1. Creates a Kratos identity with the password and the email marked verified.
   2. Creates the user and marks the account active.
   3. Grants the user the Provider Admin role and the Kanvas role.
   4. Creates the provider organization with the fixed identifier, owned by that user.
   5. Adds the user to the organization with the Organization Admin role.

The first administrator can sign in as soon as the server is ready. They never see an email verification step, because the address is created verified.

After the organization exists, the server also seeds the deployment's default Google and GitHub sign-in credentials from `env.providerOrg*`. See [Identity Services](/pr-preview/pr-1326/cloud/guides/self-hosted/planning/identity-services/#how-the-defaults-are-stored).

## Failure modes

| Condition | Result |
| --- | --- |
| A step fails after earlier steps succeeded | The server logs the error and keeps starting. The steps are not wrapped in one transaction, so rows from earlier steps remain. Fix the cause and restart. A restart repeats the whole sequence for as long as the provider organization does not exist. |
| Kratos rejects the identity (for example, the password is too weak or the identity exists) | The server logs a warning and continues with the remaining steps. |
| `INIT_CONFIG` removed after the first successful start | No effect. The organization exists. |
| `INIT_CONFIG` changed after the first successful start | No effect. Change the administrator through the product. |

## Handling the password

The initial password is stored in the Helm release, in the pod environment, and in the server log, because the server logs the configuration it reads. Treat all three as secret. After you have signed in and changed the password, remove `env.initConfig` and run `helm upgrade`. The administrator account is unaffected.

## When to use it

Use `INIT_CONFIG` for every new self-hosted deployment, and keep the file in your secret manager next to the other values. It makes a deployment reproducible: a rebuilt cluster with the same values and a restored database comes up with the same administrator, and a rebuilt cluster with an empty database creates it again.

