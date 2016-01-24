<?php

namespace Mailing;

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
			case 'mailing':
				$this->renderMailing();
				break;
		}
	}


	private function renderMailing(){
		$this->preparePage("Рассылка", 'mailing');
		$this->setVars();

		echo (new \Template)->render('ui/mailing.php');
	}


	private function setVars(){
		$db = $this->f3->get("db");
		
		if (isset($_GET["email"]) &&
			preg_match("/^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i", $_GET["email"])) {
			$this->f3->set("cc_mailing", $_GET["email"]);
		} else {
			$this->f3->set("cc_mailing", "");
		}
	}
}


?>