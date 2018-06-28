<?php
function create_remember_me($id) {
  global $db_conn;
  if($_COOKIE['ur_fat_remember_me']) {
    //DELETE OLD REMEMBER ME
    delete_remember_me();
  }
  $selector = time();
  $plain_token = generate_noonce();
  $validator = hash('sha256', $plain_token, true);
  $user_id = intval($id);

}

