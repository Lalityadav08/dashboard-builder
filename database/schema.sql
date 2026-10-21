CREATE DATABASE IF NOT EXISTS dashboard_builder;

USE dashboard_builder;

CREATE TABLE IF NOT EXISTS dashboards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    layout LONGTEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Sample dashboard
INSERT INTO
    dashboards (name, layout)
VALUES
    (
        'Sample Dashboard',
        '{
        "version": "5.3.1",
        "objects": []
    }'
    );