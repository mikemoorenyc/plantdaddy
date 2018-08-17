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
	return $plants;

}


?>
