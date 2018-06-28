<?php
require "/header.php";

require "/app_path.php";

$HTML = file_get_contents($app_path);

$initInfo = [];

$initInfo['isLoggedIn'] = is_user_logged_in();
$initInfo['userProfile'] = null;


$_SESSION['login_noonce'] = generate_noonce();
$initInfo['login_noonce'] = $_SESSION['login_noonce'];

$initJS = "<script>var INITINFO = ".json_encode($initInfo)."; </script>";

$HTML = str_replace("***INIT PACKAGE GOES HERE***",$initJS,$HTML);

echo $HTML;



 ?>
