<?php
include ("../shopify/private/apiallproducts.php");
$shopify     = new shopify();
$result      = $shopify->getViewProducts();

if (!isset($result['products'])) {
   echo 'Error happened when pulling data from Shopify API.';
   exit;
}
foreach ($result['products'] as $prod) {
    $titulos = $prod["title"];
    $codigo = $prod["id"];
    $descripcion = $prod["body_html"];
    $imagen = $prod['image']['src'];
    $psocionimg = $prod['image']["position"];
    $precio = array($prod['variants']);
    $productsphp = array(
        "id"=>$codigo, 
        "title"=>$titulos, 
        "body_html"=>$descripcion);
    print_r(json_encode($productsphp).",");
}

?>

