<?php
require_once "/header.php";
require_once "endpoint-header.php";

$success_msg = json_encode(array(
	"msg" => "Message Sent",
	"success" => true
));

if($_SESSION['login_noonce'] !== $response['login_noonce']) {
	die($success_msg);
}

$email = $db_conn->real_escape_string($response['email']);




$get_email =  "SELECT * FROM users WHERE `email` = '".$email."' LIMIT 1";

$user = $db_conn->query($get_user);

if($user->num_rows < 1) {
	die($success_msg);
}

$email_token = generate_noonce();
$expires = strtotime("+2 hours");
$sql = "UPDATE users SET reset_token='$reset_token', reset_expires='$expires'  WHERE id=".$user['id'];
 $add_token = mysqli_query($db_conn, $sql);

 if(!$add_token) {
	 die($success_msg);
 }

$reset_url = SITE_URL.'/reset-password/?reset_token='.$email_token;
$body = str_replace("***REPLACE WITH URL***", $reset_url, file_get_contents("aaset/email-reset-template.html"));

$reset_message = mail($user['email'], "Plant Daddy: Reset Your Password",$body,"From:".ADMIN_EMAIL);

die($success_msg);