<?php
session_start();
include 'connection.php';

header('Content-Type: application/json');

// Debug log
error_log("Review submission started");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    error_log("Raw input: " . $input);
    $data = json_decode($input, true);
    error_log("Decoded data: " . print_r($data, true));
    
    if (!isset($_SESSION['username'])) {
        error_log("Error: User not logged in");
        echo json_encode(['status' => 'error', 'message' => 'User not logged in']);
        exit;
    }

    error_log("Session username: " . $_SESSION['username']);

    // Get user ID from username
    $username = $_SESSION['username'];
    $user_query = "SELECT id FROM registration WHERE username = ?";
    $stmt = $con->prepare($user_query);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if (!$user) {
        error_log("Error: User not found in database");
        echo json_encode(['status' => 'error', 'message' => 'User not found']);
        exit;
    }

    $user_id = $user['id'];
    $dish_id = $data['dishId'];
    $rating = $data['rating'];
    $review_text = $data['reviewText'];

    error_log("Processing review - User ID: $user_id, Dish ID: $dish_id, Rating: $rating");

    // Check if user has already reviewed this dish
    $check_query = "SELECT id FROM reviews WHERE user_id = ? AND dish_id = ?";
    $stmt = $con->prepare($check_query);
    $stmt->bind_param("ii", $user_id, $dish_id);
    $stmt->execute();
    $existing = $stmt->get_result()->fetch_assoc();

    if ($existing) {
        // Update existing review
        $update_query = "UPDATE reviews SET rating = ?, review_text = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ? AND dish_id = ?";
        $stmt = $con->prepare($update_query);
        $stmt->bind_param("isii", $rating, $review_text, $user_id, $dish_id);
        
        if ($stmt->execute()) {
            error_log("Review updated successfully");
            echo json_encode(['status' => 'success', 'message' => 'Review updated successfully']);
        } else {
            error_log("Error updating review: " . $stmt->error);
            echo json_encode(['status' => 'error', 'message' => 'Error updating review: ' . $stmt->error]);
        }
    } else {
        // Insert new review
        $insert_query = "INSERT INTO reviews (user_id, dish_id, rating, review_text) VALUES (?, ?, ?, ?)";
        $stmt = $con->prepare($insert_query);
        $stmt->bind_param("iiis", $user_id, $dish_id, $rating, $review_text);
        
        if ($stmt->execute()) {
            error_log("New review added successfully");
            echo json_encode(['status' => 'success', 'message' => 'Review added successfully']);
        } else {
            error_log("Error adding review: " . $stmt->error);
            echo json_encode(['status' => 'error', 'message' => 'Error adding review: ' . $stmt->error]);
        }
    }
} else {
    error_log("Invalid request method: " . $_SERVER['REQUEST_METHOD']);
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
?>
