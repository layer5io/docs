# Policy Engine


> Choose how Kanvas evaluates relationships in your designs, understand the relationship indicator states, and diagnose failing or unexpected relationship results.



As you build a design, Kanvas continuously evaluates the
[relationships](/kanvas/concepts/relationships/) between your components — to
identify connections, validate them, and keep related configuration in sync.
This page explains how you can choose which engine performs that evaluation, how
to read the relationship indicator, and how to diagnose results that look wrong.

## How Relationships Are Evaluated

Kanvas can run relationship evaluation using one of two interchangeable engines:

- **Server-side** -- the policy engine running inside your Meshery server. It
  is always available.
- **Client-side** -- the same policy engine, compiled to WebAssembly and
  run inside a background worker in your browser. Because it runs locally, there
  are no round-trips to the server, so evaluation is typically faster. A WASM
  evaluation times out after 10 seconds.

The default preference is **Automatic**, not the server. At load, Kanvas tries to start the WASM engine and waits up to 30 seconds for it to report ready. If it starts, WASM is used. If not, the Meshery server is used. Kanvas waits until changes stop for about one second, then evaluates. Another change during evaluation restarts the cycle. Evaluation runs after a configuration value or display name changes, a relationship is added or removed, a component is added, removed, duplicated, or merged, or a design loads or an import or merge completes.

Both engines produce the same relationship results. The choice affects
performance, and where toil (evaluation) is done, not correctness.







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Editing is never blocked</h4>
  
      Relationship
evaluation runs alongside your work — it never blocks editing or saving a
design. If evaluation fails for any reason, you can keep designing and saving
normally; only the relationship results are affected.
  
</div>



## Changing the Evaluation Engine Preference

The engine is controlled by the **Relationship Evaluation Engine** preference.

1. In Kanvas Designer, open **Settings**.
2. Find the **Relationship Evaluation Engine** preference.
3. Choose one of the following values:

| Value                       | What it does                                                                                                                                                                                 |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Automatic** (recommended) | Runs a one-time health check at the start of the session. If the client-side (WASM) engine passes a self-test, it is used for the rest of the session; otherwise the Meshery server is used. |
| **Meshery server**          | Always uses the Meshery server's policy engine.                                                                                                                                              |
| **Client-side (WASM)**      | Always uses WASM. There is no fallback. If the engine fails to start, evaluations fail silently and relationships stop updating. Switch to Automatic or Meshery server and reload. Automatic checks only that the engine initializes. It does not fall back to the server later if WASM fails after a successful start. |

The engine is selected **once per session**. Changing the preference takes full
effect on the next session (for example, after reloading Kanvas).







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">When to prefer the server engine</h4>
  
      Leave the
preference on <strong>Automatic</strong> unless you have a specific reason to change it. If
client-side results ever look wrong, switching to <strong>Meshery server</strong> is the most
reliable way to rule out the engine as the cause — see
<a href="/#diagnosing-failing-or-unexpected-relationship-results">Diagnosing failing or unexpected results</a>.
  
</div>



## Reading the Relationship Indicator

The relationship indicator tells you the state of the most recent evaluation:

- **Evaluating** — evaluation is in progress. This is normal after you add,
  remove, or reconfigure components.
- **Evaluated** — evaluation completed successfully and the relationships shown
  on the canvas are up to date.
There is no error state on the indicator. A failed evaluation clears the last-evaluation details, so the tooltip returns to "No relationships evaluated yet", and the failure is logged to the browser console only. Tooltips you will see: "Evaluating relationships..." while running, "Relationships evaluated" with the elapsed time when done, and "No relationships evaluated yet" when nothing has been evaluated. When Kanvas skips applying a result it shows "Skipping evaluation application". A successful evaluation shows no message. WASM does not fall back to the server on its own after a fault.

### What the one-time notifications mean

A failed evaluation does not raise an error state or a fallback notification. The failure is logged to the browser console only. If relationships stop updating, switch the engine to Meshery server and reload.

## Diagnosing Failing or Unexpected Relationship Results

If relationships are missing or look wrong, turn on Enable Debugger in the Options dialog (it is off by default) and open the Evaluation Engine tab. Status reads Initialized, Not Initialized, or Not Available, plus the engine type WASM or SERVER. The tab refreshes every second. If WASM is not initialized, set the engine to Meshery server, reload, and compare.

### Step 1 — Enable the debugger preference

The Diagnostics view is exposed under the Designer **debugger** preference.

1. In Kanvas Designer, open **Settings**.
2. Enable the **debugger** preference.
3. Open the **Relationship Evaluation Diagnostics** view.

### Step 2 — Read the Diagnostics view

The Diagnostics view reports the current state of relationship evaluation:

- **Status** -- Initialized, Not Initialized, or Not Available.
- **Engine type** -- WASM or SERVER, plus any initialization error. The tab refreshes every second.
- There is no fallback counter. A runtime fault does not switch engines by itself.

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
change re-triggers evaluation with the active engine. There is no error state for a successful re-evaluation to clear.

### Step 5 — When and how to file a bug

If relationship results are still wrong or evaluation keeps failing after the
steps above — especially if the **Meshery server** engine also produces
incorrect or failing results — file a bug. Include the following from the
Relationship Evaluation Diagnostics view so the issue can be reproduced:

- The engine type, WASM or SERVER, and any initialization error.
- The relationships you expected versus what Kanvas showed, and the design or a minimal version of it.







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Related reading</h4>
  
      For an overview of what
relationships are and the kinds Kanvas supports, see
<a href="/kanvas/concepts/relationships/">Understanding Relationships</a>. For creating and
managing relationships in a design, see
<a href="/kanvas/getting-started/creating-relationships/">Creating Relationships</a>.
  
</div>



