<?php
function delete_remember_me() {
  global $db_conn;
   $credentials = json_decode($_COOKIE[REMEMBER_ME_NAME],true);
   $sql =  "DELETE FROM tokens WHERE selector=".intval($credentials['selector']);
   $deleted_token =  mysqli_query($db_conn, $sql);
   if($deleted_token) {
     setcookie(REMEMBER_ME_NAME, "", time() - 3600,'/');
     return true;
   } else {
     return false;
   }
}
