<?php
if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
	echo json_encode({
    error: true,
    msg: "Cannot logout with ajax request"
  })
	die();
}
$_SESSION['logged_in'] = null;
$_SESSION['user'] = null;
delete_remember_me();

header( 'Location: '.SITE_URL ) ;
die();
 ?>
