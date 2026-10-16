# Policy Evaluation


> How Kanvas evaluates the relationships in a design continuously, which engine runs the evaluation, what triggers it, and why results can change after you stop editing.


Evaluation is how a design stays consistent. After you change a design, Kanvas runs it through the policy engine, which applies the registry's [relationship](/pr-preview/pr-1327/kanvas/concepts/relationships/) definitions: it identifies relationships, writes configuration across related components, and drops relationships that no longer hold. The engine returns the whole evaluated design, and Kanvas applies it back to the canvas. This is why a value you did not touch can change a moment after you edit a related component.

Evaluation never blocks editing. You can keep designing while it runs, and a new edit supersedes the evaluation in progress.

## What triggers evaluation

Evaluation runs after any of these changes:

- A configuration value or a display name changes.
- A relationship is added or removed.
- A component is added, removed, duplicated, or merged.
- A design loads, or an import or merge completes.

Kanvas waits until changes stop for about one second, then evaluates. Another change during evaluation restarts the cycle. Selecting the indicator icon forces an evaluation, and a new design resets evaluation state.

## Two interchangeable engines

| Engine | Where it runs | Properties |
|---|---|---|
| Meshery server | In your Meshery server | Always available. |
| Client-side (WASM) | In a background worker in your browser | No round trips to the server, so it is typically faster. A WASM evaluation times out after 10 seconds. |

Both engines apply the same policy engine and the same definitions. The choice changes where the work happens.

### Choosing the engine

The Relationship Evaluation Engine preference lives in the Options dialog, which you open from the canvas right-click menu.

| Value | Behavior |
|---|---|
| Automatic (recommended) | The default. At load, Kanvas tries to start the WASM engine and waits up to 30 seconds for it to report ready. If it starts, WASM is used. If not, the Meshery server is used. |
| Meshery server | Always uses the server. |
| Client-side (WASM) | Always uses WASM. |

The preference is saved to your user preferences, so it applies on all your devices and designs. Kanvas chooses the engine once, when Designer loads, so reload Kanvas for a change to take effect.

Two behaviors to know:

- Forcing Client-side (WASM) gives no fallback. If the engine fails to start, evaluations fail silently and relationships stop updating. Switch to Automatic or Meshery server and reload.
- Automatic checks only that the engine initializes. It does not fall back to the server later if the WASM engine fails after a successful start.

## Reading the indicator

The top toolbar shows an icon for relationship evaluation. Its state is in the tooltip.

| State | Tooltip |
|---|---|
| Running | "Evaluating relationships..." with a spinning icon |
| Done | "Relationships evaluated" and the time elapsed, a summary of the actions the evaluator applied, and a View Evaluation History button |
| Nothing evaluated | "No relationships evaluated yet" |

There is no error state. A failed evaluation clears the last-evaluation details, so the tooltip returns to "No relationships evaluated yet", and the failure is logged to the browser console only. If relationships stop updating, check the engine first.

When Kanvas applies an evaluation result and decides to skip it, it shows the notice "Skipping evaluation application", with a reason when one is known. A successful evaluation shows no message.

## Diagnosing unexpected results

1. Turn on Enable Debugger in the Options dialog. It is off by default.
2. Open the debugger and go to its Evaluation Engine tab.
3. Read the status: Initialized, Not Initialized, or Not Available. Read the engine type, WASM or SERVER, and any initialization error. The tab refreshes every second.
4. If WASM is not initialized, or results look wrong, set the engine to Meshery server, reload, and compare.
5. Make any change to re-trigger evaluation.

If the server engine also gives wrong results, file an issue that includes the engine type, any initialization error, the relationships you expected, and the design or a minimal version of it.

## Large designs

Evaluation covers the whole design regardless of which relationship layers you hide. In Adaptive render mode, Kanvas can suggest cost-saving changes when a design grows: disabling TagSets when there are more than 5, collapsing parents when there are more than 10, hiding unused components when there are more than 200, and using Wireframe mode when there are more than 100 relationships. Each suggestion appears at most once per 60 seconds.

## Related pages

- [Relationships](/pr-preview/pr-1327/kanvas/concepts/relationships/): the kinds that evaluation applies.
- [Create Relationships](/pr-preview/pr-1327/kanvas/guides/designing/creating-relationships/): what you create by hand.

