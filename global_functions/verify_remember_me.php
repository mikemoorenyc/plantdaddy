<?php
function verify_remember_me() {
  global $db_conn;
  //DELETE OLD tokens
  $delete_all =  "DELETE FROM tokens WHERE expires <".time();
  $delete_tokens = mysqli_query($db_conn, $delete_all);
 if(!$_COOKIE[REMEMBER_ME_NAME]) {
  return false;
 }
 $credentials = json_decode($_COOKIE[REMEMBER_ME_NAME],true);
 if(!$credentials['selector'] || !$credentials['validator']) {
  return false;
 }
	
$token = get_items(array(
	"table" => "tokens",
	"selector_key" => "selector",
	"selector_value" => intval($credentials['selector']),
	"limit" => 1
));
	if(!$token) {
		return false;
	}

 if(intval($token['expires']) < time()) {
   $del_id = intval($token['id']);
   $delete =  "DELETE FROM tokens WHERE id=$del_id";
   $delete_item = mysqli_query($db_conn, $delete);
   return false;
 }
 $hash_correct = hash_equals($db_token['hashedValidator'],hash('sha256', $credentials['validator'], true));
 if(!$hash_correct) {
   delete_remember_me();
   return false;
 }
 return login_user($db_token['user_id']);
}
