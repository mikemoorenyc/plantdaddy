<?php
function is_user_logged_in() {

  if($_SESSION['logged_in'] && $_SESSION['user']) {
   return true;
  }

  $remembered = verify_remember_me();



  if(!$remembered) {
    return false;
  } else {
    return true;
  }
  return false;
}
