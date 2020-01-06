<?php
// Cargamos Vendor
require __DIR__ . '/vendor/autoload.php';
$pdo = new PDO('mysql:host=localhost;dbname=JuliaTestaBD;charset=utf8', 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
$fluent = new FluentPDO($pdo);
$action = isset($_GET['a']) ? $_GET['a'] : null;
$actionPOST = isset($_POST['b']) ? $_POST['b'] : null;

switch($action) {
    case 'Login':
        header('Content-Type: application/json');
        $data = json_decode(utf8_encode(file_get_contents("php://input")), true);

        $em = $data['email'];
        $pass = $data['password'];
        if(SesionLogin($fluent,$em,$pass)){
            session_start();
            print_r(json_encode(SesionLogin($fluent,$em,$pass)));
        }else{
            print_r(json_encode(false));
        }
        break;
    case 'Logout':
        session_start();
        session_destroy();
        session_commit();
        break;    
}

switch($actionPOST) {
    case 'Login':
        header('Content-Type: application/json');
        $data = json_decode(utf8_encode(file_get_contents("php://input")), true);
        print_r(json_encode($data));


        $email = $data->email;
        $contra = $data->password;
        print_r(json_encode(startlogin($fluent,$email,$contra)));

        break;
}

function SesionLogin($fluent, $email,$contra){
    return $fluent->from('user')
           ->select('user.*') 
           ->where('email = ? and contra = ?',$email,$contra)
           ->fetch();
}


?>

