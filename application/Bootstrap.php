<?php
require_once(dirname(__FILE__) . '/library/Autoloader.php');
spl_autoload_register(array('Autoloader', 'autoload'));

define ("DB_SERVER", "localhost");
define ("DB_USER", "hackday");
define ("DB_PASSWORD", "hackday");
define ("DB_NAME", "ebtd_app");