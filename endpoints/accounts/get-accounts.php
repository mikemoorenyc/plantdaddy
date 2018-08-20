<?php
require_once $_SERVER['DOCUMENT_ROOT'] ."/header.php";
require_once $_SERVER['DOCUMENT_ROOT'] ."/endpoints/endpoint-header.php";
if(!$_SESSION['logged_in']) {
	errorResponse();
}

if($url_sections[1]) {
	if(!is_numeric($url_sections[1])) {
		errorResponse();
	}
	$id = intval($url_sections[1]);
	$user = get_user_by_id($id);
	if(!$user) {
		errorResponse(404);
	}

	echo json_encode(array("data" => $user));
	die();
}



if(!$_GET['page'] || !is_numeric($_GET['page']) || intval($_GET['page']) < 1) {
	$page = 1;
} else {
	$page = intval($_GET['page']);
}
$users = get_items(array(
	"table" => "users",
	"limit" => 25,
	"offset" => ($page -1) * 25,
	"columns" => "id"
));
	if(!$users) {
		$users = [];
	}
	$row = $db_conn->query( "select count(id) as num_rows from table"  );
	$total = $row->num_rows;
	$total_pages = ($total < 25) ? 1 : (int) ($total /25);

		
	$return_package = array(
		"page" => $page,
		"per_page" => 25,
		"total" => $total,
		"total_pages" => $total_pages,
		"data" => $users
	);
echo json_encode($return_package);
	die();

die();
