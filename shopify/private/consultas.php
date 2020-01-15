<?php
header('Access-Control-Allow-Origin: *');
include ("permisos.php");

class shopify {
    private $API_KEY = 'd5121cb128d137f86325b662e67c5e13';
    private $STORE_URL = 'julia-testa.myshopify.com';
    private $PASSWORD = '94fbd59c83fdeb04b5eae14d0a644b95';

    function getCountProducts() {   
        $url = 'https://' . $this->API_KEY . ':' . $this->PASSWORD . '@' . $this->STORE_URL . '/admin/products/count.json';
        misPermisos($url);
    }
    function getViewProducts() {   
        $url = 'https://' . $this->API_KEY . ':' . $this->PASSWORD . '@' . $this->STORE_URL . '/admin/products.json?limit=250&page=1';
        misPermisos($url);
    }
    function getViewProductsPage($page) {   
        $url = 'https://' . $this->API_KEY . ':' . $this->PASSWORD . '@' . $this->STORE_URL . '/admin/products.json?limit=250&page='.$page;
        misPermisos($url);
    }
    function getViewCollection($collect_id) {   
        $url = 'https://' . $this->API_KEY . ':' . $this->PASSWORD . '@' . $this->STORE_URL . '/admin/products.json?collection_id='.$collect_id.'&published_status=published';
        misPermisos($url);
    }
    function getViewIdCollections() {   
        $url = 'https://' . $this->API_KEY . ':' . $this->PASSWORD . '@' . $this->STORE_URL . '/admin/collection_listings.json?limit=250&page=1';
        misPermisos($url);
    }
    function putProduct($id) {   
        $url = 'https://' . $this->API_KEY . ':' . $this->PASSWORD . '@' . $this->STORE_URL . '/admin/products/'.$id.'.json';
        misPermisos($url);
    }
}

?>