<?php

/*
 * This is php sender email for Romisa-HTML template contact form.
 */

 
/* Your email address. The contact form will send emails to this address. You can add multiple addresses separated by commas. */
$my_email_address = 'spnoy.studio@gmail.com';
$my_company_name = 'Romisa - HTML Template';


/* You may set Cc and Bcc values for the form here. Leave them blank if you don't wish to send any Cc/Bcc. */
$cc = '';
$bcc = '';

if ( empty($my_email_address) ) {
	die('Setup your email address.');
} 

if ( !empty($_POST['ajax']) && $_POST['ajax']=='1' ) {
	$ajax = true;
} else {
	$ajax = false;
}

if ( empty($_POST['contact-name']) || empty($_POST['contact-email']) || empty($_POST['contact-message']) ) {
	die('Error: Missing variables');	
}
if ( !preg_match("/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/", $_POST['contact-email']) ) {
	die('Error: Invalid email address');
}

$name = $_POST['contact-name'];
$email = $_POST['contact-email'];
$message = $_POST['contact-message'];
$subject =  $my_company_name.' | ' . 'From: '.$name.' <'.$email.'>'." \r\n";
$to = $my_email_address;

$headers = 'From: ' . $name . ' <' . $email . '>' . " \r\n";
if ( isset($cc) && $cc!='' ) {
	$headers .= 'Cc: '.$cc."\r\n";
}
if ( isset($bcc) && $bcc!='' ) {
	$headers .= 'Bcc: '.$bcc."\r\n";
}

/* Sending Email */
if ( mail($to, $subject, $message, $headers) ) {
	die('Mail sent');
} else {
	die('Error: Mail failed');
}

?>