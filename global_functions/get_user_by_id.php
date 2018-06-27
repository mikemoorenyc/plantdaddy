<?php

function get_user_by_id($id=$_SESSION['current_user']['id']) {
	global $db_conn;
	$get_user =  "SELECT * FROM users WHERE `id` = '".$db_conn->real_escape_string($id)."' LIMIT 1";
	$user = $db_conn->query($get_user);
  if(!$user) {
    return false;
  }
  if($user->num_rows < 1) {
    return false;
  }
  return $user->fetch_assoc();
	
	
	
}

?>
