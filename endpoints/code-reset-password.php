<?php
require_once $_SERVER['DOCUMENT_ROOT'] ."/header.php";

require_once "endpoint-header.php";

$token_verified = verify_reset_token($response['reset_token']);
if($token_verified !== true) {
	
  errorResponse(400, array("msg"=> (DEV_NEV) ? $token_verified : "Bad Token", "error_code" => "bad_reset_token"));
}

if($_SESSION['login_noonce'] !== $response['login_noonce']) {
	errorResponse(400, array("msg"=> "Bad Noonce", "error_code" => "bad_noonce"));
}

$mailError = array(
	"msg" => "Bad Email",
	"error_code" => "bad_email",
  "success" => false
);
if (!get_user_by_email($response['email'])) {
	errorResponse(400, $mailError);
}
if($response['password'] !== $response['password_2']) {
  errorResponse(400, array("msg" => "Passwords do not match", "error_code"=>"pw_mismatch");
}

$new_password = pw_hasher($response['password']);

$update_package = array(
  "db" => "users",
  "update_key" => "password",
  "update_value" => $new_password,
  "selector_key" => "email",
  "selector_value" => $response['email']
);

$updated_pass = update_item($update_package);

if(!$updated_pass) {
  $error = array(
    "msg" => "Couldn't Update",
    "success" => false
  );
  errorResponse(500, $error);
}
echo json_encode(array(
  "msg" => "Password updated Successfully",
  "success" => true
));
die();

?>
