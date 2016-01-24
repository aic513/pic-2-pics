<?php

namespace Orders;

defined('_EXECUTED') or die('Restricted access');

class ControllerAjax extends \BaseController
{
	// Class constructor
	function __construct($f3){
		$this->auth = $f3->get('auth');
		$this->db   = $f3->get('db');
	}


	public function gateway($f3, $args){
		if (isset($_POST["action"])) {
			switch ($_POST["action"]) {
				case 'new_order':
					$this->newOrder($f3);
					break;
				
				default:
					echo json_encode(array("error" => true, "status" => "Wrong action"));
					break;
			}
		} else {
			echo json_encode(array("error" => true, "status" => "Action not specified"));
		}
	}


	private function newOrder($f3, $tryCount = 0){
		$db = $f3->get("db");

		$requiredFields = array("name", "phone", "email", "mailing", "question");
		foreach ($requiredFields as $field) {
			if (!isset($_POST[$field])) {
				die(json_encode(array("error" => true, "status" => "Required field was not defined")));
			}
		}

		// Get count of orders at the current day
		$countDB = $db->exec("SELECT COUNT(*) as count FROM orders WHERE DATE_FORMAT(date_add, '%Y/%m/%d') = ?", date("Y/m/d"));
		$count = $countDB ? $countDB[0]["count"] : 1;

		$orderId = date("Ymd") . ($count + 1);

		// We make request to DB before saving file because
		// there is a probability to create to folders with the same name
		$db->begin();
		$insert = $db->exec("INSERT INTO orders (order_number, customer_name, customer_phone, customer_email, customer_question, mailing, date_add, size, address, comment)
								VALUES  (:order_number, :customer_name, :customer_phone, :customer_email, :customer_question, :mailing, :date_add, :size, :address, :comment)",
								array(
									"order_number" => $orderId,
									"customer_name" => htmlspecialchars($_POST["name"]),
									"customer_phone" => htmlspecialchars($_POST["phone"]),
									"customer_email" => htmlspecialchars($_POST["email"]),
									"customer_question" => htmlspecialchars($_POST["qustion"]),
									"mailing" => (int)$_POST["mailing"],
									"date_add" => date("Y/m/d H:i:s"),
									"size" => "",
									"address" => "",
									"comment" => ""
								));

		if ($insert) {
			$upload = $this->uploadFile($f3, $orderId);
			if ($upload["error"]) {
				$db->rollback();
				die(json_encode($upload));
			} else {
				$db->commit();
				die(json_encode(array("error" => false)));
			}
		} elseif ($tryCount < 5) {
			$db->rollback();	
			$this->newOrder($f3, $tryCount++);
		}
	}


	private function uploadFile($f3, $orderId){
		$data["error"] = false;
		$data["status"] = "";

		if(isset($_FILES["image"]) &&
			$_FILES['image']['tmp_name'] !== ""){
			$blacklist = array(".php", ".phtml", ".php3", ".php4", ".php5");
			foreach ($blacklist as $item) {
				if(preg_match("/$item\$/i", $_FILES['image']['name'])) {
					$data["error"] = true;
					$data["status"] = "Недопустимый формат файла.";
					return $data;
				}
			}
			$imageinfo = getimagesize($_FILES['image']['tmp_name']);
			if( ($imageinfo['mime'] != 'image/gif') && 
				($imageinfo['mime'] != 'image/jpeg') &&
				($imageinfo['mime'] != 'image/png') ) {
				$data["error"] = true;
				$data["status"] = "Недопустимый формат файла.";
				return $data;
			}
			if($imageinfo['mime'] == 'image/gif') $ext = '.gif';
			if($imageinfo['mime'] == 'image/jpeg') $ext = '.jpg';
			if($imageinfo['mime'] == 'image/png') $ext = '.png';

			$path = "./orderImages/";
			if (!is_dir($path.$orderId)) {
				mkdir($path.$orderId);
			}

			$url = $this->generate(10) . $ext;
			$uploaddir = $path.$orderId.'/';
			$uploadfile = $uploaddir . $url;

			while (file_exists($uploadfile)){
				$url = $this->generate(10) . $ext;
				$uploadfile = $uploaddir . $url;
			}

			if (!$flag = @move_uploaded_file($_FILES['image']['tmp_name'], $uploadfile)) {
				$data["error"] = true;
				$data["status"] = "Недопустимый формат файла.";
			}
		} else {
			$data["error"] = true;
			$data["status"] = "Файл не был передан";
		}

		return $data;
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