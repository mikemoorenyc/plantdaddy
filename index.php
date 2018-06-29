<?php
require "/header.php";

require "/app_path.php";

$HTML = file_get_contents(APP_PATH);

$initInfo = [];

$initInfo['isLoggedIn'] = is_user_logged_in();
$initInfo['userProfile'] = null;
$initInfo['reset_verified'] = (!$_GET['reset_token']) ? false : verify_reset_token();




$_SESSION['login_noonce'] = generate_noonce();
$initInfo['login_noonce'] = $_SESSION['login_noonce'];

$initJS = "<script>var INITINFO = ".json_encode($initInfo)."; </script>";

$HTML = str_replace("***INIT PACKAGE GOES HERE***",$initJS,$HTML);

echo $HTML;



 ?>
