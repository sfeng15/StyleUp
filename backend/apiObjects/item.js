// Module dependencies.
var mongoose = require('mongoose'),
Item = mongoose.models.Item,
api = {},
l=require('../config/lib');



/*
========= [ CORE METHODS ] =========
*/

// ALL
api.getAllItems = function (skip,limit,cb) {
  var q=Item.find();

  if(skip!=undefined)
    q.skip(skip*1);

  if(limit!=undefined)
    q.limit(limit*1);

  return q.exec(function(err, items) {
    cbf(cb,err,items);
  });
};

// GET
api.getItem = function (id,cb) {

  Item.findOne({ '_id': id }, function(err, item) {
    cbf(cb,err,item);
  });
};

// POST
api.addItem = function (item, file, cb) {

  // if(item == 'undefined'){
  if(!item) {
    cb('No Item Provided. Please provide valid item data.');
  }
  item.path = file.path;
  item = new Item(item);

  item.save(function (err) {
    cbf(cb,err,item.toObject());
  });
};

// PUT
api.editItem = function (id,updateData, file, cb) {
  console.log('bleh');
  Item.findById(id, function (err, item) {

   if(updateData===undefined || item===undefined){
    return cbf(cb,'Invalid Data. Please Check item and/or updateData fields',null);
  }


    if(typeof updateData["name"] != 'undefined'){
      item["name"] = updateData["name"];
    }

    if(typeof updateData["type"] != 'undefined'){
      item["type"] = updateData["type"];
    }

    if(typeof file != 'undefined') {
      item.path = file.path;
    }


  return item.save(function (err) {
    cbf(cb,err,item.toObject());
    }); //eo item.save
  });// eo item.find
};

// DELETE
api.deleteItem = function (id,cb) {
  return Item.findById(id).remove().exec(function (err, item) {
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


api.deleteAllItems = function (cb) {
  return Item.remove({},function (err) {
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
