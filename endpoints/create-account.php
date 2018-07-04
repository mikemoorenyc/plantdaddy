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
	$server = $_SESSION['login_noonce'];
	$_SESSION['login_noonce'] = generate_noonce();
	$error = array(
		"msg" => "Bad Noonce",
		"server" => $server,
		"response" => $response['login_noonce'],
		"new_login_noonce" => $_SESSION['login_noonce']
	);
	errorResponse(400, $error);
}
$empty_fields = [];
foreach($response as $k=> $r) {
	if($k == 'login_noonce' || $k == 'telephone') {
		continue;
	}
	if(!$r) {
		$empty_fields[] = $k;
	}
}
if(empty($empty_fields)) {
	$error = array(
		"msg" => "Empty Fields",
		"empty_fields" => $empty_fields
	);
	errorResponse(400, $error);
}
if($response['telephone']) {
	if(!is_numeric($response['telephone']) || intval($response['telephone']) > 9999999999 || intval($response['telephone']) <= 1000000000 ) {
		$error = array('msg' => 'Bad Telephone');
		errorResponse(400, $error);
	}
}


$mailError = array(
	"msg" => "Bad Email",
	"type" => "Bad Format"
);
if (!filter_var($response['email'], FILTER_VALIDATE_EMAIL)) {
	errorResponse(400, $mailError);
}


if(!in_array(strtolower($response['email']),explode(",",ALLOWED_EMAILS))) {
	$mailError['type'] = "Not Allowed";
	errorResponse(400, $mailError);
}
//CHECK IF EMAIL EXISTS
$get_user =  "SELECT email FROM users WHERE `email` = '".$db_conn->real_escape_string($response['email'])."' LIMIT 1";
$user = $db_conn->query($get_user);
if($user->num_rows > 0) {
  $mailError['type'] = "Already Exists";
	errorResponse(400, $mailError);
}

$stored_pass = pw_hasher($response['password']);

$user_color = RandomColor::one(array(
   'luminosity' => 'bright',
   'hue' => 'random',
		"format" => "hex"
));

$insert_fields = array(
	"email" => $db_conn->real_escape_string($response['email']),
	"password" => $stored_pass,
	"telephone" => ($response['telephone'])? intval($response['telephone']) : null,
	"firstname" => $db_conn->real_escape_string($response['firstname']),
	"photo_url" => ($response['photo_url'])? $db_conn->real_escape_string($response['photo_url']) : null,
	"date_created" => time(),
	"date_modified" => time(),
	"color" => $user_color
);
$insert_values = implode(", ",$insert_fields);
$insert_keys = implode(", ", array_keys($insert_fields));


$insert_db = "INSERT INTO users (".$insert_keys.") VALUES (".$insert_values.")";

$add_user = mysqli_query($db_conn, $insert_db);

if ($add_user) {
	$_SESSION['login_noonce'] = null;
	echo json_encode(array(
		"msg"=> "User Created",
		"user" => get_user_by_id(mysqli_insert_id($db_conn)),
		"success" => true
	));
} else {
	$_SESSION['login_noonce'] = generate_noonce();
  $error = array(
		"msg" => "User Could Not Be Created",
		"new_login_noonce" => $_SESSION['login_noonce'],
		"server_msg" => mysqli_error($db_conn)
	);
	errorResponse(501, $error);
}
die();



?>
