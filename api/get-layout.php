<?php

require_once "db.php";

header("Content-Type: application/json");

$result = $conn->query(
    "SELECT id, name, layout
     FROM dashboards
     ORDER BY id ASC
     LIMIT 1"
);

if ($result && $result->num_rows > 0) {

    $row = $result->fetch_assoc();

    echo json_encode([
        "success" => true,
        "dashboard" => [
            "id" => $row["id"],
            "name" => $row["name"],
            "layout" => json_decode($row["layout"], true)
        ]
    ]);
} else {

    echo json_encode([
        "success" => false,
        "message" => "No saved dashboard found"
    ]);
}

$conn->close();
