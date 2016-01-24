<?php

namespace Login;

defined('_EXECUTED') or die('Restricted access');

class View extends \BaseView
{
	// Class constructor
	function __construct($f3){
		$this->f3 = $f3;
	}

	public function showPage($page) {}

	/**
	 * Shows login page
	 */
	public function showLogin($f3){
		echo (new \Template)->render('ui/login.php');
	}


	/**
	 * Shows lockscreen page
	 */
	public function showLockscreen($f3){
		$this->getUserData();
		echo (new \Template)->render('ui/lockscreen.php');
	}
}

?>