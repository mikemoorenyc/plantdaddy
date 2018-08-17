<?php

function upload_image($base64, $filename, $user) {

	global $db_conn;
	$user_id = $user ?: $_SESSION['user']['id'];

	if(!$user_id) {
		return false;
	}
$directory = $_SERVER['DOCUMENT_ROOT'].'/assets/user_images';

  if ( ! is_dir($directory)) {

    mkdir($directory,0755, true);
  }
	$fname = str_replace(['.jpg','.png','.gif','.jpeg'],'',strtolower($filename)).'_'.time().'.jpg';

	$public_path = "/assets/user_images/".$fname;
	$asset_route = $directory.$name."/".$fname;

	$exists = file_exists($asset_route);

	$data = explode( ',', $base64 );
	if($data <1){return false;}


	$img = imagecreatefromstring(base64_decode($data[1]));
	if(!$img) {
		return false;
	}

	$scaled = imagescale($img, 800);

	if(!$scaled) {
		return false;
	}

	$saved = imagejpeg($scaled, $asset_route, 75);
	if(!$saved) {return false;}

	if(!$exists) {
		$insert_array = array(
			"url" => $public_path,
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
		"selector_value" => $public_path,
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
