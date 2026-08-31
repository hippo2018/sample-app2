<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

header(
    'Access-Control-Allow-Origin: http://localhost:5173'
);

header(
    'Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS'
);

header(
    'Access-Control-Allow-Headers: Content-Type'
);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}


$dbDir = __DIR__ . '/data';

if (!is_dir($dbDir)) {
    mkdir($dbDir, 0777, true);
}


$db = new PDO(
    'sqlite:' . $dbDir . '/database.sqlite'
);

$db->setAttribute(
    PDO::ATTR_ERRMODE,
    PDO::ERRMODE_EXCEPTION
);

$db->setAttribute(
    PDO::ATTR_DEFAULT_FETCH_MODE,
    PDO::FETCH_ASSOC
);
