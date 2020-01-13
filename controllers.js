var empleadoControllers = angular.module('empleadoControllers', []);

var rute = 'http://localhost:50/JuliaTestaApp/';



empleadoControllers.controller('ControllerLogin', ['$scope','$http','$location','$timeout', function($scope,$http,$location,$timeout) {
    
    $scope.saveduser = localStorage.getItem('todosuser');
    $scope.SesionUser = JSON.parse($scope.saveduser);
    //console.log("nuevo nuevo",JSON.stringify($scope.SesionUser));

    for(var i in $scope.SesionUser){
        $scope.Email = $scope.SesionUser[i]['email'];
        $scope.Rol = $scope.SesionUser[i]['rol'];
    }
    if($scope.Rol == '1'){
        $scope.validation_user = true;
        $location.path('/collections');
    }else{
        $scope.validation_user = false;
        $location.path('/');
    }
    
    
    
    (function ($) {
        "use strict";
        /*==================================================================
        [ Focus input ]*/
        $('.input100').each(function(){
            $(this).on('blur', function(){
                if($(this).val().trim() != "") {
                    $(this).addClass('has-val');
                }
                else {
                    $(this).removeClass('has-val');
                }
            })    
        })
        /*==================================================================
        [ Validate ]*/
        var input = $('.validate-input .input100');
        $('.validate-form').on('submit',function(){
            var check = true;
            for(var i=0; i<input.length; i++) {
                if(validate(input[i]) == false){
                    showValidate(input[i]);
                    check=false;
                    console.log('no entra');
                }
            }
            if(check != false){
                console.log('si entra');

                $scope.dataLoading = true;
                $timeout(function(){
                    var model = {
                        email: $scope.email,
                        password: $scope.password,
                    };
                    var dataof = JSON.stringify(model);

                    $http.post(rute+'api/?a=Login',dataof).then(function successCallback(response) {
                        var consulta = response.data;
                        console.log('la consulta es',consulta);

                        if(consulta == false){
                            $scope.error = 'Email or password is incorrect';
                            $scope.dataLoading = false;
                            $timeout(function(){
                                $scope.error = false;
                            }, 3000);
                            console.log('es correo es');
                        }else{

                            $scope.saveduser = localStorage.getItem('todosuser');
                            $scope.todosuser = (localStorage.getItem('todosuser')!==null) ? JSON.parse($scope.saveduser) : [ ];
                            $scope.todosuser.push(consulta);
                            localStorage.setItem('todosuser', JSON.stringify($scope.todosuser));
                            console.log('ya paso');
                            $timeout(function(){
                                $scope.dataLoading = false;
                                $location.path('/collections');
                                
                            }, 50);
                               
                        }

                    }, function errorCallback(response) {
                        $scope.error = 'Email or password is incorrect';
                        $scope.dataLoading = false;
                    });

                }, 1000);


            }
            return check;
        });
        $('.validate-form .input100').each(function(){
            $(this).focus(function(){
            hideValidate(this);
            });
        });
        function validate (input) {
            if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
                if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                    return false;
                }
            }
            else {
                if($(input).val().trim() == ''){
                    return false;
                }
            }
        }
        function showValidate(input) {
            var thisAlert = $(input).parent();

            $(thisAlert).addClass('alert-validate');
        }
        function hideValidate(input) {
            var thisAlert = $(input).parent();

            $(thisAlert).removeClass('alert-validate');
        }
        /*==================================================================
        [ Show pass ]*/
        var showPass = 0;
        $('.btn-show-pass').on('click', function(){
            if(showPass == 0) {
                $(this).next('input').attr('type','text');
                $(this).find('i').removeClass('zmdi-eye');
                $(this).find('i').addClass('zmdi-eye-off');
                showPass = 1;
            }
            else {
                $(this).next('input').attr('type','password');
                $(this).find('i').addClass('zmdi-eye');
                $(this).find('i').removeClass('zmdi-eye-off');
                showPass = 0;
            } 
        });
    })(jQuery);

       
}]);

