<?php
    session_start()
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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

        <form class="space-y-3" method="POST" action="signup.php"> 
            <div>
                <input type="text" required
                    class="w-full px-3 py-[10px] text-[15px] rounded-md border border-gray-300 
                    placeholder-gray-500 focus:outline-none focus:border-gray-900 transition-colors"
                    placeholder="Full Name" name="name">
            </div>
            <div>
                <input type="text" required
                    class="w-full px-3 py-[10px] text-[15px] rounded-md border border-gray-300 
                    placeholder-gray-500 focus:outline-none focus:border-gray-900 transition-colors"
                    placeholder="Username" name="username">
            </div>
            <div>
                <input type="email" required
                    class="w-full px-3 py-[10px] text-[15px] rounded-md border border-gray-300 
                    placeholder-gray-500 focus:outline-none focus:border-gray-900 transition-colors"
                    placeholder="Email address" name="email">
            </div>
            <div>
                <input type="password" required
                    class="w-full px-3 py-[10px] text-[15px] rounded-md border border-gray-300 
                    placeholder-gray-500 focus:outline-none focus:border-gray-900 transition-colors"
                    placeholder="Password" name="password">
            </div>
            <div>
                <input type="password" required
                    class="w-full px-3 py-[10px] text-[15px] rounded-md border border-gray-300 
                    placeholder-gray-500 focus:outline-none focus:border-gray-900 transition-colors"
                    placeholder="Confirm password" name="confirmPassword">
            </div>
            <button type="submit"
                class="w-full bg-gray-900 text-white py-[10px] rounded-md text-[15px] mt-2
                hover:bg-gray-800 transition-colors" name="register">
                Create Account
            </button>
        </form>

        <div class="mt-6">
            <p class="text-center text-[13px] text-gray-500">
                Already have an account? <a href="login.php" class="text-gray-900 hover:underline">Sign in</a>
            </p>
        </div>
    </div>
</body>

</html>


<?php
include 'connection.php';
if (isset($_POST['register'])) {

    $name = $_POST['name'];
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $confirmPassword = $_POST['confirmPassword'];

    $pass = password_hash($password, PASSWORD_BCRYPT);
    $cpass = password_hash($confirmPassword, PASSWORD_BCRYPT);

    $token = bin2hex(random_bytes(15));

    $emailquery = "select * from registration where email = '$email' ";
    $query = mysqli_query($con, $emailquery);
    $emailCount = mysqli_num_rows($query);

    if ($emailCount > 0) {
?>
        <script>
            alert('email already existed')
        </script>
        <?php
    } else {
        if ($password === $confirmPassword) {
            $insert_query = "insert into registration (name,username,email,password,confirmPassword,token,status	
) values ('$name','$username','$email','$pass','$cpass','$token', 'inactive')";

            $iquery = mysqli_query($con, $insert_query);

            $_SESSION['username'] = $username;

            if ($iquery) {

                $subject = "Account Activation - Campus Cuisine";
                $body = "Hello $username,\n\n"
                    . "Thank you for registering with Campus Cuisine. Please click the link below to activate your account:\n\n"
                    . "http://localhost/task5/activate.php?token=$token\n\n"
                    . "If you didn't create this account, please ignore this email.\n\n"
                    . "Best regards,\nCampus Cuisine Team";
                $sender_email = "From: phpmailsent@gmail.com"; 

                if (mail($email, $subject, $body, $sender_email)) {
                    $_SESSION['message'] = "check your email to activate you account $email";
        ?>
                    <script>
                        window.location.href = 'login.php';
                    </script>
                <?php
                } else {
                    echo "Email sending failed...";
                }
            } else {
                ?>
                <script>
                    alert('connection not successfull')
                </script>
            <?php
            }
        } else {
            ?>
            <script>
                alert('password not matching')
            </script>
<?php
        }
    }
}