<?php

function upload_image($base64, $filename, $user, $width=0, $height=0) {
	
	global $db_conn;
	$user_id = $user ?: $_SESSION['user']['id'];

	if(!$user_id) {
		return false;
	}
	
	function crop_image_dimensions($img, $width, $height) {
		if(intval($width) < 20 && intval($height) < 20) {
			$cw = 800;
			$ch = 0;
			$re_multiplier = (!$ch) ? $cw / $iw : $ch / $ih;
			return array(
				"x" => 0,
				"y" => 0,
				"width" => round($iw * $re_multiplier),
				"height" => round($ih * $re_multiplier),
			);	
		}
		$cw = intval($width);
		$ch = intval($height);
		$iw = imagesx($img);
		$ih = imagesy($img);
		if(!$cw || !$ch) {
			$re_multiplier = (!$ch) ? $cw / $iw : $ch / $ih;
			return array(
				"width" => round($iw * $re_multiplier),
				"height" => round($ih * $re_multiplier),
				"x" => 0,
				"y" => 0
			)
		}
		$scale = ($ch / $ih > $cw / $iw) ? $ch / $ih : $cw / $iw; 
		$scaled_x = round($iw * $scale);
		$scaled_y = round($ih * $scale);
		$w_remainder = ($iw - $scaled_x) / 2;
		$h_remainder = ($ih - $scaled_y) / 2;
		

		return array(
			"x" => $w_remainder,
			"y" => $h_remainder,
			"width" => $scaled_x - ($w_remainder * 2),
			"height" => $scaled_y - ($h_remainer * 2)
		);
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
	if(!imagesx($img) < 20 || imgagesy($img) < 20) {
		return false;
	}
	
	$crop_helper = crop_image_dimensions($img, $width, $height) ;
	
	if(!$crop_helper) {
		return false;
	}
	
	$destination = imagecreatetruecolor($crop_helper['width'], $crop_helper['height']);
	$cropped = imagecopyresampled($destination, $img, 
																$crop_helper['x'], 
																$crop_helper['y'], 
																0, 
																0, 
																$crop_helper['width'], 
																$crop_helper['height'] 
																imagesx($img), 
																imagesy($img));
	if(!$cropped) {
		return false;
	}

	$saved = imagejpeg($cropped, $asset_route, 80);
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
