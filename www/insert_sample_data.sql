USE campuscuisine;

-- Insert Food Courts for Block 34
INSERT INTO food_courts (id, block_id, name, speciality) VALUES
(1, 'block34', 'Food Court A', 'Masala Dosa'),
(2, 'block34', 'Food Court B', 'Idli Sambar'),
(3, 'block34', 'Food Court C', 'Veg Fried Rice'),
(4, 'block34', 'Food Court D', 'Veg Manchurian'),
(5, 'block34', 'Food Court E', 'Spring Rolls');

-- Insert Food Courts for Block 32
INSERT INTO food_courts (id, block_id, name, speciality) VALUES
(26, 'block32', 'Food Court A', 'Masala Dosa'),
(27, 'block32', 'Food Court B', 'Idli Sambar'),
(28, 'block32', 'Food Court C', 'Veg Fried Rice'),
(29, 'block32', 'Food Court D', 'Veg Manchurian'),
(30, 'block32', 'Food Court E', 'Spring Rolls');

-- Insert Food Courts for Uni Mall
INSERT INTO food_courts (id, block_id, name, speciality) VALUES
(51, 'uniMall', 'Food Court A', 'Masala Dosa'),
(52, 'uniMall', 'Food Court B', 'Idli Sambar'),
(53, 'uniMall', 'Food Court C', 'Veg Fried Rice'),
(54, 'uniMall', 'Food Court D', 'Veg Manchurian'),
(55, 'uniMall', 'Food Court E', 'Spring Rolls');

-- Insert Food Courts for Block 38
INSERT INTO food_courts (id, block_id, name, speciality) VALUES
(76, 'block38', 'Food Court A', 'Masala Dosa'),
(77, 'block38', 'Food Court B', 'Idli Sambar'),
(78, 'block38', 'Food Court C', 'Veg Fried Rice'),
(79, 'block38', 'Food Court D', 'Veg Manchurian'),
(80, 'block38', 'Food Court E', 'Spring Rolls');

-- Insert Food Courts for CSE Block
INSERT INTO food_courts (id, block_id, name, speciality) VALUES
(101, 'cseBlock', 'Food Court A', 'Masala Dosa'),
(102, 'cseBlock', 'Food Court B', 'Idli Sambar'),
(103, 'cseBlock', 'Food Court C', 'Veg Fried Rice'),
(104, 'cseBlock', 'Food Court D', 'Veg Manchurian'),
(105, 'cseBlock', 'Food Court E', 'Spring Rolls');

-- Insert Food Court Cuisines
INSERT INTO food_court_cuisines (food_court_id, cuisine_id)
SELECT fc.id, c.id FROM food_courts fc, cuisines c 
WHERE fc.name LIKE '%Food Court A%' AND c.name = 'South Indian'
UNION ALL
SELECT fc.id, c.id FROM food_courts fc, cuisines c 
WHERE fc.name LIKE '%Food Court B%' AND c.name = 'South Indian'
UNION ALL
SELECT fc.id, c.id FROM food_courts fc, cuisines c 
WHERE fc.name LIKE '%Food Court C%' AND c.name = 'Chinese'
UNION ALL
SELECT fc.id, c.id FROM food_courts fc, cuisines c 
WHERE fc.name LIKE '%Food Court D%' AND c.name = 'Chinese'
UNION ALL
SELECT fc.id, c.id FROM food_courts fc, cuisines c 
WHERE fc.name LIKE '%Food Court E%' AND c.name = 'Chinese';

-- Insert Dishes for Block 34 Food Courts
-- Food Court A (South Indian)
INSERT INTO dishes (id, food_court_id, name, price, description, category) VALUES
(1, 1, 'Masala Dosa', 120, 'Crispy dosa with potato filling', 'South Indian'),
(2, 1, 'Idli Sambar', 80, 'Soft idlis with sambar', 'South Indian'),
(3, 1, 'Uttapam', 100, 'South Indian pizza with toppings', 'South Indian'),
(4, 1, 'Vada', 60, 'Crispy lentil doughnuts', 'South Indian'),
(5, 1, 'Pongal', 90, 'Rice and lentil porridge', 'South Indian');

