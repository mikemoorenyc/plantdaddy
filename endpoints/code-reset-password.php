<?php
require_once $_SERVER['DOCUMENT_ROOT'] ."/header.php";

require_once "endpoint-header.php";

$token_verified = verify_reset_token($response['reset_token']);
if($token_verified !== true) {

  errorResponse(400, "bad_reset_token");
}

if($_SESSION['login_noonce'] !== $response['login_noonce']) {
	errorResponse(400, "bad_noonce");
}


if (!get_user_by_email($response['email']) ){
	errorResponse(400, "bad_email");
}
if($response['password'] !== $response['password_2']) {
  errorResponse(400, "pw_mismatch");
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

  errorResponse(500, "update_error");
}
http_response_code(204);
die();
?>
