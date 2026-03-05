// Aiden K Morris

function createOverlay() {
// Check if an existing instance of overlay-blocker exists
  const existing = document.getElementById("overlay-blocker");

  // If it does, remove it
  if (existing) {
    existing.remove();
  } else { // Otherwise, create a new overlay
    const overlay = document.createElement("div");

    // Initialize variables
    let isDragging = false;
    let dragId = null;
    let offsetX = 0;
    let offsetY = 0;

    // Constants
    const MIN_HEIGHT = 50;
    const MIN_WIDTH = 50;

    // Main Overlay
    overlay.id = "overlay-blocker";
    overlay.style.position = "fixed";
    overlay.style.top = "50%";
    overlay.style.left = "10%";
    overlay.style.width = "40%";
    overlay.style.height = "30%";
    overlay.style.backgroundColor = "black";
    overlay.style.zIndex = "9999";
    overlay.style.cursor = "move";
    overlay.style.resize = "none";
    overlay.style.overflow = "auto";
    overlay.style.border = "2px solid white";

    // Top Drag Zone
    const top = document.createElement("div");
    top.id = "top";
    top.style.position = "relative";
    top.style.height = "20%";
    top.style.width = "100%";
    top.style.top = "0%";
    top.style.backgroundColor = "black";

    top.addEventListener("mousedown", function (e) {
      isDragging = true;
      dragId = top.id;
      offsetX = e.clientX - overlay.offsetLeft;
      offsetY = e.clientY - overlay.offsetTop;
    });

    // Bottom Drag Zone
    const bottom = document.createElement("div");
    bottom.id = "bottom";
    bottom.style.position = "relative";
    bottom.style.height = "20%";
    bottom.style.width = "100%";
    bottom.style.top = "0%";
    bottom.style.backgroundColor = "black";

    bottom.addEventListener("mousedown", function (e) {
      isDragging = true;
      dragId = bottom.id;
      offsetX = e.clientX - overlay.offsetLeft;
      offsetY = e.clientY - overlay.offsetTop - overlay.offsetHeight;
    });

    // Mid Area
    const mid = document.createElement("div");
    mid.id = "mid";
    mid.style.position = "relative";
    mid.style.height = "60%";
    mid.style.width = "100%";
    mid.style.top = "0%";
    mid.style.backgroundColor = "black";

    // Left Drag Zone
    const left = document.createElement("div");
    left.id = "left";
    left.style.position = "relative";
    left.style.height = "100%";
    left.style.width = "20%";
    left.style.float = "left";
    left.style.backgroundColor = "black";
    mid.appendChild(left);

    left.addEventListener("mousedown", function (e) {
      isDragging = true;
      dragId = left.id;
      offsetX = e.clientX - overlay.offsetLeft;
      offsetY = e.clientY - overlay.offsetTop;
    });

    // Center Zone
    const center = document.createElement("div");
    center.id = "center";
    center.style.position = "relative";
    center.style.height = "100%";
    center.style.width = "60%";
    center.style.backgroundColor = "black";
    center.style.float = "left";
    center.style.flexGrow = "1";
    mid.appendChild(center);

    center.addEventListener("mousedown", function (e) {
      isDragging = true;
      dragId = center.id;
      offsetX = e.clientX - overlay.offsetLeft;
      offsetY = e.clientY - overlay.offsetTop;
    });

    // Right Drag Zone
    const right = document.createElement("div");
    right.id = "right";
    right.style.position = "relative";
    right.style.height = "100%";
    right.style.width = "20%";
    right.style.float = "right";
    right.style.backgroundColor = "black";
    mid.appendChild(right);

    right.addEventListener("mousedown", function (e) {
      isDragging = true;
      dragId = right.id;
      offsetX = e.clientX - overlay.offsetLeft - overlay.offsetWidth;
      offsetY = e.clientY - overlay.offsetTop;
    });

    // Add divs to overlay
    overlay.appendChild(top);
    overlay.appendChild(mid);
    overlay.appendChild(bottom);

    // Add overlay to document
    document.body.appendChild(overlay);
    overlay.style.top = window.getComputedStyle(overlay).top;
    overlay.style.left = window.getComputedStyle(overlay).left;
    overlay.style.width = window.getComputedStyle(overlay).width;
    overlay.style.height = window.getComputedStyle(overlay).height;

    // Prevent the default action when the overlay is clicked
    overlay.addEventListener("mousedown", (e) => {
      e.preventDefault();
    });

    // Disable dragging on mouseup
    document.addEventListener("mouseup", function (e) {
      isDragging = false;
      dragId = null;
    });

    // Perform correct action on mousemove when dragging
    document.addEventListener("mousemove", function (e) {
      if(isDragging) {
        switch(dragId) {
            case center.id: {
            overlay.style.left = `${e.clientX - offsetX}px`;
            overlay.style.top = `${e.clientY - offsetY}px`;
            break;
          }

          case top.id: {
            let originalTop = parseInt(overlay.style.top) || parseInt(window.getComputedStyle(overlay).top);
            let height = parseInt(overlay.style.height) || parseInt(window.getComputedStyle(overlay).height);

            let newTop = e.clientY - offsetY;
            let difference = newTop - originalTop;
            let newHeight = height - difference;

            overlay.style.top = `${newTop}px`;
            overlay.style.height = `${newHeight}px`;
            break;
          }

          case bottom.id: {
            let overlayTop = parseInt(overlay.style.top) || parseInt(window.getComputedStyle(overlay).top);
            let newHeight = e.clientY - offsetY - overlayTop;

            overlay.style.height = `${newHeight}px`;
            break;
          }

          case left.id: {
            let originalLeft = parseInt(overlay.style.left) || parseInt(window.getComputedStyle(overlay).left);
            let width = parseInt(overlay.style.width) || parseInt(window.getComputedStyle(overlay).width);

            let newLeft = e.clientX - offsetX;
            let difference = newLeft - originalLeft;
            let newWidth = width - difference;

            overlay.style.left = `${newLeft}px`;
            overlay.style.width = `${newWidth}px`;
            break;
          }
            
          case right.id: {
            let overlayLeft = parseInt(overlay.style.left) || parseInt(window.getComputedStyle(overlay).left);
            let newWidth = e.clientX - offsetX - overlayLeft;

            overlay.style.width = `${newWidth}px`;
          }
        }

        let width = parseInt(overlay.style.width) || parseInt(window.getComputedStyle(overlay).width);
        let height = parseInt(overlay.style.height) || parseInt(window.getComputedStyle(overlay).height);

        // Constrain overlay size
        if(width < MIN_WIDTH) overlay.style.width = `${MIN_WIDTH}px`;
        if(height < MIN_HEIGHT) overlay.style.height = `${MIN_HEIGHT}px`;
      }
    });

    // Set up mouse glow style
    const style = document.createElement("style");
    style.textContent = `
      #mouse-glow {
      position: fixed;
      width: 36px;
      height: 36px;
      border: 4px solid rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 10000;
      mix-blend-mode: normal;
      }
    `;
    document.head.appendChild(style);

    // Create mouse glow when mouse in center
    const glow = document.createElement("div");
    glow.id = "mouse-glow";
    document.body.appendChild(glow);

    document.addEventListener("mousemove", (e) => {
      glow.style.left = `${e.clientX - 18}px`;
      glow.style.top = `${e.clientY - 18}px`;
    });

    center.addEventListener("mouseenter", () => {
      glow.style.opacity = "1";
    });

    center.addEventListener("mouseleave", () => {
      glow.style.opacity = "0";
    });

    // Make drag zones glow when hovered
    top.classList.add("glowElement");
    bottom.classList.add("glowElement");
    left.classList.add("glowElement");
    right.classList.add("glowElement");

    const glowElements = document.querySelectorAll(".glowElement");

    glowElements.forEach((el) => {
      el.style.transition = "background-color 0.3s ease";

      el.addEventListener("mouseenter", () => {
      el.style.backgroundColor = "rgb(200, 200, 200)";
      });

      el.addEventListener("mouseleave", () => {
      el.style.backgroundColor = "rgb(0, 0, 0)";
      });
    });
  }
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "toggleOverlay") {
    createOverlay();
  }
});