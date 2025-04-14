<?php


define('DB_HOST', getenv('DB_HOST') ?: 'mysql');
define('DB_USER', getenv('DB_USER') ?: 'root');
define('DB_PASS', getenv('DB_PASS') ?: 'root');
define('DB_NAME', getenv('DB_NAME') ?: 'library');

// $username = "root";
// $password = "";
// $server = 'localhost';
// $db = 'campuscuisine';
$username = DB_HOST;
$password = DB_PASS;
$server = DB_HOST;
$db = DB_NAME;

$con = mysqli_connect($server, $username, $password, $db);

if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}

// Set charset to ensure proper handling of special characters
mysqli_set_charset($con, "utf8mb4");
