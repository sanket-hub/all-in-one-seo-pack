<?php
namespace AIOSEO\Plugin\Common\Utils;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Handles our cache.
 *
 * @since 4.1.5
 */
class Cache {
	/**
	 * Our cache table.
	 *
	 * @since 4.1.5
	 *
	 * @var string
	 */
	private $table = 'aioseo_cache';

	/**
	 * Our cached cache.
	 *
	 * @since 4.1.5
	 *
	 * @var array
	 */
	private static $cache = [];

	/**
	 * Our cached like cache.
	 *
	 * @since 4.1.5
	 *
	 * @var array
	 */
	private static $cacheLike = [];

	/**
	 * The action for the scheduled cache prune.
	 *
	 * @since 4.1.5
	 *
	 * @var string
	 */
	private $pruneAction = 'aioseo_cache_prune';

	/**
	 * The action for the scheduled old cache clean.
	 *
	 * @since 4.1.5
	 *
	 * @var string
	 */
	private $optionCacheCleanAction = 'aioseo_old_cache_clean';

	/**
	 * Class constructor.
	 *
	 * @since 4.1.5
	 */
	public function __construct() {
		add_action( 'init', [ $this, 'init' ] );
	}

	/**
	 * Inits our class.
	 *
	 * @since 4.1.5
	 *
	 * @return void
	 */
	public function init() {
		add_action( $this->pruneAction, [ $this, 'prune' ] );
		add_action( $this->optionCacheCleanAction, [ $this, 'optionCacheClean' ] );

		aioseo()->helpers->scheduleRecurrentAction( $this->pruneAction, 0, DAY_IN_SECONDS );
	}

	/**
	 * Returns the cache value for a key if it exists and is not expired.
	 *
	 * @since 4.1.5
	 *
	 * @param  string $key The cache key name.
	 * @return mixed       The value or false if the cache does not exist.
	 */
	public function get( $key ) {
		if ( isset( self::$cache[ $key ] ) ) {
			return self::$cache[ $key ];
		}

		$cacheValue = aioseo()->db
			->start( $this->table )
			->select( 'value' )
			->where( 'key', $key )
			->whereRaw( 'expiration > \'' . aioseo()->helpers->timeToMysql( time() ) . '\'' )
			->run( true, 'var' )
			->result();

		self::$cache[ $key ] = maybe_unserialize( $cacheValue );

		return self::$cache[ $key ];
	}

	/**
	 * Returns cached values if it exists.
	 *
	 * @since 4.1.5
	 *
	 * @param  string $key The cache key name.
	 * @return mixed       The value or false if the cache does not exist.
	 */
	public function getLike( $key ) {
		if ( isset( self::$cacheLike[ $key ] ) ) {
			return self::$cacheLike[ $key ];
		}

		$cacheValues = aioseo()->db
			->start( $this->table )
			->select( 'key', 'value' )
			->whereRaw( '`key` LIKE \'' . $key . '\'' )
			->whereRaw( '`expiration` > \'' . aioseo()->helpers->timeToMysql( time() ) . '\'' )
			->run()
			->result();

		foreach ( $cacheValues as &$cacheValue ) {
			$cacheValue = maybe_unserialize( $cacheValue );
		}

		self::$cacheLike[ $key ] = $cacheValues;

		return self::$cacheLike[ $key ];
	}

	/**
	 * Updates the given cache or creates it if it doesn't exist.
	 *
	 * @since 4.1.5
	 *
	 * @param  string $key        The cache key name.
	 * @param  mixed  $value      The value.
	 * @param  int    $expiration The expiration time in seconds. Defaults to 24 hours.
	 * @return void
	 */
	public function update( $key, $value, $expiration = DAY_IN_SECONDS ) {
		$key        = trim( $key );
		$value      = maybe_serialize( $value );
		$expiration = aioseo()->helpers->timeToMysql( time() + $expiration );

		aioseo()->db->insert( $this->table )
			->set( [
				'key'        => $key,
				'value'      => $value,
				'expiration' => $expiration,
				'created'    => aioseo()->helpers->timeToMysql( time() )
			] )
			->onDuplicate( [
				'value'      => $value,
				'expiration' => $expiration,
				'updated'    => aioseo()->helpers->timeToMysql( time() )
			] )
			->run();
	}

	/**
	 * Deletes the given cache key.
	 *
	 * @since 4.1.5
	 *
	 * @param  string $key The cache key.
	 * @return void
	 */
	public function delete( $key ) {
		aioseo()->db->delete( $this->table )
			->where( 'key', $key )
			->run();
	}

	/**
	 * Clears all of our cache.
	 *
	 * @since 4.1.5
	 *
	 * @return void
	 */
	public function clear() {
		aioseo()->db->truncate( $this->table )->run();
	}

	/**
	 * Prunes our expired cache.
	 *
	 * @since 4.1.5
	 *
	 * @return void
	 */
	public function prune() {
		aioseo()->db->delete( $this->table )
			->whereRaw( 'expiration <= \'' . aioseo()->helpers->timeToMysql( time() ) . '\'' )
			->run();
	}

	/**
	 * Cleans our old options cache.
	 *
	 * @since 4.1.5
	 *
	 * @return void
	 */
	public function optionCacheClean() {
		$optionCache = aioseo()->db->delete( aioseo()->db->db->options, true )
			->whereRaw( "option_name LIKE '\_aioseo\_cache\_%'" )
			->limit( 10000 )
			->run();

		// Schedule a new run if we're not done cleaning.
		if ( 0 !== $optionCache->db->rows_affected ) {
			aioseo()->helpers->scheduleSingleAction( $this->optionCacheCleanAction, 5 );
		}
	}

	/**
	 * Returns the cache table name.
	 *
	 * @since 4.1.5
	 *
	 * @return string
	 */
	public function getoptionCacheCleanAction() {
		return $this->optionCacheCleanAction;
	}

	/**
	 * Returns the cache table name.
	 *
	 * @since 4.1.5
	 *
	 * @return string
	 */
	public function getTableName() {
		return $this->table;
	}
}