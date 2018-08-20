<?php

if(!$url_sections[1]) {
	if(!$_GET['page'] || !is_int(intval($_GET['page'])) || $_GET['page'] < 1) {
		$page = 0;
	} else {
		$page = intval($_GET['page']) - 1;
	}
	$plants = get_items(array(
		"table" => "plants",
		"limit" => 25,
		"offset" => $page * 25		
	));
	if(!$plants) {
		echo json_encode(array());
		die();
	}
	echo json_encode($plants);
	die();
}
if(!is_int($url_sections[1])) {
	errorResponse();
}
$plant = get_plant_by_id($url_sections[1]);

if(!$plant) {
	errorResponse(404);
}

echo json_encode(array("data" => $plant));
die();
?>
