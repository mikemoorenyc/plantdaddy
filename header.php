<?php



define("REMEMBER_ME_NAME", "plantdaddy_remember_me");



require 'db_connect.php';
require "site_specs.php";

define("ADMIN_EMAIL", $site_specs['admin_email']);
define("SITE_URL",$site_specs['site_url']);

if($need_to_install) {
	$info_box_content = '
	  <p>Plantdaddy&rsquo;s database needs to be install. Make sure you have the information filled out in <code>database_info.php</code> filled out correctly</p>
  <a class="button" href="install.php">Install now</a>
		'
		include "info_box.php"
		die();
}
if(file_exists($_SERVER['DOCUMENT_ROOT']."/global_functions")) {
  $dir = new DirectoryIterator($_SERVER['DOCUMENT_ROOT']."/global_functions");
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
