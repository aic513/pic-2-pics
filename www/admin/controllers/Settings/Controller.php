<?php

namespace Settings;

defined('_EXECUTED') or die('Restricted access');

/**
 * Main controller for Dashboard namespace
 */
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
				case 'restore':
					$this->restore($f3);
					break;

				case 'save_profile':
					$this->save_profile($f3);
					break;

				case 'add_user':
					$this->add_user($f3);
					break;
			}
		}

		$this->view->showPage("settings");
	}


	private function restore($f3) {
		$db = $f3->get("db");

		if (isset($_POST["id"])) {
			$id = (int) $_POST["id"];

			$user = $db->exec("SELECT * FROM admin WHERE id = ?", $id);

			if (!$user) {
				$f3->set("error_message", "Пользователь не существует");
				return;
			}

			$newLogin = $this->generate_str(10);
			$newPwd = $this->generate_str(10);

			$subj = "Login data changed";
			$text = "Your new login data is:\n";
			$text .= "Login: " . $newLogin . "\n";
			$text .= "Password: " . $newPwd . "\n";

			if ($this->rcms_send_mail($user[0]["email"], "hsemafa@hsemafia.ru", "HSE Mafia", "UTF-8", $subj, $text)) {
				$db->exec("UPDATE admin SET login = :login, pwd = :pwd WHERE id = :id",
								array(
									"login" => md5(md5($newLogin)),
									"pwd" => md5(md5($newPwd)),
									"id" => $id
									));
				$f3->set("success_message", "Новые параметры для входа отправлены на почтовый ящик" );
			}
		}
	}


	private function save_profile($f3) {
		$model = new ModelProfile($f3);

		$missingError = false;
		$data = array();

		foreach ($model->GetRequiredFields() as $value) {
			if (isset($_POST[ $value ]) && $_POST[ $value ] != "") {
				$data[ $value ] = htmlspecialchars($_POST[ $value ]);
 			} else {
 				$missingError = true;
 				break;
 			}
		}

		foreach ($model->GetOptionalFields() as $value) {
			if (isset($_POST[ $value ]) && $_POST[ $value ] != "") {
				$data[ $value ] = htmlspecialchars($_POST[ $value ]);
 			}
		}

		if ($missingError) {
			$f3->set("error_message", "Не все поля заполнены");
			return;
		} else {
			$id = (int) $this->getUserData($f3)["id"];
			$data[ "id" ] = $id;

			try {
				$model->Update($data);
				$f3->set("success_message", "Данные успешно обновлены." );
			} catch (\Exception $e) {
				$f3->set("error_message", $e->getMessage() );
			}
		}
	}


	private function add_user($f3) {
		$model = new ModelProfile($f3);

		$missingError = false;
		$data = array();

		$fields = array_merge($model->GetRequiredFields(), $model->GetOptionalFields());

		foreach ($fields as $value) {
			if (isset($_POST[ $value ]) && $_POST[ $value ] != "") {
				$data[ $value ] = htmlspecialchars($_POST[ $value ]);
 			} else {
 				$missingError = true;
 				break;
 			}
		}

		if ($missingError) {
			$f3->set("error_message", "Не все поля заполнены");
			return;
		} else {

			try {
				$model->Add($data);
				$f3->set("success_message", "Пользователь успешно добавлен." );
			} catch (\Exception $e) {
				$f3->set("error_message", $e->getMessage() );
			}
		}
	}



	public function getUserData($f3) {

		$auth = $f3->get('auth');
		$db = $f3->get('db');

		if ($token = $auth->_getToken()) {
			$user = $db->exec('SELECT admin.email, admin.real_name, admin.id FROM admin_token
								LEFT JOIN admin ON admin.id = admin_token.id_admin
								WHERE admin_token.token = ?', $token);
			if ($user && count($user) == 1) {
				return $user[0];
			} else {
				return $auth->logOut();
			}
		} else {
			 return $auth->logOut();
		}
	}


	private function rcms_send_mail($to, $from, $sender, $encoding, $subj, $text) {
		$headers = 'From: =?'.$encoding.'?B?' . base64_encode($sender) . '?= <' . $from . ">\n";
		$headers .= "MIME-Version: 1.0\n";
		$headers .= 'Message-ID: <' . md5(uniqid(time())) . "@" . $sender . ">\n";
		$headers .= 'Date: ' . gmdate('D, d M Y H:i:s T', time()) . "\n";
		$headers .= "Content-type: text/plain; charset={$encoding}\n";
		$headers .= "Content-transfer-encoding: 8bit\n";
		$headers .= "X-Mailer: ReloadCMS\n";
		$headers .= "X-MimeOLE: ReloadCMS\n";
		return mail($to, '=?'.$encoding.'?B?' . base64_encode($subj). '?=', $text, $headers);
	}


	private function generate_str($number){
	    $arr = array('a','b','c','d','e','f',
	    'g','h','i','j','k','l',
	    'm','n','o','p','r','s',
	    't','u','v','x','y','z',
	    'A','B','C','D','E','F',
	    'G','H','I','J','K','L',
	    'M','N','O','P','R','S',
	    'T','U','V','X','Y','Z',
	    '1','2','3','4','5','6',
	    '7','8','9','0');
	    // Генерируем пароль
	    $pass = "";
	    for($i = 0; $i < $number; $i++){
	        // Вычисляем случайный индекс массива
	        $index = rand(0, count($arr) - 1);
	        $pass .= $arr[$index];
	    }
	    return $pass;
	}
}

?>