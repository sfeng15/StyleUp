

projectControllers.controller('loginController', ['$scope',  '$location', 'CommonData' , function($scope, $location, CommonData ) {

$scope.showmsg = false;
$scope.show_error = false;
$scope.show_ok = false;
/*

  $scope.setData = function(){
    CommonData.setData($scope.data);
    $scope.displayText = "Data set"

  }; */

  $scope.RedirectToHome = function(){
    $location.path('/home');
  }

  $scope.goAway = function(){
    $scope.show_error = false;
    $scope.showmsg = false;
  }

  $scope.TrySignUp = function (){

    var userData = {"name": $scope.signupName, "email":$scope.signupEmail, "password": $scope.signupPassword};

    /*
    Users.post(userData).success(function(msg){

      Users.get('?where={"email": { "$eq":\"' +  $scope.singupEmail + '\"}').then(function(data){

      $scope.showmsg = true;
      $scope.show_ok = true;
      CommonData.setUser(data);


    });

    }).error(function(err){

    $scope.showmsg = true;
    $scope.show_error = true;


  });
    */

  };

  $scope.TrySignIn = function (){
    //ValidateUser();
    //If not validated return error
    //if validated:
    //CommonData.setUser($scope.email).then(function(data){
      //console.log (CommonData.getUser());
    //});
    console.log($scope.loginEmail);



    CommonData.setUser($scope.loginEmail).then(function(data){
      console.log(CommonData.getUser());
      $location.path('/home');
    });

  };

     $(document).on('click', '.tabs .tab', function(){
    if ($(this).hasClass('signin')) {
        $('.tabs .tab').removeClass('active');
        $(this).addClass('active');
        $('.cont').hide();
        $('.signin-cont').show();
    }
    if ($(this).hasClass('signup')) {
        $('.tabs .tab').removeClass('active');
        $(this).addClass('active');
        $('.cont').hide();
        $('.signup-cont').show();
    }
});


$(document).on('mousemove', '.container .bg', (function(e){
    var amountMovedX = (e.pageX * -1 / 30);
    var amountMovedY = (e.pageY * -1 / 9);
    $(this).css('background-position', amountMovedX + 'px ' + amountMovedY + 'px');
}));




}]);
