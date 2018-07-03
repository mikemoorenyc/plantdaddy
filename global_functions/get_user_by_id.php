<?php

function get_user_by_id($id) {
	$user_id = $id ?: $_SESSION['current_user']['id'];
	if(!$user_id){ return false;}
	return get_user("id",$id);
}

?>
