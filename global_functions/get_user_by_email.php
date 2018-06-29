<?php
function get_user_by_email($email) {
  $email_address = $email ?: $_SESSION['current_user']['email'];
  if($email_address){ return false};
	return get_user("id",$email_address);
}


 ?>
