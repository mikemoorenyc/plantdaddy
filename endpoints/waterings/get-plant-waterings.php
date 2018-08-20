<?php

if(!is_numeric($url_sections[2])) {
	errorResponse();
}
$plant_id = intval($url_sections[2]);

$plant = get_plant_id($plant_id);
if(!$plant) {
	errorResponse(404);
}
$page =(is_numeric($_GET['page']) && intval($_GET['page']) > 0) ? 0 : intval($_GET['page']);
$per_page = (is_numeric($_GET['per_page']) && intval($_GET["per_page"]) > 0) ? 25 : intval($_GET['per_page']);

$waterings = get_items(array(
	"table" => "waterings",
	"selector_key" => "plant_id",
	"selector_value" => $plant['id'],
	"limit" => $per_page,
	"offset" => ($page -1) * 25	
));
if(!$waterings) {
	http_response_code(204);
	die();
}
$row = $db_conn->query( "select count(id) as waterings_total from waterings where `plant_id`= '$plant_id'"  );
$total = $row->waterings_total;

$result_package = array(
	"page" => $page,
	"total" => $total,
	"per_page" => $per_page,
	"total_pages" => ($total < $per_page) ? 1 : ceil($total / $per_page) 
);
$data = array();
$data['waterings'] = [];
$data['order'] = [];
$data['accounts'] = [];


foreach($waterings as $w) {
	$data['waterings'][$w['id']] = $w;
	$data['order'][] = $w['id'];
	if(!$data['accounts'][$w["created_by"]]) {
		$user = get_user_by_id($w['created_by']);
		$data['accounts'][$user['id']] = $user;
	}
}
$result_package['data'] = $data;

echo json_encode($result_package); 
die(); 


?>