-- Food Court B (South Indian)
INSERT INTO dishes (id, food_court_id, name, price, description, category) VALUES
(6, 2, 'Rava Dosa', 130, 'Crispy semolina dosa', 'South Indian'),
(7, 2, 'Medu Vada', 70, 'Soft lentil doughnuts', 'South Indian'),
(8, 2, 'Upma', 80, 'Semolina breakfast dish', 'South Indian'),
(9, 2, 'Pesarattu', 110, 'Green gram dosa', 'South Indian'),
(10, 2, 'Bisi Bele Bath', 120, 'Spicy rice and lentil dish', 'South Indian');

-- Food Court C (Chinese)
INSERT INTO dishes (id, food_court_id, name, price, description, category) VALUES
(11, 3, 'Veg Fried Rice', 150, 'Wok-tossed rice with vegetables', 'Chinese'),
(12, 3, 'Veg Noodles', 140, 'Stir-fried noodles with vegetables', 'Chinese'),
(13, 3, 'Veg Manchurian', 160, 'Vegetable balls in spicy sauce', 'Chinese'),
(14, 3, 'Spring Rolls', 120, 'Crispy vegetable rolls', 'Chinese'),
(15, 3, 'Veg Hakka Noodles', 150, 'Spicy stir-fried noodles', 'Chinese');

-- Food Court D (Chinese)
INSERT INTO dishes (id, food_court_id, name, price, description, category) VALUES
(16, 4, 'Veg Schezwan Rice', 160, 'Spicy schezwan fried rice', 'Chinese'),
(17, 4, 'Veg Chow Mein', 150, 'Stir-fried noodles with vegetables', 'Chinese'),
(18, 4, 'Veg Spring Rolls', 130, 'Crispy vegetable rolls', 'Chinese'),
(19, 4, 'Veg Fried Rice', 140, 'Wok-tossed rice with vegetables', 'Chinese'),
(20, 4, 'Veg Manchurian', 170, 'Vegetable balls in spicy sauce', 'Chinese');

-- Food Court E (Chinese)
INSERT INTO dishes (id, food_court_id, name, price, description, category) VALUES
(21, 5, 'Veg Fried Rice', 150, 'Wok-tossed rice with vegetables', 'Chinese'),
(22, 5, 'Veg Noodles', 140, 'Stir-fried noodles with vegetables', 'Chinese'),
(23, 5, 'Veg Manchurian', 160, 'Vegetable balls in spicy sauce', 'Chinese'),
(24, 5, 'Spring Rolls', 120, 'Crispy vegetable rolls', 'Chinese'),
(25, 5, 'Veg Hakka Noodles', 150, 'Spicy stir-fried noodles', 'Chinese');

-- Insert Dishes for Block 32 Food Courts
-- Food Court A (South Indian)
INSERT INTO dishes (id, food_court_id, name, price, description, category) VALUES
(26, 26, 'Masala Dosa', 120, 'Crispy dosa with potato filling', 'South Indian'),
(27, 26, 'Idli Sambar', 80, 'Soft idlis with sambar', 'South Indian'),
(28, 26, 'Uttapam', 100, 'South Indian pizza with toppings', 'South Indian'),
(29, 26, 'Vada', 60, 'Crispy lentil doughnuts', 'South Indian'),
(30, 26, 'Pongal', 90, 'Rice and lentil porridge', 'South Indian');

-- Food Court B (South Indian)
INSERT INTO dishes (id, food_court_id, name, price, description, category) VALUES
(31, 27, 'Rava Dosa', 130, 'Crispy semolina dosa', 'South Indian'),
(32, 27, 'Medu Vada', 70, 'Soft lentil doughnuts', 'South Indian'),
(33, 27, 'Upma', 80, 'Semolina breakfast dish', 'South Indian'),
(34, 27, 'Pesarattu', 110, 'Green gram dosa', 'South Indian'),
(35, 27, 'Bisi Bele Bath', 120, 'Spicy rice and lentil dish', 'South Indian');

