<?php

namespace Orders;

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
				case 'img_upload':
					$this->imgUpload($f3);
					break;

				case 'get_orders':
					$this->getOrders($f3);
					break;

				case 'get_order_info':
					$this->getOrderInfo($f3);
					break;

				case 'save_order_info':
					$this->saveOrderInfo($f3);
					break;

				case 'change_status':
					$this->changeStatus($f3);
					break;
				
				default:
					$this->view->showPage("orders");
					break;
			}
		} else {
			$this->view->showPage("orders");
		}
	}


	private function getOrderInfo($f3){
		if (isset($_POST["id"])) {
			$id = (int) $_POST["id"];

			$orderInfo = $f3->get("db")->exec("SELECT * FROM orders WHERE id = ?", $id);

			$info = $orderInfo ? $orderInfo[0] : false;

			if ($info) {
				if (!is_null($info["id_admin"]) &&
					$adminName = $f3->get("db")->exec("SELECT * FROM admin WHERE id = ?", $info["id_admin"])) {
					if ($adminName) {
						$info["adminName"] = $adminName[0]["real_name"];
					} else $info["adminName"] = "";
				} else $info["adminName"] = "";

				list($info["size_width"], $info["size_height"]) = explode(" X ", $info["size"]);

				$images = array();
				$path = "./orderImages/".$info["order_number"];
				$dir = @opendir($path);
				if ($dir)
					while ($file = readdir($dir))
						if (is_file($path."/".$file))
							$images[] = array(
								"path" => "http://".$_SERVER["SERVER_NAME"]."/admin/orderImages/".$info["order_number"]."/".$file,
								"title" => $file
								);

				$info["images"] = $images;
			}

			echo json_encode(array(
				"error" => false,
				"status" => "",
				"info" => $info
				));
		} else {
			echo json_encode(array(
				"error" => true,
				"status" => "Отсутствует идентификатор"
				));
		}
	}


	private function saveOrderInfo($f3){
		$data = array();
		$fields = array("id", "name", "phone", "email", "mailing", "size", "date_delivery", "address", "comment");
		foreach ($fields as $field) {
			if (!isset($_POST[$field])) {
				die(json_encode(array(
					"error" => true,
					"status" => "Отсутствует необходимая информация"
					)));
			} else {
				$data[$field] = htmlspecialchars($_POST[$field]);
			}
		}

		$data["id"] = (int)$_POST["id"];
		$data["date_delivery"] = $_POST["date_delivery"] == "" ? null : $data["date_delivery"];
		$flag = $f3->get("db")->exec("UPDATE orders SET customer_name = :name, customer_phone = :phone, customer_email = :email, mailing = :mailing, size = :size, date_delivery = :date_delivery, address = :address, comment = :comment WHERE id = :id", $data);

		echo json_encode(array(
			"error" => false
			));
	}


	private function changeStatus($f3){
		if (isset($_POST["id"]) &&
			isset($_POST["status"])) {
			
			$id = (int)$_POST["id"];
			$allowedStatus = array("new", "send", "coordination", "delivery", "done");
			if (!in_array($_POST["status"], $allowedStatus)) {
				die(json_encode(array(
					"error" => true,
					"status" => "Неверный статус"
					)));
			}

			$f3->get("db")->exec("UPDATE orders SET status = :status, id_admin = :id_admin, date_status_changed = :date_status_changed WHERE id = :id",
									array(
										"date_status_changed" => date("Y-m-d H:i:s"),
										"id_admin" => $this->getUserData($f3)["id"],
										"status" => htmlspecialchars($_POST["status"]),
										"id" => $id
										));
			echo json_encode(array(
				"error" => false,
				"status" => $_POST["status"]
				));
		} else {
			die(json_encode(array(
				"error" => true,
				"status" => "Отсутствует необходимая информация"
				)));
		}
	}


	private function getOrders($f3){
		$filter = array();

		$allowedStatus = array("new", "send", "coordination", "delivery", "done", "all_except_done");

		if (isset($_POST["status"]) &&
			in_array(htmlspecialchars($_POST["status"]), $allowedStatus)) {
			if ($_POST["status"] == "all_except_done") {
				$filter[] = "status <> 'done'";
			} else {
				$filter[] = "status = '" . htmlspecialchars($_POST["status"]) . "'";
			}
		}

		if (isset($_POST["checkRange"]) &&
			(bool)$_POST["checkRange"] &&
			isset($_POST["range"]) &&
			$_POST["range"] !== "") {
			
			list($from, $to) = explode(" - ", $_POST["range"]);
			$fromDate = date("Y-m-d", strtotime($from));
			$toDate = date("Y-m-d", strtotime($to));

			$filter[] = "date_add BETWEEN '".$fromDate."' AND '".$toDate."'";
		}

		$where = count($filter)>0 ? " WHERE ".implode(" AND ", $filter) : "";

		$orders = $f3->get('db')->exec("SELECT * FROM orders" . $where);



		foreach ($orders as $key => $value) {
			$statuses = array();
			foreach ($allowedStatus as $status) {
				$statuses[$status] = $value["status"] == $status ? 'selected="selected"' : "";
			}

			$orders[$key]["date_add_formatted"] = date("d/m/Y", strtotime($value["date_add"]));
			if ($value["date_delivery"] !== null) {
				$orders[$key]["order_number"] .= "<br><b>" . date("d/m/Y", strtotime($value["date_delivery"])) . "</b>";
			}

			$orders[$key]["email_btn"] = '<a href="#" class="btn btn-default btn-sm btn-flat send_email" data-email="'.$value["customer_email"].'" data-toggle="modal" data-target="#sendEmail_modal">Send letter</a>';

			if (!is_null($value["id_admin"]) &&
				$adminName = $f3->get("db")->exec("SELECT * FROM admin WHERE id = ?", $value["id_admin"])) {
				if ($adminName) {
					$orders[$key]["adminName"] = $adminName[0]["real_name"];
				} else $orders[$key]["adminName"] = "";
			} else $orders[$key]["adminName"] = "";

			$orders[$key]["status_select"] = <<<here
			<select class="form-control input-sm" data-id="{$value['id']}" data-status>
              <option {$statuses["new"]} value="new">Новый</option>
              <option {$statuses["send"]} value="send">Отправка макета</option>
              <option {$statuses["coordination"]} value="coordination">Согласование</option>
              <option {$statuses["delivery"]} value="delivery">Доставка</option>
              <option {$statuses["done"]} value="done">Закрыт</option>
            </select>
here;
			$orders[$key]["action"] ='<a class="btn btn-default btn-sm btn-flat" href="#" data-toggle="modal" data-target="#order_info_modal" data-order-id="'.$value["id"].'">Подробнее</a>';
		}

		$data = array();

		$data["draw"] = 1;
		$data["recordsTotal"] = count($orders);
		$data["data"] = $orders;

		echo json_encode($data);
	}


	private function imgUpload($f3){
		$data["error"] = false;
		$data["status"] = "";
		$data["url"] = "";
		$data["title"] = "";

		if(isset($_FILES["image"]) &&
			isset($_POST["id"])){
			$id = (int)$_POST["id"];

			$blacklist = array(".php", ".phtml", ".php3", ".php4", ".php5");
			foreach ($blacklist as $item) {
				if(preg_match("/$item\$/i", $_FILES['image']['name'])) {
					$data["error"] = true;
					$data["status"] = "Недопустимый формат файла.";
					die( json_encode($data) );
				}
			}
			$imageinfo = getimagesize($_FILES['image']['tmp_name']);
			if( ($imageinfo['mime'] != 'image/gif') && 
				($imageinfo['mime'] != 'image/jpeg') &&
				($imageinfo['mime'] != 'image/png') ) {
				$data["error"] = true;
				$data["status"] = "Недопустимый формат файла.";
				die( json_encode($data) );
			}
			if($imageinfo['mime'] == 'image/gif') $ext = '.gif';
			if($imageinfo['mime'] == 'image/jpeg') $ext = '.jpg';
			if($imageinfo['mime'] == 'image/png') $ext = '.png';

			$path = "./orderImages/";
			if (!is_dir($path . $id)) {
				$data["error"] = true;
				$data["status"] = "Неверный id заказа (папки с таким id не существует)";
				die( json_encode($data) );
			}

			$url = $this->generate(10) . $ext;
			$uploaddir = $path.$id.'/';
			$uploadfile = $uploaddir . $url;

			while (file_exists($uploadfile)){
				$url = $this->generate(10) . $ext;
				$uploadfile = $uploaddir . $url;
			}

			if (!$flag = @move_uploaded_file($_FILES['image']['tmp_name'], $uploadfile)) {
				$data["error"] = true;
				$data["status"] = "Недопустимый формат файла.";
				die( json_encode($data) );

			} else {
				$data["url"] = "http://".$_SERVER["SERVER_NAME"]."/admin/orderImages/".$id."/".$url;
				$data["title"] = $url;
			}
		} else {
			$data["error"] = true;
			$data["status"] = "Файл не был передан";
		}


		die( json_encode($data) );
	}

	private function getUserData($f3) {

		$auth = $f3->get('auth');
		$db = $f3->get('db');

		if ($token = $auth->_getToken()) {
			$user = $db->exec('SELECT admin.email, admin.real_name, admin.id FROM admin_token
								LEFT JOIN admin ON admin.id = admin_token.id_admin
								WHERE admin_token.token = ?', $token);
			if ($user && count($user) == 1) {
				return $user[0];
			} else {
				return null;
			}
		} else {
			return null;
		}
	}

	private function generate($number){
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
	    $pass = "";
	    for($i = 0; $i < $number; $i++){
	        $index = rand(0, count($arr) - 1);
	        $pass .= $arr[$index];
	    }
	    return $pass;
	}
}

?>