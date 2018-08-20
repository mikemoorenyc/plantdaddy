<?php

function delete_item($table,$id) {
	if(!$table ||!$id || !is_int($id)) {
		return false;
	}
	global $db_conn;
	$safe_table = $db_conn->real_escape_string($table);
	$safe_id = intval($id);
	$sql =  "DELETE FROM $safe_table WHERE selector=$safe_id";
  $deleted_item =  mysqli_query($db_conn, $sql);
	if(!$deleted_item) {
		return false;
	}
	return true;
}




?>
