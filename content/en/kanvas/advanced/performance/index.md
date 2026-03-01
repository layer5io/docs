---
title: Performance Limits and Tuning
description: >
    Learn about the performance limits of Kanvas and how to tune your environment for optimal performance.
weight: 1
categories: [Designer, Operator]
tags: [performance]
---

Kanvas is designed to handle a wide range of infrastructure and application configurations. However, there are some performance limits that you should be aware of when working with Kanvas. This guide will help you understand these limits and provide tips for tuning your environment for optimal performance.

## Performance Limits

### Maximum Number of Components

Kanvas has a maximum limit of 1,000 components per design. If you exceed this limit, you may experience performance issues such as slow loading times and laggy interactions. To avoid hitting this limit, consider breaking your design into smaller, more manageable designs.

<!--
#### Maximum Number of Components per Layer
  Needs a follow up -->

<!--
#### Maximum Number of Relationship
  Needs a follow up -->

#### Maximum Number of Annotation-only Components (non-semantically meaningful components)

{{< alert type="note" title="What is a Non-Semantic Component?" >}}
A non-semantic component is a component that does not represent a meaningful entity in your design. For example, a textbox, a shape, a line, or a comment are all examples of non-semantic components. These components are used for annotation purposes only and do not have a direct relationship to the underlying infrastructure or application that you are modeling.
{{< /alert >}}

Kanvas allows up to 1,000 non-semantically meaningful components per design. Some designs have a large number of comments. While comments are a valuable collaboration tool, excessive comments can impact the performance of your design. Consider archiving or deleting old comments to keep your design running smoothly.

#### Maximum Number of Orchestrated Components (semantically meaningful components)

{{< alert type="note" title="What is a Semantic Component?" >}}
A semantic component is a component that represents a meaningful entity in your design. For example, a server, a database, or a network switch are all examples of semantic components. These components have a direct relationship to the underlying infrastructure or application that you are modeling.
{{< /alert >}}

### Maximum Number of Relationships

Kanvas supports up to 1,000 relationships per design. Exceeding this limit can impact the performance of your design, especially when rendering complex designs. To optimize performance, try to minimize the number of relationships in your design.

#### Maximum Number of TagSet Relationships

![Labels and Annotations](../../designer/tagsets/group-components.png)

Tags are indexed and searchable. However, the performance of design operations may degrade as the number of tags increases. To ensure an optimal user experience, we recommend using tags judiciously and limiting the number of tags used in a design.

Upon loading a design exceeds that exceeds 20 tags within a single design, Kanvas will automatically disable grouping by tags. You can manually enable grouping by tags by clicking the "Group Components" button in the Designer dock. For more information, see [Working with Tags](/kanvas/designer/tagsets/).

<!--
#### Maximum Number of Relationships per Component
  Needs a follow up -->

### Maximum Number of Users

