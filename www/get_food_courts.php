<?php
include 'connection.php';
header('Content-Type: application/json');

if (isset($_GET['blockId'])) {
    $block_id = $_GET['blockId'];
    
    $query = "SELECT fc.*, 
            GROUP_CONCAT(DISTINCT c.name) as cuisines,
            COALESCE(AVG(r.rating), 0) as average_rating,
            COUNT(DISTINCT r.id) as review_count
            FROM food_courts fc
            LEFT JOIN food_court_cuisines fcc ON fc.id = fcc.food_court_id
            LEFT JOIN cuisines c ON fcc.cuisine_id = c.id
            LEFT JOIN dishes d ON fc.id = d.food_court_id
            LEFT JOIN reviews r ON d.id = r.dish_id
            WHERE fc.block_id = ?
            GROUP BY fc.id";
            
    $stmt = $con->prepare($query);
    $stmt->bind_param("s", $block_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $foodCourts = [];
    while ($row = $result->fetch_assoc()) {
        $foodCourts[] = [
            'id' => $row['id'],
            'name' => $row['name'],
            'image' => $row['image_url'],
            'cuisines' => explode(',', $row['cuisines']),
            'speciality' => $row['speciality'],
            'rating' => round($row['average_rating'], 1),
            'reviewCount' => $row['review_count']
        ];
    }
    
    echo json_encode(['status' => 'success', 'foodCourts' => $foodCourts]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Block ID not provided']);
}
?>
