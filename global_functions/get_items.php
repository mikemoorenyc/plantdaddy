
<?php
function get_items($ga) {
	if(!is_array($ga) || !$ga['table']  ) {
		return false;
	}
	global $db_conn;
	if(!$ga['selector_key'] || !$ga['selector_value']) {
		$where_statement = "";
	}else {
		$safe_key = $db_conn->real_escape_string($ga['selector_key']);
		$safe_value = $db_conn->real_escape_string($ga['selector_value']);
		$where_statement = " WHERE `".$safe_key."` = '".$safe_selector."' ";
		
	}
		


	if($ga['columns']) {
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
		$safe_values = "*";
	}
	

	$table = $db_conn->real_escape_string($ga['table']);

	$safe_limit = intval($ga['limit']) ?: 100;

	$order = (in_array(strtoupper($ga['order']),['DESC','ASC']) ) ? $db_conn->real_escape_string(strtoupper($ga['order'])) : "DESC";

	$order_by = ($ga['order_by']) ? $db_conn->real_escape_string($ga['order_by']) : "date_created";

	$offset = intval($ga['offset']) ?: 0;

	$get_items =  (
		"SELECT
			$safe_values
		FROM
			$table
		$where_statement
		ORDER BY
			$order_by $order
		LIMIT $safe_limit
		OFFSET $offset");


	$items = $db_conn->query($get_items);


	if(!$items) {
    return mysqli_error($db_conn);
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