-- Food Court C (Chinese)
INSERT INTO dishes (id, food_court_id, name, price, description, category) VALUES
(36, 28, 'Veg Fried Rice', 150, 'Wok-tossed rice with vegetables', 'Chinese'),
(37, 28, 'Veg Noodles', 140, 'Stir-fried noodles with vegetables', 'Chinese'),
(38, 28, 'Veg Manchurian', 160, 'Vegetable balls in spicy sauce', 'Chinese'),
(39, 28, 'Spring Rolls', 120, 'Crispy vegetable rolls', 'Chinese'),
(40, 28, 'Veg Hakka Noodles', 150, 'Spicy stir-fried noodles', 'Chinese');

-- Food Court D (Chinese)
INSERT INTO dishes (id, food_court_id, name, price, description, category) VALUES
(41, 29, 'Veg Schezwan Rice', 160, 'Spicy schezwan fried rice', 'Chinese'),
(42, 29, 'Veg Chow Mein', 150, 'Stir-fried noodles with vegetables', 'Chinese'),
(43, 29, 'Veg Spring Rolls', 130, 'Crispy vegetable rolls', 'Chinese'),
(44, 29, 'Veg Fried Rice', 140, 'Wok-tossed rice with vegetables', 'Chinese'),
(45, 29, 'Veg Manchurian', 170, 'Vegetable balls in spicy sauce', 'Chinese');

-- Food Court E (Chinese)
INSERT INTO dishes (id, food_court_id, name, price, description, category) VALUES
(46, 30, 'Veg Fried Rice', 150, 'Wok-tossed rice with vegetables', 'Chinese'),
(47, 30, 'Veg Noodles', 140, 'Stir-fried noodles with vegetables', 'Chinese'),
(48, 30, 'Veg Manchurian', 160, 'Vegetable balls in spicy sauce', 'Chinese'),
(49, 30, 'Spring Rolls', 120, 'Crispy vegetable rolls', 'Chinese'),
(50, 30, 'Veg Hakka Noodles', 150, 'Spicy stir-fried noodles', 'Chinese');

-- Insert Dishes for Uni Mall Food Courts
-- Food Court A (South Indian)
INSERT INTO dishes (id, food_court_id, name, price, description, category) VALUES
(51, 51, 'Masala Dosa', 120, 'Crispy dosa with potato filling', 'South Indian'),
(52, 51, 'Idli Sambar', 80, 'Soft idlis with sambar', 'South Indian'),
(53, 51, 'Uttapam', 100, 'South Indian pizza with toppings', 'South Indian'),
(54, 51, 'Vada', 60, 'Crispy lentil doughnuts', 'South Indian'),
(55, 51, 'Pongal', 90, 'Rice and lentil porridge', 'South Indian');

-- Food Court B (South Indian)
INSERT INTO dishes (id, food_court_id, name, price, description, category) VALUES
(56, 52, 'Rava Dosa', 130, 'Crispy semolina dosa', 'South Indian'),
(57, 52, 'Medu Vada', 70, 'Soft lentil doughnuts', 'South Indian'),
(58, 52, 'Upma', 80, 'Semolina breakfast dish', 'South Indian'),
(59, 52, 'Pesarattu', 110, 'Green gram dosa', 'South Indian'),
(60, 52, 'Bisi Bele Bath', 120, 'Spicy rice and lentil dish', 'South Indian');

-- Food Court C (Chinese)
INSERT INTO dishes (id, food_court_id, name, price, description, category) VALUES
(61, 53, 'Veg Fried Rice', 150, 'Wok-tossed rice with vegetables', 'Chinese'),
(62, 53, 'Veg Noodles', 140, 'Stir-fried noodles with vegetables', 'Chinese'),
(63, 53, 'Veg Manchurian', 160, 'Vegetable balls in spicy sauce', 'Chinese'),
(64, 53, 'Spring Rolls', 120, 'Crispy vegetable rolls', 'Chinese'),
(65, 53, 'Veg Hakka Noodles', 150, 'Spicy stir-fried noodles', 'Chinese');

