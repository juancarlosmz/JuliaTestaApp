<?php
class shopify {
    private $API_KEY = 'd5121cb128d137f86325b662e67c5e13';
    private $STORE_URL = 'julia-testa.myshopify.com';
    private $PASSWORD = '94fbd59c83fdeb04b5eae14d0a644b95';
    
    function getViewCollection($collect_id) {   
        $url = 'https://' . $this->API_KEY . ':' . $this->PASSWORD . '@' . $this->STORE_URL . '/admin/products.json?collection_id='.$collect_id.'&published_status=published';

        $session = curl_init();
        curl_setopt($session, CURLOPT_URL, $url);
        curl_setopt($session, CURLOPT_HTTPGET, 1);
        curl_setopt($session, CURLOPT_VERBOSE, true);
        curl_setopt($session, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($session, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($session, CURLOPT_HEADER, false);
        curl_setopt($session, CURLOPT_HTTPHEADER, array('Accept: application/json', 'Content-Type: application/json'));
        
        $response = curl_exec($session);
        curl_close($session);
        $result = json_decode($response,true);    
        return $result;
    }
}
?>