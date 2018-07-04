<?PHP

function get_user($key,$selector) {
  global $db_conn;
  if(!$selector || !$key) {
    return 'bad parameters';
  }
	$get_user =  "SELECT * FROM users WHERE `$key` = '".$db_conn->real_escape_string($selector)."' LIMIT 1";
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
