<?php

$url = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);


switch($url) {
    case '/create-account/':
        require 'create-account.php';
        break;


    default:
			http_response_code(404);
			die();
				
}


?>
