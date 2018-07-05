<?php
if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
	$error = array(
		"msg" => "Cannot logout with ajax request"
	);
	errorResponse($error);
	die();
}
$_SESSION['logged_in'] = null;
$_SESSION['user'] = null;
delete_remember_me();

header( 'Location: '.SITE_URL ) ;
die();
 ?>
