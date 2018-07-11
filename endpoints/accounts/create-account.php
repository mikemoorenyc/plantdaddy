<?php

require_once $_SERVER['DOCUMENT_ROOT'] ."/header.php";

require_once $_SERVER['DOCUMENT_ROOT'] ."/endpoints/endpoint-header.php";


if($_SESSION['logged_in']) {

	errorResponse(403,"existing_user");
}



if($_SESSION['login_noonce'] !== $response['login_noonce']) {

	errorResponse(400, "bad_noonce");
}
$required_fields =['first_name','email','password'];
$required_diff = array_diff($required_fields, array_keys($response));
if(!empty($required_diff)) {
	errorResponse(400, "empty_fields ".implode(",",$required_diff));
}
if($response['telephone']) {
	if(!is_numeric($response['telephone']) || intval($response['telephone']) > 9999999999 || intval($response['telephone']) <= 1000000000 ) {
		errorResponse(400, "invalid_phone");
	}
}



if (!filter_var($response['email'], FILTER_VALIDATE_EMAIL)) {
	errorResponse(400, "invalid_email");
}


if(!in_array(strtolower($response['email']),explode(",",ALLOWED_EMAILS))) {
	errorResponse(400, "invalid_email");
}
//CHECK IF EMAIL EXISTS
$get_user =  "SELECT email FROM users WHERE `email` = '".$db_conn->real_escape_string($response['email'])."' LIMIT 1";
$user = $db_conn->query($get_user);
if($user->num_rows > 0) {
	errorResponse(400, "email_problem");
}

$stored_pass = pw_hasher($response['password']);



$insert_fields = array(
	"email" => $response['email'],
	"password" => $stored_pass,
	"telephone" => ($response['telephone'])? intval($response['telephone']) : null,
	"first_name" => ($response['first_name']),
	"date_created" => time(),
	"date_modified" => time(),
	"color" => makeHSL()
);

$add_user = insert_item("users", $insert_fields);

if(!$add_user) {

	errorResponse(501, "insert_error");
}


$_SESSION['login_noonce'] = null;

$user = get_user_by_id($add_user);
//UPLOAD PHOTO
if($response['photo_data'])  {
	$photo_id = upload_image($response['photo_data'], "account_img_".$user['id'], $user['id']);
	if($photo_url) {
		$update_array = array(
			"db" => "users",
			"selector_key" => "id",
			"selector_value" => $user['id'],
			"update_array" => array(
				"photo_id" => $photo_url,
				"modified_by" => $user['id']
			)
		);
		$insert_photo = update_item($update_array);
	}
}

echo json_encode(array(
	"msg"=> "User Created",
	"user" => get_user_by_id($user['id']),
	"success" => true
));

die();



?>
