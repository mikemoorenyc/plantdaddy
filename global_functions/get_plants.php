<?php

function get_plants($amount, $columns) {
	$plants = get_items(
		array(
			"limit" => $amount ?: 999,
			"fields" => $columns ?: null,
			"table" => "plants"
		)
	);
	if(!$plants) {
		return [];
	}
	foreach($plants as $k => $p) {
		$plants[$k]["photo_url"] = ($p['photo_id']) ? get_photo_by_id($p['photo_id']) : '';
	}
	return $plants;

}


?>
