<?php
class AutoLoader {
	
	public static function autoload($className)
	{
		//Do not autoload if the class exists already
		if (class_exists($className, false) ){
			return false;
		}
		$path = realpath(dirname(__FILE__) . '/../..');
		$class = $path . "/classes/" . $className . '.php';
		if (file_exists($class)) {
			require_once $class;
			return true;
		}
		return false;
	}
}