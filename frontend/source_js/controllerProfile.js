
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



}]);
