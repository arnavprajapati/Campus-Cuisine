<?php
include 'connection.php';
header('Content-Type: application/json');

$query = "SELECT b.*, 
          COUNT(DISTINCT fc.id) as actual_food_courts,
          COUNT(DISTINCT d.id) as total_dishes,
          COALESCE(AVG(r.rating), 0) as average_rating
          FROM blocks b
          LEFT JOIN food_courts fc ON b.block_id = fc.block_id
          LEFT JOIN dishes d ON fc.id = d.food_court_id
          LEFT JOIN reviews r ON d.id = r.dish_id
          GROUP BY b.block_id";

$result = $con->query($query);

if ($result) {
    $blocks = [];
    while ($row = $result->fetch_assoc()) {
        $blocks[] = [
            'id' => $row['block_id'],
            'name' => $row['name'],
            'description' => $row['description'],
            'foodCourtsCount' => $row['actual_food_courts'],
            'capacity' => $row['capacity'],
            'gradientClass' => $row['gradient_class'],
            'icon' => $row['icon'],
            'totalDishes' => $row['total_dishes'],
            'rating' => round($row['average_rating'], 1)
        ];
    }
    echo json_encode(['status' => 'success', 'blocks' => $blocks]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Error fetching blocks']);
}
?>
