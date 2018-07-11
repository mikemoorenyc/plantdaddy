<?php

function upload_image($base64, $filename, $user) {
	global $db_conn;
	$user_id = $user ?: $_SESSION['user']['id'];

	if(!$user_id) {
		return false;
	}

	$name = "/assets/user_images/".str_replace(['.jpg.','.png','.gif','.jpeg'],'',strtolower($filename)).'.jpg';
	$asset_route = $_SERVER['DOCUMENT_ROOT'] .$name;

	$exists = file_exists($asset_route);

	$data = explode( ',', $base64 );
	if($data >1){return false;}

	$img = imagecreatefromstring($data[1]);
	if(!$img) {
		return false;
	}

	$scaled = imagescale($img, 1000);

	$saved = imagejpeg($image, $asset_route, 65);
	if(!$saved) {return false;}

	if(!$exists) {
		$insert_array = array(
			"url" => $name,
			"date_created" => time(),
			"date_modified" => time(),
			"created_by" => $user_id,
			"modified_by" => $user_id
		);
		$image_id = insert_item("images", $insert_array);
		if(!$image_id) {
			return false;
		}
		return $image_id;

	}

	$update_array = array(
		"db" => "images",
		"selector_key" => "url",
		"selector_value" => $name,
		"update_array" => array(
			"modified_by" => $user,
			"date_modified" => time()
		)
	);
	$update_id = update_item($update_array);
	if(!$update_id) {
		return false;
	}
	return $update_id;





}




?>
