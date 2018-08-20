
<?php
$method = $_SERVER['REQUEST_METHOD'];



switch($method) {
	case 'POST':
		require 'accounts/create-account.php';
		break;
	case 'PUT':
		require 'accounts/update-account.php';
		break;
	case 'GET':
		require 'accounts/get-account.php';
		break;
	default:
		die();
}



die()


?>
