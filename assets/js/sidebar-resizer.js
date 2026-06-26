(function () {
    document.addEventListener("DOMContentLoaded", () => {
        const gridContainer = document.querySelector(".r-grid-container");
        const leftResizer = document.getElementById("left-resizer");
        const rightResizer = document.getElementById("right-resizer");

        if (!gridContainer) return;

        const LEFT_SIDEBAR_KEY = "left-sidebar-width";
        const TOC_KEY = "toc-width";

        const storage = {
            get: (key) => {
                try { return localStorage.getItem(key); }
                catch (e) { return null; }
            },
            set: (key, value) => {
                try { localStorage.setItem(key, value); }
                catch (e) { return null; }
            }
        };

        function setupResizer(resizer, type) {
            resizer.addEventListener("pointerdown", (e) => {
                e.preventDefault();

                resizer.setPointerCapture(e.pointerId);
                resizer.classList.add("is-dragging");

                document.body.style.cursor = "col-resize";
                document.body.style.userSelect = "none";

                const startX = e.clientX;
                const styles = window.getComputedStyle(gridContainer);
                const gridColumns = styles.gridTemplateColumns ? styles.gridTemplateColumns.split(" ") : [];

                /*
                    grid-template-columns over in _styles_project.scss has the following structure:

                    min(768px)
                    --left-sidebar-width --sidebar-resize-width 1fr

                    min(1200px)
                    --left-sidebar-width --sidebar-resize-width 1fr --sidebar-resize-width --toc-width;

                    so gridcolumns[0] targets the left sidebar and gridcolumns[4] targets the toc
                */

                let initialLeftSidebarWidth, initialTocWidth;
                if (gridColumns.length >= 5 && gridColumns[0] !== "none") {
                    initialLeftSidebarWidth = parseInt(gridColumns[0], 10);
                    initialTocWidth = parseInt(gridColumns[4], 10);
                } else {
                    initialLeftSidebarWidth = parseInt(styles.getPropertyValue('--left-sidebar-width'), 10);
                    initialTocWidth = parseInt(styles.getPropertyValue('--toc-width'), 10);
                }

                const minWidth = parseInt(styles.getPropertyValue(type === "left" ? '--left-sidebar-min-width' : '--toc-min-width'), 10);
                const maxWidth = parseInt(styles.getPropertyValue(type === "left" ? '--left-sidebar-max-width' : '--toc-max-width'), 10);
                let currentWidth = type === "left" ? initialLeftSidebarWidth : initialTocWidth;
                let ticking = false;
                let animationFrameId = null;

                function onPointerMove(moveEvent) {
                    const deltaX = moveEvent.clientX - startX;

                    if (type === "left") {
                        currentWidth = Math.max(minWidth, Math.min(maxWidth, initialLeftSidebarWidth + deltaX));
                    } else if (type === "right") {
                        currentWidth = Math.max(minWidth, Math.min(maxWidth, initialTocWidth - deltaX));
                    }

                    if (!ticking) {
                        animationFrameId = window.requestAnimationFrame(() => {
                            const varName = type === "left" ? "--left-sidebar-width" : "--toc-width";
                            gridContainer.style.setProperty(varName, `${currentWidth}px`);
                            ticking = false;
                        });
                        ticking = true;
                    }
                }

                function onPointerUp(upEvent) {
                    if (animationFrameId) {
                        window.cancelAnimationFrame(animationFrameId);
                        animationFrameId = null;
                        ticking = false;
                    }

                    resizer.releasePointerCapture(upEvent.pointerId);
                    resizer.classList.remove("is-dragging");

                    document.body.style.cursor = "";
                    document.body.style.userSelect = "";

                    const storageKey = type === "left" ? LEFT_SIDEBAR_KEY : TOC_KEY;
                    storage.set(storageKey, currentWidth);

                    document.removeEventListener("pointermove", onPointerMove);
                    document.removeEventListener("pointerup", onPointerUp);
                    document.removeEventListener("pointercancel", onPointerUp);
                }

                document.addEventListener("pointermove", onPointerMove);
                document.addEventListener("pointerup", onPointerUp);
                document.addEventListener("pointercancel", onPointerUp);
            });
        }

        if (leftResizer) setupResizer(leftResizer, "left");
        if (rightResizer) setupResizer(rightResizer, "right");
    });
})();