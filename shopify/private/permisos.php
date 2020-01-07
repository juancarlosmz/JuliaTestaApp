<?php
function misPermisos($laurl){
    $session = curl_init();
    curl_setopt($session, CURLOPT_URL, $laurl);
    curl_setopt($session, CURLOPT_HTTPGET, 1);
    curl_setopt($session, CURLOPT_VERBOSE, true);
    curl_setopt($session, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($session, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($session, CURLOPT_HEADER, false);
    curl_setopt($session, CURLOPT_HTTPHEADER, array('Accept: application/json', 'Content-Type: application/json'));
    $response = curl_exec($session);
    curl_close($session);
    echo $response;
}

?>