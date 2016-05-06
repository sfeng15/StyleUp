

projectControllers.controller('profileController', ['$scope', 'Upload', '$window', 'CommonData', '$routeParams', 'Users', 'Collections', 'Items' , '$q', function($scope, Upload, $window, CommonData, $routeParams, Users, Collections, Items, $q) {

/*

  $scope.setData = function(){
    CommonData.setData($scope.data);
    $scope.displayText = "Data set"

  }; */

    //console.log("I am here")
	Users.getCurrent().success(function(data) {
		var LoggedInUser = data.user;
		if (LoggedInUser != null) {
			$scope.navBarUserLoggedIn = true;
			$scope.profile_owner = LoggedInUser.username === $routeParams['username'];
            //return Collections.get();
		}

		$scope.collections = [];
		Users.getUser($routeParams['username'])
        .then(function(data){
			$scope.user = data.data.user;
            $scope.profilePic = Users.getProfilePicUrl($scope.user.username);
            //console.log($scope.user);
            //console.log($scope.user.collections);
            //console.log($scope.user.collections.length);


            return Collections.get();
		})
        .then(function(data){
            console.log("user collections");
            //console.log($scope.user);
            console.log($scope.user.collections);//array of collection ids
            //console.log($scope.user.collections.length);
             //console.log($scope.user.collections[0])



            console.log("all collections");
            //console.log(data);
            //console.log(data.data);

            console.log(data.data.collections);//array of collections
            //console.log(data.data.collections.length);

            for (var i = 0 ; i < data.data.collections.length; i++)//data.data have all collections
            {
                for (var j = 0 ; j < $scope.user.collections.length ; j++)//user.collections has all its own collection ids
                {
                    //console.log("here")
                    //console.log(data.data.collections[i]._id)
                    //console.log($scope.user.collections[j])


                    if (data.data.collections[i]._id == $scope.user.collections[j])
                    {
                        //console.log("here")
                        $scope.collections.push(data.data.collections[i]);//$scope.collections has all collections of a user
                        //console.log($scope.collections);
                    }
                }
            }
            console.log($scope.collections);
        });
	});

  /////end of to be deleted

  ///the right code for when we have the backend
/*
  angular.forEach( $scope.user.collections , function(value, i){
        promises.push(Collections.get($scope.user.collections[i]._id));

  return $q.all(promises);
  */

  ///end of the right code

//to be deleted when we have the backend
//   return Collections.get();
// //the end of to be deleted
// }).then(function(data){
//
//   ///with the backend, the code below could be replaced with getting specific ids from the server
//   console.log(data.data);
//   for (var i = 0 ; i < data.data.length; i++)
//   {
//     for (var j = 0 ; j < $scope.user.collections.length ; j++)
//       if (data.data[i]._id == $scope.user.collections[j])
//         $scope.collections.push(data.data[i]);
//   }
//
// });


$scope.modal_show = false;
$scope.collection_name = '';
$scope.tops = [];
$scope.bottoms = [];
$scope.accessories = [];


$scope.showAlbum = function(index) {

  $scope.shown_collection = $scope.collections[index];
  console.log ("index");
  console.log(index);

    for(var i=0;i<$scope.collections.length;i++){
        Items.get($scope.collections[i]).success(function(){


        });
    }

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
  for (var i = 0 ; i < $scope.picFiles.length ; i++)
    // if (!$scope.picFiles[i] || $scope.picFiles[i] == null)
    //   {
    //     $scope.picFiles.splice(i, 1);
    //     $scope.categories.splice(i, 1);
    //   }

      // console.log($scope.picFiles[0]);

      var wholeimage = null;

      if (!$scope.cropper.croppedImage)
          wholeimage = $scope.cropper.croppedImage;
      else if (!$scope.cropper.sourceImage)
          wholeimage = $scope.cropper.sourceImage;

		var promises = [];
		for(var i = 0; i < $scope.categories.length; i++) {
			var cat = $scope.categories[i];
			var pic = $scope.picFiles[i];
			if(pic != null) promises.push(Items.post(cat, pic));
		}
		var itemIds = [];
		$q.all(promises).then(function(data) {
			console.log('data', data);
			data.forEach(function(result) {
				itemIds.push(result.data._id);
			});
			var newCollection = {name: $scope.collection_name, items: itemIds};
			Collections.post(newCollection).then(function(collectionResult) {
				var id = collectionResult.data._id;
				Users.getCurrent().success(function(userResult) {
					userResult.user.collections.push(id);
					console.log(userResult.user);
					Users.editCurrent(userResult.user).success(function(editResult) {
						//Reload collections here
					});
				})
			})
		}).catch(function(err) {
			console.log(err);
		});

  /*
     if ($scope.picFiles && $scope.picFiles.length) {
       Upload.upload({ url: 'upload/url',
        data: {files: $scope.picFiles, categories: $scope.categories, wholeimg : wholeimage },
        method: 'POST'
      }).then(function(data){

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


////TODO: check to see if that works with put
   $scope.uploadPic = function (file) {
        Upload.upload({
            url: 'upload/url',
            data: {file: file},
            method: 'PUT'
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        });
    };
////////


    $scope.$watch('user.description', function(newVal, oldVal) {
        if (newVal !== oldVal) {
          console.log("sthhhh");
          ///Users.put()
        }
      });


}]);
