<?php

require_once $_SERVER['DOCUMENT_ROOT'] ."/header.php";
require_once $_SERVER['DOCUMENT_ROOT'] ."/endpoints/endpoint-header.php";

if(!$_SESSION['logged_in']) {
	errorResponse();
}

$plant = get_items(array(
	"selector_key" => "id",
	"selector_value" => $response['id'],
	"limit" => 1,
	"table" => "plants"
));

if(!$plant) {
	errorResponse(404);
}

$update_keys = [];

foreach($response as $k => $v) {
	if($v) !== $plant[$k]) {
		$update_keys[] = $k;
	}
}

if(in_array("title", $update_keys) && !$response['title']) {
	errorResponse(400, "no title");
}

if(plant_title_exists($response['title']) {
	errorResponse(400,"title exists");
}

?>
