<?php
function create_remember_me($id) {
  global $db_conn;
  if($_COOKIE[REMEMBER_ME_NAME]) {
    //DELETE OLD REMEMBER ME
    delete_remember_me();
  }
  $selector = time();
  $plain_token = generate_noonce();
  $validator = hash('sha256', $plain_token, true);
  $user_id = intval($id);
	$expires = strtotime("+6 month");
  $db_token = insert_item('tokens',array(
    "selector" => $selector,
    "hashedValidator" => $validator,
    "user_id" => $user_id,
    "expires" => $expires
  ));
  if($db_token) {
    setcookie(REMEMBER_ME_NAME, json_encode(array("selector" => $selector , "validator" => $plain_token)),$expires, '/');
    return true;
  } else {
    return false;
  }
}