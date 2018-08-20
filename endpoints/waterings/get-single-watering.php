<?php
$w_id = intval($url_sections[1]);

$watering = get_items(array(
	"table" => "waterings",
	"selector_key" => "id",
	"selector_value" => $w_id,
	"limit" => 1
));
if(!$waterings) {
	errorResponse(404);
	die();
}
$waterings = array();

$waterings[$watering['id']] = $watering;
echo json_encode(array("data" => $waterings));
die();
