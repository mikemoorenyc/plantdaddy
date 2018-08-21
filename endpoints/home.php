<?php
$plants = array();
$waterings = array();
$accounts = array();
$sorter = array();
if(empty(get_plants()) {
	http_response_code(204);
	die();
}
foreach(get_plants() as $p) {
	$plant = $p;
	$watering =  get_items(array(
		"table" => "waterings",
		"limit" => 1,
		"selector_key" => "plant_id",
		"selector_value" => $p['id'];
	));
	if(!$watering) {
		$plant['last_watered'] = null;
		$sorter[] = array(
			"id" => $p['id'],
			"date" => 0
		);
	} else {
		$plant['last_watered'] = $watering['id'];
		$waterings[$watering['id']] = $watering;
		$account = get_user_by_id($watering['created_by']);
		$accounts[$account['id']] = $account;
		$sorter[] = array(
			"id" => $p['id'],
			"date" => $watering['date_created']
		)
	}
	$plants[$p['id']] = $plant;
	
	
}
usort($sorter,function($a,$b) {
	return $a['date'] - $b['date'];
});
$sorter = array_filter($sorter,function($v) {
	return $a['id'];
});


$response_package = array(
	"plant_total" => count($plants),
	"plants" => $plants,
	"accounts" => $accounts,
	"waterings" => $waterings,
	"order" => $sorter
);

echo json_encode($response_package);
die();




?>
