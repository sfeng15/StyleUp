

projectControllers.controller('searchController', ['$scope', '$window', '$location', 'CommonData', '$routeParams', 'Users', 'Items', 'Collections', '$q' , function($scope, $window, $location, CommonData, $routeParams, Users, Items, Collections, $q ) {



//$scope.search_text = CommonData.getSearchText();

//console.log(angular.element( document.querySelector( '#search_input_text' )).val());

//just for navBar
	//$scope.navBarUserLoggedIn = false;

	Users.getCurrent().success(function(data) {
			$scope.LoggedInUser = data.user;
			if ($scope.LoggedInUser != null) {
				$scope.navBarUserLoggedIn = true;
			}
		});

	$scope.logOut = function(){
      Users.logout().then(function(data){
        $scope.navBarUserLoggedIn = false;
      })
  }


	$scope.modal_show = false;
	$scope.collection_name = '';
	$scope.tops = [];
	$scope.bottoms = [];
	$scope.accessories = [];
	$scope.showAlbum = function(index) {

	  $scope.shown_collection = $scope.collections[index];
		// $scope.collection_image =
	  console.log ("index");
	  console.log(index);

		var items = [];
		var promises = [];
		$scope.shown_collection.items.forEach(function(item) {
			promises.push(Items.get(item));
		});
		$scope.albumCover = Collections.getCollectionsPicUrl($scope.shown_collection._id);
		$q.all(promises).then(function(data) {
			console.log('data', data);
			data.forEach(function(result) {
				items.push(result.data.item);
				if (result.data.item.type == "Shirt" ||
		   	result.data.item.type == "Blouse" ||
		 		result.data.item.type == "Dress" ||
				result.data.item.type == "Coat" )
		    		$scope.tops.push(result.data.item);
				else if (result.data.item.type == "Pants" ||
				result.data.item.type == "Skirt" ||
				result.data.item.type == "Shoes" )
						$scope.bottoms.push(result.data.item);
				else if (result.data.item.type == "Accessory" )
			      $scope.accessories.push(result.data.item);
			});
		});


	  console.log($scope.accessories);
	  console.log($scope.tops);
	  console.log($scope.bottoms);

	  $scope.modal_show = true;
	}

	$scope.imageUrl = function(id) {
		console.log('id', id);
		return Items.getItemsPicUrl(id);
	}

	$scope.closeModal = function (){

	  $scope.modal_show = false;
	  $scope.tops = [];
	  $scope.bottoms = [];
	  $scope.accessories = [];
	}
$scope.searchTextChanged = function(search_term){

	var promises = [];
	//var search_term = angular.element( document.querySelector( '#search_input_text' )).val();
	console.log(search_term);

    $scope.collectionsImages = [];
	Collections.get('?where={"name":/' + search_term + '/i}').then(function(data){

		$scope.collections = data.data.collections;
        console.log("here")
        console.log($scope.collections);
        console.log($scope.collections.length);
        console.log($scope.collections[0]);
        for(var i=0;i<$scope.collections.length;i++){
            console.log($scope.collections[i]._id)
            $scope.collectionsImages.push(Collections.getCollectionsPicUrl($scope.collections[i]._id));
        }
        console.log($scope.collectionsImages)
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


CommonData.getSearchText().then(function(data){
	console.log("data");
	console.log(data);
	$scope.search_text = data;
	$scope.searchTextChanged(data);
});



}]);
