<?php
// Fix SSL certificate invalid in our local environments.
add_filter( 'https_ssl_verify', '__return_false' );