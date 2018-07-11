<?php
require_once $_SERVER['DOCUMENT_ROOT'] ."/header.php";

require_once "endpoint-header.php";




if(!$response){die();};


function response($msg="Message Sent") {
	$response = array(
		"success" => true,
		"msg" => $msg
	);
	die(json_encode($response));
};

if( $_SESSION['login_noonce'] !== $response['login_noonce'] || $_SESSION['logged_in']) {

	$msg = array(
		'server' => $_SESSION['login_noonce'],
		"response" => $response['login_noonce']
	);
	response($msg);
}

$_SESSION['login_noonce'] = null;

$email = $db_conn->real_escape_string($response['email']);




$get_email =  "SELECT * FROM users WHERE `email` = '".$email."' LIMIT 1";

$user = $db_conn->query($get_email);
if(!$user) {
	$success_msg['msg'] = mysqli_error($db_conn);
	die($success_msg);
}

if($user->num_rows < 1) {
	response("Email not found");
}

$email_token = generate_noonce();
$expires = strtotime("+2 hours");
$user = $user->fetch_assoc();
$sql = "UPDATE users SET reset_token='$email_token', reset_expires='$expires'  WHERE id=".$user['id'];
 $add_token = mysqli_query($db_conn, $sql);

 if(!$add_token) {
 	response( mysqli_connect_error());
 }

if(DEV_ENV) {
	response($email_token);
	die();
}

$reset_url = SITE_URL.'/reset-password/?reset_token='.urlencode($email_token);
$body = str_replace("***REPLACE WITH URL***", $reset_url, file_get_contents("assets/email-reset-template.html"));

$reset_message = mail($user['email'], "Plant Daddy: Reset Your Password",$body,"From:".ADMIN_EMAIL);

response();
die();