-- Food Court D (Chinese)
INSERT INTO dishes (id, food_court_id, name, price, description, category) VALUES
(66, 54, 'Veg Schezwan Rice', 160, 'Spicy schezwan fried rice', 'Chinese'),
(67, 54, 'Veg Chow Mein', 150, 'Stir-fried noodles with vegetables', 'Chinese'),
(68, 54, 'Veg Spring Rolls', 130, 'Crispy vegetable rolls', 'Chinese'),
(69, 54, 'Veg Fried Rice', 140, 'Wok-tossed rice with vegetables', 'Chinese'),
(70, 54, 'Veg Manchurian', 170, 'Vegetable balls in spicy sauce', 'Chinese');

-- Food Court E (Chinese)
INSERT INTO dishes (id, food_court_id, name, price, description, category) VALUES
(71, 55, 'Veg Fried Rice', 150, 'Wok-tossed rice with vegetables', 'Chinese'),
(72, 55, 'Veg Noodles', 140, 'Stir-fried noodles with vegetables', 'Chinese'),
(73, 55, 'Veg Manchurian', 160, 'Vegetable balls in spicy sauce', 'Chinese'),
(74, 55, 'Spring Rolls', 120, 'Crispy vegetable rolls', 'Chinese'),
(75, 55, 'Veg Hakka Noodles', 150, 'Spicy stir-fried noodles', 'Chinese');

-- Insert Dishes for Block 38 Food Courts
-- Food Court A (South Indian)
INSERT INTO dishes (id, food_court_id, name, price, description, category) VALUES
(76, 76, 'Masala Dosa', 120, 'Crispy dosa with potato filling', 'South Indian'),
(77, 76, 'Idli Sambar', 80, 'Soft idlis with sambar', 'South Indian'),
(78, 76, 'Uttapam', 100, 'South Indian pizza with toppings', 'South Indian'),
(79, 76, 'Vada', 60, 'Crispy lentil doughnuts', 'South Indian'),
(80, 76, 'Pongal', 90, 'Rice and lentil porridge', 'South Indian');

-- Food Court B (South Indian)
INSERT INTO dishes (id, food_court_id, name, price, description, category) VALUES
(81, 77, 'Rava Dosa', 130, 'Crispy semolina dosa', 'South Indian'),
(82, 77, 'Medu Vada', 70, 'Soft lentil doughnuts', 'South Indian'),
(83, 77, 'Upma', 80, 'Semolina breakfast dish', 'South Indian'),
(84, 77, 'Pesarattu', 110, 'Green gram dosa', 'South Indian'),
(85, 77, 'Bisi Bele Bath', 120, 'Spicy rice and lentil dish', 'South Indian');

-- Food Court C (Chinese)
INSERT INTO dishes (id, food_court_id, name, price, description, category) VALUES
(86, 78, 'Veg Fried Rice', 150, 'Wok-tossed rice with vegetables', 'Chinese'),
(87, 78, 'Veg Noodles', 140, 'Stir-fried noodles with vegetables', 'Chinese'),
(88, 78, 'Veg Manchurian', 160, 'Vegetable balls in spicy sauce', 'Chinese'),
(89, 78, 'Spring Rolls', 120, 'Crispy vegetable rolls', 'Chinese'),
(90, 78, 'Veg Hakka Noodles', 150, 'Spicy stir-fried noodles', 'Chinese');

-- Food Court D (Chinese)
INSERT INTO dishes (id, food_court_id, name, price, description, category) VALUES
(91, 79, 'Veg Schezwan Rice', 160, 'Spicy schezwan fried rice', 'Chinese'),
(92, 79, 'Veg Chow Mein', 150, 'Stir-fried noodles with vegetables', 'Chinese'),
(93, 79, 'Veg Spring Rolls', 130, 'Crispy vegetable rolls', 'Chinese'),
(94, 79, 'Veg Fried Rice', 140, 'Wok-tossed rice with vegetables', 'Chinese'),
(95, 79, 'Veg Manchurian', 170, 'Vegetable balls in spicy sauce', 'Chinese');

