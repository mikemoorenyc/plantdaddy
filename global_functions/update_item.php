<?php
function update_item($p) {
  if(!$p || !is_array($p)) {return false;}
	global $db_conn;
  $values = ['update_array',"table","selector_key","selector_value"];

  if(!empty(array_diff($values,array_keys($p)))){return array_diff($values,array_keys($p));}
	if(!is_array($p['update_array']) ||!count($p['update_array'])) {return "no update_array";}

	$update_array = $p['update_array'];

	$update_array['date_modified'] = $update_array['date_modified'] ?: time();

  $db = $db_conn->real_escape_string($p["table"]);

  if($db !== 'users') {
    $update_array['modified_by'] = $update_array['modified_by'] ?: $_SESSION['user']['id'];

  	if(!$update_array['modified_by']) {
  		return false;
  	}
  }





	$safe_values = [];
	foreach($update_array as $k => $v) {
		$value = (is_int($v)) ? intval($v) : "'".$db_conn->real_escape_string($v)."'";

		$safe_values[] = "`$k`= $value";
	}
	$update_string = implode(", ",$safe_values);


	$selector_key = $db_conn->real_escape_string($p['selector_key']);

	$selector_value = (is_int($p['selector_value'])) ? intval($p['selector_value']) : "'".$db_conn->real_escape_string($p['selector_value'])."'";

	//Check if value will update multiple rows
	$rows = get_items(array(
		"table" => $db,
		"selector_key" => $selector_key,
		"selector_value" => $selector_value,
		"limit" => 1
	));



	if(count($rows) !== 1) {return false;}



  $sql = (
	"UPDATE
		$db
	SET
		$update_string
	WHERE
		`$selector_key` = $selector_value"
	);

  $update_item = mysqli_query($db_conn, $sql);

  if(!$update_item){return false;}

	$item = get_items(array(
    "selector_key" => $p['selector_key'],
    "selector_value" => $p['selector_value'],
    "limit" => 1,
    "table" => $p["table"]
	));


  if(!$item) {
    return false;
  }

	return $item;

}

