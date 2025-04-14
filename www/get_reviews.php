<?php
include 'connection.php';
header('Content-Type: application/json');

if (isset($_GET['dishId'])) {
    $dish_id = $_GET['dishId'];

    $query = "SELECT r.*, u.username, DATE_FORMAT(r.created_at, '%Y-%m-%d %H:%i:%s') as formatted_date 
            FROM reviews r 
            JOIN registration u ON r.user_id = u.id 
            WHERE r.dish_id = ? 
            ORDER BY r.created_at DESC";
    $stmt = $con->prepare($query);
    $stmt->bind_param("i", $dish_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $reviews = [];
    while ($row = $result->fetch_assoc()) {
        $reviews[] = [
            'id' => $row['id'],
            'username' => $row['username'],
            'rating' => $row['rating'],
            'review_text' => $row['review_text'],
            'date' => $row['formatted_date']
        ];
    }

    echo json_encode(['status' => 'success', 'reviews' => $reviews]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Dish ID not provided']);
}