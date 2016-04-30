var projectControllers = angular.module('projectControllers', []);

projectControllers.controller('loginController', ['$scope', 'CommonData' , function($scope, CommonData ) {

/*

  $scope.setData = function(){
    CommonData.setData($scope.data);
    $scope.displayText = "Data set"

  }; */

  $scope.trySignIn = function (){
    //ValidateUser();
    //If not validated return error
    //if validated:
    CommonData.setUser($scope.email).then(function(data){
      return CommonData.getUser();
    }).then(function(user){
      console.log(user.data);
    });

}

}]);
