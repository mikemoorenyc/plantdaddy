<?php

function get_waterings($type ) {
	global $db_conn;
	global $url_sections;
	if($type == 'single') {
		$watering = get_items(array(
			"table" => "waterings",
			"selector_key" => "id",
			"selector_value" => intval($url_sections[1]),
			"limit" => 1
		));
		if(!$watering) {
			return "no watering";
		} else {
			$waterings = array();
			$waterings[$watering['id']] = $watering;
			return $waterings;
		}
		
	}
	$pagination = set_pagination($_GET['page'], $_GET['per_page']);
	switch($type) {
		case "plant": 
			if(!get_plant_id(intval($url_sections[2]))) {
				return 404;
			}
			$selector_key = "plant_id";
			$selector_value =  get_plant_id(intval($url_sections[2]))['id'];
			break;
		case "account":
			if(!get_user_by_id(intval($url_sections[2]))) {
				return 404;
			}
			$selector_key = "created_by";
			$selector_value =  get_user_id(intval($url_sections[2]))['id'];
		default: 
			$selector_key = null;
			$selector_value = null;
	}
	$waterings = get_items(array(
		"table" => "waterings",
		"selector_key" => $selector_key,
		"selector_value" => $selector_value,
		"limit" => $pagination['limit'],
		"offset" => $pagination['offset']
	));
	if(!$waterings) {
		return 204;
	}
	if(!$selector_key) {
		$where_statement = "";
	} else {
		$where_statement = "where `$selector_key` ='$selector_value' ";
	}
	$row = $db_conn->query( "select count(id) as waterings_total from waterings $where_statement "  );
	$total = $row->waterings_total;
	$result_package = array(
		"page" => $pagination['page'],
		"total" => $total,
		"per_page" => $pagination['per_page'],
		"total_pages" => ($total < $pagination['per_page']) ? 1 : ceil($total / $pagination['per_page']) 
	);
	$data = array();
	$data['waterings'] = [];
	$data['order'] = [];
	$data['accounts'] = [];
	$data['plants'] = [];
	foreach($waterings as $k => $w) {
		$data['waterings'][$w['id']] = $w;
		$data['order'][] = $w['id'];
		$user = get_user_by_id($w['created_by']);
		$data['accounts'][$user['id']] = $user;
		$plant = get_plant_by_id($w['plant_id']);
		$data['plants'][$plant['id']] = $plant;
	}
	$result_package['data'] = $data;
	return $result_package;
}


if(is_numeric($url_sections[1])) {
	$waterings = get_waterings("single");
	if($waterings === "no watering") {
		errorResponse(404);
		die();
	}
	echo json_encode($waterings);
	die();
}
if($url_sections[1] === "plant") {
	$waterings = get_waterings("plant");
	if(is_numeric($waterings)) {
		http_response_code($waterings);
		die();
	}
	echo json_encode($waterings);
	die();
}
if($url_sections[1] === "account") {
	$waterings = get_waterings("plant");
	if(is_numeric($waterings)) {
		http_response_code($waterings);
		die();
	}
	echo json_encode($waterings);
	die();
}

$waterings = get_waterings("all");
if(is_numeric($waterings)) {
	http_response_code($waterings);
	die();
}
echo json_encode($waterings);

die();
?>
