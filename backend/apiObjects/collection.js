// Module dependencies.
var mongoose = require('mongoose'),
Collection = mongoose.models.Collection,
api = {},
l=require('../config/lib');



/*
========= [ CORE METHODS ] =========
*/

// ALL
api.getAllCollections = function (skip,limit,where,cb) {
    var q=Collection.find(where);

  if(skip!=undefined)
    q.skip(skip*1);

  if(limit!=undefined)
    q.limit(limit*1);

    console.log("afterwhere");
  return q.exec(function(err, collections) {
    cbf(cb,err,collections);//?
  });
};

// GET
api.getCollection = function (id,cb) {

  Collection.findOne({ '_id': id }, function(err, collection) {
    cbf(cb,err,collection);
  });
};

// POST
api.addCollection = function (collection, file, cb) {

  if(collection == 'undefined'){//?? check whether the length is zero, not checking whether already exists
    cb('No Collection Provided. Please provide valid collection data.');
  }
  if(file != null) collection.picPath = file.path;
  collection = new Collection(collection);

  collection.save(function (err) {
    console.log(err);
    cbf(cb,err,collection.toObject());
  });
};

// PUT
api.editCollection = function (id,updateData, cb) {
  Collection.findById(id, function (err, collection) {

   if(updateData===undefined || collection===undefined){
    return cbf(cb,'Invalid Data. Please Check collection and/or updateData fields',null);
  }


    if(typeof updateData["name"] != 'undefined'){
      collection["name"] = updateData["name"];
    }


  return collection.save(function (err) {
    cbf(cb,err,collection.toObject());
    }); //eo collection.save
  });// eo collection.find
};

// DELETE
api.deleteCollection = function (id,cb) {
  return Collection.findById(id).remove().exec(function (err, collection) {
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


api.deleteAllCollections = function (cb) {
  return Collection.remove({},function (err) {
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
