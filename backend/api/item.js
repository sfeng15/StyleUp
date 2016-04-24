// Module dependencies.
var express = require('express'),
router = express.Router(),
item = require('../apiObjects/item'),
l=require('../config/lib');

var api = {};
// ALL
api.items = function (req, res) {
	var skip=null,limit=10;

	if(req.query.skip!=undefined)
		skip=req.query.skip;

	if(req.query.limit!=undefined)
		limit=req.query.limit;

	item.getAllItems(skip,limit,function(err,data){
		if (err) {
			res.status(500).json(err);
		} else {
			res.status(200).json({items: data});
		}
	});
};

// POST
api.additem = function (req, res) {
	item.addItem(req.body.item,function	(err,data){
		if(err) res.status(500).json(err);
		else {
			res.status(201).json(data);
		}
	});
};

// GET
api.item = function (req, res) {
	var id = req.params.id;
	item.getItem(id,function(err,data){
		if (err) {
			res.status(404).json(err);
		} else {
			res.status(200).json({item: data});
		}
	});
};

// DELETE
api.deleteItem = function (req, res) {
	var id = req.params.id;
	return item.deleteItem(id, function (err, data) {
		if (!err) {
			l.p("removed item");
			return res.status(204).send();
		} else {
			l.p(err);
			return res.status(500).json(err);
		}
	});
};

api.itemImage = function(req, res) {
	
}


/*
=====================  ROUTES  =====================
*/


router.post('/item',api.additem);

router.route('/item/:id')
.get(api.item)
.delete(api.deleteItem);

router.get('/itemImage/:id', api.itemImage);


router.route('/items')
.get(api.items)


module.exports = router;
