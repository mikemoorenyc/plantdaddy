<?php
function update_item($p) {
  if(!$p || !is_array($p)) {return false;}
  global $db_conn;
  //MAKE SURE EVERYTHING IS THERE
  $values = ['update_key','update_value',"db","selector_key","selector_value"];
  if(!empty(array_diff($values,array_keys($p)))){return false;}

  $db = $db_conn->real_escape_string($p["db"]);
  $update_key = $db_conn->real_escape_string($p["update_key"]);
  $update_value = (is_int($p['update_value']))? intval($p['update_value']) : "'".$db_conn->real_escape_string($p['update_value'])."'";
  $selector_key = $db_conn->real_escape_string($p['selector_key']);
  $selector_value = (is_int($p['selector_value'])) ? intval($p['selector_value']) : "'".$db_conn->real_escape_string($p['selector_value'])."'";
  $time = time();

  $sql = "UPDATE $db SET date_modified =$time, `$update_key` = $update_value WHERE `$selector_key` = $selector_value";


  $update_item = mysqli_query($db_conn, $sql);
  if(!$update_item){return false;}


  $get_item_sql = "SELECT * FROM $db WHERE `$selector_key` = $selector_value LIMIT 1";
	$get_item = $db_conn->query($get_item_sql);
  if(!$get_item) {
    return false;
  }
  if($get_item->num_rows < 1) {
    return false;
  }
  return $get_item->fetch_assoc();

}

  ?>
