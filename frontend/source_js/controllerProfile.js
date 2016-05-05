var projectControllers = angular.module('projectControllers',  []);




projectControllers.controller('FirstController', ['$scope', 'CommonData' , function($scope, CommonData ) {

/*

  $scope.setData = function(){
    CommonData.setData($scope.data);
    $scope.displayText = "Data set"

  }; */

}]);

projectControllers.controller('testController', ['$scope', 'Upload', 'CommonData' , function($scope, Upload, CommonData ) {




}]);


projectControllers.controller('loginController', ['$scope', '$location', 'CommonData' , function($scope, $location, CommonData ) {

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



}]);



projectControllers.controller('profileController', ['$scope', '$window', 'CommonData', '$routeParams', 'Users', 'Collections' , function($scope, $window, CommonData, $routeParams, Users, Collections ) {

/*

  $scope.setData = function(){
    CommonData.setData($scope.data);
    $scope.displayText = "Data set"

  }; */


  var LoggedInUser = CommonData.getUser();
  console.log("logged in user");
  console.log(LoggedInUser._id);
  console.log($window.sessionStorage.logged_in_user);


    $scope.profile_owner = false; //whether or not this profile belongs to the visitor
    $scope.collections = [];
    console.log($routeParams.id);

    Users.get().then(function(data){
      console.log(data.data);
  /////to be deleted in real code where we specify the id in the get request to the server
    for (var i = 0 ; i < data.data.length ; i++)
    {
      if (data.data[i]._id == $routeParams.id)
        $scope.user = data.data[i];
      }
      console.log($scope.user.profilePicUrl);

      if (LoggedInUser._id == $scope.user._id)
        {
          $scope.profile_owner = true;
          console.log("same user");

        }

  /////end of to be deleted

  ///the right code for when we have the backend
/*
  angular.forEach( $scope.user.collections , function(value, i){
        promises.push(Collections.get($scope.user.collections[i]._id));

  return $q.all(promises);
  */

  ///end of the right code

//to be deleted when we have the backend
  return Collections.get();
//the end of to be deleted
}).then(function(data){

  ///with the backend, the code below could be replaced with getting specific ids from the server
  console.log(data.data);
  for (var i = 0 ; i < data.data.length; i++)
  {
    for (var j = 0 ; j < $scope.user.collections.length ; j++)
      if (data.data[i]._id == $scope.user.collections[j])
        $scope.collections.push(data.data[i]);
  }

});


$scope.modal_show = false;
$scope.tops = [];
$scope.bottoms = [];
$scope.accessories = [];


$scope.showAlbum = function(index) {

  $scope.shown_collection = $scope.collections[index];
  console.log ("index");
  console.log(index);

  for (var i = 0 ; i < $scope.collections[index].items.length ; i++)
  {
    if ($scope.collections[index].items[i].type == "Shirt" ||
   $scope.collections[index].items[i].type == "Blouse" ||
 $scope.collections[index].items[i].type == "Dress" ||
$scope.collections[index].items[i].type == "Coat" )
    $scope.tops.push($scope.collections[index].items[i]);

    else if ($scope.collections[index].items[i].type == "Pants" ||
   $scope.collections[index].items[i].type == "Skirt" ||
  $scope.collections[index].items[i].type == "Shoes" )
    $scope.bottoms.push($scope.collections[index].items[i]);

    else if ($scope.collections[index].items[i].type == "Accessory" )
      $scope.accessories.push($scope.collections[index].items[i]);
  }

  console.log($scope.accessories);
  console.log($scope.tops);
  console.log($scope.bottoms);

  $scope.modal_show = true;
}

$scope.closeModal = function (){

  $scope.modal_show = false;
  $scope.tops = [];
  $scope.bottoms = [];
  $scope.accessories = [];
}


  /////for createBoard
  $scope.CreateBoardModalShow = false;



$scope.IncrementItem = function()
{
  $scope.picFiles.push(null);
  $scope.categories.push("Dress");
}

$scope.deleteFile = function(index){
  $scope.picFiles.splice(index, 1);
}



$scope.submitCollectionForm = function() {

  console.log("categories");
  console.log($scope.categories);

  console.log("picFiles");
  console.log($scope.picFiles);

  for (var i = 0 ; i < $scope.picFiles.length ; i++)
    if (!$scope.picFiles[i])
      {
        $scope.picFiles.splice(i, 1);
        $scope.categories.splice(i, 1);
      }

      var wholeimage = null;

      if ($scope.croppedImage != null)
          wholeimage = $scope.croppedImage;
      else if ($scope.sourceImage != null)
          wholeimage = $scope.sourceImage;


  /*
     if ($scope.picFiles && $scope.picFiles.length) {
       Upload.upload({ url: 'upload/url', data: {files: $scope.picFiles, categories: $scope.categories, wholeimg : wholeimage }}).then(function(data){

       });
     }
     */

   }


   var CreateBoardInitialSet = function(){
     $scope.cropper = {};
     $scope.cropper.sourceImage = null;
     $scope.cropper.croppedImage   = null;
     $scope.bounds = {};
     $scope.bounds.left = 0;
     $scope.bounds.right = 0;
     $scope.bounds.top = 0;
     $scope.bounds.bottom = 0;

   $scope.picFiles = [null, null, null];
   $scope.categories = ["Dress", "Dress", "Dress"];
   }

   $scope.showCreateBoard = function(){

    CreateBoardInitialSet();
   $scope.CreateBoardModalShow = true;

   }

   $scope.closeCreateBoardModal = function(){

     $scope.CreateBoardModalShow = false;
   }




}]);
