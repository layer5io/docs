Here is the detailed Information Architecture formatted in Markdown, ready for you to copy.

---

# Layer5 Cloud Documentation: Information Architecture

**Framework:** Diátaxis (Tutorials, Guides, Concepts, Reference)
**Status Legend:**

* **[NEW]**: Indicates a page that does not currently exist or requires significant creation based on the feature CSV.
* **[Existing]**: Implicitly indicates content that likely exists but needs reorganization.

---

## 1. Get Started (Tutorials)

*Goal: Linear, success-based lessons to build immediate confidence.*

* **Introduction to Layer5 Cloud**
* What is Layer5 Cloud?
* Layer5 Cloud vs. Meshery (Self-Hosted)


* **Quick Start: Your First Design**
* Connect your first Cluster (MeshSync)
* Deploy a sample Application (EmojiVoto)


* **Quick Start: Team Collaboration**
* Create an Organization & Team
* Invite a Colleague
* Share a Design


* **Next Steps: The Layer5 Academy** (Link-out to Learning Paths)

## 2. How-to Guides (Doing)

*Goal: Solve specific problems. Organized by User Intent.*

### A. Account & Billing

* **Managing Your Profile**
* View & Edit Profile Details
* Reset Password / Delete Account
* Connect Social Accounts (GitHub, Google)
* Set Notification Preferences


* **Billing & Subscriptions**
* Manage Subscriptions (Upgrade/Downgrade)
* **[NEW]** View Invoices
* Comparing Plans (Free vs. Team vs. Enterprise)



### B. Identity & Access Management (IAM)

* **Organization Management**
* Create & Edit Organizations
* Manage Organization Settings (Domain Routing, White Labeling)
* **[NEW]** Transfer Ownership


* **Team Administration**
* Create & Delete Teams
* Invite Users to Teams (Email & Link Invites)
* Assign Roles to Team Members


* **User Management**
* Add/Remove Users from Organizations
* **[NEW]** View User Activity (Public vs. Private Profile)


* **Enterprise Security Setup**
* **[NEW]** Configure SSO (SAML, LDAP, Azure AD)
* **[NEW]** Configure IdP (Meshery as IdP)
* **[NEW]** Manage Access Requests (Accept/Deny)



### C. Designing with Kanvas

* **Creating Designs**
* Using the Visual Designer (Drag-and-Drop)
* **[NEW]** Whiteboarding (Freeform shapes, Pencil, Pen)
* **[NEW]** Working with Layers (Show/Hide entities)


* **Importing & Exporting**
* Import from Kubernetes Manifest / Helm / Docker Compose
* **[NEW]** Import from Git (GitHub, GitLab, BitBucket)
* Export Design (OCI, YAML, PNG Snapshot)


* **Collaborating on Designs**
* Using Comments (Add, Resolve, Delete threads)
* **[NEW]** Real-time Collaboration (Multi-user editing)
* **[NEW]** Design Reviews (Approvals & Workflow)


* **Catalog Operations**
* Publishing & Unpublishing Designs
* **[NEW]** Approving Catalog Requests (Admin Workflow)
* **[NEW]** Cloning & Versioning Designs



### D. Infrastructure Management

* **Cluster Connectivity**
* Connecting Kubernetes Clusters
* Managing MeshSync Data (Flush/Resync)
* **[NEW]** Managing Multiple Clusters & Contexts


* **Environments & Workspaces**
* Creating & Deleting Workspaces
* Assigning Teams & Designs to Workspaces
* **[NEW]** Managing Environments (Dev/Staging/Prod)



### E. Operations & Observability

* **Performance Testing**
* Running a Performance Test
* **[NEW]** Scheduling Recurring Tests (Calendaring)
* **[NEW]** Comparing Test Results (Historical Analysis)


* **Chaos Engineering**
* Running MeshMonkey Experiments
* Injecting Faults (WASM Filters)


* **Incident Management**
* **[NEW]** Configuring Alerts (Suppression, Correlation)
* **[NEW]** Setting up Notification Channels (Slack, PagerDuty, Email)
* **[NEW]** Viewing Audit Logs (Enterprise)



### F. GitOps & CI/CD

* **Snapshot Integrations**
* GitHub App: Visual Pull Request Snapshots
* **[NEW]** BitBucket & GitLab Snapshot Setup


* **Pipeline Automation**
* Setting up GitHub Actions
* **[NEW]** Configuring Argo/Flux Triggers



## 3. Concepts (Understanding)

*Goal: Explain the "Why" and "What". No steps, just context.*

* **The Layer5 Cloud Architecture**
* Cloud vs. Server vs. Adapter vs. UI
* Understanding MeshSync (Discovery)
* The Extensibility Model (WASM & plugins)


* **Identity Models**
* Organizations, Teams, and Workspaces explained
* RBAC & Entitlements (The Permission Model)


* **Design Concepts**
* What is a Pattern? (OAM Definitions)
* Understanding Filters & Traits
* The "Design File" Format (Schema explanation)


* **Performance Concepts**
* Service Mesh Performance (SMP) Specification
* MeshMark (Scoring Model)
* Nighthawk (Load Generator Deep Dive)


* **Financial Management [NEW]**
* Understanding Showback vs. Chargeback
* Cost Allocation Models



## 4. Reference (Information)

*Goal: Dry data for lookups. Heavily sourced from feature CSV.*

### A. Feature Availability Matrix [NEW]

* **Content:** A verified table comparing **Free vs. Team vs. Enterprise** tiers.
* **Details:** Social Login, Single Sign-On, Seat Limits, Catalog Access, Private vs. Public Designs, Support SLAs.

### B. Permissions & Roles Matrix [NEW]

* **Content:** Detailed list of what each Role (Admin, Designer, Operator, Product Manager) can do.
* **Sections:** Account, Catalog, GitOps, Identity, Security.

### C. Integrations Library [NEW]

* **Content:** Alphabetical list of supported tools with links to setup guides.
* **Items:** Argo, BitBucket, Datadog, Flux, GitHub, GitLab, GSuite, Helm, Kuma, Istio, Microsoft Outlook, Slack, Prometheus, Grafana.

### D. Security Reference

* **Tokens & Keys**
* Token Scopes & Limitations
* Managing API Keys (Create/Delete specs)


* **Keychains**
* Default Keychains (User, Team, Org)
* Custom Keychain Configurations



### E. API Reference

* **REST API Documentation [NEW]** (Swagger/Redoc embed)
* **Webhooks Reference [NEW]** (Payload examples)

### F. Glossary

* Definitions for: *Pattern, Design, Filter, Workspace, Environment, MeshMark, SMP, WASM.*

## 5. Support & Troubleshooting

* **Contact Support**
* Community Forum
* **[NEW]** Premium Support Channels (Phone/Account Manager)


* **Troubleshooting Guide**
* Common MeshSync Errors
* Login/SSO Issues
* GitOps Snapshot Failures


* **Layer5 Status** (Link to status page)