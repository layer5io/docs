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
  const LEGACY_GRID_COLUMNS = 12;

  function setupResizablePanels(row) {
    const sidebar = row.querySelector('.td-sidebar');
    const main = row.querySelector('main[role="main"]');
    const toc = row.querySelector('.td-sidebar-toc');
    const mediaQuery = window.matchMedia(RESIZABLE_QUERY);
    let activeHandle = null;
    let sidebarHandle = null;
    let tocHandle = null;
    let startX = 0;
    let startWidths = null;
    let widths = getStoredWidths();

    if (!sidebar || !main) {
      return;
    }

    row.classList.add('resizable-panels-ready');
    applyWidths(widths);
    createHandles();
    createResetButton();
    bindEvents();

    function bindEvents() {
      const onBreakpointChange = () => {
        if (mediaQuery.matches) {
          applyWidths(widths);
        }
      };

      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', onBreakpointChange);
      } else {
        mediaQuery.addListener(onBreakpointChange);
      }
    }

    function createHandles() {
      sidebarHandle = createHandle('sidebar', 'Resize navigation sidebar');
      sidebar.appendChild(sidebarHandle);

      if (toc) {
        tocHandle = createHandle('toc', 'Resize table of contents');
        toc.appendChild(tocHandle);
      }
    }

    function createHandle(target, label) {
      const handle = document.createElement('div');
      handle.className = `resizable-panel-handle resizable-panel-handle--${target}`;
      handle.dataset.resizeTarget = target;
      handle.tabIndex = 0;
      handle.setAttribute('aria-label', label);
      handle.setAttribute('aria-orientation', 'vertical');
      handle.setAttribute('role', 'separator');
      handle.title = label;

      handle.addEventListener('pointerdown', (event) => {
        startResize(event, handle);
      });
      handle.addEventListener('keydown', (event) => {
        onHandleKeydown(event, target);
      });

      return handle;
    }

    function createResetButton() {
      const resetButton = document.createElement('button');
      resetButton.type = 'button';
      resetButton.className = 'resizable-panel-reset';
      resetButton.innerHTML =
        '<i class="bi bi-arrow-clockwise" aria-hidden="true"></i><span>Reset layout</span>';
      resetButton.title = 'Reset panel widths to default';
      resetButton.addEventListener('click', reset);

      sidebar.appendChild(resetButton);
    }

    function startResize(event, handle) {
      if (!mediaQuery.matches) {
        return;
      }

      event.preventDefault();
      activeHandle = handle;
      startX = event.clientX;
      startWidths = { ...widths };
      handle.classList.add('resizable-panel-handle--active');
      handle.setPointerCapture(event.pointerId);
      document.body.classList.add('resizable-panels-dragging');

      const controller = new AbortController();
      const { signal } = controller;

      const endResize = () => {
        stopResize();
        controller.abort();
      };

      document.addEventListener('pointermove', onPointerMove, { signal });
      document.addEventListener('pointerup', endResize, { signal });
      document.addEventListener('pointercancel', endResize, { signal });
    }

    function onPointerMove(event) {
      if (!activeHandle || !startWidths) {
        return;
      }

      const rowWidth = row.getBoundingClientRect().width;
      if (!rowWidth) {
        return;
      }

      const target = activeHandle.dataset.resizeTarget;
      const delta = ((event.clientX - startX) / rowWidth) * 100;
      const nextWidths = { ...startWidths };

      if (target === 'sidebar') {
        nextWidths.sidebar = startWidths.sidebar + delta;
      }

      if (target === 'toc') {
        nextWidths.toc = startWidths.toc - delta;
      }

      widths = normalizeWidths(nextWidths);
      applyWidths(widths);
    }

    function stopResize() {
      if (!activeHandle) {
        return;
      }

      activeHandle.classList.remove('resizable-panel-handle--active');
      activeHandle = null;
      startWidths = null;
      document.body.classList.remove('resizable-panels-dragging');
      saveWidths();
    }

    function onHandleKeydown(event, target) {
      if (!mediaQuery.matches) {
        return;
      }

      const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
      if (!keys.includes(event.key)) {
        return;
      }

      event.preventDefault();
      const nextWidths = { ...widths };
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

      widths = normalizeWidths(nextWidths);
      applyWidths(widths);
      saveWidths();
    }

    function applyWidths(nextWidths) {
      const normalized = normalizeWidths(nextWidths);
      const mainWidth = 100 - normalized.sidebar - normalized.toc;

      row.style.setProperty('--docs-sidebar-width', `${normalized.sidebar}%`);
      row.style.setProperty('--docs-toc-width', `${normalized.toc}%`);
      row.style.setProperty('--docs-main-width', `${mainWidth}%`);
      row.style.setProperty(
        '--docs-main-without-toc-width',
        `${100 - normalized.sidebar}%`,
      );
      updateHandleValues(normalized);
    }

    function updateHandleValues(nextWidths) {
      if (sidebarHandle) {
        sidebarHandle.setAttribute('aria-valuemin', LIMITS.sidebar.min);
        sidebarHandle.setAttribute('aria-valuemax', LIMITS.sidebar.max);
        sidebarHandle.setAttribute(
          'aria-valuenow',
          Math.round(nextWidths.sidebar),
        );
      }

      if (tocHandle) {
        tocHandle.setAttribute('aria-valuemin', LIMITS.toc.min);
        tocHandle.setAttribute('aria-valuemax', LIMITS.toc.max);
        tocHandle.setAttribute('aria-valuenow', Math.round(nextWidths.toc));
      }
    }

    function reset() {
      widths = { ...DEFAULT_WIDTHS };
      applyWidths(widths);
      localStorage.removeItem(STORAGE_KEY);
    }

    function getStoredWidths() {
      try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));

        if (isLegacyColumnWidths(saved)) {
          return normalizeWidths({
            sidebar: saved.sidebar
              ? (saved.sidebar / LEGACY_GRID_COLUMNS) * 100
              : DEFAULT_WIDTHS.sidebar,
            toc: saved.toc
              ? (saved.toc / LEGACY_GRID_COLUMNS) * 100
              : DEFAULT_WIDTHS.toc,
          });
        }

        return normalizeWidths(saved || DEFAULT_WIDTHS);
      } catch (error) {
        return { ...DEFAULT_WIDTHS };
      }
    }

    function isLegacyColumnWidths(saved) {
      if (!saved) {
        return false;
      }

      return ['sidebar', 'toc', 'main'].some((key) => {
        const value = Number(saved[key]);
        const limit = LIMITS[key];

        if (!Number.isFinite(value) || !limit) {
          return false;
        }

        return value < limit.min || (limit.max && value > limit.max);
      });
    }

    function saveWidths() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(widths));
      } catch (error) {
        // Ignore storage failures so resizing still works in private modes.
      }
    }

    function normalizeWidths(nextWidths) {
      const next = {
        sidebar: clamp(
          Number(nextWidths && nextWidths.sidebar),
          LIMITS.sidebar.min,
          LIMITS.sidebar.max,
          DEFAULT_WIDTHS.sidebar,
        ),
        toc: toc
          ? clamp(
            Number(nextWidths && nextWidths.toc),
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

    function clamp(value, min, max, fallback) {
      if (!Number.isFinite(value)) {
        return fallback;
      }

      return Math.min(max, Math.max(min, value));
    }
  }

  function initResizablePanels() {
    const row = document.querySelector('.row.flex-xl-nowrap');
    if (row && !row.dataset.resizablePanelsInitialized) {
      row.dataset.resizablePanelsInitialized = 'true';
      setupResizablePanels(row);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initResizablePanels);
  } else {
    initResizablePanels();
  }
})();