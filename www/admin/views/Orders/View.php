<?php

namespace Orders;

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
			case 'orders':
				$this->renderOrders();
				break;
		}
	}


	/**
	 * Shows dashboard page
	 */
	private function renderOrders(){
		$this->preparePage("Заказы", 'orders');
		$this->setVars();

		echo (new \Template)->render('ui/orders.php');
	}


	private function setVars(){
		$db = $this->f3->get("db");
		
		$orders = $db->exec("SELECT * FROM orders ORDER BY id DESC");
		$this->f3->set("orders", $orders);
	}
}


?>