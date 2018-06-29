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

$verified = verify_login($response['email'],$response['password']);

if($verifed === false) {
	$_SESSION['login_noonce'] = generate_noonce();
	$error = array (
		"new_login_noonce" => $_SESSION['login_noonce'],
		"msg" => "The email address or password you've entered doesn't match any user."
	);
	errorResponse(403,$error);
}
$user = get_user_by_id($verified);
$remember_me = create_remember_me($user['id']);

  $response = array(
    'logged_in' => true,
    'user' => $user,
    "success" => true
  );
  echo json_encode($response);
  die();
