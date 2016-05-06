var projectServices = angular.module('projectServices', []);

projectServices.factory('CommonData', function($http, $window, $q){
    var data = "";
    var searched_text = "";
    //the logged in user needs to be an object (a user object with name, user id)

    return{
        getSearchText : function(){
            //return searched_text;
            return $q(function(resolve) {
              resolve(searched_text);
              });
              
        },
        setSearchText : function(newData){
            searched_text = newData;
        },

        getUser : function(){
          return JSON.parse($window.sessionStorage.logged_in_user);
        },
        setUser : function(user){

          return $http.get('./data/users.json').then(function(data){
            $window.sessionStorage.logged_in_user = JSON.stringify(data.data[0]);
          });

          //for now, the logged_in_user is hard coded to be farnaz
        }
    };

});
