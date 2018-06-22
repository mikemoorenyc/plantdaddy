<?php
require 'db_connect.php';
if(!$need_to_install) {
  die('Site is already installed');
}
$errors = false;

$users_table = "CREATE TABLE users (
  id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) NOT NULL DEFAULT '',
  password VARCHAR(255) NOT NULL ,
	first_name VARCHAR(255) NOT NULL,
	photo_url VARCHAR(255),
	phone_number INT(10),
  date_created BIGINT(20) NOT NULL DEFAULT 0
)";

$tokens_table = "CREATE TABLE tokens (
  id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  selector BIGINT(20) NOT NULL DEFAULT 0,
  hashedValidator char(64),
  user_id BIGINT(20) UNSIGNED NOT NULL default 0,
  expires BIGINT(20) NOT NULL DEFAULT 0
)";

$plants_table = "CREATE TABLE plants (
  id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title TEXT NOT NULL,
  photo_url VARCHAR(255),
  watering_frequency SMALLINT(10) NOT NULL DEFAULT 3,
	on_alert TINYINT(1) NOT NULL DEFAULT 0
  created_by BIGINT(20) UNSIGNED NOT NULL default 0,
  date_created BIGINT(20) NOT NULL DEFAULT 0
)";

$waterings_table = "CREATE TABLE waterings (
  id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  plant_id BIGINT(20) UNSIGNED NOT NULL,
  created_by BIGINT(20) UNSIGNED NOT NULL default 0,
  date_created BIGINT(20) NOT NULL DEFAULT 0
)";

$create_plants = mysqli_query($db_conn, $plants_table);
$create_tokens = mysqli_query($db_conn, $tokens_table);
$create_users = mysqli_query($db_conn, $users_table);
$create_waterings = mysqli_query($db_conn, $waterings_table);
if(!$create_plants || !$create_tokens || !$create_users || !$create_waterings) {
  die('something went wrong');
}
echo 'Tables created <a href="/">Go to Plant Daddy</a>';
die();

?>
