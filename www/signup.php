<?php
session_start();
include 'connection.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';
require 'phpmailer/src/Exception.php';
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Campus Cuisine</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css" rel="stylesheet" />
</head>

<body class="h-screen bg-white flex flex-col items-center justify-center p-4">
    <div class="w-full max-w-[360px] px-3">
        <div class="mb-8">
            <i class="ri-restaurant-2-fill text-2xl"></i>
        </div>
        <div class="mb-6">
            <h1 class="text-[28px] font-medium text-gray-900 mb-1">Welcome to Campus Cuisine</h1>
            <p class="text-[15px] text-gray-500">Create your account to get started</p>
        </div>

        <form class="space-y-3" method="POST">
            <input type="text" name="name" placeholder="Full Name" required
                class="w-full px-3 py-[10px] text-[15px] rounded-md border border-gray-300">
            <input type="text" name="username" placeholder="Username" required
                class="w-full px-3 py-[10px] text-[15px] rounded-md border border-gray-300">
            <input type="email" name="email" placeholder="Email address" required
                class="w-full px-3 py-[10px] text-[15px] rounded-md border border-gray-300">
            <input type="password" name="password" placeholder="Password" required
                class="w-full px-3 py-[10px] text-[15px] rounded-md border border-gray-300">
            <input type="password" name="confirmPassword" placeholder="Confirm password" required
                class="w-full px-3 py-[10px] text-[15px] rounded-md border border-gray-300">

            <button type="submit" name="register"
                class="w-full bg-gray-900 text-white py-[10px] rounded-md text-[15px] mt-2 hover:bg-gray-800">
                Create Account
            </button>
        </form>

        <div class="mt-6 text-center text-[13px] text-gray-500">
            Already have an account? <a href="login.php" class="text-gray-900 hover:underline">Sign in</a>
        </div>
    </div>
</body>

</html>

<?php
if (isset($_POST['register'])) {
    $name = $_POST['name'];
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $confirmPassword = $_POST['confirmPassword'];

    $pass = password_hash($password, PASSWORD_BCRYPT);
    $cpass = password_hash($confirmPassword, PASSWORD_BCRYPT);
    $token = bin2hex(random_bytes(15));

    $emailquery = "SELECT * FROM registration WHERE email = '$email'";
    $query = mysqli_query($con, $emailquery);
    $emailCount = mysqli_num_rows($query);

    if ($emailCount > 0) {
        echo "<script>alert('Email already exists');</script>";
    } else {
        if ($password === $confirmPassword) {
            $insert_query = "INSERT INTO registration (name, username, email, password, confirmPassword, token, status)
                            VALUES ('$name', '$username', '$email', '$pass', '$cpass', '$token', 'inactive')";

            $iquery = mysqli_query($con, $insert_query);

            if ($iquery) {
                $_SESSION['username'] = $username;

                $mail = new PHPMailer(true);
                try {
                    $mail->isSMTP();
                    $mail->Host       = 'smtp.gmail.com';
                    $mail->SMTPAuth   =    true;
                    $mail->Username   = 'arnavprajapati3101@gmail.com';
                    $mail->Password   = 'etscefjdzaxbjroz';
                    $mail->SMTPSecure = 'ssl';
                    $mail->Port       = 465;

                    $mail->setFrom('arnavprajapati3101@gmail.com', 'Campus Cuisine');
                    $mail->addAddress($email);

                    $mail->isHTML(true);
                    $mail->Subject = "Account Activation - Campus Cuisine";
                    $mail->Body    = "Hello $username,<br><br>
                    Thank you for registering at Campus Cuisine.<br>
                    Please click the link below to activate your account:<br><br>
                    <a href='http://campus-cuisine.onrender.com/activate.php?token=$token'>Activate Account</a><br><br>
                    If you did not request this, please ignore this email.<br><br>
                    Regards,<br>Campus Cuisine Team";

                    $mail->send();

                    $_SESSION['message'] = "Check your email to activate your account $email";
                    echo "<script>window.location.href='login.php';</script>";
                } catch (Exception $e) {
                    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
                }
            } else {
                echo "<script>alert('Database error');</script>";
            }
        } else {
            echo "<script>alert('Passwords do not match');</script>";
        }
    }
}
?>