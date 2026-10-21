<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Dashboard Builder</title>

    <link rel="stylesheet" href="css/style.css">
</head>

<body>

    <div class="app">

        <!-- SIDEBAR -->
        <aside class="sidebar">

            <div class="brand">
                <div class="brand-icon">✦</div>

                <div>
                    <h2>Dashboard</h2>
                    <span>Builder</span>
                </div>
            </div>


            <div class="sidebar-section">

                <div class="section-title">
                    ELEMENTS
                </div>

                <button class="tool-btn" id="addText">
                    <span class="tool-icon">T</span>
                    <span>
                        <strong>Text</strong>
                        <small>Add text element</small>
                    </span>
                </button>


                <button class="tool-btn" id="addImage">
                    <span class="tool-icon">▧</span>
                    <span>
                        <strong>Image</strong>
                        <small>Upload an image</small>
                    </span>
                </button>


                <button class="tool-btn" id="addBarChart">
                    <span class="tool-icon">▥</span>
                    <span>
                        <strong>Bar Chart</strong>
                        <small>Add data visualization</small>
                    </span>
                </button>


                <button class="tool-btn" id="addLineChart">
                    <span class="tool-icon">⌁</span>
                    <span>
                        <strong>Line Chart</strong>
                        <small>Add data visualization</small>
                    </span>
                </button>

            </div>


            <!-- TEXT STYLE -->
            <div class="sidebar-section">

                <div class="section-title">
                    TEXT STYLE
                </div>

                <div class="text-controls">

                    <button class="format-btn" id="boldBtn" title="Bold">
                        <b>B</b>
                    </button>

                    <button class="format-btn" id="italicBtn" title="Italic">
                        <i>I</i>
                    </button>

                    <select id="fontSizeSelect" title="Font size">
                        <option value="16">16 px</option>
                        <option value="20">20 px</option>
                        <option value="24" selected>24 px</option>
                        <option value="30">30 px</option>
                        <option value="36">36 px</option>
                        <option value="48">48 px</option>
                    </select>

                </div>

            </div>

            <div class="sidebar-bottom">

                <div class="tip-box">
                    <div class="tip-icon">✦</div>

                    <div>
                        <strong>Quick tip</strong>
                        <p>Drag, resize and arrange elements freely on the canvas.</p>
                    </div>
                </div>

            </div>

        </aside>


        <!-- MAIN -->
        <main class="main">

            <!-- TOPBAR -->
            <header class="topbar">

                <div class="page-title">

                    <div class="title-icon">
                        ◈
                    </div>

                    <div>
                        <h3>My Dashboard</h3>
                        <span>Design your dashboard</span>
                    </div>

                </div>


                <div class="topbar-actions">

                    <button class="delete-btn" id="deleteElement">
                        <span>⌫</span>
                        Delete
                    </button>

                    <button class="save-btn" id="saveDashboard">
                        <span>✓</span>
                        Save Dashboard
                    </button>

                </div>

            </header>


            <!-- CANVAS AREA -->
            <section class="canvas-area">

                <div class="workspace">

                    <div class="workspace-label">
                        <span class="status-dot"></span>
                        Canvas
                    </div>


                    <div class="canvas-workspace">

                        <canvas id="dashboardCanvas"></canvas>

                        <input
                            type="file"
                            id="imageInput"
                            accept="image/*"
                            hidden>

                    </div>

                </div>

            </section>

        </main>

    </div>


    <script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

    <script src="js/app.js"></script>

</body>

</html>