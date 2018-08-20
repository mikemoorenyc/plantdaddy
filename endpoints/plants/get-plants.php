<?php

if($url_sections[1]) {
	if(!is_numeric($url_sections[1])) {
		errorResponse();
	}
	$id = intval($url_sections[1]);
	$plant = get_plant_by_id($id);
	if(!$plant) {
		errorResponse(404);
	}
	if($_SESSION['plant_requests'][$id] && $_SESSION['plant_requests'][$id] > $plant['date_modified']) {
		$_SESSION['plant_requests'][$id]= time();
		http_response_code(304);
		die();
	}
	$_SESSION['plant_requests'][$id]= time();
	echo json_encode(array("data" => $plant));
	die();
}

if(!$_GET['page'] || !is_numeric($_GET['page']) || intval($_GET['page']) < 1) {
	$page = 1;
} else {
	$page = intval($_GET['page']);
}
	$plants = get_items(array(
		"table" => "plants",
		"limit" => 25,
		"offset" => ($page -1) * 25		
	));
	if(!$plants) {
		$plants = [];
	}

	$row = $db_conn->query( "select count(id) as num_rows from table"  );
	$total = $row->num_rows;

	$total_pages = ($total < 25) ? 1 : (int) ($$total /25);
	$return_package = array(
		"page" => $page,
		"per_page" => 25,
		"total" => $total,
		"total_pages" => $total_pages,
		"data" => $plants
	);
echo json_encode($return_package);
	die();
?>
