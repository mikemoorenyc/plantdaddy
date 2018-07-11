<?php
$url = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$url = str_replace("/endpoints","",$url);
$url_sections = explode('/',$url);
$url_sections = array_filter($url_sections);



switch($url_sections[0]) {
    case 'create-account':
        require 'create-account.php';
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
  case "logout-user":
  		require "code-logout-user.php";
  		break;


    default:

			die();

}

die();
