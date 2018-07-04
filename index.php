<?php
session_start();
date_default_timezone_set('UTC');
var_dump($_SESSION['login_noonce']);





$url = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
if(strpos ( $url , "/endpoints") !== false ) {
  require "endpoints/api-router.php";
  die();
}

require "/header.php";

require "/site_specs.php";

$HTML = file_get_contents(APP_PATH);

$initInfo = [];

$initInfo['isLoggedIn'] = is_user_logged_in();
$initInfo['userProfile'] = null;
$initInfo['reset_verified'] = (!$_GET['reset_token']) ? false : verify_reset_token();





$_SESSION['login_noonce'] = generate_noonce();
var_dump($_SESSION['login_noonce']);


$initInfo['login_noonce'] = $_SESSION['login_noonce'];

$initJS = "<script>var INITINFO = ".json_encode($initInfo)."; </script>";

if($_GET['create']) {
  include  'create-test.php';
  die();
}

$HTML = str_replace("***INIT PACKAGE GOES HERE***",$initJS,$HTML);

echo $HTML;

echo $_SESSION['login_noonce'];




 ?>
