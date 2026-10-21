const canvas = new fabric.Canvas("dashboardCanvas", {
  width: 1000,
  height: 700,
  backgroundColor: "#ffffff",
});

canvas.selectionColor = "rgba(99, 102, 241, 0.08)";
canvas.selectionBorderColor = "#6366f1";
canvas.selectionLineWidth = 2;

canvas.set({
  uniformScaling: false,
});

fabric.Object.prototype.set({
  transparentCorners: false,
  cornerColor: "#ffffff",
  cornerStrokeColor: "#6366f1",
  borderColor: "#6366f1",
  cornerSize: 10,
  padding: 5,
  borderScaleFactor: 1.5,
});

let lastCanvasWidth = 0;

function resizeCanvas() {
  const container = document.querySelector(".canvas-workspace");
  if (!container) return;

  const availableWidth = container.clientWidth;

  if (!availableWidth) return;

  const originalWidth = 1000;
  const originalHeight = 700;

  const scale = availableWidth / originalWidth;

  canvas.setDimensions({
    width: availableWidth,
    height: originalHeight * scale,
  });

  // Scale all Fabric objects with the canvas
  canvas.setViewportTransform([scale, 0, 0, scale, 0, 0]);

  canvas.calcOffset();
  canvas.renderAll();

  lastCanvasWidth = availableWidth;
}

window.addEventListener("resize", resizeCanvas);

const canvasWorkspaceEl = document.querySelector(".canvas-workspace");

if (canvasWorkspaceEl && "ResizeObserver" in window) {
  const canvasResizeObserver = new ResizeObserver(() => {
    if (canvasWorkspaceEl.clientWidth !== lastCanvasWidth) {
      resizeCanvas();
    }
  });

  canvasResizeObserver.observe(canvasWorkspaceEl);
}

setTimeout(() => {
  resizeCanvas();
}, 100);

const addTextBtn = document.getElementById("addText");
if (addTextBtn) {
  addTextBtn.addEventListener("click", () => {
    const text = new fabric.IText("Double click to edit", {
      left: 100,
      top: 100,
      fontSize: 24,
      fill: "#222222",
    });

    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
  });
}

// SAVE DASHBOARD

const saveDashboardBtn = document.getElementById("saveDashboard");
if (saveDashboardBtn) {
  saveDashboardBtn.addEventListener("click", async () => {
    const layout = canvas.toJSON();

    try {
      const response = await fetch("api/save-layout.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "My Dashboard",
          layout: layout,
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert("Dashboard saved successfully!");
        console.log("Saved dashboard ID:", result.id);
      } else {
        alert("Failed to save dashboard.");
        console.error(result.message);
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("Something went wrong while saving.");
    }
  });
}

// ADD IMAGE

const addImageBtn = document.getElementById("addImage");
const imageInput = document.getElementById("imageInput");

if (addImageBtn && imageInput) {
  addImageBtn.addEventListener("click", () => {
    imageInput.click();
  });

  imageInput.addEventListener("change", (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {
      fabric.Image.fromURL(e.target.result, function (img) {
        img.set({
          left: 150,
          top: 150,
          scaleX: 0.4,
          scaleY: 0.4,
        });

        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
      });
    };

    reader.readAsDataURL(file);
  });
}

// BAR CHART

const addBarChartBtn = document.getElementById("addBarChart");
if (addBarChartBtn) {
  addBarChartBtn.addEventListener("click", () => {
    addChart("bar");
  });
}

// LINE CHART

const addLineChartBtn = document.getElementById("addLineChart");
if (addLineChartBtn) {
  addLineChartBtn.addEventListener("click", () => {
    addChart("line");
  });
}

// CREATE CHART

function addChart(type) {
  const chartCanvas = document.createElement("canvas");

  chartCanvas.width = 400;
  chartCanvas.height = 250;

  const chartColor = "#6366f1";

  new Chart(chartCanvas.getContext("2d"), {
    type: type,

    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],

      datasets: [
        {
          label: "Sales",
          data: [12, 19, 8, 15, 22, 17],

          borderWidth: 2,

          backgroundColor: chartColor,

          borderColor: chartColor,
        },
      ],
    },

    options: {
      responsive: false,
      animation: false,
    },
  });

  setTimeout(() => {
    const chartImage = chartCanvas.toDataURL("image/png");

    fabric.Image.fromURL(chartImage, function (img) {
      img.set({
        left: 200,
        top: 150,
        scaleX: 0.8,
        scaleY: 0.8,
      });

      canvas.add(img);
      canvas.setActiveObject(img);
      canvas.renderAll();
    });
  }, 100);
}

// TEXT FORMATTING - BOLD

const boldBtn = document.getElementById("boldBtn");
if (boldBtn) {
  boldBtn.addEventListener("click", () => {
    const activeObject = canvas.getActiveObject();

    if (!activeObject || activeObject.type !== "i-text") {
      alert("Please select a text element first.");
      return;
    }

    activeObject.set(
      "fontWeight",
      activeObject.fontWeight === "bold" ? "normal" : "bold",
    );

    canvas.renderAll();
  });
}

// TEXT FORMATTING - ITALIC

const italicBtn = document.getElementById("italicBtn");
if (italicBtn) {
  italicBtn.addEventListener("click", () => {
    const activeObject = canvas.getActiveObject();

    if (!activeObject || activeObject.type !== "i-text") {
      alert("Please select a text element first.");
      return;
    }

    activeObject.set(
      "fontStyle",
      activeObject.fontStyle === "italic" ? "normal" : "italic",
    );

    canvas.renderAll();
  });
}

// FONT SIZE

const fontSizeSelect = document.getElementById("fontSizeSelect");
if (fontSizeSelect) {
  fontSizeSelect.addEventListener("change", (event) => {
    const activeObject = canvas.getActiveObject();

    if (!activeObject || activeObject.type !== "i-text") {
      alert("Please select a text element first.");
      return;
    }

    activeObject.set("fontSize", parseInt(event.target.value));

    canvas.renderAll();
  });
}


// LOAD SAVED DASHBOARD

async function loadDashboard() {
  try {
    const response = await fetch("api/get-layout.php");
    const result = await response.json();

    if (!result.success) {
      canvas.clear();
      canvas.backgroundColor = "#ffffff";
      canvas.renderAll();
      resizeCanvas();

      console.log("No saved dashboard found. Blank canvas ready.");
      return;
    }

    const savedLayout = result.dashboard.layout;

    canvas.loadFromJSON(savedLayout, function () {
      canvas.renderAll();
      resizeCanvas();

      console.log("Dashboard loaded successfully.");
    });
  } catch (error) {
    console.error("Load error:", error);
  }
}

// Load dashboard when page opens
loadDashboard();

// DELETE SELECTED ELEMENT

const deleteElementBtn = document.getElementById("deleteElement");
if (deleteElementBtn) {
  deleteElementBtn.addEventListener("click", () => {
    const activeObject = canvas.getActiveObject();

    if (!activeObject) {
      alert("Please select an element first.");
      return;
    }

    canvas.remove(activeObject);
    canvas.discardActiveObject();
    canvas.renderAll();
  });
}

// KEYBOARD DELETE

document.addEventListener("keydown", function (event) {
  const activeObject = canvas.getActiveObject();

  if (!activeObject) {
    return;
  }

  // Don't delete while editing text
  if (activeObject.isEditing) {
    return;
  }

  if (event.key === "Delete" || event.key === "Backspace") {
    event.preventDefault();
    event.stopPropagation();

    canvas.remove(activeObject);
    canvas.discardActiveObject();
    canvas.requestRenderAll();
  }
});

