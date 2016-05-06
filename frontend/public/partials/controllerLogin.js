

projectControllers.controller('loginController', ['$scope', '$location', 'Users' , function($scope, $location, Users ) {

$scope.showmsg = false;
$scope.show_error = false;
$scope.show_ok = false;
/*

  $scope.setData = function(){
    CommonData.setData($scope.data);
    $scope.displayText = "Data set"

  }; */
  $scope.user = {};
  $scope.msg = '';

  $scope.RedirectToHome = function(){

    $location.path('/home');
  }



  $scope.goAway = function(){
    $scope.show_error = false;
    $scope.showmsg = false;
  }

  $scope.TrySignUp = function (){
    Users.register($scope.user).success(function(data) {
      Users.login($scope.user).then(function(data) {
        $location.path('/home');
      });
    }).error(function(err){
      $scope.msg = 'User already exists';
      $scope.showmsg = true;
    });
  };

  $scope.TrySignIn = function (){
    console.log('signing in');
    Users.login($scope.user).then(function(data) {
      console.log('redirecting');
      $location.path('/home');
    }).catch(function(err) {
      $scope.msg = 'Invalid login';
      $scope.showmsg = true;
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
