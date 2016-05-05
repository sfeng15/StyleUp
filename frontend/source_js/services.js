var projectServices = angular.module('projectServices', []);

projectServices.factory('CommonData', function($http, $window){
    var data = "";
    //the logged in user needs to be an object (a user object with name, user id)

    return{
        getData : function(){
            return data;
        },
        setData : function(newData){
            data = newData;
        },
        getUser : function(){
          return JSON.parse($window.sessionStorage.logged_in_user);
        },
        setUser : function(user){

          return $http.get('./data/users.json').then(function(data){
            $window.sessionStorage.logged_in_user = JSON.stringify(data.data[0]);
          });

          //for now, the logged_in_user is hard coded to be farnaz
        },
    };

});


//example:
projectServices.factory('Users', function($http, $window) {

    return {
        get : function(select_options) {
            //return $http.get($window.sessionStorage.baseurl+'/api/users'+ select_options);
            return $http.get('./data/users.json');
        },
        post : function(data) {
             return $http.post($window.sessionStorage.baseurl+'/api/users', data , { headers: {'content-type': 'application/json'}});
        },
        delete : function(id) {

          return $http.delete($window.sessionStorage.baseurl+'/api/users/' + id);
        },
        put : function( id, data) {
            return $http.put($window.sessionStorage.baseurl+'/api/users/' + id, data);

        }



    }
});

projectServices.factory('Collections', function($http, $window) {

    return {
        get : function(select_options) {
            //return $http.get($window.sessionStorage.baseurl+'/api/collections'+ select_options);
            return $http.get('./data/collections.json');
        },


    }
});
