var apiService = angular.module('apiService', []);

// Change this in case of domain name
var baseUrl = 'localhost:4000/api/';

apiService.factory('User', function($http, $window, $q){
  return {
    register: function(user) {
      return $http.post(baseUrl+'register', user);
    },
    login: function(user) {
      var deferred = $q.defer();
      $http.post(baseUrl+'login', user)
      .success(function(data) {
        //Set the token as a default header
        $http.defaults.headers.common['Authorization'] = user.token;
        $window.localStorage['curUser'] = user.username;
        deferred.resolve(user);
      }).catch(function(err) {
        deferred.reject(err);
      });
      return deferred.promise;
    },
    getCurrent: function() {
      return $http.get(baseUrl+'user/'+$window.localStorage['curUser']);
    },
    editCurrent: function(newUser) {
      return $http.put(baseUrl+'user/'+$window.localStorage['curUser'], newUser);
    },
    deleteCurrent: function() {
      return $http.delete(baseUrl+'user/'+$window.localStorage['curUser']);
    },
    getUser: function(username) {
      return $http.get(baseUrl+'user/'+username);
    }
  };
});

apiService.factory('Collection', function($http, $window, $q) {
  //Create, edit, delete are protected
  //Get collection
  //Add favorite toggling
});

apiService.factory('Item', function($http, $window, $q) {
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
