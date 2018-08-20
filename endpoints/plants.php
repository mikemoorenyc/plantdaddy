<?php
$method = $_SERVER['REQUEST_METHOD'];


switch($method) {
	case 'POST':
		require 'plants/create-plant.php';
		break;
	case "DELETE" :
		require "plants/delete-plant.php";
		break;
	case "PUT" :
		require "plants/update-plant.php";
		break;
	default:
		require "plants/get-plants.php";
		die();
}
die()
