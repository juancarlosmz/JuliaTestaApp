<?php
include ("../shopify/private/consultas.php");
$shopify     = new shopify();
if(isset($_GET['page']) ) {
    $page = $_GET['page'];
}

$result = $shopify->getViewProductsPage($page);
?>
