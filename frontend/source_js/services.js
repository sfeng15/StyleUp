var projectServices = angular.module('projectServices', []);

projectServices.factory('CommonData', function($http, $window){
    var data = "";
    var searched_text = "";
    //the logged in user needs to be an object (a user object with name, user id)

    return{
        getSearchText : function(){
            return searched_text;
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


//example:
projectServices.factory('Users', function($http, $window) {

    return {
        get : function(select_options) {
            //return $http.get($window.sessionStorage.baseurl+'/api/users',{
            //    params:select_options
            //});
            return $http.get('./data/users.json');
        },
        post : function(data) {
             //return $http.post($window.sessionStorage.baseurl+'/api/users', data , { headers: {'content-type': 'application/json'}});
            return $http({
                    method:'post',
                    url:$window.sessionStorage.baseurl+'/api/users',
                    data : data,
                    headers: {'content-type': 'application/json'},//??
                    transformRequest: function(obj) {
                        var str = [];
                        for (var p in obj) {
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        }
                        return str.join("&");
                    }
                });
        },

        delete : function(id) {

          return $http.delete($window.sessionStorage.baseurl+'/api/user/' + id);
        },
        getOne : function(select_options) {
            return $http.get($window.sessionStorage.baseurl+'/api/user'+select_options);
        },
        put : function( id, data) {
            //return $http.put($window.sessionStorage.baseurl+'/api/user/' + id, data);
               return $http({
                   method:'put',
                   url:$window.sessionStorage.baseurl+'/api/user/'+id,
                   data:data,
                   headers:{'Content-Type': 'application/x-www-form-urlencoded'},
                   transformRequest: function(obj) {
                       var str = [];
                       for(var p in obj){
                           str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                       }
                       return str.join("&");
                   }
               }).success(function(req){
                   console.log(req);
               })
        }



    }
});

projectServices.factory('Collections', function($http, $window) {

    return {
        get : function(select_options) {
            //return $http.get($window.sessionStorage.baseurl+'/api/collections', {params:select_options});
            return $http.get('./data/collections.json');
        },
        post : function(data) {
            //return $http.post($window.sessionStorage.baseurl+'/api/collections', data , { headers: {'content-type': 'application/json'}});
            return $http({
                method:'post',
                url:$window.sessionStorage.baseurl+'/api/collections',
                data:data,
                headers:{'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj){
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                }
            });

        },

        delete : function(id) {
            return $http.delete($window.sessionStorage.baseurl+'/api/collection/' + id);
        },
        getOne : function(select_options) {
            return $http.get($window.sessionStorage.baseurl+'/api/collection'+select_options);
        },
        put : function( id, data) {
            //return $http.put($window.sessionStorage.baseurl+'/api/collection/' + id, data);

            return $http({
                method:'put',
                url:baseUrl+'/api/collection/'+id,
                data:data,
                headers:{'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj){
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                }
            }).success(function(req){
                //console.log(req);
            })
        }





    }
});
