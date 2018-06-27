<?php
$response = json_decode(file_get_contents('php://input'),true);

function errorResponse($code=400, $error) {
	http_response_code($code);
	echo json_encode($error);
	die();
}

?>
