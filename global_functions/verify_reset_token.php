<?php
verify_reset_token($token) {
  global $db_conn;
  if(!$token) {return false;}

  $get_user =  "SELECT * FROM users WHERE `reset_token` = '".$db_conn->real_escape_string($token)."' LIMIT 1";
  $user = $db_conn->query($get_user);
  if(!$user) {return false;}
  if($user->num_rows < 1) {return false;}
  $user->fetch_assoc();
  //RESET EVERTHING
  $id = $user['id'];
  $expires = $user["reset_expires"]
  $sql = "UPDATE users SET reset_token=null, reset_expires=0  WHERE id=".$id;
  $delete_token = mysqli_query($db_conn, $sql);
  $_SESSION['reset_token_verified'] = true;

  if( $expires < time()) {return false;}

  return true;
}

 ?>
