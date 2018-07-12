<?php
function get_photo_by_id($id) {
  if(!$id) {return false;}

  $photo = get_items("images","url","id", $id);
	$photo = get_items(array(
		"table" => "images",
		"columns" => "url",
		"selector_key" => "id",
		"selector_value" => $id,
		"limit" => 1
	));
  if(!$photo) {
    return false;
  }
  return SITE_URL.$photo['url'];
}
