<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign In - Campus Cuisine</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css" rel="stylesheet" />
</head>

<body class="h-screen bg-white flex flex-col items-center justify-center p-4">
    <div class="w-full max-w-[360px] px-3">

        <div class="mb-8">
            <i class="ri-restaurant-2-fill text-2xl"></i>
        </div>

        <div class="mb-6">
            <h1 class="text-[28px] font-medium text-gray-900 mb-1">Welcome back</h1>
            <p class="text-[15px] text-gray-500">Sign in to your account</p>
        </div>

        <div class="mt-4 mb-4">
            <p class="text-center text-[14px] px-3 py-2 rounded-md bg-yellow-100 text-yellow-700 border border-yellow-400"> 
                <?php
                    if(isset($_SESSION['message'])){
                        echo $_SESSION['message'];
                    }else{
                        echo $_SESSION['message'] = "you are logged out. Please login again.";
                    }
                ?>
            </p>
        </div>

        <form class="space-y-3" method="POST">
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

            <button type="submit"
                class="w-full bg-gray-900 text-white py-[10px] rounded-md text-[15px] mt-2
                hover:bg-gray-800 transition-colors" name="login">
                Sign In
            </button>
        </form>
        

        <div class="mt-6">
            <p class="text-center text-[13px] text-gray-500">
                Don't have an account? <a href="signup.php" class="text-gray-900 hover:underline">Create account</a>
            </p>
        </div>
    </div>
</body>

</html>


<?php

include 'connection.php';
if (isset($_POST['login'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $email_search = " select * from registration where email = '$email' and status='active' ";
    $query = mysqli_query($con, $email_search);

    $email_count = mysqli_num_rows($query);

    if ($email_count) {
        $email_pass = mysqli_fetch_assoc($query);

        $db_pass = $email_pass['password'];
        $_SESSION['username'] = $email_pass['username'];

        $pass_decode = password_verify($password, $db_pass);

        if ($pass_decode) {
?>
            <script>
                alert('login successfull');
                window.location.href = 'explore.html';
            </script>
        <?php
        } else {
        ?>
            <script>
                alert('password incorrect');
            </script>
        <?php
        }
    } else {
        ?>
        <script>
            alert('invalid email');
        </script>
<?php
    }
}

?>