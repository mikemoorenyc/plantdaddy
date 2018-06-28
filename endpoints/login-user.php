<?php
require_once "/header.php";
require_once "endpoint-header.php";

if($_SESSION['login_noonce'] !== $_POST['login_noonce']) {
  $_SESSION['login_noonce'] = generate_noonce();
	$error = array(
		"msg" => "Bad Noonce",
		"new_login_noonce" => $_SESSION['login_noonce']
	);
	errorResponse(400, $error);
}

$logged_in_user = verify_login($_POST['email'],$_POST['pass']);
