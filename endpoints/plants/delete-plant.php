<?php
require_once $_SERVER['DOCUMENT_ROOT'] ."/header.php";
require_once $_SERVER['DOCUMENT_ROOT'] ."/endpoints/endpoint-header.php";

if( !$url_sections[1] || !is_int($url_sections[1])) {
	errorResponse();
}

//GET PLANT
$plant = get_plant_by_id($url_sections[1]);

if(!$plant) {
	errorResponse(404);
}
$deleted_plant = delete_item("plants", $plant['id']);

if(!$deleted_plant) {
	errorResponse(500);
}
http_response_code(204);



die();
?>
