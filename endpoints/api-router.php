<?php

$url = str_replace('/endpoints','',$url);


switch($url) {
    case '/create-account/':
        require 'create-account.php';
        break;
	case "/login-user/":
		require "login-user.php";
		break;
	case "/require-reset/":
		require "code-require-reset.php";
		break;
  case "/reset-password/":
		require "code-reset-password.php";
		break;
  case "/logout-user/":
  		require "code-logout-user.php";
  		break;


    default:

			die();

}

die();
?>
