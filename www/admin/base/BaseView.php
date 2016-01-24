<?php

defined('_EXECUTED') or die('Restricted access');

abstract class BaseView
{
	protected $f3 = null;

	/**
	 * Template for view gateway
	 * @param  string $page Page name
	 * @param  object $f3   Fat free
	 */
	public abstract function showPage($page);


	/**
	 * Set some initial variables
	 * @param  string $page Page name
	 */
	public function preparePage($page, $type){
		$this->f3->set("_page_title", $page);
		$this->f3->set("_page_type", $type);

		$this->getUserData();
	}


	public function getUserData() {

		$auth = $this->f3->get('auth');
		$db = $this->f3->get('db');

		if ($token = $auth->_getToken()) {
			$user = $db->exec('SELECT admin.email, admin.real_name, admin.id FROM admin_token
								LEFT JOIN admin ON admin.id = admin_token.id_admin
								WHERE admin_token.token = ?', $token);
			if ($user && count($user) == 1) {
				$this->f3->set("currentUser", $user[0]);
			} else {
				$auth->logOut();
			}
		} else {
			$auth->logOut();
		}
	}
}

?>