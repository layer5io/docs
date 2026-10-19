# Manage Subscriptions and Billing


> See your organization's subscriptions, start or upgrade a paid plan, cancel at the end of a billing period, and understand how the billable user count and proration work.



A subscription connects an organization to a Layer5 plan and bills for it. This guide covers what you can see and do with subscriptions, who can do it, and how the amount you pay follows your membership. For what each plan includes, read [Feature Availability by Plan](/pr-preview/pr-1326/cloud/reference/feature-availability/). Current prices are on the [pricing page](https://layer5.io/pricing).

## Who can manage a subscription

A subscription belongs to an organization, not to a person. Layer5 Cloud checks the caller against the subscription's own organization, so administering one organization gives you no access to another organization's billing.

| Action | Organization Owner | Organization Admin | Provider Admin | Other members |
| --- | --- | --- | --- | --- |
| See the organization's subscriptions | Yes | Yes | Yes | No |
| Start a paid subscription | Yes | Yes | Yes | No |
| Upgrade a subscription | Yes | Yes | Yes | No |
| Cancel a subscription | Yes | Yes | Yes | No |

The Subscription and Plans tabs open for any user who holds **View Subcription** or **View Plans**. The default user role holds both. A member who is not an owner or Organization Admin can open the tab, but Layer5 Cloud refuses the data behind it, so the subscription table cannot load. For subscriptions that belong to another organization, Layer5 Cloud answers "subscription not found", the same answer it gives for an id that does not exist.

The Subscription and Plans tabs belong to the Layer5 Cloud interface. When the account page is shown inside a Meshery UI that uses Layer5 Cloud as its provider, only the Profile tab appears.

## Read your subscriptions

The Subscription tab lists each subscription with these columns:

| Column | Meaning |
| --- | --- |
| Plan | The plan the subscription is on. |
| Cadence | Monthly or annual billing. |
| Status | The subscription's state, from the table below. |
| Users Billable | The number of billable users counted for the subscription. |
| Forecasted Amount | Users Billable multiplied by the plan's price per user, in US dollars. |
| Start Date, Created At, Updated At | When the subscription started, was created, and last changed. |

Three summary cards sit above the table: your current plan, the forecasted bill ("Based on current usage", or "No billable usage" when the amount is zero), and the next payment due.

| Status | Meaning |
| --- | --- |
| active | Paid and in good standing. |
| trialing | In a trial period. Layer5 Cloud's own checkout starts no trial. |
| incomplete | Created, but the first payment has not completed. |
| past_due | A payment failed. |
| unpaid | Payment attempts for the period have been exhausted. |
| canceled | Ended. |
| expired, inactive | No longer in effect. |
| incomplete_expired | The first payment never completed. The row is hidden from the list. |

Layer5 Cloud takes the status from the payment processor. Status changes arrive when the processor reports them, so the tab can trail a payment by a short time. Use the refresh control to reload.

## Start a paid subscription

The Plans tab lists the Personal plan ("Free Forever"), Team Designer, Team Operator, and Enterprise, each with monthly and annual prices and a currency selector.

- **Personal** is free and needs no subscription step.
- **Team Designer and Team Operator** start in the tab. Review the plan, apply a coupon if you have one, and enter your billing address and payment details. The payment form is hosted by the payment processor, and Layer5 Cloud does not store card details.
- **Enterprise** does not use self-service checkout. Its subscribe action opens a contact form, and the Layer5 team arranges the subscription.

Layer5 Cloud creates the subscription as incomplete, counts your billable users, and asks the payment processor to start billing. The status becomes active when the first payment succeeds. Checkout starts no free trial.

## Upgrade a subscription

Upgrade moves a subscription to a higher plan on the same ladder. Each ladder is separate:

- Monthly core plans, in order: Team Designer, Team Operator, Enterprise.
- Annual core plans, in the same order.
- Academy theory and lab bundles, each with its own monthly and annual ladder.

You cannot move down a ladder, and you cannot switch between monthly and annual billing on an existing subscription. To change cadence or move to a lower plan, contact [Support](/pr-preview/pr-1326/cloud/reference/support/).

Before you confirm, the upgrade shows an invoice preview with the prorated line items. Layer5 Cloud prorates the change: you pay for the new plan's price for the rest of the current period, less credit for the unused part of the old plan. The confirmation reads "Subscription upgraded to" followed by the plan name.

Upgrade is unavailable for subscriptions that are canceled, inactive, incomplete, or on the free plan.

## Cancel a subscription

Cancel asks you to confirm and then tells the payment processor to end the subscription **at the end of the current billing period**. The plan stays in force until the period ends. Because the plan runs to the end of the period, canceling issues no refund.

Cancel is unavailable for subscriptions that are already canceled or inactive, that never completed, or that are on the free plan.

## How the billable user count works

Plans bill per user. The count is the number of distinct people who are members of the organization, with these rules:

- The account must be active. A person who has been invited but has not accepted is not counted. A deleted account is not counted.
- A member whose only role is academy learner is not counted.
- A member added without any role is not counted.
- The count never falls below the plan's minimum number of users.
- Academy plans that bill per learner count active learners instead of organization members.

Layer5 Cloud recalculates the count when it creates a subscription, and then every 2 hours for subscriptions that are active, trialing, past due, incomplete, or unpaid. It sends the new count to the payment processor each time. No plan blocks you from adding users: the count changes what you pay, never what you can do.

### What a change in the count costs

- **The count rises mid-period.** The payment processor charges a prorated amount for the added users for the rest of the period. At renewal, the full amount reflects the new count.
- **The count falls mid-period.** The processor issues a prorated credit for the unused part. The credit stays on the organization's account balance, does not expire, and reduces future invoices. It is not refunded automatically.
- **Renewal date.** A change in the count never moves the renewal date. At renewal, the organization pays for the count as of that date.

Removing a user from the organization, or deleting their account, lowers the count at the next recalculation.

## What a plan enforces

Plans record several limits, but Layer5 Cloud enforces only the number of components in a design. See [Feature Availability by Plan](/pr-preview/pr-1326/cloud/reference/feature-availability/#limits-by-plan). Saving or importing a design that exceeds the component limit of the organization's active plan is refused, and an organization with no active subscription cannot add components to a design at all. Reduce the design or upgrade the plan.

## Failure modes

| What you see | Cause | What to do |
| --- | --- | --- |
| The subscription table does not load | You are not an Organization Owner or Organization Admin of the selected organization | Ask an owner or Organization Admin to manage billing, or switch to the right organization. |
| "Payment Error" during checkout | The payment processor declined the payment | Correct the payment details and retry. |
| Status stays incomplete | The first payment has not completed | Complete the payment. An incomplete subscription that never completes becomes incomplete_expired. |
| Cancel and Upgrade are disabled | The status or plan rules above | Check the status column. |

## See also

- [Feature Availability by Plan](/pr-preview/pr-1326/cloud/reference/feature-availability/) lists what each plan includes.
- [Organizations](/pr-preview/pr-1326/cloud/guides/organizations/) explains organization owners and Organization Admins.
- [Manage Your Account](/pr-preview/pr-1326/cloud/guides/account/managing-your-account/) covers your own profile and sign-in.

