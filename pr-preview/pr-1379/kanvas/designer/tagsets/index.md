# Working with Tags


> Share design with other users and use control access to manage design access permissions and visibility.



You can group components using tags. Tags are key-value pairs that help you organize and categorize components within your design. Tags can be used to visually group components. Designer has no filter that shows only components with a given tag. Operator mode filters live resources by namespace, kind, model, label, and free-text search. Palette search matches model and component names, not labels.












<div class="alert alert-primary" role="alert">
  <h4 class="alert-heading">Related Concept</h4>
  
      Kubernetes resources are capable of being assigned Label and Annotation key/value pairs. When pairs of Labels or Annotations match, a relationship is formed and visualized as shown below.
  
</div>



## Grouping Components with Tags

To group components using tags, follow these steps.

![Tags](images/tagsets.gif)

## Labels and Annotations

Designs support two different types of tags: Labels and Annotations. Labels are often used to identify components and are visible on the design canvas. Annotations are often used to provide additional information about components.

<img alt="Labels and Annotations" src="../../images/group-components.png" width="50%" />







<div class="alert alert-custom" style="border-color: #EBC017;" role="alert">
  <h4 class="alert-heading" style="color: #EBC017;">Performance Consideration</h4>
  
      <p>Tags are indexed and searchable. However, the performance of design operations may degrade as the number of tags increases. To ensure an optimal user experience, we recommend using tags judiciously and limiting the number of tags used in a design.</p>
<p>TagSets draw only in Full render mode, and only while at most 30 are drawn. Past 30, Kanvas skips the rest and shows &ldquo;Skipped rendering of N matchlabels relationships due to limit of 30&rdquo;. Grouping does not turn itself off at 10 tags, and there is no Group Components control that re-enables it after that limit. The TagSets layer must also be visible.</p>

  
</div>














<div class="alert alert-primary" role="alert">
  <h4 class="alert-heading">Related Concept</h4>
  
      
  
</div>