-- Food Court E (Chinese)
INSERT INTO dishes (id, food_court_id, name, price, description, category) VALUES
(96, 80, 'Veg Fried Rice', 150, 'Wok-tossed rice with vegetables', 'Chinese'),
(97, 80, 'Veg Noodles', 140, 'Stir-fried noodles with vegetables', 'Chinese'),
(98, 80, 'Veg Manchurian', 160, 'Vegetable balls in spicy sauce', 'Chinese'),
(99, 80, 'Spring Rolls', 120, 'Crispy vegetable rolls', 'Chinese'),
(100, 80, 'Veg Hakka Noodles', 150, 'Spicy stir-fried noodles', 'Chinese');

-- Insert Dishes for CSE Block Food Courts
-- Food Court A (South Indian)
INSERT INTO dishes (id, food_court_id, name, price, description, category) VALUES
(101, 101, 'Masala Dosa', 120, 'Crispy dosa with potato filling', 'South Indian'),
(102, 101, 'Idli Sambar', 80, 'Soft idlis with sambar', 'South Indian'),
(103, 101, 'Uttapam', 100, 'South Indian pizza with toppings', 'South Indian'),
(104, 101, 'Vada', 60, 'Crispy lentil doughnuts', 'South Indian'),
(105, 101, 'Pongal', 90, 'Rice and lentil porridge', 'South Indian');

-- Food Court B (South Indian)
INSERT INTO dishes (id, food_court_id, name, price, description, category) VALUES
(106, 102, 'Rava Dosa', 130, 'Crispy semolina dosa', 'South Indian'),
(107, 102, 'Medu Vada', 70, 'Soft lentil doughnuts', 'South Indian'),
(108, 102, 'Upma', 80, 'Semolina breakfast dish', 'South Indian'),
(109, 102, 'Pesarattu', 110, 'Green gram dosa', 'South Indian'),
(110, 102, 'Bisi Bele Bath', 120, 'Spicy rice and lentil dish', 'South Indian');

-- Food Court C (Chinese)
INSERT INTO dishes (id, food_court_id, name, price, description, category) VALUES
(111, 103, 'Veg Fried Rice', 150, 'Wok-tossed rice with vegetables', 'Chinese'),
(112, 103, 'Veg Noodles', 140, 'Stir-fried noodles with vegetables', 'Chinese'),
(113, 103, 'Veg Manchurian', 160, 'Vegetable balls in spicy sauce', 'Chinese'),
(114, 103, 'Spring Rolls', 120, 'Crispy vegetable rolls', 'Chinese'),
(115, 103, 'Veg Hakka Noodles', 150, 'Spicy stir-fried noodles', 'Chinese');

-- Food Court D (Chinese)
INSERT INTO dishes (id, food_court_id, name, price, description, category) VALUES
(116, 104, 'Veg Schezwan Rice', 160, 'Spicy schezwan fried rice', 'Chinese'),
(117, 104, 'Veg Chow Mein', 150, 'Stir-fried noodles with vegetables', 'Chinese'),
(118, 104, 'Veg Spring Rolls', 130, 'Crispy vegetable rolls', 'Chinese'),
(119, 104, 'Veg Fried Rice', 140, 'Wok-tossed rice with vegetables', 'Chinese'),
(120, 104, 'Veg Manchurian', 170, 'Vegetable balls in spicy sauce', 'Chinese');

-- Food Court E (Chinese)
INSERT INTO dishes (id, food_court_id, name, price, description, category) VALUES
(121, 105, 'Veg Fried Rice', 150, 'Wok-tossed rice with vegetables', 'Chinese'),
(122, 105, 'Veg Noodles', 140, 'Stir-fried noodles with vegetables', 'Chinese'),
(123, 105, 'Veg Manchurian', 160, 'Vegetable balls in spicy sauce', 'Chinese'),
(124, 105, 'Spring Rolls', 120, 'Crispy vegetable rolls', 'Chinese'),
(125, 105, 'Veg Hakka Noodles', 150, 'Spicy stir-fried noodles', 'Chinese');
