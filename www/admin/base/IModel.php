<?php

defined('_EXECUTED') or die('Restricted access');

interface IModel
{
	public function GetRequiredFields();

	public function GetOptionalFields();

	public function GetData();

	public function Add($data = array());

	public function Update($data = array());

	public function Delete($find = null);
}

?>