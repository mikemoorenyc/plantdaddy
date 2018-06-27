<?php
require "/header.php";

require "/app_path.php";

$HTML = file_get_contents($app_path);

$initInfo = [];

$initInfo['loggedIn'] = is_user_logged_in();

$_SESSION['login_noonce'] = generate_noonce();
$initInfo['loginNoonce'] = $_SESSION['login_noonce'];

$initJS = "<script>var INITINFO = ".json_encode($initInfo)."; </script>";

$HTML = str_replace("***INIT PACKAGE GOES HERE***",$initJS,$HTML);

echo $HTML;



 ?>
