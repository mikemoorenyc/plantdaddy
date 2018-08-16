<?php
function get_plant_by_id($id) {
	if(!$id) {
		return false;
	}
	$plant =  get_items(array(
		"limit" => 1,
		"table" => "plant",
		"selector_key" => "id",
		"selector_value" => $id
	));
	if (!$plant) {
		return false;
	}
	
	return $plant;
	
	
}



?>
