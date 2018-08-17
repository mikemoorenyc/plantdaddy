<?php

function plant_title_exists($title) {
	$all_plants =  get_plants();
	if(empty($all_plants)) {
		return false;
	}
	$matches = array_filter($all_plants,function($p) {
		return strtolower($title) === strtolower($p['title']);
	});
	if(!empty($matches)) {
		return true;
	}
	return false;

	
	
}

?>
