<?php

if(!is_numeric($url_sections[2])) {
	errorResponse();
}
$plant_id = intval($url_sections[2]);

$plant = get_plant_id($plant_id);
if(!$plant) {
	errorResponse(404);
}
$pagination = set_pagination($_GET['page'], $_GET['per_page']);

$waterings = get_items(array(
	"table" => "waterings",
	"selector_key" => "plant_id",
	"selector_value" => $plant['id'],
	"limit" => $pagination['limit'],
	"offset" => $pagination['offset']
));
if(!$waterings) {
	http_response_code(204);
	die();
}
$row = $db_conn->query( "select count(id) as waterings_total from waterings where `plant_id`= '$plant_id'"  );
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
