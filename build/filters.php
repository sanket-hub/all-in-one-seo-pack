<?php
// Fix SSL certificate invalid in our local environments.
add_filter( 'https_ssl_verify', '__return_false' );

// Don't compact JSON schema in develop environments.
add_filter( 'aioseo_schema_json_flags', function() {
	return JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE;
} );

// Enable the filters below to bypass the localhost protection for Search Statistics.
add_filter( 'aioseo_search_statistics_auth_url', 'search_statistics_amc_override_localhost' );
add_filter( 'aioseo_search_statistics_reauth_url', 'search_statistics_amc_override_localhost' );
function search_statistics_amc_override_localhost( $siteurl ) {
	$amc = 'DxeLR4lC060oXtXxls8Rra6ihZzgGtVxpaFiXXO8RC1m3y1c6IsYRJAGi7D25fV1JbadcIORf7cLxiSyeNzeDaQW09lvNbYn7CJu';

	return add_query_arg( 'amc', $amc, $siteurl );
}