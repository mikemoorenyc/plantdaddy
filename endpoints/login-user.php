<?php
require_once $_SERVER['DOCUMENT_ROOT'] ."/header.php";

require_once "endpoint-header.php";


if($_SESSION['login_noonce'] !== $response['login_noonce']) {

	errorResponse(400, "bad_noonce");
}
$missing = [];
foreach(['email','password'] as $k) {
	if(!$response[$k]) {
		$missing[] = $k;
	}
}
if(!empty($missing)) {
	errorResponse(400, "missing values || ".implode(",",$missing));
}

$user = get_items(array(
	"table" => "users",
	"selector_key" => "email",
	"selector_value" => $response['email'],
	"limit" => 1
));
if(!$user) {
	errorResponse(400, "bad email or password");
}
$pass_pass = password_verify(base64_encode(hash('sha256', $response['password'], true)),$user['password']);

if(!$pass_pass) {
	errorResponse(400, "bad email or password");
}


$user = get_user_by_id($user['id']);
$remember_me = create_remember_me($user['id']);
$_SESSION['logged_in'] = true;
$_SESSION['user'] = $user;

  $response = array(
    'logged_in' => true,
    'user' => $user,
    "success" => true
  );
  echo json_encode($response);
  die();
