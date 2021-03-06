var apiServices = angular.module('apiServices', []);

// Change this in case of domain name
var baseUrl = 'http://localhost:4000/api/';

apiServices.factory('Users', function($http, $window, $q){
  return {
    register: function(user) {
      console.log(user);
      return $http.post(baseUrl+'register', user);
    },
    login: function(user) {
      var deferred = $q.defer();
      $http.post(baseUrl+'login', user)
      .success(function(data) {
        //Set the token as a default header
        $http.defaults.headers.common['Authorization'] = data.token;
        $window.localStorage['curUser'] = user.username;
        $window.localStorage['curToken'] = data.token;
        console.log($http.defaults.headers.common['Authorization']);
        deferred.resolve(user);
      }).catch(function(err) {
        deferred.reject(err);
      });
      return deferred.promise;
    },
    logout: function(){

      return $q(function(resolve) {
        $window.localStorage['curUser'] = "";
        $window.localStorage['curToken'] = "";
        resolve("resolved");
        });

    },
    setProfilePic: function(image) {
      console.log(image);
      var fd = new FormData();
      fd.append('image', image);
      $http.defaults.headers.common['Authorization'] = $window.localStorage['curToken'];
      return $http.post(baseUrl+'profilePic/'+$window.localStorage['curUser'], fd, {
        headers: {'Content-Type': undefined},
        transformRequest: angular.identity
      });
    },
    getProfilePicUrl: function(username) {
      return baseUrl+'profilePic/'+username;
    },
    getCurrent: function() {

      return $http.get(baseUrl+'user/'+$window.localStorage['curUser']);
    },
    editCurrent: function(newUser) {
      $http.defaults.headers.common['Authorization'] = $window.localStorage['curToken'];
      return $http.put(baseUrl+'user/'+$window.localStorage['curUser'], newUser);
    },
    deleteCurrent: function() {
      $http.defaults.headers.common['Authorization'] = $window.localStorage['curToken'];
      return $http.delete(baseUrl+'user/'+$window.localStorage['curUser']);
    },
    getUser: function(username) {
      console.log(baseUrl+'user/'+username);
      return $http.get(baseUrl+'user/'+username);
    },
    get: function(select_options){
      return $http.get(baseUrl + 'users' + select_options);
    },
    addFavorite: function(collectionID) {
      return $http.get(baseUrl+'user/'+$window.localStorage['curUser']).then(function(data) {
        if(data.user.favorites.indexOf(collectionID) < 0) {
          data.user.favorites.push(collectionID);
        }
        return $http.put(baseUrl+'user/'+$window.localStorage['curUser'], data.user);
      });
    },
    removeFavorite: function(collectionID) {
      return $http.get(baseUrl+'user/'+$window.localStorage['curUser']).then(function(data) {
        var index = data.user.favorites.indexOf(collectionID);
        if(index >= 0) {
          data.user.favorites.splice(index, 1);
        }
        return $http.put(baseUrl+'user/'+$window.localStorage['curUser'], data.user);
      });
    }
  };
});

apiServices.factory('Collections', function($http, $window, $q) {
  //Create, edit, delete are protected
  //Get collection
  //Add favorite toggling
  return {
    get : function(select_options) {
        console.log(select_options);
      return $http.get(baseUrl+'collections/'+select_options);
      //return $http.get('./data/collections.json');
    },
    post : function(data) {
      $http.defaults.headers.common['Authorization'] = $window.localStorage['curToken'];
      var fd = new FormData();
      fd.append('name', data.name);
      fd.append('items', data.items);
      fd.append('image', data.image);
      console.log(data.image);
      return $http.post(baseUrl+'collection', fd, {
        headers: {'Content-Type': undefined},
        transformRequest: angular.identity
      });
    },

    delete : function(id) {
      $http.defaults.headers.common['Authorization'] = $window.localStorage['curToken'];
      return $http.delete(baseUrl+'collection/' + id);
    },
    getOne : function(select_options) {
      return $http.get(baseUrl+'collection/'+select_options);
    },
    put : function( id, data) {
      $http.defaults.headers.common['Authorization'] = $window.localStorage['curToken'];
      return $http.put(baseUrl+'collection/'+id, data);
    },
      //?
    getCollectionsPicUrl: function(id) {
      return baseUrl+'collectionImage/'+id;
    },
  }

});

apiServices.factory('Items', function($http, $window, $q) {
  return {
    get: function(id) {
      return $http.get(baseUrl+'item/'+id);
    },
    post: function(type, image) {
      var fd = new FormData();
      fd.append('image', image);
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
    getItemsPicUrl: function(id) {
      return baseUrl+'itemImage/'+id;
    },
    delete: function(id) {
      return $http.delete(baseUrl+'item/'+id);
    }
  };
});
