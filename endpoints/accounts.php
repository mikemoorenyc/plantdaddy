
<?php
$method = $_SERVER['REQUEST_METHOD'];



switch($method) {
	case 'POST':
		require 'accounts/create-account.php';
		break;
	case 'PUT':
		require 'accounts/edit-account.php';
		break;
	default:
		die();
}



die()


?>
