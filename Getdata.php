<?php
include(dirname(__FILE__) . '/application/Bootstrap.php');

$obj = new Products(DB_SERVER, DB_USER, DB_PASSWORD, DB_NAME);
$obj->dbConnect();
$res = $obj->getAllProducts();

echo json_encode($res);
?>