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
                                $location.path('/products');
                                
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


    $http.post(rute+'api/?a=listProducts').then(function successCallback(response) {  
        $scope.productsall2 = response.data;
        
        $scope.productsall = [];
        for(var i in $scope.productsall2){
            var modelview = {
                id : $scope.productsall2[i].id,
                title : JSON.parse($scope.productsall2[i].title),
                body_html : JSON.parse($scope.productsall2[i].body_html),
                vendor : $scope.productsall2[i].vendor,
                product_type : $scope.productsall2[i].product_type,
                created_at : $scope.productsall2[i].created_at,
                handle : $scope.productsall2[i].handle,
                updated_at : $scope.productsall2[i].updated_at,
                published_at : $scope.productsall2[i].published_at,
                template_suffix : $scope.productsall2[i].template_suffix,
                published_scope : $scope.productsall2[i].published_scope,
                tags : JSON.parse($scope.productsall2[i].tags),
                admin_graphql_api_id : $scope.productsall2[i].admin_graphql_api_id,
                variants : JSON.parse($scope.productsall2[i].variants),
                options : JSON.parse($scope.productsall2[i].options),
                images : JSON.parse($scope.productsall2[i].images),
                image : JSON.parse($scope.productsall2[i].image),
                Selected : false,
            };
            $scope.productsall.push(modelview);
        }
        $scope.productsallbusqueda = $scope.productsall;
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
                if ($scope.productsall[i].Selected) {
                    var productId = $scope.productsall[i].id;
                    var productTitle = $scope.productsall[i].title;
                    message += "Value: " + productId + " Text: " + productTitle + "\n";
/*
                    $http.post(rute+"php/PutProduct.php?id="+productId).then(function successCallback(response) {
                        $scope.data = response.data;
                        console.log($scope.data);
                    }, function errorCallback(response) {
                        console.log("error 505");  
                    });

                    */
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




empleadoControllers.controller('ControllerProducts', ['$scope','$http','$location','$routeParams','$filter','$timeout', function($scope,$http,$location,$routeParams,$filter,$timeout) {


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



    $http.post(rute+'api/?a=listProducts').then(function successCallback(response) {  
        $scope.productsall2 = response.data;
        
        $scope.productsall = [];
        for(var i in $scope.productsall2){
            var modelview = {
                id : $scope.productsall2[i].id,
                title : JSON.parse($scope.productsall2[i].title),
                body_html : JSON.parse($scope.productsall2[i].body_html),
                vendor : $scope.productsall2[i].vendor,
                product_type : $scope.productsall2[i].product_type,
                created_at : $scope.productsall2[i].created_at,
                handle : $scope.productsall2[i].handle,
                updated_at : $scope.productsall2[i].updated_at,
                published_at : $scope.productsall2[i].published_at,
                template_suffix : $scope.productsall2[i].template_suffix,
                published_scope : $scope.productsall2[i].published_scope,
                tags : JSON.parse($scope.productsall2[i].tags),
                admin_graphql_api_id : $scope.productsall2[i].admin_graphql_api_id,
                variants : JSON.parse($scope.productsall2[i].variants),
                options : JSON.parse($scope.productsall2[i].options),
                images : JSON.parse($scope.productsall2[i].images),
                image : JSON.parse($scope.productsall2[i].image),
                Selected : false,
            };
            $scope.productsall.push(modelview);
        }
        $scope.productsallbusqueda = $scope.productsall;
        console.log($scope.productsall);
        //Para la paginacion
        $scope.viewby = 50;
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


        $scope.toggleSelection = function(event) {
            console.log(event);
        };
        $scope.GetValue = function (valdiscount) {
            
            var myvaldiscount = valdiscount /100;
            console.log(myvaldiscount);
            var MyArray = [];
            for (var i = 0; i < $scope.productsall.length; i++) {
                if ($scope.productsall[i].Selected) {
                    var productId = parseInt($scope.productsall[i].id);
                    var productTag = $scope.productsall[i].tags+',tagDiscount';
                    var productVariants = $scope.productsall[i].variants;
                    var variants =[];
                    for(var j= 0; j< productVariants.length;j++){
                        var modelvariants = {
                            id: productVariants[j].id,
                            price: String(productVariants[j].price*myvaldiscount),
                            compare_at_price: productVariants[j].price,
                        }
                        variants.push(modelvariants);
                    }
                    var model = {
                        id: productId,
                        tags: productTag,
                        variants,
                    }

                    MyArray.push(model);


                }
            }

/*
                    $http.post(rute+"php/PutProduct.php?id="+productId).then(function successCallback(response) {
                        $scope.data = response.data;
                        console.log($scope.data);
                    }, function errorCallback(response) {
                        console.log("error 505");  
                    });
*/
            console.log(MyArray);
            SendMyArray = 'myData='+JSON.stringify(MyArray);

            $http({
                method : 'POST',
                url : rute+'php/PutProduct.php',
                data: SendMyArray,
                headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
            }).then(function successCallback(response){
                $scope.ladata = response;
                console.log($scope.ladata);
            }, function errorCallback(response) {
                console.log("error 505");  
            });      

        }

    }, function errorCallback(response) {
        console.log("error 505");  
    });

           
}]);



empleadoControllers.controller('ControllerSyncupProduct', ['$scope','$http','$location','$routeParams','$filter','$timeout', function($scope,$http,$location,$routeParams,$filter,$timeout) {
    
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
    
    $scope.GetClean = function () {
        $http.get(rute+'api/?a=eliminarParaSicronizar').then(function(response){
            $timeout(function(){
                console.log('all deleted');
            }, 1000);
        }, function errorCallback(response) {
            console.log("error 505");  
        });     
    }

    $http.post(rute+"php/CountProducts.php").then(function successCallback(response) {
        $scope.dataCountProducts = response.data;
        $scope.countPages = Math.ceil($scope.dataCountProducts.count/250);
        for(var i = 1 ; i <= $scope.countPages ; i++){
            $scope.countPagesitems = [{num: i}];
            i++;
        }
        console.log($scope.dataCountProducts.count);
        console.log($scope.countPages);
    }, function errorCallback(response) {
        console.log("error 505");  
    });

    $scope.setPages = function(num) {
        $scope.ThePages = num;
        console.log($scope.ThePages);
        $scope.GetSyncup = function () {
            $http.post(rute+"php/ProductsByPage.php?page="+$scope.ThePages).then(function successCallback(response) {
                $scope.ProductsbyPage = response.data;
                $scope.ProductsbyPageAll = $scope.ProductsbyPage.products;
                $timeout(function(){
                    for(var j in $scope.ProductsbyPageAll){
                        var modelsend = {
                            Myid : $scope.ProductsbyPageAll[j]['id'],
                            Mytitle : JSON.stringify($scope.ProductsbyPageAll[j]['title']),
                            Mybody_html : JSON.stringify($scope.ProductsbyPageAll[j]['body_html']),
                            Myvendor : $scope.ProductsbyPageAll[j]['vendor'],
                            Myproduct_type : $scope.ProductsbyPageAll[j]['product_type'],
                            Mycreated_at : $scope.ProductsbyPageAll[j]['created_at'],
                            Myhandle : $scope.ProductsbyPageAll[j]['handle'],
                            Myupdated_at : $scope.ProductsbyPageAll[j]['updated_at'],
                            Mypublished_at : $scope.ProductsbyPageAll[j]['published_at'],
                            Mytemplate_suffix : $scope.ProductsbyPageAll[j]['template_suffix'],
                            Mypublished_scope : $scope.ProductsbyPageAll[j]['published_scope'],
                            Mytags : JSON.stringify($scope.ProductsbyPageAll[j]['tags']),
                            Myadmin_graphql_api_id : $scope.ProductsbyPageAll[j]['admin_graphql_api_id'],
                            Myvariants : JSON.stringify($scope.ProductsbyPageAll[j]['variants']),
                            Myoptions : JSON.stringify($scope.ProductsbyPageAll[j]['options']),
                            Myimages : JSON.stringify($scope.ProductsbyPageAll[j]['images']),
                            Myimage : JSON.stringify($scope.ProductsbyPageAll[j]['image']),
                            MySelected: false
                        }
                        var dataSaveProductsPHP = JSON.stringify(modelsend);
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
        }
    }
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