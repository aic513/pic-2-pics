<?php

// Site definitions
define("_EXECUTED", 1);
define("SITE_TITLE", "Pics 2 Pics");

define("MAIL_FROM", "hello@pics2.pics");
define("MAIL_SENDER", "Pics 2 Pics");

// Database settings
define("HOST", "p342419.mysql.ihc.ru");
define("DB_LOGIN", "p342419_p342419f");
define("DB_PWD", "pCXmahZJ5d");
define("DB", "p342419_p342419f");

// define("HOST", "localhost");
// define("DB_LOGIN", "admin");
// define("DB_PWD", "admin");
// define("DB", "pics");

// Get F3 instance
$f3 = require('lib/base.php');

// Get AuthPHP instance
$auth = require('base/AuthPHP/Base.php');

// Auth settings
$auth->iniConfig('base/AuthPHP/config.ini');
$auth->connect(HOST, DB, DB_LOGIN, DB_PWD);

// Get DB instance
$db = new DB\SQL(
    'mysql:host='.HOST.';port=3306;dbname='.DB, DB_LOGIN, DB_PWD
);

// Settings
$f3->set('AUTOLOAD', 'controllers/; views/; models/; base/');
$f3->set('CACHE', FALSE);
$f3->set('db', $db);
$f3->set('auth', $auth);


// Site routes
$f3->route('GET|POST /', 'Login\Controller->init');
$f3->route("GET|POST /logOut", "Login\Controller->logOut");
$f3->route("GET|POST /lockscreen", "Login\Controller->lockscreen");
$f3->route("GET|POST /checkStatus", "Login\Controller->checkStatus");

$f3->route('GET|POST /orders', 'Orders\Controller->gateway');

$f3->route('GET|POST /orders/ajax', 'Orders\ControllerAjax->gateway');

$f3->route('GET|POST /mailing', 'Mailing\Controller->gateway');

$f3->route('GET|POST /settings', 'Settings\Controller->gateway');

$f3->run();

?>