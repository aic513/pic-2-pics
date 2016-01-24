<?php

namespace Login;

defined('_EXECUTED') or die('Restricted access');

/**
 * Main controller for login namespace
 */
class Controller
{
	// AuthPHP instance
	private $auth = null;

	// DB instance
	private $db = null;

	// View instance
	private $view = null;


	// Class constructor
	function __construct($f3){
		$this->auth = $f3->get('auth');
		$this->db   = $f3->get('db');
		$this->view = new View($f3);
	}

	/**
	 * Controller for initial login page
	 */
	public function init($f3, $args){
		if ( isset($_POST['login']) && isset($_POST['pwd']) ) {
			$this->auth->login( $_POST['login'], $_POST['pwd'], isset($_POST['remember']) );
		} else {
			$this->auth->check();
		}

		if ( $this->auth->hasError() )
			$f3->set('login_error', $this->auth->getStatus());

		$this->view->showLogin($f3);
	}


	/**
	 * Controller for lockscreen page
	 */
	public function lockscreen($f3, $args){
		if ( isset($_POST['pwd']) ) {
			$this->auth->lockscreen( $_POST['pwd'], isset($_POST['remember']) );
		} else {
			$this->auth->check();
		}

		if ( $this->auth->hasError() )
			$f3->set('login_error', $this->auth->getStatus());

		$this->view->showLockscreen($f3);
	}


	/**
	 * Controller for logout action
	 */
	public function logOut($f3, $args){
		$this->auth->logOut();
	}


	/**
	 * Controller for checking current connection
	 *
	 * Is executed by AJAX query.
	 */
	public function checkStatus($f3, $args){
		$this->auth->config(array("reroute" => false));

		if(!$this->auth->check()){
			echo $this->auth->getStatus();
		} else {
			echo "User is logged in";
		}
	}
}

?>