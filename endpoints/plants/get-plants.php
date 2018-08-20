<?php

if(!$url_sections[1]) {
	echo json_encode(get_plants());
	die();
}
if(!is_int($url_sections[1])) {
	errorResponse();
}
$plant = get_plant_by_id($url_sections[1]);

if(!$plant) {
	errorResponse(404);
}

echo json_encode($plant);
die();
?>
