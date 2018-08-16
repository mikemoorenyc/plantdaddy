<?php
require_once $_SERVER['DOCUMENT_ROOT'] ."/header.php";
require_once $_SERVER['DOCUMENT_ROOT'] ."/endpoints/endpoint-header.php";
if(!$_SESSION['logged_in']) {
	errorResponse(401);
}
if(!$response['id']) {
	errorResponse();
}
//GET PLANT
$plant = get_plant_by_id($response['id']);

if(!$plant) {
	errorResponse(404);
}

die();
?>
