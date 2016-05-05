var projectControllers = angular.module('projectControllers',  []);




projectControllers.controller('FirstController', ['$scope', 'CommonData' , function($scope, CommonData ) {



//

////

/*

  $scope.setData = function(){
    CommonData.setData($scope.data);
    $scope.displayText = "Data set"

  }; */



//---------------------------


var Slider = (function() {

	var $container = $( '#ps-container' ),
		$contentwrapper = $container.children( 'div.ps-contentwrapper' ),
		// the items (description elements for the slides/products)
		$items = $contentwrapper.children( 'div.ps-content' ),
		itemsCount = $items.length,
		$slidewrapper = $container.children( 'div.ps-slidewrapper' ),
		// the slides (product images)
		$slidescontainer = $slidewrapper.find( 'div.ps-slides' ),
		$slides = $slidescontainer.children( 'div' ),
		// navigation arrows
		$navprev = $slidewrapper.find( 'nav > a.ps-prev' ),
		$navnext = $slidewrapper.find( 'nav > a.ps-next' ),
		// current index for items and slides
		current = 0,
		// checks if the transition is in progress
		isAnimating = false,
		// support for CSS transitions
		support = Modernizr.csstransitions,
		// transition end event
		// https://github.com/twitter/bootstrap/issues/2870
		transEndEventNames = {
			'WebkitTransition' : 'webkitTransitionEnd',
			'MozTransition' : 'transitionend',
			'OTransition' : 'oTransitionEnd',
			'msTransition' : 'MSTransitionEnd',
			'transition' : 'transitionend'
		},
		// its name
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],

		init = function() {


			// show first item
			var $currentItem = $items.eq( current ),
				$currentSlide = $slides.eq( current ),
				initCSS = {
					top : 0,
					zIndex : 999
				};

			$currentItem.css( initCSS );
			$currentSlide.css( initCSS );

			// update nav images
			updateNavImages();

			// initialize some events
			initEvents();

		},
		updateNavImages = function() {


			// updates the background image for the navigation arrows
			var configPrev = ( current > 0 ) ? $slides.eq( current - 1 ).css( 'background-image' ) : $slides.eq( itemsCount - 1 ).css( 'background-image' ),
				configNext = ( current < itemsCount - 1 ) ? $slides.eq( current + 1 ).css( 'background-image' ) : $slides.eq( 0 ).css( 'background-image' );

			$navprev.css( 'background-image', configPrev );
			$navnext.css( 'background-image', configNext );

		},
		initEvents = function() {

			$navprev.on( 'click', function( event ) {

				if( !isAnimating ) {

					slide( 'prev' );

				}
				return false;

			} );

			$navnext.on( 'click', function( event ) {

				if( !isAnimating ) {

					slide( 'next' );

				}
				return false;

			} );

			// transition end event
			$items.on( transEndEventName, removeTransition );
			$slides.on( transEndEventName, removeTransition );

		},
		removeTransition = function() {

			isAnimating = false;
			$(this).removeClass('ps-move');

		},
		slide = function( dir ) {

			isAnimating = true;

			var $currentItem = $items.eq( current ),
				$currentSlide = $slides.eq( current );

			// update current value
			if( dir === 'next' ) {

				( current < itemsCount - 1 ) ? ++current : current = 0;

			}
			else if( dir === 'prev' ) {

				( current > 0 ) ? --current : current = itemsCount - 1;

			}
				// new item that will be shown
			var $newItem = $items.eq( current ),
				// new slide that will be shown
				$newSlide = $slides.eq( current );

			// position the new item up or down the viewport depending on the direction
			$newItem.css( {
				top : ( dir === 'next' ) ? '-100%' : '100%',
				zIndex : 999
			} );

			$newSlide.css( {
				top : ( dir === 'next' ) ? '100%' : '-100%',
				zIndex : 999
			} );

			setTimeout( function() {

				// move the current item and slide to the top or bottom depending on the direction
				$currentItem.addClass( 'ps-move' ).css( {
					top : ( dir === 'next' ) ? '100%' : '-100%',
					zIndex : 1
				} );

				$currentSlide.addClass( 'ps-move' ).css( {
					top : ( dir === 'next' ) ? '-100%' : '100%',
					zIndex : 1
				} );

				// move the new ones to the main viewport
				$newItem.addClass( 'ps-move' ).css( 'top', 0 );
				$newSlide.addClass( 'ps-move' ).css( 'top', 0 );

				// if no CSS transitions set the isAnimating flag to false
				if( !support ) {

					isAnimating = false;

				}

			}, 0 );

			// update nav images
			updateNavImages();

		};

	return { init : init };

})();

    $(function() {

        Slider.init();

    });



}]);

projectControllers.controller('testController', ['$scope', 'Upload', 'CommonData' , function($scope, Upload, CommonData ) {




}]);


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



projectControllers.controller('profileController', ['$scope', 'Upload', '$window', 'CommonData', '$routeParams', 'Users', 'Collections' , function($scope, Uplaod, $window, CommonData, $routeParams, Users, Collections ) {

/*

  $scope.setData = function(){
    CommonData.setData($scope.data);
    $scope.displayText = "Data set"

  }; */


  var LoggedInUser = CommonData.getUser();
  console.log("logged in user");
  console.log(LoggedInUser._id);
  console.log($window.sessionStorage.logged_in_user);

  if (LoggedInUser != null)
  $scope.navBarUserLoggedIn = true;


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
 var promises= [];
        /*
  angular.forEach( $scope.user.c
  ollections , function(value, i){
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

      console.log($scope.picFiles[0]);

      var wholeimage = null;

      if ($scope.cropper.croppedImage != null)
          wholeimage = $scope.cropper.croppedImage;
      else if ($scope.cropper.sourceImage != null)
          wholeimage = $scope.cropper.sourceImage;


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
