<?php

namespace Mailing;

defined('_EXECUTED') or die('Restricted access');

class Controller extends \BaseController
{
	// Class constructor
	function __construct($f3){
		$this->auth = $f3->get('auth');
		$this->db   = $f3->get('db');
		$this->view = new View($f3);

		$this->CheckAuthStatus();
	}


	/**
	 * Controller gateway
	 */
	public function gateway($f3, $args){
		if (isset($_POST["action"])) {
			switch ($_POST["action"]) {
				case 'get_mails':
					$this->getMails($f3);
					break;

				case 'get_email_templates':
					$this->getEmailTemplates($f3);
					break;

				case 'delete_template': 
					$this->deleteTemplate($f3);
					break;

				case 'add_template':
					$this->addTemplate($f3);
					break;

				case 'send':
					$this->send($f3);
					break;
				
				default:
					$this->view->showPage("mailing");
					break;
			}
		} else {
			$this->view->showPage("mailing");
		}
	}


	private function getMails($f3){
		$orders = $f3->get("db")->exec("SELECT customer_email, id, order_number FROM orders WHERE mailing = 1 GROUP BY customer_email");

		foreach ($orders as $key => $value) {
			$orders[$key]["checkbox"] = "<input type='checkbox' class='square' />";
		}

		$data = array();
		$data["draw"] = 1;
		$data["recordsTotal"] = count($orders);
		$data["data"] = $orders;

		echo json_encode($data);
	}


	private function getEmailTemplates($f3){
		$templates = $f3->get("db")->exec("SELECT * FROM mail_templates");
		foreach ($templates as $key => $value) {
			$templates[$key]["content"] = htmlspecialchars_decode($value["content"]);
		}

		echo json_encode($templates);
	}


	private function deleteTemplate($f3){
		$data["error"] = false;

		if (isset($_POST["id"])) {
			$id = (int) $_POST["id"];

			$f3->get("db")->exec("DELETE FROM mail_templates WHERE id = ?", $id);
		} else {
			$data["error"] = true;
		}

		echo json_encode($data);
	}


	private function addTemplate($f3){
		$data["error"] = false;

		if (isset($_POST["theme"]) &&
			isset($_POST["content"])) {
			
			$theme = htmlspecialchars($_POST["theme"]);
			$content = htmlspecialchars($_POST["content"]);

			$flag = $f3->get('db')->exec("INSERT INTO mail_templates (theme, content) VALUES (:theme, :content)",
											array(
												"theme" => $theme,
												"content" => $content
												));
		} else {
			$data["error"] = true;
		}

		echo json_encode($data);
	}


	private function send($f3){
		$data["error"] = false;

		if (isset($_POST["emails"]) &&
			isset($_POST["theme"]) &&
			isset($_POST["content"])) {

			$emails = @json_decode($_POST["emails"]);
			if (!is_array($emails)) {
				die(array("error" => true));
			}

			$emailsUnique = array_unique($emails);

			foreach ($emailsUnique as $email) {
				$this->rcms_send_mail($email, MAIL_FROM, MAIL_SENDER, "UTF-8", $_POST["theme"], $_POST["content"]);
			}

		} else {
			$data["error"] = true;
		}

		echo json_encode($data);
	}


	private function rcms_send_mail($to, $from, $sender, $encoding, $subj, $text) {
		$headers = 'From: =?'.$encoding.'?B?' . base64_encode($sender) . '?= <' . $from . ">\n";
		$headers .= "MIME-Version: 1.0\n";
		$headers .= 'Message-ID: <' . md5(uniqid(time())) . "@" . $sender . ">\n";
		$headers .= 'Date: ' . gmdate('D, d M Y H:i:s T', time()) . "\n";
		$headers .= "Content-type: text/html; charset={$encoding}\n";
		$headers .= "Content-transfer-encoding: 8bit\n";
		$headers .= "X-Mailer: Pics 2 Pics\n";
		$headers .= "X-MimeOLE: Pics 2 Pics\n";
		return mail($to, '=?'.$encoding.'?B?' . base64_encode($subj). '?=', $text, $headers);
	}
}

?>