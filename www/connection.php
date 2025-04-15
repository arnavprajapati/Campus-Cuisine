<?php


define('DB_HOST', getenv('DB_HOST') ?: 'mysql');
define('DB_USER', getenv('DB_USER') ?: 'root');
define('DB_PASS', getenv('DB_PASS') ?: 'root');
define('DB_NAME', getenv('DB_NAME') ?: 'library');
define('DB_PORT', getenv('DB_PORT') ?: '3306');


// $username = "root";
// $password = "";
// $server = 'localhost';
// $db = 'campuscuisine';
$username = DB_USER;
$password = DB_PASS;
$server = DB_HOST;
$db = DB_NAME;
$port = DB_PORT;

$con = mysqli_connect($server, $username, $password, $db, $port);

if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}

// Set charset to ensure proper handling of special characters
mysqli_set_charset($con, "utf8mb4");
