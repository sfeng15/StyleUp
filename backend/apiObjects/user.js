// Module dependencies.
var mongoose = require('mongoose'),
User = mongoose.models.User,
api = {},
l=require('../config/lib');



/*
========= [ CORE METHODS ] =========
*/

// ALL
api.getAllUsers = function (skip,limit,where, cb) {
  var q=User.find(where);

  if(skip!=undefined)
    q.skip(skip*1);

  if(limit!=undefined)
    q.limit(limit*1);

  return q.exec(function(err, users) {
    cbf(cb,err,users);
  });
};

// GET
api.getUser = function (uname,cb) {

  User.findOne({ 'username': uname }, function(err, user) {
    cbf(cb,err,user);
  });
};

// POST
api.addUser = function (user,cb) {

  if(user == 'undefined'){
    cb('No User Provided. Please provide valid user data.');
  }

  user = new User(user);

  user.save(function (err) {
    cbf(cb,err,user.toObject());
  });
};

// PUT
api.editUser = function (id,updateData, cb) {
  User.findById(id, function (err, user) {

   if(updateData===undefined || user===undefined){
    return cbf(cb,'Invalid Data. Please Check user and/or updateData fields',null);
  }


    if(typeof updateData["email"] != 'undefined'){
      user["email"] = updateData["email"];
    }

    if(typeof updateData["password"] != 'undefined'){
      user["password"] = updateData["password"];
    }
    if(typeof updateData["name"] != 'undefined'){
      user["name"] = updateData["name"];
    }
    if(typeof updateData["username"] != 'undefined'){
      user["username"] = updateData["username"];
    }
    if(typeof updateData["favorites"] != 'undefined'){
        user["favorites"]=updateData["favorites"];
    }
      return user.save(function (err) {
    cbf(cb,err,user.toObject());
    }); //eo user.save
  });// eo user.find
};

// DELETE
api.deleteUser = function (id,cb) {
  return User.findById(id).remove().exec(function (err, user) {
   return cbf(cb,err,true);
 });
};


/*
========= [ SPECIAL METHODS ] =========
*/


//TEST
api.test=function (cb) {
  cbf(cb,false,{result:'ok'});
};


api.deleteAllUsers = function (cb) {
  return User.remove({},function (err) {
    cbf(cb,err,true);
  });
};






/*
========= [ UTILITY METHODS ] =========
*/

/** Callback Helper
 * @param  {Function} - Callback Function
 * @param  {Object} - The Error Object
 * @param  {Object} - Data Object
 * @return {Function} - Callback
 */

 var cbf=function(cb,err,data){
  if(cb && typeof(cb)=='function'){
    if(err) cb(err);
    else cb(false,data);
  }
};



module.exports = api;
