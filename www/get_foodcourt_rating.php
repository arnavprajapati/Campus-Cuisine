<?php
require_once 'connection.php';

header('Content-Type: application/json');

if (!isset($_GET['foodCourtId'])) {
    echo json_encode(['status' => 'error', 'message' => 'Food Court ID is required']);
    exit;
}

$foodCourtId = $_GET['foodCourtId'];

try {
    // First get all dishes for this food court
    $dishStmt = $con->prepare("
        SELECT id FROM dishes WHERE food_court_id = ?
    ");

    if (!$dishStmt) {
        throw new Exception("Prepare failed for dishes: " . $con->error);
    }

    $dishStmt->bind_param("i", $foodCourtId);

    if (!$dishStmt->execute()) {
        throw new Exception("Execute failed for dishes: " . $dishStmt->error);
    }

    $dishResult = $dishStmt->get_result();
    $dishIds = [];
    while ($row = $dishResult->fetch_assoc()) {
        $dishIds[] = $row['id'];
    }

    if (empty($dishIds)) {
        echo json_encode([
            'status' => 'success',
            'rating' => 0.0,
            'reviewCount' => 0,
            'totalDishes' => 0,
            'dishesWithReviews' => 0
        ]);
        exit;
    }

    // Now get reviews for all these dishes
    $placeholders = str_repeat('?,', count($dishIds) - 1) . '?';
    $query = "
        SELECT 
            COUNT(*) as total_reviews,
            ROUND(AVG(rating), 1) as average_rating,
            COUNT(DISTINCT dish_id) as dishes_with_reviews
        FROM reviews 
        WHERE dish_id IN ($placeholders) AND rating > 0
    ";

    $stmt = $con->prepare($query);

    if (!$stmt) {
        throw new Exception("Prepare failed for reviews: " . $con->error);
    }

    $types = str_repeat('i', count($dishIds));
    $stmt->bind_param($types, ...$dishIds);

    if (!$stmt->execute()) {
        throw new Exception("Execute failed for reviews: " . $stmt->error);
    }

    $result = $stmt->get_result();
    $data = $result->fetch_assoc();

    echo json_encode([
        'status' => 'success',
        'rating' => (float)($data['average_rating'] ?? 0),
        'reviewCount' => (int)$data['total_reviews'],
        'totalDishes' => count($dishIds),
        'dishesWithReviews' => (int)$data['dishes_with_reviews']
    ]);
} catch (Exception $e) {
    error_log("Database error in get_foodcourt_rating.php: " . $e->getMessage());
    echo json_encode([
        'status' => 'error',
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}

if (isset($dishStmt)) {
    $dishStmt->close();
}
if (isset($stmt)) {
    $stmt->close();
}
$con->close();