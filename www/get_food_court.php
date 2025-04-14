<?php
include 'connection.php';
header('Content-Type: application/json');

if (isset($_GET['foodCourtId'])) {
    $food_court_id = $_GET['foodCourtId'];

    $query = "SELECT fc.*, 
              GROUP_CONCAT(DISTINCT c.name) as cuisines,
              COALESCE(AVG(r.rating), 0) as average_rating,
              COUNT(DISTINCT r.id) as review_count
              FROM food_courts fc
              LEFT JOIN food_court_cuisines fcc ON fc.id = fcc.food_court_id
              LEFT JOIN cuisines c ON fcc.cuisine_id = c.id
              LEFT JOIN dishes d ON fc.id = d.food_court_id
              LEFT JOIN reviews r ON d.id = r.dish_id
              WHERE fc.id = ?
              GROUP BY fc.id";

    $stmt = $con->prepare($query);
    $stmt->bind_param("i", $food_court_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        $foodCourt = [
            'id' => $row['id'],
            'name' => $row['name'],
            'image' => $row['image_url'],
            'cuisines' => explode(',', $row['cuisines']),
            'speciality' => $row['speciality'],
            'rating' => round($row['average_rating'], 1),
            'reviewCount' => $row['review_count']
        ];

        echo json_encode(['status' => 'success', 'foodCourt' => $foodCourt]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Food court not found']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Food Court ID not provided']);
}
