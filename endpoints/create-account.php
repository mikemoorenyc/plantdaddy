<?php

require_once $_SERVER['DOCUMENT_ROOT'] ."/header.php";

require_once "endpoint-header.php";


if($_SESSION['logged_in']) {
	$error = array(
		"msg" => "Already a user"
	);
	errorResponse(403,$error);
}



if($_SESSION['login_noonce'] !== $response['login_noonce']) {

	$error = array(
		"error_code" => "bad_noonce",

	);
	errorResponse(400, $error);
}
$required_fields =['first_name','email','password'];
$required_diff = array_diff($required_fields, array_keys($response));
if(!empty($required_diff)) {
	$error = array(
		"error_code" => "empty_fields",
		"empty_fields" => $required_diff
	);
	errorResponse(400, $error);
}
if($response['telephone']) {
	if(!is_numeric($response['telephone']) || intval($response['telephone']) > 9999999999 || intval($response['telephone']) <= 1000000000 ) {
		$error = array('error_code' => 'bad_message', "msg" => "The telephone number you entered isn't valid.");
		errorResponse(400, $error);
	}
}


$mailError = array(
	"error_code" => "bad_email",
	"msg" => "Your email address isn't formatted correctly."
);
if (!filter_var($response['email'], FILTER_VALIDATE_EMAIL)) {
	errorResponse(400, $mailError);
}


if(!in_array(strtolower($response['email']),explode(",",ALLOWED_EMAILS))) {
	$mailError['msg'] = "That email address isn't allowed.";
	errorResponse(400, $mailError);
}
//CHECK IF EMAIL EXISTS
$get_user =  "SELECT email FROM users WHERE `email` = '".$db_conn->real_escape_string($response['email'])."' LIMIT 1";
$user = $db_conn->query($get_user);
if($user->num_rows > 0) {
  $mailError['msg'] = "There is problem with using this email address. Try another one.";
	errorResponse(400, $mailError);
}

$stored_pass = pw_hasher($response['password']);



$insert_fields = array(
	"email" => $response['email'],
	"password" => $stored_pass,
	"telephone" => ($response['telephone'])? intval($response['telephone']) : null,
	"first_name" => ($response['first_name'],
	"date_created" => time(),
	"date_modified" => time(),
	"color" => makeHSL()
);
$add_user = insert_item("users", $insert_fields);

if(!$add_user) {
	$error = array(
		"msg" => "User Could Not Be Created",
		"new_login_noonce" => $_SESSION['login_noonce']
	);
	errorResponse(501, $error);
}


$_SESSION['login_noonce'] = null;
	
$user = get_user_by_id($add_user);
//UPLOAD PHOTO
if($response['photo_data'])  {
	$photo_url = upload_image($response['photo_data'], "account_img_".$user['id'], $user['id']);
	if($photo_url) {
		$update_array = array(
			"db" => "users",
			"selector_key" => "id",
			"selector_value" => $user['id']
			"update_array" => array(
				"photo_url" => $photo_url
			)
		)
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
