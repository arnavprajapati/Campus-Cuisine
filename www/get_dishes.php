<?php
include 'connection.php';
header('Content-Type: application/json');

if (isset($_GET['foodCourtId'])) {
    $food_court_id = $_GET['foodCourtId'];
    
    $query = "SELECT d.*, 
            COALESCE(AVG(r.rating), 0) as average_rating,
            COUNT(DISTINCT r.id) as review_count
            FROM dishes d
            LEFT JOIN reviews r ON d.id = r.dish_id
            WHERE d.food_court_id = ?
            GROUP BY d.id";
              
    $stmt = $con->prepare($query);
    $stmt->bind_param("i", $food_court_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $dishes = [];
    while ($row = $result->fetch_assoc()) {
        // Get reviews for this dish
        $review_query = "SELECT r.*, u.username, DATE_FORMAT(r.created_at, '%Y-%m-%d %H:%i') as formatted_date 
                        FROM reviews r 
                        JOIN registration u ON r.user_id = u.id 
                        WHERE r.dish_id = ?
                        ORDER BY r.created_at DESC";
        $review_stmt = $con->prepare($review_query);
        $review_stmt->bind_param("i", $row['id']);
        $review_stmt->execute();
        $review_result = $review_stmt->get_result();
        
        $reviews = [];
        while ($review = $review_result->fetch_assoc()) {
            $reviews[] = [
                'id' => $review['id'],
                'username' => $review['username'],
                'rating' => $review['rating'],
                'review_text' => $review['review_text'],
                'date' => $review['formatted_date']
            ];
        }
        
        $dishes[] = [
            'id' => $row['id'],
            'name' => $row['name'],
            'price' => $row['price'],
            'description' => $row['description'],
            'image' => $row['image_url'],
            'category' => $row['category'],
            'rating' => round($row['average_rating'], 1),
            'reviewCount' => $row['review_count'],
            'reviews' => $reviews
        ];
    }
    
    echo json_encode(['status' => 'success', 'dishes' => $dishes]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Food Court ID not provided']);
}
?>
