<?php
$method = $_SERVER['REQUEST_METHOD'];


switch($method) {
	case 'POST':
		require 'plants/create-plant.php';
		break;
	case "DELETE" :
		return "plants/delete-plant.php";
		break;
	case "PUT" :
		return "plants/update-plant.php";
		break;
	default:
		die();
}
die()
