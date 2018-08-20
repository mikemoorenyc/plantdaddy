<?php
require_once $_SERVER['DOCUMENT_ROOT'] ."/header.php";
require_once $_SERVER['DOCUMENT_ROOT'] ."/endpoints/endpoint-header.php";


if(!is_numeric($response["plant_id"])) {
	errorResponse(400, "bad_plant_id");
}
$plant = get_plant_by_id(intval($response['plant_id']));

if(!$plant) {
	errorResponse(400, "bad_plant_id");
}
$insert_fields = array(
	"date_created" => time(),
	"created_by" => $_SESSION['user']['id'],
	"plant_id" => intval($response["plant_id"])
);
$add_watering = insert_item("waterings", $insert_fields);

if(!$add_watering) {
	errorResponse(501, "could not add plant");
}
http_response_code(201);
echo json_encode($add_watering);
die();
?>
