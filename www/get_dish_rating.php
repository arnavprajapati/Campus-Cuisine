<?php
require_once 'connection.php';

header('Content-Type: application/json');

if (!isset($_GET['dishId'])) {
    echo json_encode(['status' => 'error', 'message' => 'Dish ID is required']);
    exit;
}

$dishId = $_GET['dishId'];

try {
    // Get the dish's rating and review count
    $stmt = $con->prepare("
        SELECT 
            d.id as dish_id,
            d.food_court_id,
            COALESCE(ROUND(AVG(r.rating), 1), 0) as average_rating,
            COUNT(r.id) as review_count
        FROM dishes d
        LEFT JOIN reviews r ON d.id = r.dish_id AND r.rating > 0
        WHERE d.id = ?
        GROUP BY d.id, d.food_court_id
    ");

    if (!$stmt) {
        throw new Exception("Prepare failed: " . $con->error);
    }

    $stmt->bind_param("i", $dishId);

    if (!$stmt->execute()) {
        throw new Exception("Execute failed: " . $stmt->error);
    }

    $result = $stmt->get_result();
    $data = $result->fetch_assoc();

    if ($data) {
        echo json_encode([
            'status' => 'success',
            'rating' => (float)($data['average_rating'] ?? 0),
            'reviewCount' => (int)$data['review_count'],
            'dishId' => (int)$data['dish_id'],
            'foodCourtId' => (int)$data['food_court_id']
        ]);
    } else {
        // If no dish found, return default values
        echo json_encode([
            'status' => 'success',
            'rating' => 0.0,
            'reviewCount' => 0,
            'dishId' => (int)$dishId,
            'foodCourtId' => 0
        ]);
    }
} catch (Exception $e) {
    error_log("Database error in get_dish_rating.php: " . $e->getMessage());
    echo json_encode([
        'status' => 'error',
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}

if (isset($stmt)) {
    $stmt->close();
}
$con->close();
