<?php

namespace Settings;

defined('_EXECUTED') or die('Restricted access');

class ModelProfile implements \IModel
{
	protected $f3 = null;

	protected $db = null;

	protected $requiredFields = array("email", "real_name");

	protected $optionaFields = array("login", "pwd");

	function __construct($f3) {
		$this->f3 = $f3;
		$this->db = $f3->get("db");
	}



	public function GetRequiredFields() {
		return $this->requiredFields;
	}



	public function GetOptionalFields() {
		return $this->optionaFields;
	}



	public function GetData() {
		return null;
	}



	public function Add($data = array()) {
		$fields = array_merge($this->GetRequiredFields(), $this->GetOptionalFields());

		foreach ($fields as $value) {
			if (!isset($data[ $value ])) {
				throw new \Exception("Не все поля заполнены");
 			}
		}

		$data["login"] = md5(md5($data["login"]));
		$data["pwd"] = md5(md5($data["pwd"]));

		$matchingLogin = $this->db->exec("SELECT * FROM admin WHERE login = :login", 
											array(
												"login" => $data["login"]
												));
		if ($matchingLogin) {
			throw new \Exception("Такой логин уже существует");
		}

		$fNames = implode(", ", $fields);
		$fValues = ":" . implode(", :", $fields);

		return $this->db->exec("INSERT INTO admin (".$fNames.") VALUES (".$fValues.")", $data);
	}



	public function Update($data = array()) {

		foreach ($this->GetRequiredFields() as $value) {
			if (!isset($data[ $value ])) {
				throw new \Exception("Не все поля заполнены");
 			}
		}

		if (!isset($data["id"])) 
			throw new \Exception("Ошибка выполнения");
		

		$fields = $this->requiredFields;


		if (isset($data["login"])) {
			$data["login"] = md5(md5($data["login"]));
			$fields[] = "login";
		}

		$idDB = (new Controller($this->f3)) -> getUserData($this->f3);
		if ($idDB) {
			$idCurr = (int) $idDB["id"];
		} else {
			throw new \Exception("Ошибка выполнения");
		}

		$matchingLogin = $this->db->exec("SELECT * FROM admin WHERE login = :login AND id <> :id", 
											array(
												"login" => $data["login"],
												"id" => $idCurr
												));
		if ($matchingLogin) {
			throw new \Exception("Такой логин уже существует");
		}


		if (isset($data["pwd"])) {
			$data["pwd"] = md5(md5($data["pwd"]));
			$fields[] = "pwd";
		}


		$fields = array_map(function($el){
			return $el . " = :" . $el;
		}, $fields);
		$fieldsList = implode(", ", $fields);

		return $this->db->exec("UPDATE admin SET " . $fieldsList . " WHERE id = :id", $data);
	}



	public function Delete($find = null) {
		return null;
	}


}