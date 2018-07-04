Plant Daddy app


RewriteEngine On
RewriteCond %{REQUEST_URI} !^/endpoints$
RewriteRule ^endpoints endpoints/api-router.php [L]


RewriteCond %{REQUEST_URI} !^/install.php$
RewriteCond %{REQUEST_URI} !^/index.php
RewriteCond %{REQUEST_URI} !^endpoints$

RewriteRule .* /index.php [L]
