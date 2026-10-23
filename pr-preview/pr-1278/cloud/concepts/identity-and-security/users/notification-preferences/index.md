# Notification Preferences


> Manage your notifications on Layer5 Cloud


Layer5 Cloud sends email when something happens that involves you: you earn a badge, your role changes, someone comments on your design. Notification preferences decide which of those emails reach you. Preferences belong to your account, so they apply in every organization you belong to.

Email is the only channel. Layer5 Cloud has no per-event choice between email and another channel.

You need the **View Profile** permission, which the default user role holds. The preferences are on your own account, and you cannot set them for anyone else.

## To change the notification preferences

1. Sign into [Layer5 Cloud](https://cloud.layer5.io).
2. Open your account and the Preferences tab, at <https://cloud.layer5.io/account/preferences>.

How the controls behave:

- **Everything is on until you turn it off.** A new account receives every notification. You opt out of the ones you do not want, and a notification added later is on for you until you turn it off.
- **Preferences save themselves.** About one second after your last change, Layer5 Cloud saves it and confirms with "Notification preferences updated". There is no Save button.
- **Preferences are grouped.** The preferences appear under categories and sub-categories. Each category has a switch that turns every preference in it on or off at once. To opt out of all email, turn every category off.
- **A preference suppresses email, not the event.** The event still happens and still appears in the audit trail. Only the email is skipped.

The categories below are the ones the account page lists. Layer5 Cloud reads the list of available preferences from its own configuration, so a deployment can list more or fewer.

| Category | Preference | Emails you when |
| --- | --- | --- |
| Acknowledgment | Badge assignment and updates | A badge is awarded to you or changed. |
| Organization Activity | Organization update | An organization you belong to is updated. |
| Workspace Activity | Team, user, and organization management | A team you belong to is updated, or you are added to a team. |
| Workspace Activity | Role assignment and updates | Your roles change. |
| Workspace Activity | Comments on your designs | Someone comments on a design you own. Turning this off silences email about comments on your designs. |
| Workspace Activity | Participating and @mentions in comments | You are mentioned in a comment, or a thread you took part in gets a reply. |

To stop email from one thread without turning the preference off, mute that thread. See [Muting comment notifications](/pr-preview/pr-1278/kanvas/designer/comments/#muting-comment-notifications).

## Preferences that do nothing yet

Three preferences appear greyed out and unchecked, and cannot be changed: **Changes to designs**, **Deployments in environments**, and **Weekly summary**. Layer5 Cloud does not send those emails today. Do not rely on them.

There is no separate Approval Requests category, and there is no single switch that opts out of every email at once. Turn each category off to stop all email.

## Edge cases

- Anonymous accounts never receive organization update email.
- Layer5 Cloud checks the preference when it is about to send the email. Turning a preference back on does not resend email that was skipped while it was off.
- If saving fails, the page shows the reason, and your previous setting stays in force.

Who receives comment email is described in [Managing comment notifications](/pr-preview/pr-1278/kanvas/designer/comments/#managing-comment-notifications). Profile and sign-in settings are on [Setting up a Layer5 account](/pr-preview/pr-1278/cloud/getting-started/getting-started-with-layer5-account/).

