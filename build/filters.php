<?php
// Fix SSL certificate invalid in our local environments.
add_filter( 'https_ssl_verify', '__return_false' );

// add_filter( 'aioseo_classic_editor_disable_emoji_script', '__return_true' );