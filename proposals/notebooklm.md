This proposed information architecture (IA) for the **Layer5 Cloud** documentation is organized according to the **Diátaxis framework**. It incorporates every current page found in the sources, identifies existing pages that require improvement, and includes a roadmap for "Missing" content as identified in the product feature matrix.

# Proposed Information Architecture: Layer5 Cloud Documentation

## 1. Tutorials (Learning-Oriented)
*Step-by-step lessons for newcomers to achieve a successful first result.*

*   **Getting Started with Layer5 Cloud**
    *   Your First 10 Minutes: Account Creation and Email Verification
    *   Setting up your first Organization and Workspace
    *   Guided Tour: Navigating the Layer5 Cloud Dashboard
*   **Kanvas Designer Basics**
    *   Creating your first Infrastructure Design
    *   Hands-on: Cloning and Deploying a Design from Catalog Templates
*   **Academy Learner Paths**
    *   Enrolling in your first Learning Path
    *   Completing Challenges and Earning Achievement Badges
*   **Academy Content Creator (Enterprise)**
    *   Building your first Learning Path via Git-native workflow
    *   Hands-on: Creating Interactive Labs and Tests
    *   Building a Professional Certification

---

## 2. How-to Guides (Task-Oriented)
*Practical recipes for specific, real-world problems.*

*   **Account & Identity Management**
    *   Managing User Profiles & Resetting Passwords
    *   Connecting GitHub and Google OAuth Providers
    *   Managing Notification Preferences (Acknowledge, Approval, Activity)
    *   How to Earn and Embed User Badges on Social Profiles
*   **Organization & Workspace Administration**
    *   Creating, Editing, and Deleting Workspaces
    *   Managing Access: Assigning Teams to Workspaces
    *   Linking Environments and Connections to Workspaces
    *   Moving Designs and Views between Workspaces
    *   Inviting, Adding, and Removing Users from Organizations
*   **Design & Collaboration Tasks**
    *   Real-time Collaborative Editing in Kanvas
    *   Managing Design Reviews: Asking for feedback and Mentions
    *   Resolving and Archiving Comment Threads
    *   Pinning Models to the Kanvas Dock for quick retrieval
    *   Sharing Designs: Private, Public, and Published visibility
*   **Catalog Operations**
    *   Publishing Designs from Kanvas to the Global Catalog
    *   Editing Metadata and Unpublishing Catalog Items
    *   Downloading Designs as Meshery YAML
*   **Integrations & Self-Hosting**
    *   Connecting GitHub Repositories to Meshery
    *   Enabling Kanvas Snapshots for Visual PR Reviews
    *   Customizing Webhooks for Automation
    *   Troubleshooting SMTP and Email Delivery

---

## 3. Explanations (Understanding-Oriented)
*High-level conceptual overviews and deep dives.*

*   **The Layer5 Ecosystem**
    *   Introduction to Layer5 Cloud, Kanvas, and Meshery
*   **The Authorization Framework**
    *   Understanding the Keys, Keychains, Roles, and Permission Model
    *   Hierarchical Permissioning: Organization vs. Team vs. Workspace
*   **Identity Services Architecture**
    *   Built-in IDP and OIDC Integration
    *   Understanding Authenticated Sessions and Tokens
*   **Networking & Communication**
    *   Real-time Multiplayer Architecture: Peer-to-Peer and WebRTC
*   **Workspace Strategy**
    *   Usage Patterns: The Project Hub vs. The Personal Sandbox
    *   Understanding Relationships: Organizations, Teams, and Environments
*   **The Cloud Catalog Concept**
    *   Understanding Content Support Levels (Official, Verified, Community)
    *   Design Metrics Explained: Opens, Deploys, and Clones
*   **Academy Platform Architecture**
    *   Git-native content ownership and Hugo rendering
    *   Modular Learning: Paths, Courses, Modules, and Labs

---

## 4. Reference (Information-Oriented)
*Technical facts, tables, and API details.*

*   **API Reference**
    *   REST API Endpoints and Authentication (Bearer Tokens)
    *   Managing Organization Context via Headers
*   **Security & Access Registries**
    *   Default User Permissions Matrix
    *   Registry of Built-in Roles: Provider, Organization, Team, and Workspace Admins
    *   Default Keychain Registry (10 System Keychains)
    *   Key Registry (The 103 Atomic Permissions)
*   **Configuration & Deployment**
    *   Helm Chart Configuration Values for Self-Hosting
    *   SMTP Error Code Reference Table
*   **Academy Reference**
    *   Default Academy Roles and Permissions (Admin vs. Learner)
    *   Learner Status Type Registry

---

## 5. Development Backlog: Missing & Improvements
*Content identified in the feature matrix as missing or requiring significant updates.*

*   **Missing Features (New Pages Required):**
    *   **Catalog:** View Filters for Catalog items.
    *   **Import/Export:** Importing from GitLab and BitBucket; Exporting specific Design versions.
    *   **Operations:** Web-based Terminal usage, Streaming Container Logs, and Standard Events/Metrics overview.
    *   **Security:** SAML/Azure AD Integration guide; User-defined (Custom) Role creation.
    *   **Lifecycle:** Dry-run Design procedures; Service Performance visibility.
    *   **Finance:** Showback/Chargeback reporting; Invoice Billing management.
    *   **Support:** Standard and Premium Support Tier details.
*   **Needs Improvement (Existing Pages to Update):**
    *   **User Management:** Updating User Profiles and Leaving Teams (clarifying resource orphans).
    *   **Team/Org Management:** Promoting/Demoting Org Admins and Transferring Ownership.
    *   **Security:** Cleaning up "Keys" reference to remove internal engineering notes.
    *   **Identity:** Access Request approval/denial workflows.