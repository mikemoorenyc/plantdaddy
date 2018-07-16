<?php
require_once $_SERVER['DOCUMENT_ROOT'] ."/header.php";
require_once $_SERVER['DOCUMENT_ROOT'] ."/endpoints/endpoint-header.php";
	
if(!$_SESSION['logged_in']) {
	errorResponse();
}
if($_SESSION['user']['id'] !== $response['id']) {
	errorResponse(403, "wrong_user");
}
$user = get_items(array(
	"table" => "users",
	"selector_key" => "id",
	"selector_value" => $response['id'],
	"limit" => 1
));
if(!$user) {
	errorResponse(404, "user_not_found");
}
if($user['id'] !== $response['id']) {
	errorResponse(403, "wrong_user");
}
$to_update = [];

$allowed_values = array_keys($user);

foreach($response as $k => $r) {
	if(!in_array($k,$allowed_values)) {
		continue;
	}
	$update_value = ($k == "password")? pw_hasher($r) : $r;
	
	if($update_value == $user[$k] && $k !== "password") {
		continue;
	}
	
	$to_update[$k] = $update_value;

}
if(empty($to_update)) {
	errorResponse(304, "not_modified");
}
$updated_item = update_item(array(
	"table" => "users",
	"selector_value" => $response['id'],
	"selector_key" => "id"
	"update_array" => $to_update
));
if(!$updated_item) {
	errorResponse(500, "not_updated");
}

echo json_encode(get_user_by_id($response['id']));
die();




