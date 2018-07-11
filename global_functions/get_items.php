
<?php
function get_items($table,$values="*", $selector_key, $selector_value, $limit=1 ) {
	if(!$selector_key || !$selector_value) {
		return false;
	}
	global $db_conn;
	$safe_values = [];
	if(is_array($values)) {
		foreach($values as $v) {
			$safe_values[] = $db_conn->real_escape_string($v);
		}
		$safe_values = implode(", ", $safe_values);
	} else {
		$safe_values = $db_conn->real_escape_string($value);
	}
	$safe_key = $db_conn->real_escape_string($selector_key);
	$safe_selector = $db_conn->real_escape_string($selector_value);
	$safe_limit = intval($limit);

	$get_items =  "SELECT $safe_values FROM $table WHERE `$safe_key` = '$safe_selector' LIMIT ".$safe_limit;

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
