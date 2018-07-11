<?PHP

function get_user($key,$selector) {
  global $db_conn;
  if(!$selector || !$key) {
    return 'bad parameters';
  }
  $columns = ['id','email','first_name',"color","telephone","photo_id","date_created","date_modified"];
  $user =  get_items("users",$columns, $key, $selector);
  if(!$user) {return false;}

  $user['photo_url'] = ($user['photo_id']) ? get_photo_by_id($user['photo_id']) : '';
  return $user;
}

