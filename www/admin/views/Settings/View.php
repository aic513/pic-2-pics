<?php

namespace Settings;

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
			case 'settings':
				$this->renderSettings();
				break;
		}
	}


	/**
	 * Shows dashboard page
	 */
	private function renderSettings(){
		$this->preparePage("Настройки", 'settings');
		$this->setVars();

		echo (new \Template)->render('ui/settings.php');
	}


	private function setVars(){
		$db = $this->f3->get("db");
		$currentUser = $this->f3->get("currentUser");

		$adminList = $db->exec('SELECT * FROM admin WHERE id <> ?', $currentUser["id"]);

		$this->f3->set("adminList", $adminList);
	}
}


?>