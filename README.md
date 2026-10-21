# Dashboard Builder

A dynamic dashboard builder web application built using PHP, MySQL, JavaScript, Fabric.js, and Chart.js.

## Features

- Add text elements
- Edit text directly on the canvas
- Bold and italic text formatting
- Change text font size
- Upload and place images
- Add dynamic bar charts
- Add dynamic line charts
- Drag and move elements
- Resize elements
- Delete selected elements
- Delete elements using Delete/Backspace keys
- Save dashboard layout to MySQL
- Load saved dashboard layout after page refresh
- Responsive dashboard canvas

## Technologies Used

- HTML5
- CSS3
- JavaScript
- PHP
- MySQL
- Fabric.js
- Chart.js
- XAMPP

## Project Structure

```text
dashboard-builder/
│
├── index.php
├── css/
│   └── style.css
├── js/
│   └── app.js
├── api/
│   ├── db.php
│   ├── save-layout.php
│   └── get-layout.php
├── database/
│   └── schema.sql
└── README.md
```

## Requirements

- XAMPP
- Apache
- MySQL
- Modern web browser

## Setup Instructions

### 1. Install XAMPP

Install XAMPP and start:

- Apache
- MySQL

### 2. Project Location

Place the project inside the XAMPP `htdocs` folder:

```text
C:\xampp\htdocs\dashboard-builder
```

### 3. Create Database

Open:

```text
http://localhost/phpmyadmin
```

Create a database named:

```text
dashboard_builder
```

Import or run:

```text
database/schema.sql
```

### 4. Database Configuration

Open:

```text
api/db.php
```

Make sure the database configuration matches the local MySQL setup.

Default XAMPP configuration:

```php
$host = "localhost";
$dbname = "dashboard_builder";
$username = "root";
$password = "";
```

### 5. Run the Application

Open:

```text
http://localhost/dashboard-builder/
```

## How to Use

1. Click **Add Text** to add a text element.
2. Double-click the text to edit it.
3. Select a text element and use **Bold**, **Italic**, or font-size controls.
4. Click **Add Image** to upload an image.
5. Click **Bar Chart** or **Line Chart** to add a chart.
6. Drag elements to reposition them.
7. Use the resize handles to resize elements.
8. Select an element and click **Delete Selected** or press **Delete/Backspace**.
9. Click **Save Dashboard** to save the current layout.
10. Refresh the page to load the saved dashboard.

## API Endpoints

### Save Dashboard

```text
POST /api/save-layout.php
```

Saves the dashboard name and layout configuration to MySQL.

### Get Dashboard

```text
GET /api/get-layout.php
```

Retrieves the saved dashboard layout from MySQL.

## Data Storage

Dashboard layout information is stored in the MySQL `dashboards` table.

The layout is stored as JSON containing information about the dashboard elements, including their positions, dimensions, and content.

## Notes

This project is a working prototype of a dynamic dashboard builder. Charts use dummy data for demonstration purposes.
