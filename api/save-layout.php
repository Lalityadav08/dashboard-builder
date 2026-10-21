<?php

require_once "db.php";

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data["layout"])) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid layout data"
    ]);
    exit;
}

$name = $data["name"] ?? "My Dashboard";
$layout = json_encode($data["layout"]);

// Check if dashboard already exists
$result = $conn->query("SELECT id FROM dashboards ORDER BY id ASC LIMIT 1");

if ($result && $result->num_rows > 0) {

    $row = $result->fetch_assoc();
    $id = $row["id"];

    // Update existing dashboard
    $stmt = $conn->prepare(
        "UPDATE dashboards SET name = ?, layout = ? WHERE id = ?"
    );

    $stmt->bind_param("ssi", $name, $layout, $id);

    if ($stmt->execute()) {

        echo json_encode([
            "success" => true,
            "message" => "Dashboard updated successfully",
            "id" => $id
        ]);
    } else {

        echo json_encode([
            "success" => false,
            "message" => "Failed to update dashboard"
        ]);
    }

    $stmt->close();
} else {

    // Create dashboard if none exists
    $stmt = $conn->prepare(
        "INSERT INTO dashboards (name, layout) VALUES (?, ?)"
    );

    $stmt->bind_param("ss", $name, $layout);

    if ($stmt->execute()) {

        echo json_encode([
            "success" => true,
            "message" => "Dashboard created successfully",
            "id" => $stmt->insert_id
        ]);
    } else {

        echo json_encode([
            "success" => false,
            "message" => "Failed to create dashboard"
        ]);
    }

    $stmt->close();
}

$conn->close();
