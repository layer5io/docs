/**
 * Resizable docs panels.
 *
 * Lets readers adjust the left navigation and right TOC widths, persists those
 * preferences in localStorage, and provides a reset control.
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'layer5-docs-panel-widths';
  const RESIZABLE_QUERY = '(min-width: 768px)';
  const STEP = 1;
  const DEFAULT_WIDTHS = {
    sidebar: 16.6667,
    toc: 16.6667,
  };
  const LIMITS = {
    sidebar: { min: 12, max: 32 },
    toc: { min: 10, max: 28 },
    main: { min: 42 },
  };

  class ResizablePanels {
    constructor(row) {
      this.row = row;
      this.sidebar = row.querySelector('.td-sidebar');
      this.main = row.querySelector('main[role="main"]');
      this.toc = row.querySelector('.td-sidebar-toc');
      this.mediaQuery = window.matchMedia(RESIZABLE_QUERY);
      this.activeHandle = null;
      this.startX = 0;
      this.startWidths = null;
      this.widths = this.getStoredWidths();

      if (!this.sidebar || !this.main) {
        return;
      }

      this.init();
    }

    init() {
      this.row.classList.add('resizable-panels-ready');
      this.applyWidths(this.widths);
      this.createHandles();
      this.createResetButton();
      this.bindEvents();
    }

    bindEvents() {
      document.addEventListener('pointermove', (event) =>
        this.onPointerMove(event),
      );
      document.addEventListener('pointerup', () => this.stopResize());
      document.addEventListener('pointercancel', () => this.stopResize());

      const onBreakpointChange = () => {
        if (this.mediaQuery.matches) {
          this.applyWidths(this.widths);
        }
      };

      if (this.mediaQuery.addEventListener) {
        this.mediaQuery.addEventListener('change', onBreakpointChange);
      } else {
        this.mediaQuery.addListener(onBreakpointChange);
      }
    }

    createHandles() {
      this.sidebarHandle = this.createHandle(
        'sidebar',
        'Resize navigation sidebar',
      );
      this.sidebar.appendChild(this.sidebarHandle);

      if (this.toc) {
        this.tocHandle = this.createHandle('toc', 'Resize table of contents');
        this.toc.appendChild(this.tocHandle);
      }
    }

    createHandle(target, label) {
      const handle = document.createElement('div');
      handle.className = `resizable-panel-handle resizable-panel-handle--${target}`;
      handle.dataset.resizeTarget = target;
      handle.tabIndex = 0;
      handle.setAttribute('aria-label', label);
      handle.setAttribute('aria-orientation', 'vertical');
      handle.setAttribute('role', 'separator');
      handle.title = label;

      handle.addEventListener('pointerdown', (event) =>
        this.startResize(event, handle),
      );
      handle.addEventListener('keydown', (event) =>
        this.onHandleKeydown(event, target),
      );

      return handle;
    }

    createResetButton() {
      const resetButton = document.createElement('button');
      resetButton.type = 'button';
      resetButton.id = 'reset-panel-widths';
      resetButton.className = 'resizable-panel-reset';
      resetButton.innerHTML =
        '<i class="bi bi-arrow-clockwise" aria-hidden="true"></i><span>Reset layout</span>';
      resetButton.title = 'Reset panel widths to default';
      resetButton.addEventListener('click', () => this.reset());

      this.sidebar.appendChild(resetButton);
    }

    startResize(event, handle) {
      if (!this.mediaQuery.matches) {
        return;
      }

      event.preventDefault();
      this.activeHandle = handle;
      this.startX = event.clientX;
      this.startWidths = { ...this.widths };
      handle.classList.add('resizable-panel-handle--active');
      handle.setPointerCapture(event.pointerId);
      document.body.classList.add('resizable-panels-dragging');
    }

    onPointerMove(event) {
      if (!this.activeHandle || !this.startWidths) {
        return;
      }

      const rowWidth = this.row.getBoundingClientRect().width;
      if (!rowWidth) {
        return;
      }

      const target = this.activeHandle.dataset.resizeTarget;
      const delta = ((event.clientX - this.startX) / rowWidth) * 100;
      const nextWidths = { ...this.startWidths };

      if (target === 'sidebar') {
        nextWidths.sidebar = this.startWidths.sidebar + delta;
      }

      if (target === 'toc') {
        nextWidths.toc = this.startWidths.toc - delta;
      }

      this.widths = this.normalizeWidths(nextWidths);
      this.applyWidths(this.widths);
    }

    stopResize() {
      if (!this.activeHandle) {
        return;
      }

      this.activeHandle.classList.remove('resizable-panel-handle--active');
      this.activeHandle = null;
      this.startWidths = null;
      document.body.classList.remove('resizable-panels-dragging');
      this.saveWidths();
    }

    onHandleKeydown(event, target) {
      if (!this.mediaQuery.matches) {
        return;
      }

      const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
      if (!keys.includes(event.key)) {
        return;
      }

      event.preventDefault();
      const nextWidths = { ...this.widths };
      const direction = event.key === 'ArrowRight' ? 1 : -1;

      if (event.key === 'Home') {
        nextWidths[target] = LIMITS[target].min;
      } else if (event.key === 'End') {
        nextWidths[target] = LIMITS[target].max;
      } else if (target === 'toc') {
        nextWidths.toc -= direction * STEP;
      } else {
        nextWidths.sidebar += direction * STEP;
      }

      this.widths = this.normalizeWidths(nextWidths);
      this.applyWidths(this.widths);
      this.saveWidths();
    }

    applyWidths(widths) {
      const normalized = this.normalizeWidths(widths);
      const mainWidth = 100 - normalized.sidebar - normalized.toc;

      this.row.style.setProperty(
        '--docs-sidebar-width',
        `${normalized.sidebar}%`,
      );
      this.row.style.setProperty('--docs-toc-width', `${normalized.toc}%`);
      this.row.style.setProperty('--docs-main-width', `${mainWidth}%`);
      this.row.style.setProperty(
        '--docs-main-without-toc-width',
        `${100 - normalized.sidebar}%`,
      );
      this.updateHandleValues(normalized);
    }

    updateHandleValues(widths) {
      if (this.sidebarHandle) {
        this.sidebarHandle.setAttribute('aria-valuemin', LIMITS.sidebar.min);
        this.sidebarHandle.setAttribute('aria-valuemax', LIMITS.sidebar.max);
        this.sidebarHandle.setAttribute(
          'aria-valuenow',
          Math.round(widths.sidebar),
        );
      }

      if (this.tocHandle) {
        this.tocHandle.setAttribute('aria-valuemin', LIMITS.toc.min);
        this.tocHandle.setAttribute('aria-valuemax', LIMITS.toc.max);
        this.tocHandle.setAttribute('aria-valuenow', Math.round(widths.toc));
      }
    }

    reset() {
      this.widths = { ...DEFAULT_WIDTHS };
      this.applyWidths(this.widths);
      localStorage.removeItem(STORAGE_KEY);
    }

    getStoredWidths() {
      try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (
          saved &&
          (saved.sidebar <= 12 || saved.toc <= 12 || saved.main <= 12)
        ) {
          return this.normalizeWidths({
            sidebar: saved.sidebar
              ? (saved.sidebar / 12) * 100
              : DEFAULT_WIDTHS.sidebar,
            toc: saved.toc ? (saved.toc / 12) * 100 : DEFAULT_WIDTHS.toc,
          });
        }

        return this.normalizeWidths(saved || DEFAULT_WIDTHS);
      } catch (error) {
        return { ...DEFAULT_WIDTHS };
      }
    }

    saveWidths() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.widths));
      } catch (error) {
        // Ignore storage failures so resizing still works in private modes.
      }
    }

    normalizeWidths(widths) {
      const next = {
        sidebar: this.clamp(
          Number(widths && widths.sidebar),
          LIMITS.sidebar.min,
          LIMITS.sidebar.max,
          DEFAULT_WIDTHS.sidebar,
        ),
        toc: this.toc
          ? this.clamp(
              Number(widths && widths.toc),
              LIMITS.toc.min,
              LIMITS.toc.max,
              DEFAULT_WIDTHS.toc,
            )
          : 0,
      };

      const availableForPanels = 100 - LIMITS.main.min;
      const panelTotal = next.sidebar + next.toc;

      if (panelTotal > availableForPanels) {
        const overflow = panelTotal - availableForPanels;

        if (next.sidebar >= next.toc) {
          next.sidebar = Math.max(LIMITS.sidebar.min, next.sidebar - overflow);
        } else {
          next.toc = Math.max(LIMITS.toc.min, next.toc - overflow);
        }
      }

      return {
        sidebar: Number(next.sidebar.toFixed(4)),
        toc: Number(next.toc.toFixed(4)),
      };
    }

    clamp(value, min, max, fallback) {
      if (!Number.isFinite(value)) {
        return fallback;
      }

      return Math.min(max, Math.max(min, value));
    }
  }

  function initResizablePanels() {
    document.querySelectorAll('.row.flex-xl-nowrap').forEach((row) => {
      if (!row.dataset.resizablePanelsInitialized) {
        row.dataset.resizablePanelsInitialized = 'true';
        new ResizablePanels(row);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initResizablePanels);
  } else {
    initResizablePanels();
  }
})();
