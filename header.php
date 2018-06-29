<?php
date_default_timezone_set('UTC');
session_start();
define("REMEMBER_ME_NAME", "plantdaddy_remember_me");

require 'db_connect.php';
require "site_specs.php";

if($need_to_install) {
  die('<a href="install.php">Install Plantdaddy</a>');
}
if(file_exists("./global_functions")) {
  $dir = new DirectoryIterator('./global_functions');
  foreach ($dir as $i) {
    if($i->getExtension() !== 'php' || !$i->isFile()) {
     continue;
    }
    include_once $i->getPathname();
  }

} else {
  echo "set up wrong. can't find functions";
  die();

}


?>
