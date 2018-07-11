<?php
$url = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$url = str_replace("/endpoints","",$url);
$url_sections = explode('/',$url);
$url_sections = array_filter($url_sections);

$open_routes = ['create-account','login-user','require-reset','reset-password'];

if(!$_SESSION['logged_in'] && !in_array($url_sections[0],$open_routes)) {
	http_response_code(403);
	die();
}


switch($url_sections[0]) {
    case 'accounts':
        require 'accounts.php';
        break;
	case "login-user":
		require "login-user.php";
		break;
	case "require-reset":
		require "code-require-reset.php";
		break;
  case "reset-password":
		require "code-reset-password.php";
		break;



    default:

			die();

}

die();
