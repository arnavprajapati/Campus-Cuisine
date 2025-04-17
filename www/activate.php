<?php
    
    session_start();

    include 'connection.php';

    if(isset($_GET['token'])){

        $token = $_GET['token'];

        $updatequery = " update registration set status = 'active'  where token = '$token' " ;

        $query =  mysqli_query($con, $updatequery);


        if($query){
            if(isset($_SESSION['message'])){
                $_SESSION['message'] = 'account updated successfully' ;
                ?>
                    <script>
                        window.location.href = 'explore.html';
                    </script>
                <?php
            }else{
                $_SESSION['message'] = "you are logged out";
                ?>
                    <script>
                        window.location.href = 'login.php';
                    </script>
                <?php
            }
        }else{
            $_SESSION['message'] = "account not updated";
            ?>
                <script>
                    window.location.href = 'signinup.php';
                </script>
            <?php
        }
    }

?>