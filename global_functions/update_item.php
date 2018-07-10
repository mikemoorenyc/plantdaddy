<?php
function update_item($p) {
  if(!$p || !is_array($p)) {return false;}
  global $db_conn;
  //MAKE SURE EVERYTHING IS THERE
  $values = ['update_array',"db","selector_key","selector_value"];
  if(!empty(array_diff($values,array_keys($p)))){return false;}
	if(!is_array($p['update_array'] )) {return false;}
	$update_array = $p['update_array'];
	$update_array['date_modified'] = $update_array['date_modified'] ?: time();
	$update_array['modified_by'] = $update_array['modified_by'] ?: $_SESSION['user']['id'];
	
	if(!$update_array['modified_by']) {
		unset($update_array['modified_by']);
	}

  $db = $db_conn->real_escape_string($p["db"]);
	$safe_values = [];
	foreach($update_array as $k => $v) {
		$value = (is_int($v)) ? intval($v) : "'".$db_conn->real_escape_string($v)."'";
		
		$safe_values[] = "`$k`= $value";
	}
	$update_string = implode(", ",$safe_values); 

  $selector_key = $db_conn->real_escape_string($p['selector_key']);
  $selector_value = (is_int($p['selector_value'])) ? intval($p['selector_value']) : "'".$db_conn->real_escape_string($p['selector_value'])."'";

  $sql = "UPDATE $db SET $update_string WHERE `$selector_key` = $selector_value";


  $update_item = mysqli_query($db_conn, $sql);
  if(!$update_item){return false;}


  $get_item_sql = "SELECT id FROM $db WHERE `$selector_key` = $selector_value LIMIT 1";
	$get_item = $db_conn->query($get_item_sql);
  if(!$get_item) {
    return false;
  }
  if($get_item->num_rows < 1) {
    return false;
  }
  $item = $get_item->fetch_assoc();
	
	return $item['id'];

}

  ?>
