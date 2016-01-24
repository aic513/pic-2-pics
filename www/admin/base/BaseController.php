<?php

defined('_EXECUTED') or die('Restricted access');

abstract class BaseController
{
	// AuthPHP instance
	protected $auth = null;

	// DB instance
	protected $db   = null;

	// View instance
	protected $view = null;


	/**
	 * Check current authorization status
	 */
	public function CheckAuthStatus(){
		if ($this->auth)
			$this->auth->check();
	}


	/**
	 * Pattern for gateway
	 */
	public abstract function gateway($f3, $args);
}

?>