<?php
function get_photo_by_id($id) {
  if(!$id) {return false;}

  $photo = get_items("images","url","id", $id);
  if(!$photo) {
    return false;
  }
  return SITE_URL.$photo['url'];
}
