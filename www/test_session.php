<?php
session_start();
header('Content-Type: application/json');

echo json_encode([
    'session_status' => session_status(),
    'session_id' => session_id(),
    'username' => isset($_SESSION['username']) ? $_SESSION['username'] : null,
    'all_session_data' => $_SESSION
]);
?>
