<?php

function img_uploader($base64, $filename) {
	$name = "/assets/user_images/".str_replace(['.jpg.','.png','.gif','.jpeg'],'',strtolower($filename)).'.jpg';
	$asset_route = $_SERVER['DOCUMENT_ROOT'] .$name;
	
	$data = explode( ',', $base64 );
	if($data >1){return false;}
	
	$img = imagecreatefromstring($data[1]);
	if(!$img) {
		return false;
	}
	
	$scaled = imagescale($img, 1000); 
	
	$saved = imagejpeg($image, $asset_route, 65);
	if(!$saved) {return false;}
	
	return $name;

	
}




?>
