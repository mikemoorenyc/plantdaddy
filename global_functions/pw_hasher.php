<?php
function pw_hasher($pass) {
  global $db_conn;
  return password_hash(
      base64_encode(
          hash('sha256', $db_conn->real_escape_string($pass), true)
      ),
      PASSWORD_DEFAULT
  );
}
