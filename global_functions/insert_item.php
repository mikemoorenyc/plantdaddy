<?php
function insert_item($table, $insert_array) {
	global $db_conn;
	if(!is_array($insert_array) || !$table ) {
		return false;
	}
	$safe_values = [];
	foreach($insert_array as $k =>$v) {
		if(is_integer($v)) {
			$safe_values[$k] = intval($v);
			continue;
		}
		$safe_values[$k] = "'".$db_conn->real_escape_string($v)."'";
	}

	$insert_values = implode(", ",$safe_values);
	$insert_keys = implode(", ", array_keys($safe_values));

	$db = $db_conn->real_escape_string($table);
	$insert_db = "INSERT INTO $db ($insert_keys) VALUES ($insert_values)";
	$insert_item = mysqli_query($db_conn, $insert_db);
	if(!$insert_item) {
		echo mysqli_error($db_conn);
		die();
		return false;
	}
	return mysqli_insert_id($db_conn);

}