Under the Free [subscription plan](https://layer5.io/pricing), Kanvas supports at least 20 users per design. As resources allow, up to 34 users may simultaneously collaborate within a given design. If you have a large team collaborating on a design, be mindful of the number of users active at the same time. Too many users can strain the performance of your design, leading to slower response times and potential data loss. See [Layer5 Cloud Networking Services](/cloud/self-hosted/planning/peer-to-peer-communication) for more details.

### Impact of Images

Be aware that designs are self-contained documents and that all artifacts, like any images (e.g. SVG, PNG, GIF, WEBP, etc.) that are added to your design are embedded into your design document, adding to the overall size of your design file. The embedding of images into your design file ensures portability of your design. You can export your design with the assurity that your images will remain in your design upon (re-)import.

As the number and size of images contained in your design grows, images can significantly increase file size, potentially causing performance issues. With each change made to your design, the entire design file is uploaded to Layer5 Cloud. This same performance consideration applies during collaborative editing sessions with multiple users viewing/editing the same design. Each change to your design made by any user in the collaboration session will be propagated to every other currently collaborating user. If your design contains a large number of images, this can lead to slow performance and increased bandwidth usage.

Under the Free subscription plan, Kanvas support a single image size of up to 500KB of images per design with a total of 10MB per design. If you need to use more images, consider upgrading to a paid [subscription plan](https://layer5.io/pricing).

## Performance Tuning

### Optimize Your Design using the Layers Panel

To improve the performance of your design, consider optimizing by disabling one or more layers.

<figure>
  <img src="./layers-panel.png" alt="Layers panel in Kanvas Designer" />
  <figcaption>Control which layers of your design are visible using the Layers panel.</figcaption>
</figure>

Some layers specifically offer control of **visibility of components**, while other layers offer control over the **ongoing evaluation of relationships** between components. 

Depending on the type of layer disabled, either specific components or all components by type will display or not be displayed, allowing you to finely tune the performance of you design rendering experience by saving design resources and improving the performance of Kanvas as you adjust both the **number and type** of components in view. 

> Even though you might hide components, those components are not deleted or removed from your design. These components are simply hidden from current view.

In the same way, as you toggle the evaluation of different types of relationships, understand that these relationships between your components still exist. Those relationships are simply **temporarily hidden** from view and the overhead of their evaluation eliminated while the respective type of relationship is disabled.

Using the Layers panel you control the level of sophistication or simplicity of the rendering of components and relationships in your designs. You can both simplify your design layout by removing unnecessary elements and improve performance simultaneously. Alternatively, you can increase the level of detail in your design by enabling additional layers and relationships, while controlling the balance between detail and performance.

{{< alert type="info" title="Keep It Lightweight" >}}
Hide layers you don't need at the moment to keep your workspace lightweight and responsive.
{{< /alert >}}

### Optimize use of Images in your Design

To optimize performance, consider the following:

1. Use vector images (SVG) instead of raster images (PNG, JPG, etc.) as they are typically smaller in size and scale without pixelation.
2. Prioritize using smaller file sizes whenever possible. Use the `webp` image format over `png`, `jpg`, or `gif` as it generally provides significantly better compression, resulting in faster design save times without sacrificing much image quality.
3. Remove any unnecessary images from your design.
4. Use image compression tools to reduce the size of your images before adding them to your design.

## What Affects Performance

As your designs grow in complexity, certain design patterns can impact how smoothly Kanvas responds. Understanding these factors helps you create designs that remain fast and responsive.

### Working with Grouped Components

When you create groups of components (placing multiple components inside a parent container), you might notice performance differences as the number of grouped items increases. Here's what you might experience:

**Signs of Performance Impact:**
- Dragging groups feels laggy or choppy
- Design takes longer to load and display
- Moving or resizing groups shows delayed response
- Screen updates appear slower during interactions

{{< alert type="warning" title="Large Groups" >}}
Groups containing 100 or more components may experience noticeable lag during drag operations. Consider breaking large groups into smaller, logical subgroups for better performance.
{{< /alert >}}

### How Kanvas Optimizes Your Design

Kanvas automatically works behind the scenes to keep your designs running smoothly:

**Smart Rendering:**
- Kanvas only updates the parts of your design that actually change, not the entire canvas
- Components outside your current view aren't fully rendered, saving resources
- Information badges and labels are displayed efficiently to prevent unnecessary redraws

**What This Means for You:**
The table below shows typical performance improvements you'll experience:

| Design Scenario | Without Optimization | With Optimization | Your Experience |
|----------------|----------------------|-------------------|-----------------|
| Dragging a group of 100 components | Laggy and slow | Smooth and responsive | 90% improvement |
| Moving grouped components | Choppy interactions | Fluid movement | Significantly better |
| Overall responsiveness | Delayed reactions | Immediate feedback | Much more responsive |

{{< alert type="success" title="Automatic Optimization" >}}
These optimizations work automatically. You don't need to configure anything to benefit from better performance.
{{< /alert >}}

## Managing Design Complexity

Kanvas provides many interactive features that enhance your design experience. Understanding how these features work together helps you maintain optimal performance.

### Features That Impact Performance

Your design experience includes several interactive capabilities that all work together:

**Interactive Features:**
- **Alignment guides** help you position components precisely as you drag them
- **Automatic relationship management** keeps connections between components updated
- **Tooltips and information displays** show helpful context as you work
- **Resize handles and controls** let you adjust component sizes smoothly
- **Visual grouping indicators** show which components belong together

When you're working with many components simultaneously, these features all activate together, which can sometimes slow down interactions like dragging.

{{< alert type="info" title="Performance Tip" >}}
If dragging feels slow, try these strategies:
- Hide unnecessary layers temporarily using the Layers panel
- Break your design into smaller, focused sections
- Work on one area of your design at a time
- Zoom in to focus on specific components
{{< /alert >}}

### Practical Tips for Better Performance

**When Creating Large Designs:**
1. Use the Layers panel to hide components you're not actively editing
2. Break complex designs into multiple smaller designs that you can link together
3. Group related components thoughtfully rather than creating very large groups
4. Remove old comments and annotations you no longer need

**When Experiencing Slowness:**
1. Check if you have many layers enabled that you're not using
2. Consider if your design has grown beyond 500 components (approaching the 1,000 limit)
3. Try hiding relationship layers temporarily while arranging components
4. Close and reopen your design to refresh the canvas

## How Kanvas Keeps Things Fast

Kanvas includes built-in intelligence to maintain smooth performance as you work on your designs. You don't need to manage these features manually—they work automatically in the background.

### Efficient Updates

**What Happens When You Make Changes:**
Think of your design like a document. When you edit a single paragraph, you wouldn't want your word processor to reformat the entire document. Similarly, Kanvas only updates the specific components you're changing, not your entire design.

**Benefits You'll Notice:**
- Quick response when you move or edit components
- Smooth interactions even in large designs
- Consistent performance throughout your work session
- Better experience when multiple people collaborate on the same design

{{< alert type="success" title="Smart Performance" >}}
Kanvas is designed to only update what needs updating, keeping your design responsive without requiring any configuration from you.
{{< /alert >}}

### Smooth Interactions During Continuous Operations

When you're actively dragging components, resizing groups, or panning around your design, Kanvas automatically manages how often the screen updates to ensure smooth, responsive interactions.

**What This Means:**
- Dragging feels fluid, not jerky
- Your cursor stays synchronized with the component you're moving
- Multiple simultaneous operations remain responsive
- The interface doesn't freeze or stutter during intensive operations

## Working with Different Zoom Levels

The zoom level you choose affects both what you see and how your design performs. Kanvas adapts its rendering based on your current zoom level to provide the best experience.

### Progressive Detail Display

Kanvas automatically adjusts the level of detail based on how far you're zoomed in or out:

**Zoomed Out (Overview Mode):**
- Shows component shapes and primary names
- Displays main relationships between components
- Provides a fast, high-level view of your entire design
- Perfect for understanding overall structure

**Medium Zoom (Working Mode):**
- Adds relationship details and secondary information
- Shows more component metadata
- Good balance between detail and performance

**Zoomed In (Detail Mode):**
- Displays all badges, annotations, and detailed information
- Shows validation messages and warnings
- Reveals complete component properties
- Best for detailed configuration work

{{< alert type="info" title="Use Zoom Strategically" >}}
Take advantage of zoom levels: zoom out to get an overview and rearrange major sections, then zoom in when you need to configure specific components in detail.
{{< /alert >}}

**Performance Benefits:**
When you're zoomed out, Kanvas doesn't spend resources rendering details you can't see anyway. This keeps panning and navigation fast even in large designs. As you zoom in, more information progressively appears, giving you the detail you need without overwhelming the display.

### Zoom Limits

Kanvas sets reasonable minimum and maximum zoom levels to ensure everything remains usable:

- Text stays readable without becoming pixelated
- Interactive handles remain large enough to click
- Badges and indicators maintain appropriate sizes
- The design looks good on all devices (desktop, tablet, mobile)

{{< alert type="warning" title="Zoom Boundaries" >}}
If you try to zoom beyond the minimum or maximum limits, Kanvas won't zoom further. These limits are in place to maintain usability and performance.
{{< /alert >}}

## Testing Your Design's Performance

As you build larger designs, it's helpful to evaluate how well they perform. Here are practical ways to test your design's responsiveness.

### Practical Test Scenarios

Try these scenarios to understand how your design performs:

1. **Small Group Test** (10-20 components in a group)
   - Does dragging feel instant and smooth?
   - Do components respond immediately to your actions?
   - This is the baseline—everything should feel effortless

2. **Medium Design Test** (50-100 components total)
   - Can you drag groups without noticeable delay?
   - Does panning around the canvas feel fluid?
   - Are minor delays acceptable for your workflow?

3. **Large Design Test** (200+ components)
   - How does dragging large groups feel?
   - Is there lag when you first load the design?
   - Does zooming in and out remain responsive?

4. **Complex Nesting Test** (groups within groups, 3+ levels deep)
   - Can you still move parent groups smoothly?
   - Do nested relationships display correctly?
   - Is the design still manageable?

{{< alert type="info" title="Testing Approach" >}}
Start simple and add complexity gradually. This helps you identify exactly when performance starts to degrade, making it easier to adjust your design approach.
{{< /alert >}}

### Simple Performance Checks

You don't need specialized tools to evaluate performance. Just ask yourself:

**Responsiveness Check:**
- Does dragging components feel smooth or choppy?
- Do components respond immediately when you click them?
- Can you pan around the design without lag?

**Loading Time Check:**
- Does your design load within a few seconds?
- Are badges and indicators visible quickly?
- Does the design feel "ready" when it first appears?

**Interaction Check:**
- Can you resize components smoothly?
- Do relationships update without delay?
- Does the interface feel responsive or sluggish?

### Using Browser Developer Tools (Optional)

For more detailed performance analysis, you can use your browser's built-in developer tools:

1. **Open Developer Tools**: Press F12 (Windows/Linux) or Cmd+Option+I (Mac)
2. **Navigate to Performance Tab**: Look for the "Performance" or "Profiler" tab
3. **Record an Interaction**: Click the record button, perform an action (like dragging), then stop recording
4. **Review Results**: Look for long operations or frame drops that indicate performance issues

{{< alert type="warning" title="Browser Differences" >}}
Performance can vary between browsers. If your design feels slow, try testing in Chrome, Firefox, or Safari to see if performance differs.
{{< /alert >}}

## Future Improvements

We're continuously working to make Kanvas even faster and more responsive. Future updates will bring additional performance enhancements, including:

- Improved rendering techniques for even smoother interactions
- Smarter optimization of complex designs
- Better handling of very large designs (1,000+ components)
- Enhanced performance on lower-powered devices

These improvements will happen automatically through Kanvas updates—you won't need to change your designs or workflows to benefit from them.

{{< alert type="success" title="Continuous Improvement" >}}
Performance optimization is an ongoing priority. As Kanvas evolves, your existing designs will automatically benefit from new performance enhancements.
{{< /alert >}}

## Special URL Options for Performance

When opening designs in Kanvas, you can add special parameters to the URL that change how your design loads and displays. These options give you control over the balance between features and performance.

### Full Render Mode

By default, Kanvas loads your design with optimized rendering for best performance. If you need to see absolutely everything—all relationships, groupings, and metadata—you can use full render mode.

**How to Use It:**
Add `render=full` to your design URL:
```
https://cloud.layer5.io/kanvas/designer?design=<design-id>&render=full
```

**What You'll See:**
- Every relationship between components, including complex connections
- All tag-based groupings and relationships
- Complete component metadata and properties
- All status badges and validation indicators
- Advanced semantic relationships

**When to Use Full Render Mode:**
- When you need to see the complete picture of your design
- For troubleshooting relationship issues
- When generating comprehensive documentation
- For detailed audits or reviews

**When NOT to Use It:**
- For everyday design work (standard mode is faster)
- With large designs (100+ components) where performance matters
- When you only need to view or edit a specific part of your design
- On slower computers or devices

{{< alert type="warning" title="Performance Trade-off" >}}
Full render mode shows everything, but it takes longer to load and may feel slower during interactions. For most work, the standard mode provides the best experience. Use full render mode only when you specifically need to see all relationships and metadata at once.
{{< /alert >}}

**Practical Example:**
Imagine you have a design with 200 microservices and hundreds of relationships. In standard mode, Kanvas shows you what you need to work effectively. In full render mode, it displays every single connection and grouping—which is great for a complete overview but can make the design feel sluggish.

### More URL Options

Kanvas supports several other URL parameters that control different aspects of your design. For a complete list of available options and what they do, see [URL Parameters](/kanvas/advanced/url-parameters/).

{{< alert type="info" title="Experiment and Learn" >}}
Try different URL parameters to find what works best for your workflow. You can combine multiple parameters to customize your Kanvas experience exactly how you need it.
{{< /alert >}}
