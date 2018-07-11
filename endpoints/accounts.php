
<?php
$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
	case 'POST':
		require 'accounts/create-account.php';
		break;
	default:
		die();
}



die()


?>
