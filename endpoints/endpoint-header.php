<?php

//header('Content-Type: application/json');
$response = json_decode(file_get_contents('php://input'),true);


if($_GET['form']) {
	$response = $_POST;
}

function errorResponse($code=400, $error_code="general") {
	header('Error-Code: '.$error_code);
	http_response_code($code);

	die();
}

function makeHSL() {
    $h = rand(0,360);
    $l = rand(0,50);

    return "hsl($h, 100%, $l%)";
}
