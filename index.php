<?php
require "/header.php";


$HTML = file_get_contents("http://localhost:8080/");

$initInfo = [];

$initInfo['loggedIn'] = is_user_logged_in();



$initJS = "<script>var INITINFO = ".json_encode($initInfo)."; </script>";

$HTML = str_replace("***INIT PACKAGE GOES HERE***",$initJS,$HTML);

echo $HTML;



 ?>
