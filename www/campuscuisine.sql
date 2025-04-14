-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS campuscuisine;
USE campuscuisine;

-- Users table for authentication
CREATE TABLE IF NOT EXISTS registration (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    confirmPassword VARCHAR(255) NOT NULL,
    token VARCHAR(50) NOT NULL,
    status ENUM('active', 'inactive') DEFAULT 'inactive',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Blocks table to store campus blocks
CREATE TABLE IF NOT EXISTS blocks (
    block_id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    food_courts_count INT DEFAULT 0,
    capacity VARCHAR(50),
    gradient_class VARCHAR(50),
    icon VARCHAR(50)
);

-- Food Courts table
CREATE TABLE IF NOT EXISTS food_courts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    block_id VARCHAR(50),
    name VARCHAR(100) NOT NULL,
    speciality VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (block_id) REFERENCES blocks(block_id) ON DELETE CASCADE
);

-- Food Court Cuisines (Many-to-Many relationship)
CREATE TABLE IF NOT EXISTS cuisines (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS food_court_cuisines (
    food_court_id INT,
    cuisine_id INT,
    PRIMARY KEY (food_court_id, cuisine_id),
    FOREIGN KEY (food_court_id) REFERENCES food_courts(id) ON DELETE CASCADE,
    FOREIGN KEY (cuisine_id) REFERENCES cuisines(id) ON DELETE CASCADE
);

-- Dishes table
CREATE TABLE IF NOT EXISTS dishes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    food_court_id INT,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    category VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (food_court_id) REFERENCES food_courts(id) ON DELETE CASCADE
);

-- Reviews and Ratings table
CREATE TABLE IF NOT EXISTS reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    dish_id INT,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES registration(id) ON DELETE CASCADE,
    FOREIGN KEY (dish_id) REFERENCES dishes(id) ON DELETE CASCADE
);

-- Insert sample cuisines
INSERT INTO cuisines (name) VALUES 
('South Indian'),
('Chinese');

-- Insert sample blocks
INSERT INTO blocks (block_id, name, description, food_courts_count, capacity, gradient_class, icon) VALUES
('block34', 'Block 34', 'Main Academic Area', 5, 'High Capacity', 'gradient-purple-blue', 'ri-building-2-line'),
('block32', 'Block 32', 'Engineering Complex', 5, 'Medium Capacity', 'gradient-blue-cyan', 'ri-building-4-line'),
('uniMall', 'Uni Mall', 'Shopping Complex', 5, 'Very High Capacity', 'gradient-indigo-purple', 'ri-store-2-line'),
('block38', 'Block 38', 'Design Block', 5, 'Medium Capacity', 'gradient-pink-rose', 'ri-paint-brush-line'),
('cseBlock', 'CSE Block', 'Computer Science', 5, 'High Capacity', 'gradient-cyan-blue', 'ri-computer-line');

-- Create view for average dish ratings
CREATE OR REPLACE VIEW dish_ratings AS
SELECT 
    d.id AS dish_id,
    d.name AS dish_name,
    d.food_court_id,
    COALESCE(AVG(r.rating), 0) AS average_rating,
    COUNT(r.id) AS review_count
FROM dishes d
LEFT JOIN reviews r ON d.id = r.dish_id
GROUP BY d.id;

-- Create view for food court summary
CREATE OR REPLACE VIEW food_court_summary AS
SELECT 
    fc.id AS food_court_id,
    fc.name AS food_court_name,
    fc.block_id,
    COUNT(DISTINCT d.id) AS total_dishes,
    GROUP_CONCAT(DISTINCT c.name) AS cuisines,
    COALESCE(AVG(r.rating), 0) AS average_rating,
    COUNT(DISTINCT r.id) AS total_reviews
FROM food_courts fc
LEFT JOIN dishes d ON fc.id = d.food_court_id
LEFT JOIN food_court_cuisines fcc ON fc.id = fcc.food_court_id
LEFT JOIN cuisines c ON fcc.cuisine_id = c.id
LEFT JOIN reviews r ON d.id = r.dish_id
GROUP BY fc.id;

-- Trigger to update food courts count in blocks
DELIMITER //
CREATE TRIGGER update_food_courts_count_insert
AFTER INSERT ON food_courts
FOR EACH ROW
BEGIN
    UPDATE blocks 
    SET food_courts_count = (
        SELECT COUNT(*) 
        FROM food_courts 
        WHERE block_id = NEW.block_id
    )
    WHERE block_id = NEW.block_id;
END//

CREATE TRIGGER update_food_courts_count_delete
AFTER DELETE ON food_courts
FOR EACH ROW
BEGIN
    UPDATE blocks 
    SET food_courts_count = (
        SELECT COUNT(*) 
        FROM food_courts 
        WHERE block_id = OLD.block_id
    )
    WHERE block_id = OLD.block_id;
END//
DELIMITER ;
