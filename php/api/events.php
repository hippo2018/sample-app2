<?php

declare(strict_types=1);

require_once __DIR__ . '/../config.php';


$db->exec(
    "
    CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        date TEXT NOT NULL,
        description TEXT NOT NULL DEFAULT '',
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
    "
);


$method = $_SERVER['REQUEST_METHOD'];


// GET
if ($method === 'GET') {

    $stmt = $db->query(
        "
        SELECT
            id,
            title,
            date,
            description
        FROM events
        ORDER BY date ASC, id ASC
        "
    );

    $events = $stmt->fetchAll();

    echo json_encode(
        $events,
        JSON_UNESCAPED_UNICODE
    );

    exit;
}


// POST
if ($method === 'POST') {

    $input = json_decode(
        file_get_contents('php://input'),
        true
    );

    $title = trim(
        $input['title'] ?? ''
    );

    $date = trim(
        $input['date'] ?? ''
    );

    $description = trim(
        $input['description'] ?? ''
    );


    if ($title === '') {

        http_response_code(400);

        echo json_encode([
            'message' => 'タイトルを入力してください'
        ], JSON_UNESCAPED_UNICODE);

        exit;
    }


    if ($date === '') {

        http_response_code(400);

        echo json_encode([
            'message' => '日付を入力してください'
        ], JSON_UNESCAPED_UNICODE);

        exit;
    }


    $stmt = $db->prepare(
        "
        INSERT INTO events
        (
            title,
            date,
            description
        )
        VALUES
        (
            :title,
            :date,
            :description
        )
        "
    );


    $stmt->execute([
        ':title' => $title,
        ':date' => $date,
        ':description' => $description,
    ]);


    $id = (int)$db->lastInsertId();


    $stmt = $db->prepare(
        "
        SELECT
            id,
            title,
            date,
            description
        FROM events
        WHERE id = :id
        "
    );


    $stmt->execute([
        ':id' => $id
    ]);


    $event = $stmt->fetch();


    http_response_code(201);

    echo json_encode(
        $event,
        JSON_UNESCAPED_UNICODE
    );

    exit;
}


// DELETE
if ($method === 'DELETE') {

    $id = (int)(
        $_GET['id'] ?? 0
    );


    if ($id <= 0) {

        http_response_code(400);

        echo json_encode([
            'message' => 'IDが不正です'
        ], JSON_UNESCAPED_UNICODE);

        exit;
    }


    $stmt = $db->prepare(
        "
        DELETE FROM events
        WHERE id = :id
        "
    );


    $stmt->execute([
        ':id' => $id
    ]);


    echo json_encode([
        'message' => '削除しました'
    ], JSON_UNESCAPED_UNICODE);

    exit;
}


// 未対応
http_response_code(405);

echo json_encode([
    'message' => 'Method Not Allowed'
], JSON_UNESCAPED_UNICODE);
