<?php
require_once 'connection.php';

header('Content-Type: application/json');

try {
    // Join all three tables to get complete data
    $query = "
        SELECT 
            fc.id as food_court_id,
            fc.name as food_court_name,
            d.id as dish_id,
            d.name as dish_name,
            COUNT(r.id) as dish_review_count,
            COALESCE(ROUND(AVG(r.rating), 1), 0) as dish_avg_rating
        FROM food_courts fc
        LEFT JOIN dishes d ON fc.id = d.food_court_id
        LEFT JOIN reviews r ON d.id = r.dish_id
        GROUP BY fc.id, d.id, fc.name, d.name
    ";

    $result = $con->query($query);

    if (!$result) {
        throw new Exception("Query failed: " . $con->error);
    }

    $ratings = [];
    while ($row = $result->fetch_assoc()) {
        $foodCourtId = $row['food_court_id'];

        if (!isset($ratings[$foodCourtId])) {
            $ratings[$foodCourtId] = [
                'rating' => 0,
                'reviewCount' => 0,
                'totalDishes' => 0,
                'dishesWithReviews' => 0,
                'dishes' => []
            ];
        }

        // Only count if there's a valid dish
        if ($row['dish_id']) {
            $ratings[$foodCourtId]['totalDishes']++;

            // Add dish review data
            $reviewCount = (int)$row['dish_review_count'];
            $avgRating = (float)$row['dish_avg_rating'];

            $ratings[$foodCourtId]['reviewCount'] += $reviewCount;

            if ($reviewCount > 0) {
                $ratings[$foodCourtId]['dishesWithReviews']++;
                // Add to running total for average calculation
                $ratings[$foodCourtId]['rating'] = round(
                    ($ratings[$foodCourtId]['rating'] * ($ratings[$foodCourtId]['dishesWithReviews'] - 1) + $avgRating) /
                        $ratings[$foodCourtId]['dishesWithReviews'],
                    1
                );
            }
        }
    }

    echo json_encode([
        'status' => 'success',
        'ratings' => $ratings
    ]);
} catch (Exception $e) {
    error_log("Database error in get_foodcourts_ratings.php: " . $e->getMessage());
    echo json_encode([
        'status' => 'error',
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}

$con->close();
