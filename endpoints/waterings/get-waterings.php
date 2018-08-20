<?php

if(is_numeric($url_sections[1])) {
	require "get-single-watering.php";
	die();
}
if($url_sections[1] === "plant") {
	require "get-plant-waterings.php";
	die();
}


die();
?>
