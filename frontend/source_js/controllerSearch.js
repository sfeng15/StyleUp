

projectControllers.controller('searchController', ['$scope', '$window', '$location', 'CommonData', '$routeParams', 'Users', 'Collections', '$q' , function($scope, $window, $location, CommonData, $routeParams, Users, Collections, $q ) {

//CommonDate.getSearchText();

$scope.search_text = CommonData.getSearchText();

var entered_search_page = true;



$scope.collections = [];

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

$scope.searchTextChanged = function(){

	var promises = [];
	var search_term = angular.element( document.querySelector( '#search_input_text' )).val();
	console.log(search_term);

	Collections.get('?where={"name":/' + search_term + '/i}').then(function(data){

		$scope.collections = data.data.collections;
		return Users.get('?where={ "$or": [{"name":/'+ search_term +'/i}, {"description":/'+ search_term +'/i }]}');
	}).then(function(data){
		$scope.user_items = data.data.users;
		console.log($scope.user_items);

		angular.forEach( $scope.user_items , function(value, i){
                promises.push(Users.getProfilePicUrl($scope.user_items[i].username));
                //console.log(tasks.data.data[i]);
            });

    return $q.all(promises);

	}).then(function(data){
		$scope.profile_pics = data;
		console.log($scope.profile_pics);
	});


}





}]);
