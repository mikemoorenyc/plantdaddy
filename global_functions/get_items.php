
<?php
function get_items($ga) {
	if(!is_array($ga) || !$ga['table'] || !$ga['selector_key'] || !$ga['selector_value'] ) {
		return false;
	}
	global $db_conn;
	
	if(!$ga['columns'])) {
		$safe_values = [];
		$ca = (is_array($ga['columns'])) ? $ga['columns'] : explode(",",$ga['columns']);
		foreach($ca as $v) {
			$string = $db_conn->real_escape_string($v);
			if($string === 'password') {
				continue;
			}
			$safe_values[] = $string;
		}
		$safe_values = implode(", ", $safe_values);
	} else {
		$safe_values = "*"
	}
	$safe_key = $db_conn->real_escape_string($ga['selector_key']);
	$safe_selector = $db_conn->real_escape_string($ga['$selector_value']);
	$safe_limit = ($ga['limit']) ? "LIMIT ".intval($ga['limit']) : ""; 

	$get_items =  "SELECT $safe_values FROM $table WHERE `$safe_key` = '$safe_selector' $safe_limit";

	$items = $db_conn->query($get_items);
	if(!$items) {
    return false;
  }
  if($items->num_rows < 1) {
    return false;
  }
	if($safe_limit < 2) {
		return $items->fetch_assoc();
	}
	while ($row = $items->fetch_assoc()) {
    $rows[] = $row;
  }
  return $rows;
}
