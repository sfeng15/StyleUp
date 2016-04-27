
projectControllers.controller('profileController', ['$scope', 'CommonData', '$routeParams', 'Users', 'Collections' , function($scope, CommonData, $routeParams, Users, Collections ) {

/*

  $scope.setData = function(){
    CommonData.setData($scope.data);
    $scope.displayText = "Data set"

  }; */
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


}]);
