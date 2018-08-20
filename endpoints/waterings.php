<?php

$method = $_SERVER['REQUEST_METHOD'];
if(!$_SESSION['logged_in']) {
	errorResponse(401) ;
}
switch($method) {
	case 'POST':
		require 'waterings/create-watering.php';
		break;
	default:
		require "waterings/get-waterings.php";
		break;
}
die()


?>
