<?php
header('Access-Control-Allow-Origin: *');
require '../shopify/private/Shopify.php';
$credentials = [
    'api_key'      => 'd5121cb128d137f86325b662e67c5e13',
    'api_password' => '94fbd59c83fdeb04b5eae14d0a644b95',
    'shop_domain'  => 'julia-testa.myshopify.com',
    'type'         => 'private',
 ];
$shopify    = new Shopify($credentials);
$products = json_decode($_POST['myData'],true);
foreach ($products as $key => $product) {
    $data['product'] = [];
    $data['product'] = $product;
    $result = $shopify->updateProduct($data);
    print_r($result);
    usleep(600000);
}
?>
