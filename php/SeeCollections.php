<?php
include ("../shopify/private/consultas.php");
$shopify     = new shopify();
if(isset($_GET['collection_id']) ) {
    $collection_id = $_GET['collection_id'];
}

$result = $shopify->getViewCollection($collection_id);
?>
