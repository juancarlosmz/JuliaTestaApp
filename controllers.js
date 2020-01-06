var empleadoControllers = angular.module('empleadoControllers', []);
var rute = 'http://localhost:50/JuliaTestaApp/';



empleadoControllers.controller('ControllerLogin', ['$scope','$http','$location','$timeout', function($scope,$http,$location,$timeout) {
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
                //$location.path('/products');

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

empleadoControllers.controller('AllProducts', ['$scope','$http','$location', function($scope,$http,$location) {


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

    
    $http.post(rute+"shopify/private/apiallproducts.php").then(function successCallback(response) {
        $scope.dataProd = response.data;
        $scope.productsall = $scope.dataProd.products
        console.log($scope.dataProd.products);
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