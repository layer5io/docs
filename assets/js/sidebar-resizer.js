
    document.addEventListener("DOMContentLoaded", function () {
      const resizer = document.getElementById("left-resizer");
      const sidebar = document.getElementById("left-sidebar");
      
      if (!resizer || !sidebar) return;
      if (window.innerWidth < 768) return;


      let isResizing = false;

      
      const savedWidth = localStorage.getItem("leftSidebarWidth");
      if (savedWidth) {
        sidebar.style.width = savedWidth;
        sidebar.style.flex = "none";
        sidebar.style.maxWidth = "35vw";
      }

     
      resizer.addEventListener("mousedown", function (e) {
        isResizing = true;
        document.body.style.cursor = "col-resize"; 
        document.body.style.userSelect = "none";  
      });

     
      document.addEventListener("mousemove", function (e) {
        if (!isResizing) return;
        
      
        const newWidth = e.clientX + "px";
        sidebar.style.width = newWidth;
        sidebar.style.flex = "none"; // Override bootstrap grid flex
      });

    
      document.addEventListener("mouseup", function () {
        if (isResizing) {
          isResizing = false;
          document.body.style.cursor = "";
          document.body.style.userSelect = "";
          
          // Save the final width
          localStorage.setItem("leftSidebarWidth", sidebar.style.width);
        }
      });

     
      resizer.addEventListener("dblclick", function () {
        sidebar.classList.add("is-resetting"); // Add transition class
        
        sidebar.style.width = "";
        sidebar.style.flex = "";
        localStorage.removeItem("leftSidebarWidth");
        
        
        setTimeout(() => sidebar.classList.remove("is-resetting"), 300);
      });

    });
  