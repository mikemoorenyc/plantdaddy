<?php

function img_uploader($base64, $filename) {
	$assets_route = $_SERVER['DOCUMENT_ROOT'] ."/assets/user_images/";
	$name = $assets_router.str_replace(['.jpg.','.png','.gif','.jpeg'],'',strtolower($filename)).'.jpg';
	
	 $data = explode( ',', $base64 );
	if($data >1){return false;}
	
	$img = imagecreatefromstring($data[1]);
	
	$scaled = imagescale($img, 1000); 
	
	$saved = imagejpeg($image, $name, 65);
	if(!$saved) {return false;}
	
	return $name;

	
}




?>
