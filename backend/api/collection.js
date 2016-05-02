// Module dependencies.
var express = require('express'),
router = express.Router(),
collection = require('../apiObjects/collection'),
l=require('../config/lib');

var api = {};
// ALL
api.collections = function (req, res) {
	var skip=null,limit=10,where=null;

	if(req.query.skip!=undefined)
		skip=req.query.skip;

	if(req.query.limit!=undefined)
		limit=req.query.limit;

    if(req.query.where!=undefined){
        var  where=eval("("+req.query.where+")");
    }

	collection.getAllCollections(skip,limit,where,function(err,data){
		if (err) {
			res.status(500).json(err);
		} else {
			res.status(200).json({collections: data});
		}
	});
};

// POST
api.addcollection = function (req, res) {
	collection.addCollection(req.body,function	(err,data){
		if(err) res.status(500).json(err);
		else {
			res.status(201).json(data);
		}
	});
};

// GET
api.collection = function (req, res) {
	var id = req.params.id;
	collection.getCollection(id,function(err,data){
		if (err) {
			res.status(404).json(err);//? why 404 instead of 500 like previous errors
		} else {
			res.status(200).json({collection: data});
		}
	});
};

// PUT
api.editCollection = function (req, res) {
	var id = req.params.id;

	return collection.editCollection(id,req.body, function (err, data) {
		if (!err) {
			l.p("updated collection");
			return res.status(200).json(data);
		} else {
			return res.status(500).json(err);
		}
		return res.status(200).json(data);
	});

};

// DELETE
api.deleteCollection = function (req, res) {
	var id = req.params.id;
	return collection.deleteCollection(id, function (err, data) {
		if (!err) {
			l.p("removed collection");
			return res.status(204).send();
		} else {
			l.p(err);
			return res.status(500).json(err);
		}
	});
};

// DELETE All
//api.deleteAllCollections = function (req, res) {
//	return collection.deleteAllCollections( function (err, data) {
//		if (!err) {
//			l.p("removed All collection");
//			return res.status(204).send();
//		} else {
//			l.p(err);
//			return res.status(500).json(err);
//		}
//	});
//};

/*
=====================  ROUTES  =====================
*/


router.post('/collection',api.addcollection);//??how to not use .route()

router.route('/collection/:id')
.get(api.collection)
.put(api.editCollection)
.delete(api.deleteCollection);


router.route('/collections')
.get(api.collections);
//.delete(api.deleteAllCollections);
//prevent users from deleting all records


router.get('/collections/test',function(req,res){
	return collection.test(function (err, data) {
		res.status(200).json(data);
	});
});

module.exports = router;
