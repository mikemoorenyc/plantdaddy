<?php
require_once $_SERVER['DOCUMENT_ROOT'] ."/header.php";
require_once $_SERVER['DOCUMENT_ROOT'] ."/endpoints/endpoint-header.php";

if(!$_SESSION['logged_in']) {
	errorResponse(401);
}
$required_fields =["title", "watering_frequency"];
$required_diff = array_diff($required_fields, array_keys($response));

if(!empty($required_diff)) {
	errorResponse(400, "empty_fields ".implode(",",$required_diff));
}

//CHECK IF EMAIL EXISTS
$get_plant =  "SELECT title FROM plants WHERE `title` = '".$db_conn->real_escape_string($response['title'])."' LIMIT 1";
$plane = $db_conn->query($get_plant);
if($plant->num_rows > 0) {
	errorResponse(406, "duplicate name");
}
$insert_fields = array(
	"title" => $response['title'],
	"watering_frequency" => $response["watering_frequency"],
	"date_created" => time(),
	"date_modified" => time(),
	"created_by" => $_SESSION['user']['id'],
	"modified_by" => $_SESSION['user']['id']
);
$add_plant = insert_item("plants", $insert_fields);
if(!$add_plant) {
	errorResponse(501, "insert_error");
}
if(!$response['photo_data'])  {
	echo json_encode(get_plant_by_id($add_plant['id']));
	die();
}



$photo_id = upload_image($response['photo_data'], "plant_img_".$user['id'], $_SESSION['user']['id']);
if($photo_id) {
	$update_array = array(
		"db" => "plants",
		"selector_key" => "id",
		"selector_value" => $add_plant['id'],
		"update_array" => array(
			"photo_id" => $photo_id
		)
	);
	$insert_photo = update_item($update_array);
}

echo json_encode(get_plant_by_id($add_plant['id']));
die();



die();
?>
