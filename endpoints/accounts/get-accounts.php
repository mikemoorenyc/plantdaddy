<?php
require_once $_SERVER['DOCUMENT_ROOT'] ."/header.php";
require_once $_SERVER['DOCUMENT_ROOT'] ."/endpoints/endpoint-header.php";
if(!$_SESSION['logged_in']) {
	errorResponse();
}

if(!$response['id']) {
	errorResponse();
}

//Get User
$db_user = get_user_by_id($response['id']);
if(!$db_user) {
	errorResponse();
}

//Check if User Needs Updating
$needs_updating = false;
$keys = ["id", 'photo_url', "email", "first_name" , "color","telephone"];
foreach($keys as $k) {
	if($db_user[$k] !== $response[$k] {
		$needs_updating = true;
	}
}
if(!$needs_updating) {
	errorResponse(304);
}

echo json_encode($db_user);
die();
