<?php
require_once "/header.php";
require_once "endpoint-header.php";

if($_SESSION['login_noonce'] !== $_POST['login_noonce']) {

	errorResponse(400, "bad_noonce");
}

$verified = verify_login($response['email'],$response['password']);

if($verifed === false) {
	errorResponse(403,"verification_failed");
}
$user = get_user_by_id($verified);
$remember_me = create_remember_me($user['id']);
$_SESSION['logged_in'] = true;
$_SESSION['current_user'] = $user;

  $response = array(
    'logged_in' => true,
    'user' => $user,
    "success" => true
  );
  echo json_encode($response);
  die();