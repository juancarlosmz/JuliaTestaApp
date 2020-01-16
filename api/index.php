<?php
// Cargamos Vendor
require __DIR__ . '/vendor/autoload.php';
$pdo = new PDO('mysql:host=localhost;dbname=JuliaTestaBD;charset=utf8', 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
$fluent = new FluentPDO($pdo);
$action = isset($_GET['a']) ? $_GET['a'] : null;
$actionPOST = isset($_POST['b']) ? $_POST['b'] : null;

//mi segunda coneccion xd
//creando nueva coneccion
$HostName = "localhost"; 
$UserName = "root"; 
$Password = ""; 
$dbname="JuliaTestaBD";     
// Create connection 
$connection = new mysqli($HostName, $UserName, $Password, $dbname);      
// Check connection 
if ($connection->connect_error){
    die("Connection failed: " . $connection->connect_error);
}
//


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
    case 'eliminarParaSicronizar':
        header('Content-Type: application/json');
        print_r(json_encode(eliminarSicronizar($fluent)));
        break;     
    case 'registrarProductosPHP':    
        header('Content-Type: application/json');
        $data = json_decode(utf8_encode(file_get_contents("php://input")), true);

        $allid = $data['Myid'];
        $alltitle = addslashes($data['Mytitle']);
        $allbody_html = addslashes($data['Mybody_html']);
        $allvendor = $data['Myvendor'];
        $allproduct_type = $data['Myproduct_type'];
        $allcreated_at = $data['Mycreated_at'];
        $allhandle = $data['Myhandle'];
        $allupdated_at = $data['Myupdated_at'];
        $allpublished_at = $data['Mypublished_at'];
        $alltemplate_suffix = $data['Mytemplate_suffix'];
        $allpublished_scope = $data['Mypublished_scope'];
        $alltags = addslashes($data['Mytags']);
        $alladmin_graphql_api_id = $data['Myadmin_graphql_api_id'];
        $allvariants = addslashes($data['Myvariants']);
        $alloptions = addslashes($data['Myoptions']);
        $allimages = addslashes($data['Myimages']);
        $allimage = addslashes($data['Myimage']);
        $allSelected = $data['MySelected'];
        $valores = '("' . $allid . '", "' . $alltitle . '", "' . $allbody_html . '" , "' . $allvendor . '" , "' . $allproduct_type . '" , "' . $allcreated_at .'" , "'. $allhandle . '" , "' . $allupdated_at . '" , "'. $allpublished_at .'" , "'. $alltemplate_suffix .'" , "'. $allpublished_scope .'" , "'. $alltags . '" , "'. $alladmin_graphql_api_id . '" , "'. $allvariants . '" , "'. $alloptions . '" , "'. $allimages . '" , "'. $allimage . '" , "'. $allSelected . '" )';

        if($allid > 0){
            $sql = "INSERT INTO product (id,title, body_html, vendor,product_type, created_at,handle,updated_at,published_at,template_suffix,published_scope,tags,admin_graphql_api_id,variants,options,images,image,Selected) VALUES $valores";
            if ($connection->multi_query($sql) === TRUE){
                print_r(json_encode('New records created successfully'));
            }else{
                print_r(json_encode('Error:'. $sql . "<br>" . $connection->error));
            }
            $connection->close();
        }
        break;
    case 'updateProductosPHP':    
        header('Content-Type: application/json');
        $data = json_decode(utf8_encode(file_get_contents("php://input")), true);
        
        $allid = $data['Myid'];
        $alltags = addslashes($data['Mytags']);
        $allvariants = addslashes($data['Myvariants']);
        $allSelected = $data['MySelected'];

        /*
        $valores = '("' . $allid .'" , "'. $alltags . '" , "'. $allvariants . '" , "'. $allSelected . '" )';
        print_r(json_encode($valores));
*/

        $sql = "UPDATE product SET tags='$alltags', variants='$allvariants', Selected='$allSelected' WHERE id=$allid";

        /*
        $sql = "UPDATE product (id,tags,variants,Selected) VALUES $valores";
        */
        if ($connection->multi_query($sql) === TRUE){
            print_r(json_encode('New records updated successfully'));
        }else{
            print_r(json_encode('Error:'. $sql . "<br>" . $connection->error));
        }
        $connection->close();
        
        break;    
    case 'listProducts':
        header('Content-Type: application/json');
        print_r(json_encode(listarProductos($fluent)));
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
function eliminarSicronizar($fluent){
    $fluent ->deleteFrom('product')
            ->execute();   
    return true;
}

function listarProductos($fluent){
    return $fluent
        ->from('product')
        ->fetchAll();
}


?>

