<?php
use \Colors\RandomColor;

$response = json_decode(file_get_contents('php://input'),true);

function errorResponse($code=400, $error) {
	if(is_array($error)) {
		$error['success'] = false;
		$error = json_encode($error);
	}
	http_response_code($code);
	echo $error;
	die();
}

?>
