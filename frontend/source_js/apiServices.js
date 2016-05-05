var apiServices = angular.module('apiServices', []);

// Change this in case of domain name
var baseUrl = 'http://localhost:4000/api/';

apiServices.factory('Users', function($http, $window, $q){
  return {
    register: function(user) {
      return $http.post(baseUrl+'register', user);
    },
    login: function(user) {
      var deferred = $q.defer();
      $http.post(baseUrl+'login', user)
      .success(function(data) {
        //Set the token as a default header
        $http.defaults.headers.common['Authorization'] = data.token;
        $window.localStorage['curUser'] = user.username;
        deferred.resolve(user);
      }).catch(function(err) {
        deferred.reject(err);
      });
      return deferred.promise;
    },
    setProfilePic: function(image) {
      var fd = new FormData();
      fd.append('image', image);
      return $http.post(baseUrl+'profilePic/'+$window.localStorage['curUser'], fd, {
        headers: {'Content-Type': undefined},
        transformRequest: angular.identity
      });
    },
    getProfilePicUrl: function(username) {
      return baseUrl+'profilePic/'+username;
    },
    getCurrent: function() {
      console.log('get current');
      return $http.get(baseUrl+'user/'+$window.localStorage['curUser']);
    },
    editCurrent: function(newUser) {
      return $http.put(baseUrl+'user/'+$window.localStorage['curUser'], newUser);
    },
    deleteCurrent: function() {
      return $http.delete(baseUrl+'user/'+$window.localStorage['curUser']);
    },
    getUser: function(username) {
      console.log(baseUrl+'user/'+username);
      return $http.get(baseUrl+'user/'+username);
    }
  };
});

apiServices.factory('Collections', function($http, $window, $q) {
  //Create, edit, delete are protected
  //Get collection
  //Add favorite toggling
  return {
    get : function(select_options) {
      return $http.get(baseUrl+'collections', {params:select_options});
      //return $http.get('./data/collections.json');
    },
    post : function(data) {
      //return $http.post($window.sessionStorage.baseurl+'/api/collections', data , { headers: {'content-type': 'application/json'}});
      return $http({
        method:'post',
        url:baseUrl+'collections',
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
      return $http.delete(baseUrl+'collection/' + id);
    },
    getOne : function(select_options) {
      return $http.get(baseUrl+'collection/'+select_options);
    },
    put : function( id, data) {
      //return $http.put($window.sessionStorage.baseurl+'/api/collection/' + id, data);
      return $http({
        method:'put',
        url:baseUrl+'collection/'+id,
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

apiServices.factory('Items', function($http, $window, $q) {
  return {
    get: function(id) {
      return $http.get(baseUrl+'item/'+id);
    },
    post: function(name, type, image) {
      var fd = new FormData();
      fd.append('image', image);
      fd.append('name', name);
      fd.append('type', type);
      return $http.post(baseUrl+'item', fd, {
        headers: {'Content-Type': undefined},
        transformRequest: angular.identity
      });
    },
    put: function(id, name, type, image) {
      var fd = new FormData();
      fd.append('image', image);
      fd.append('name', name);
      fd.append('type', type);
      return $http.put(baseUrl+'item/'+id, fd, {
        headers: {'Content-Type': undefined},
        transformRequest: angular.identity
      });
      return $http.put(baseUrl+'item/'+id, newItem);
    },
    delete: function(id) {
      return $http.delete(baseUrl+'item/'+id);
    }
  };
});
