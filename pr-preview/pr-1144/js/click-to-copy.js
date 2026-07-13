// Sistent Icon definitions exactly as provided by the design system
const SISTENT_COPY_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#3C494F"><path d="M15.5 3H5.5C4.4 3 3.5 3.9 3.5 5V17H5.5V5H15.5V3ZM18.5 7H9.5C8.4 7 7.5 7.9 7.5 9V21C7.5 22.1 8.4 23 9.5 23H18.5C19.6 23 20.5 22.1 20.5 21V9C20.5 7.9 19.6 7 18.5 7ZM18.5 21H9.5V9H18.5V21Z"/></svg>`;
const SISTENT_CHECK_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h24v24H0z" fill="none" /><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" /></svg>`;

const codeListings = document.querySelectorAll('.highlight > pre');
for (let index = 0; index < codeListings.length; index++) {
  const codeSample = codeListings[index].querySelector('code');
  
  const copyButton = document.createElement('button');
  const buttonAttributes = {
    type: 'button',
    title: 'Copy to clipboard',
    'data-bs-toggle': 'tooltip',
    'data-bs-placement': 'top',
    'data-bs-container': 'body',
  };

  Object.keys(buttonAttributes).forEach((key) => {
    copyButton.setAttribute(key, buttonAttributes[key]);
  });

  // Removed FontAwesome classes ('fas', 'fa-copy') to keep only button styles
  copyButton.classList.add(
    'btn',
    'btn-sm',
    'td-click-to-copy'
  );
  
  // Set initial Sistent Copy Icon
  copyButton.innerHTML = SISTENT_COPY_ICON;
  
  const tooltip = new bootstrap.Tooltip(copyButton);

  let revertTimeout;

  copyButton.onclick = () => {
  copyCode(codeSample)
    .then(() => {
      copyButton.setAttribute('data-bs-original-title', 'Copied!');
      tooltip.show();
      
      // Replaced FontAwesome toggle with Sistent Check Icon
      copyButton.innerHTML = SISTENT_CHECK_ICON;
      copyButton.classList.add('td-click-to-copy--copied');
      
      clearTimeout(revertTimeout);
      revertTimeout = setTimeout(() => {
        // Replaced FontAwesome toggle with Sistent Copy Icon
        copyButton.innerHTML = SISTENT_COPY_ICON;
        copyButton.classList.remove('td-click-to-copy--copied');
        
        copyButton.setAttribute('data-bs-original-title', 'Copy to clipboard');
        tooltip.hide();
      }, 2500);
    })
    .catch((err) => {
      console.warn('Failed to copy code to clipboard:', err);
      copyButton.setAttribute('data-bs-original-title', 'Failed to copy');
      tooltip.show();
      clearTimeout(revertTimeout);
      revertTimeout = setTimeout(() => {
        copyButton.setAttribute('data-bs-original-title', 'Copy to clipboard');
        tooltip.hide();
      }, 2500);
    });
};
  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('click-to-copy');
  buttonDiv.append(copyButton);
  codeListings[index].insertBefore(buttonDiv, codeSample);
}

const copyCode = (codeSample) => {
  const isConsoleBlock = codeSample.matches(
    "code[data-lang='console'], code.language-console"
  );
  let text;

  if (isConsoleBlock) {
    const clone = codeSample.cloneNode(true);
    pruneUnselectableElements(codeSample, clone);
    text = clone.textContent;
    text = text.replace(/^ /gm, '');
  } else {
    text = codeSample.textContent;
  }
  text = text ? text.trim() : '';
  return navigator.clipboard.writeText(text + '\n');
  };

const pruneUnselectableElements = (sourceNode, cloneNode) => {
  const sourceChildren = sourceNode.children;
  const cloneChildren = cloneNode.children;

  for (let i = sourceChildren.length - 1; i >= 0; i--) {
    const sourceChild = sourceChildren[i];
    const cloneChild = cloneChildren[i];
    const style = window.getComputedStyle(sourceChild);
    const unselectable =
      style.userSelect === 'none' || style.webkitUserSelect === 'none';
    if (unselectable) {
      cloneChild.remove();
      continue;
    }

    pruneUnselectableElements(sourceChild, cloneChild);
  }
};