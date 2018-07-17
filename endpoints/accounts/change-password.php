<?php

if(!$response['current_password'] || !$response['new_password'] || !$response['new_password_2']) {
	errorResponse(400, "bad_data");
}
if(!$response['new_password'] !== !$response['new_password_2'] ) {
	errorResponse(400, "password_mismatch");
}
$pass_pass = password_verify(base64_encode(hash('sha256', $response['current_password'], true)),$user['password']);
if(!$pass_pass) {
	errorResponse(403, "wrong_password");
}
$stored_pass = pw_hasher($response['new_password']);

$updated_item = update_item(array(
	"table" => "users",
	"selector_value" => $response['id'],
	"selector_key" => "id",
	"update_array" => array(
		"password" => $stored_pass
	)
));

if(!$updated_item) {
	errorResponse(501, "not_implemented");
}

echo json_encode(array(
	"success" => true, 
	"msg" => "Password updated"

)

);
die();
