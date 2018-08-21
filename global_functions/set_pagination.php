<?php
function set_pagination($page, $per_page) {
	if(intval($per_page) === -1) {
		return array(
			"limit" => 9999,
			"offset" => 0,
			"per_page" => 9999,
			"page" => 1
		);
	}
	$limit = intval($per_page);
	if(!$limit) {
		$limit = 25;
	}
	$offset = intval($page); 
	if(!$offset) {
		$offset = 1;
	}
	return array(
		"limit" => $limit,
		"offset" => $limit * ($offset-1),
		"per_page" => $limit,
		"page" => $offset
	);
	
}