empleadoControllers.controller('AllProducts', ['$scope','$http','$location','$routeParams', function($scope,$http,$location,$routeParams) {


    $scope.validation_user = false;

    $scope.saveduser = localStorage.getItem('todosuser');
    $scope.SesionUser = JSON.parse($scope.saveduser);
    //console.log("nuevo nuevo",JSON.stringify($scope.SesionUser));

    for(var i in $scope.SesionUser){
        $scope.Email = $scope.SesionUser[i]['email'];
        $scope.Rol = $scope.SesionUser[i]['rol'];
    }
    if($scope.Rol == '1'){
        $scope.validation_user = true;
        //location.reload();
    }else{
        $scope.validation_user = false;
    }

    $http.post(rute+"php/Collections.php").then(function successCallback(response) {
        $scope.dataColl = response.data;
        $scope.collectionsall = $scope.dataColl.collection_listings
        console.log($scope.dataColl.collection_listings);
    }, function errorCallback(response) {
        console.log("error 505");  
    });

    
    
           
}]);

empleadoControllers.controller('ControllerCollectionProduct', ['$scope','$http','$location','$routeParams','$filter','$timeout', function($scope,$http,$location,$routeParams,$filter,$timeout) {


    $scope.validation_user = false;

    $scope.saveduser = localStorage.getItem('todosuser');
    $scope.SesionUser = JSON.parse($scope.saveduser);
    //console.log("nuevo nuevo",JSON.stringify($scope.SesionUser));

    for(var i in $scope.SesionUser){
        $scope.Email = $scope.SesionUser[i]['email'];
        $scope.Rol = $scope.SesionUser[i]['rol'];
    }
    if($scope.Rol == '1'){
        $scope.validation_user = true;
        //location.reload();
    }else{
        $scope.validation_user = false;
    }

    $http.post(rute+"php/Collections.php").then(function successCallback(response) {
        $scope.dataColl = response.data;
        $scope.collectionsall = $scope.dataColl.collection_listings
        for(var i in $scope.collectionsall){
            if($scope.collectionsall[i]['collection_id'] == $routeParams.collection_id){
                $scope.collectionName = $scope.collectionsall[i]['title'];
            }
        }
    }, function errorCallback(response) {
        console.log("error 505");  
    });

    
    
    $http.post(rute+"php/SeeCollections.php?collection_id="+$routeParams.collection_id).then(function successCallback(response) {
        $scope.dataCollProd = response.data;
        $scope.collectionsProductsall = $scope.dataCollProd.products;
    }, function errorCallback(response) {
        console.log("error 505");  
    });

    $http.post(rute+"php/CountProducts.php").then(function successCallback(response) {
        $scope.dataCountProducts = response.data;
        $scope.countPages = Math.ceil($scope.dataCountProducts.count/250);
        console.log($scope.countPages);

        //for(var i=1 ; i <= $scope.countPages; i++){
            $http.post(rute+"php/ProductsByPage.php?page="+1).then(function successCallback(response) {
                $scope.ProductsbyPage = response.data;
                $scope.ProductsbyPageAll = $scope.ProductsbyPage.products;



                $timeout(function(){
                    for(var j in $scope.ProductsbyPageAll){
                        var modelsend = {
                            Myid : $scope.ProductsbyPageAll[j]['id'],
                            Mytitle : $scope.ProductsbyPageAll[j]['title'],
                            Mybody_html : JSON.stringify($scope.ProductsbyPageAll[j]['body_html']),
                            Myvendor : $scope.ProductsbyPageAll[j]['vendor'],
                            Myproduct_type : $scope.ProductsbyPageAll[j]['product_type'],
                            Mycreated_at : $scope.ProductsbyPageAll[j]['created_at'],
                            Myhandle : $scope.ProductsbyPageAll[j]['handle'],
                            Myupdated_at : $scope.ProductsbyPageAll[j]['updated_at'],
                            Mypublished_at : $scope.ProductsbyPageAll[j]['published_at'],
                            Mytemplate_suffix : $scope.ProductsbyPageAll[j]['template_suffix'],
                            Mypublished_scope : $scope.ProductsbyPageAll[j]['published_scope'],
                            Mytags : $scope.ProductsbyPageAll[j]['tags'],
                            Myadmin_graphql_api_id : $scope.ProductsbyPageAll[j]['admin_graphql_api_id'],
                            Myvariants : JSON.stringify($scope.ProductsbyPageAll[j]['variants']),
                            Myoptions : JSON.stringify($scope.ProductsbyPageAll[j]['options']),
                            Myimages : JSON.stringify($scope.ProductsbyPageAll[j]['images']),
                            Myimage : JSON.stringify($scope.ProductsbyPageAll[j]['image']),
                            MySelected: false
                        }
                        var dataSaveProductsPHP = JSON.stringify(modelsend);
                        //console.log('',dataSaveProductsPHP);

                        $http.post(rute+'api/?a=registrarProductosPHP',dataSaveProductsPHP).then(function successCallback(response) {   
                            $scope.dataSKU = response.data;
                            console.log($scope.dataSKU);
                            console.log('logrado');
                        }, function errorCallback(response) {
                            console.log('no logrado');
                        });   

                    }
            }, 2000);

            }, function errorCallback(response) {
                console.log("error 505");  
            });
        //}
        
    }, function errorCallback(response) {
        console.log("error 505");  
    });
    
    
    $http.post(rute+"php/Products.php").then(function successCallback(response) {
        
        $scope.dataProd = response.data;
        $scope.productsall = $scope.dataProd.products;
        $scope.productsallbusqueda = $scope.dataProd.products;
        console.log($scope.productsall);
        //Para la paginacion
        $scope.viewby = 10;
        $scope.totalItems = $scope.productsall.length;
        $scope.currentPage = 1;
        $scope.itemsPerPage = $scope.viewby;
        $scope.maxSize = 5;

        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };
        $scope.pageChanged = function() {
            console.log('Page changed to: ' + $scope.currentPage);
        };
        $scope.setItemsPerPage = function(num) {
          $scope.itemsPerPage = num;
          $scope.currentPage = 1; //reset to first page
        }
        $scope.hacerPagineoProducts2 = function (arreglo) {
            if (!arreglo || !arreglo.length) { return; }
            var principio = (($scope.currentPage - 1) * $scope.itemsPerPage); 
            var fin = principio + $scope.itemsPerPage; 
            $scope.productsall = arreglo.slice(principio, fin); 
        }; 
        $scope.searchtxt = function(busquedaprod){
            var buscados = $filter('filter') ($scope.productsallbusqueda, function (prod) {
                var textobusqueda = prod.title;
                return (textobusqueda.toLowerCase().indexOf(busquedaprod.toLowerCase()) !== -1); // matches, contains
            });
            if(buscados == ''){
                $scope.dataNoResults = true;
                $scope.dataResults = false;
            }else{
                $scope.dataResults = true;
                $scope.dataNoResults = false;
                $scope.totalItems = buscados.length;
            }
            $scope.productsall = buscados;
        }
        $scope.toggleSelection = function(event) {
            console.log(event);
        };
        $scope.GetValue = function () {
            var message = "";
            for (var i = 0; i < $scope.productsall.length; i++) {
                if ($scope.productsall[i].id) {
                    var fruitId = $scope.productsall[i].id;
                    var fruitName = $scope.productsall[i].title;
                    message += "Value: " + fruitId + " Text: " + fruitName + "\n";
                }
            }
            console.log(message);
        }

        /*
        for(var i in $scope.productsall){
            for(var j in $scope.collectionsProductsall){
                if($scope.productsall[i]['id']!=$scope.collectionsProductsall[j]['id']){
                    console.log($scope.productsall[i]['title']);
                }
            }
        }
        */
    }, function errorCallback(response) {
        console.log("error 505");  
    });

           
}]);


empleadoControllers.controller('menuController', function($scope,$timeout,$http,$location) {
    $scope.validation_user = false;

    $scope.saveduser = localStorage.getItem('todosuser');
    $scope.SesionUser = JSON.parse($scope.saveduser);
    //console.log("nuevo nuevo",JSON.stringify($scope.SesionUser));

    for(var i in $scope.SesionUser){
        $scope.Email = $scope.SesionUser[i]['email'];
        $scope.Rol = $scope.SesionUser[i]['rol'];
    }
    if($scope.Rol == '1' || $scope.Rol == '2'){
        $scope.validation_user = true;
    }else{
        $scope.validation_user = false;
    }

    $scope.CloseSession = function(){
        $scope.dataLoading = true;
        $timeout(function(){
            localStorage.removeItem('todosuser');
            $http.post(rute+'api/?a=Logout').then(function successCallback(response) {
                $timeout(function(){
                    $scope.dataLoading = false;
                    $location.path('/');
                }, 50);     
            }, function errorCallback(response) {
                $scope.dataLoading = true;
                $scope.error = 'No User';
            });  
        }, 1000);
    };


});