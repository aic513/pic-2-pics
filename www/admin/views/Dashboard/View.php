<?php

namespace Dashboard;

defined('_EXECUTED') or die('Restricted access');

/**
 * View part of mvc pattern
 */
class View extends \BaseView
{
	// Class constructor
	function __construct($f3){
		$this->f3 = $f3;
	}

	/**
	 * View gateway
	 */
	public function showPage($page){
		switch ($page) {
			case 'dashboard':
				$this->renderDashboard();
				break;
		}
	}


	/**
	 * Shows dashboard page
	 */
	private function renderDashboard(){
		$this->preparePage("Главная", 'dashboard');
		$this->setVars();

		echo (new \Template)->render('ui/dashboard.php');
	}


	private function setVars(){
		$db = $this->f3->get("db");
		
	}
}


?>