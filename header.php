<?php
date_default_timezone_set('UTC');
session_start();

require 'db_connect.php';

if(file_exists("/glpbal_functions")) {
  $dir = new DirectoryIterator($dir_path.'global_functions');
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
