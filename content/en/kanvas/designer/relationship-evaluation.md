---
title: Policy Engine
description: >
  Choose how Kanvas evaluates relationships in your designs, understand the
  relationship indicator states, and diagnose failing or unexpected relationship
  results.
weight: 11
categories: [Designer]
tags: [designs, relationships, components, troubleshooting]
---

As you build a design, Kanvas continuously evaluates the
[relationships]({{< ref "kanvas/concepts/relationships/index.md" >}}) between your components — to
identify connections, validate them, and keep related configuration in sync.
This page explains how you can choose which engine performs that evaluation, how
to read the relationship indicator, and how to diagnose results that look wrong.

## Understanding the Evaluation Engine

The evaluation engine is a dynamic runtime engine (not a static linter) that analyzes and mutates the design based on registered rules. When processing, it enforces:

- **Semantic Validity**: Validates if manually drawn connections are actually allowed by a registered `RelationshipDefinition` in the registry. 
- **Dependency Fulfillment**: Flags missing required components and can auto-inject them (e.g., automatically adding a Namespace if a Pod requires one).
- **Configuration Mutability (Patching)**: Validates and applies patches (e.g., automatically injecting Component B's IP address or selector into Component A's configuration based on the policy).

## How Relationships Are Evaluated

Kanvas can run relationship evaluation using one of two interchangeable engines:

- **Server-side** — the policy engine running inside your Meshery server. It
  is always available and is the default.
- **Client-side** — the same policy engine, compiled to WebAssembly and
  run inside a background worker in your browser. Because it runs locally, there
  are no round-trips to the server, so evaluation is typically faster. It is
  available only when your Meshery server provides the WebAssembly artifact.

Both engines produce the same relationship results. The choice affects
performance, and where toil (evaluation) is done, not correctness.

{{< alert type="info" title="Editing is never blocked" >}} Relationship
evaluation runs alongside your work — it never blocks editing or saving a
design. If evaluation fails for any reason, you can keep designing and saving
normally; only the relationship results are affected. {{< /alert >}}

## Changing the Evaluation Engine Preference

The engine is controlled by the **Relationship Evaluation Engine** preference.

1. In Kanvas Designer, open **Settings**.
2. Find the **Relationship Evaluation Engine** preference.
3. Choose one of the following values:

| Value                       | What it does                                                                                                                                                                                 |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Automatic** (recommended) | Runs a one-time health check at the start of the session. If the client-side (WASM) engine passes a self-test, it is used for the rest of the session; otherwise the Meshery server is used. |
| **Meshery server**          | Always uses the Meshery server's policy engine.                                                                                                                                              |
| **Client-side (WASM)**      | Uses the in-browser WebAssembly engine.                                                                                                                                                      |

The engine is selected **once per session**. Changing the preference takes full
effect on the next session (for example, after reloading Kanvas).

{{< alert type="info" title="When to prefer the server engine" >}} Leave the
preference on **Automatic** unless you have a specific reason to change it. If
client-side results ever look wrong, switching to **Meshery server** is the most
reliable way to rule out the engine as the cause — see
[Diagnosing failing or unexpected results](#diagnosing-failing-or-unexpected-relationship-results).
{{< /alert >}}

## Reading the Relationship Indicator

The relationship indicator tells you the state of the most recent evaluation:

- **Evaluating** — evaluation is in progress. This is normal after you add,
  remove, or reconfigure components.
- **Evaluated** — evaluation completed successfully and the relationships shown
  on the canvas are up to date.
- **Error** — the most recent evaluation failed. This is a distinct state from
  "no relationships evaluated yet". When evaluation fails:
  - The last successful relationship results stay on screen so your design
    remains readable.
  - A one-time, non-blocking notification appears to let you know.
  - You can continue editing and saving the design without interruption.

If the client-side (WASM) engine was active and faults during the session, it
automatically self-heals: Kanvas falls back to the Meshery server engine for the
remainder of the session, without requiring any action from you.

### What the one-time notifications mean

When evaluation first fails, or when Kanvas falls back from the client-side
engine to the server engine, a single non-blocking notification is shown. It is
informational — it does not require a response, and it will not repeat for every
subsequent evaluation in that session. Its purpose is to let you know that
relationship results may be stale or that the active engine changed.

## Diagnosing Failing or Unexpected Relationship Results

If relationships are missing, look wrong, or the indicator shows an error, use
the **Relationship Evaluation Diagnostics** view to investigate.

### Step 1 — Enable the debugger preference

The Diagnostics view is exposed under the Designer **debugger** preference.

1. In Kanvas Designer, open **Settings**.
2. Enable the **debugger** preference.
3. Open the **Relationship Evaluation Diagnostics** view.

### Step 2 — Read the Diagnostics view

The Diagnostics view reports the current state of relationship evaluation:

- **Active engine and why** — which engine is in use (Meshery server or
  client-side WASM) and the reason it was selected (for example, the result of
  the Automatic health check, an explicit preference, or a runtime fallback).
- **Contract / version** — the evaluation contract and engine version, used to
  confirm the client and server are compatible.
- **Last error** — the most recent evaluation error, if any.
- **Fallback count** — how many times Kanvas has fallen back from the
  client-side engine to the server engine this session.
- **Latency** — how long recent evaluations took.

### Step 3 — Force the server engine if client results look wrong

If you suspect the client-side engine is producing incorrect results:

1. Open **Settings**.
2. Set **Relationship Evaluation Engine** to **Meshery server**.
3. Reload Kanvas so the new engine is used for the session.
4. Re-check the design's relationships.

If the relationships are correct with the server engine but wrong with the
client-side engine, that points to a client engine issue worth reporting (see
below).

### Step 4 — Re-trigger evaluation

Evaluation re-runs automatically whenever you change the design — for example,
by adding, removing, or reconfiguring a component, or by toggling a relationship
kind on or off from the **Relationships** section of the Designer. Making any such
change re-triggers evaluation with the active engine. If the indicator was in
the error state, a successful re-evaluation clears it.

### Step 5 — When and how to file a bug

If relationship results are still wrong or evaluation keeps failing after the
steps above — especially if the **Meshery server** engine also produces
incorrect or failing results — file a bug. Include the following from the
Relationship Evaluation Diagnostics view so the issue can be reproduced:

- The **active engine** and the reason it was selected.
- The **contract / version** shown in the Diagnostics view.
- The **last error** text.
- The **fallback count**, if relevant.
- A description of the expected relationships versus what Kanvas showed, and the
  design (or a minimal reproduction) if you can share it.

{{< alert type="info" title="Related reading" >}} For an overview of what
relationships are and the kinds Kanvas supports, see
[Understanding Relationships]({{< ref "kanvas/concepts/relationships/index.md" >}}). For creating and
managing relationships in a design, see
[Creating Relationships]({{< ref "kanvas/getting-started/creating-relationships/index.md" >}}).
{{< /alert >}}
