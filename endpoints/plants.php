<?php
$method = $_SERVER['REQUEST_METHOD'];


switch($method) {
	case 'POST':
		require 'plants/create-plants.php';
		break;
	default:
		die();
}
die()
