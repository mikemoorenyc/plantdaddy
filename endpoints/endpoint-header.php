<?php
var_dump($_SESSION['login_noonce']);
//header('Content-Type: application/json');
$response = json_decode(file_get_contents('php://input'),true);

if($_GET['form']) {
	$response = $_POST;
}

function errorResponse($code=400, $error) {
//	$_SESSION['login_noonce'] = generate_noonce();
	if(is_array($error)) {
		$error['success'] = false;
		$error['error_code'] = $error['error_code'] ?: "general";
		$error['new_login_noonce'] = $_SESSION['login_noonce'];
	}
	http_response_code($code);
	echo json_encode($error);
	die();
}

function makeHSL() {
    $h = rand(0,360);
    $l = rand(0,50);

    return "hsl($h, 100%, $l%)";
}



?>
