<?php
require_once $_SERVER['DOCUMENT_ROOT'] ."/header.php";

require_once "endpoint-header.php";





if(!$response){
	errorResponse();

};



if( $_SESSION['login_noonce'] !== $response['login_noonce'] || $_SESSION['logged_in']) {
	errorResponse();
	
}

$_SESSION['login_noonce'] = null;

$email = $db_conn->real_escape_string($response['email']);




$get_email =  "SELECT * FROM users WHERE `email` = '".$email."' LIMIT 1";

$user = $db_conn->query($get_email);
if(!$user) {
	http_response_code(204);
	die();
}

if($user->num_rows < 1) {
	http_response_code(204);
	die();
}

$email_token = generate_noonce();
$expires = strtotime("+2 hours");
$user = $user->fetch_assoc();
$sql = "UPDATE users SET reset_token='$email_token', reset_expires='$expires'  WHERE id=".$user['id'];
 $add_token = mysqli_query($db_conn, $sql);

 if(!$add_token) {
 	response(500, mysqli_connect_error());
 }

if(DEV_ENV) {
	echo json_encode($email_token);
	die();
}

$reset_url = SITE_URL.'/reset-password/?reset_token='.urlencode($email_token);
$body = str_replace("***REPLACE WITH URL***", $reset_url, file_get_contents("assets/email-reset-template.html"));

$reset_message = mail($user['email'], "Plant Daddy: Reset Your Password",$body,"From:".ADMIN_EMAIL);

http_response_code(204);
die();
