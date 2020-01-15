<?php
include ("../shopify/private/consultas.php");
$shopify     = new shopify();
if(isset($_GET['id']) ) {
    $id = $_GET['id'];
}

$result = $shopify->putProduct($id);
?>
