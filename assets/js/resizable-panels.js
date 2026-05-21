/**
 * Resizable Panels Feature
 * Allows users to adjust the width of side panels (left sidebar and right TOC)
 * Preferences are saved to localStorage and restored on page load
 * Includes reset functionality to restore default widths
 */

(function() {
  'use strict';

  const STORAGE_KEY = 'layer5-docs-panel-widths';
  const DEFAULT_WIDTHS = {
    sidebar: 2,      // col-xl-2 = ~16.66%
    toc: 2,          // col-xl-2 = ~16.66%
    main: 8          // col-xl-8 = ~66.66%
  };

  // CSS class shortcuts for Bootstrap grid columns
  const COL_CLASSES = {
    'col-1': 8.33,
    'col-2': 16.66,
    'col-3': 25,
    'col-4': 33.33,
    'col-5': 41.66,
    'col-6': 50,
    'col-7': 58.33,
    'col-8': 66.66,
    'col-9': 75,
    'col-10': 83.33,
    'col-11': 91.66,
    'col-12': 100
  };

  class ResizablePanels {
    constructor() {
      this.sidebar = document.querySelector('.td-sidebar');
      this.toc = document.querySelector('.td-sidebar-toc');
      this.main = document.querySelector('main[role="main"]');
      this.row = document.querySelector('.row.flex-xl-nowrap');

      if (!this.row || !this.sidebar || !this.main) {
        console.warn('Resizable panels: Required elements not found');
        return;
      }

      this.isResizing = false;
      this.currentResizeTarget = null;
      this.startX = 0;
      this.startWidth = 0;

      this.init();
    }

    init() {
      // Load saved widths from localStorage
      this.loadSavedWidths();

      // Create resize handles
      this.createResizeHandles();

      // Add event listeners
      this.addEventListeners();

      // Add reset button
      this.addResetButton();
    }

    loadSavedWidths() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const widths = JSON.parse(saved);
          this.applyWidths(widths);
        }
      } catch (error) {
        console.error('Error loading saved panel widths:', error);
      }
    }

    createResizeHandles() {
      // Create resize handle between sidebar and main content
      const sidebarHandle = document.createElement('div');
      sidebarHandle.className = 'resizable-panel-handle resizable-panel-handle--right';
      sidebarHandle.setAttribute('data-resize-target', 'sidebar');
      sidebarHandle.setAttribute('title', 'Drag to resize sidebar');
      this.sidebar.appendChild(sidebarHandle);

      // Create resize handle for TOC (if it exists)
      if (this.toc) {
        const tocHandle = document.createElement('div');
        tocHandle.className = 'resizable-panel-handle resizable-panel-handle--left';
        tocHandle.setAttribute('data-resize-target', 'toc');
        tocHandle.setAttribute('title', 'Drag to resize table of contents');
        this.toc.appendChild(tocHandle);
      }
    }

    addEventListeners() {
      document.addEventListener('mousedown', (e) => this.onMouseDown(e));
      document.addEventListener('mousemove', (e) => this.onMouseMove(e));
      document.addEventListener('mouseup', (e) => this.onMouseUp(e));
    }

    onMouseDown(e) {
      if (!e.target.classList.contains('resizable-panel-handle')) {
        return;
      }

      this.isResizing = true;
      this.currentResizeTarget = e.target.getAttribute('data-resize-target');
      this.startX = e.clientX;

      // Store current widths for delta calculation
      this.startWidths = this.getCurrentWidths();

      // Add active state
      e.target.classList.add('resizable-panel-handle--active');
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'col-resize';
    }

    onMouseMove(e) {
      if (!this.isResizing) return;

      const delta = e.clientX - this.startX;
      const adjustment = delta / window.innerWidth; // Convert pixels to percentage-like ratio

      let newWidths = { ...this.startWidths };

      if (this.currentResizeTarget === 'sidebar') {
        // Resizing left sidebar
        const sidebarPercent = (this.startWidths.sidebar * 100) / 12; // Convert col units to percentage
        const mainPercent = (this.startWidths.main * 100) / 12;

        const newSidebarPercent = sidebarPercent + (adjustment * 100);
        const newMainPercent = mainPercent - (adjustment * 100);

        // Constrain widths: min 1 col, max 5 cols for sidebar; min 4 cols for main
        if (newSidebarPercent >= 8.33 && newSidebarPercent <= 41.66 && newMainPercent >= 33.33) {
          newWidths.sidebar = Math.round((newSidebarPercent / 100) * 12);
          newWidths.main = Math.round((newMainPercent / 100) * 12);
        }
      } else if (this.currentResizeTarget === 'toc') {
        // Resizing right TOC panel
        const tocPercent = (this.startWidths.toc * 100) / 12;
        const mainPercent = (this.startWidths.main * 100) / 12;

        const newTocPercent = tocPercent - (adjustment * 100);
        const newMainPercent = mainPercent + (adjustment * 100);

        // Constrain widths: min 1 col, max 5 cols for toc; min 4 cols for main
        if (newTocPercent >= 8.33 && newTocPercent <= 41.66 && newMainPercent >= 33.33) {
          newWidths.toc = Math.round((newTocPercent / 100) * 12);
          newWidths.main = Math.round((newMainPercent / 100) * 12);
        }
      }

      this.applyWidths(newWidths);
    }

    onMouseUp(e) {
      if (!this.isResizing) return;

      this.isResizing = false;
      const handle = document.querySelector('.resizable-panel-handle--active');
      if (handle) {
        handle.classList.remove('resizable-panel-handle--active');
      }

      document.body.style.userSelect = '';
      document.body.style.cursor = '';

      // Save widths to localStorage
      this.savePanelWidths();
    }

    applyWidths(widths) {
      const { sidebar, toc, main } = widths;

      // Update sidebar
      this.removeBootstrapColClasses(this.sidebar);
      this.sidebar.classList.add(`col-xl-${sidebar}`);

      // Update main
      this.removeBootstrapColClasses(this.main);
      this.main.classList.add(`col-xl-${main}`);

      // Update TOC if it exists
      if (this.toc) {
        this.removeBootstrapColClasses(this.toc);
        this.toc.classList.add(`col-xl-${toc}`);
      }
    }

    getCurrentWidths() {
      const getColNumber = (element) => {
        const classes = element.className.split(' ');
        const colClass = classes.find(c => c.match(/col-xl-\d+/));
        return colClass ? parseInt(colClass.split('-')[2]) : null;
      };

      return {
        sidebar: getColNumber(this.sidebar) || DEFAULT_WIDTHS.sidebar,
        toc: this.toc ? (getColNumber(this.toc) || DEFAULT_WIDTHS.toc) : DEFAULT_WIDTHS.toc,
        main: getColNumber(this.main) || DEFAULT_WIDTHS.main
      };
    }

    removeBootstrapColClasses(element) {
      const classes = element.className.split(' ').filter(c => !c.match(/col-xl-\d+/));
      element.className = classes.join(' ').trim();
    }

    savePanelWidths() {
      try {
        const widths = this.getCurrentWidths();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(widths));
      } catch (error) {
        console.error('Error saving panel widths:', error);
      }
    }

    addResetButton() {
      // Find the feature-info-container or page-header to add reset button
      const pageHeader = document.querySelector('.page-header');
      if (!pageHeader) return;

      const resetButton = document.createElement('button');
      resetButton.id = 'reset-panel-widths';
      resetButton.className = 'btn btn-sm btn-outline-secondary ms-2';
      resetButton.innerHTML = '<i class="bi bi-arrow-clockwise"></i> Reset Layout';
      resetButton.setAttribute('title', 'Reset panel widths to default');

      resetButton.addEventListener('click', () => this.resetPanelWidths());

      // Find a good place to insert the button
      const featureContainer = pageHeader.querySelector('.feature-info-container');
      if (featureContainer) {
        featureContainer.insertAdjacentElement('beforeend', resetButton);
      } else {
        pageHeader.insertAdjacentElement('beforeend', resetButton);
      }
    }

    resetPanelWidths() {
      this.applyWidths(DEFAULT_WIDTHS);
      this.savePanelWidths();
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      new ResizablePanels();
    });
  } else {
    new ResizablePanels();
  }
})();
