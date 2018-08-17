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
	"selector_key" => "id",
	"selector_value" => $response['id'],
	"limit" => 1,
	"table" => "users"
));
if(!$user) {
	errorResponse(404, "user_not_found");
}
if($user['id'] !== $response['id']) {
	errorResponse(403, "wrong_user");
}
if($_GET['change_password']) {
	include "change-password.php";
	die();
}


$to_update = [];

$allowed_values = array_keys($user);



foreach($response as $k => $r) {

	if(!in_array($k,$allowed_values) || $update_value == $user[$k] || $k == "password" || $k == "id") {
		continue;
	}

	$to_update[$k] = $r;

}

if(!empty($response['photo_data']) && $response['photo_data'] !== get_photo_by_id($user['photo_id']) ) {
	$photo_id = upload_image($to_update['photo_data'], "account_img_", $user['id']);
	if(!$photo_id) {
		errorResponse(500,"image_error");
	}
	$to_update['photo_id'] = $photo_id;
}

if(empty($to_update)) {
	errorResponse(304, "not_modified");
}
$updated_item = update_item(array(
	"table" => "users",
	"selector_value" => $response['id'],
	"selector_key" => "id",
	"update_array" => $to_update
));
if(!$updated_item) {
	errorResponse(500, "not_updated");
}

echo json_encode(get_user_by_id($response['id']));
die();




