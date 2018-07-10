<?PHP

function get_user($key,$selector) {
  global $db_conn;
  if(!$selector || !$key) {
    return 'bad parameters';
  }
	
  return get_items("users",$columns, $key, $selector);
}

?>
