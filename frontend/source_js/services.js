var projectServices = angular.module('projectServices', []);

projectServices.factory('CommonData', function(){
    var data = "";
    return{
        getData : function(){
            return data;
        },
        setData : function(newData){
            data = newData;
        },
    }
});


//example:
projectServices.factory('Users', function($http, $window) {

    return {
        get : function(select_options) {
            return $http.get($window.sessionStorage.baseurl+'/api/users'+ select_options);
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
