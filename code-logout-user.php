<?php

$_SESSION['logged_in'] = null;
$_SESSION['user'] = null;
delete_remember_me();
header( 'Location: '.SITE_URL."/login/" ) ;
die();
