// Module dependencies.
var express = require('express'),
router = express.Router(),
user = require('../apiObjects/user'),
UserSchema = require('../models/user'),
l=require('../config/lib');

var api = {};
// ALL
api.users = function (req, res) {
	var skip=null,limit=10,where;

	if(req.query.skip!=undefined)
		skip=req.query.skip;

	if(req.query.limit!=undefined)
		limit=req.query.limit;

    if(req.query.where!=undefined){
        var  where=eval("("+req.query.where+")");
    }

	user.getAllUsers(skip,limit,where, function(err,data){
		if (err) {
			res.status(500).json(err);
		} else {
			res.status(200).json({users: data});
		}
	});
};


// GET
api.user = function (req, res) {
	var username = req.params.id;
	user.getUser(username,function(err,data){
		if (err) {
			res.status(404).json(err);
		} else {
			res.status(200).json({user: data});
		}
	});
};

// PUT
api.editUser = function (req, res) {
	var id = req.params.id;

	return user.editUser(id,req.body, function (err, data) {
		if (!err) {
			l.p("updated user");
			return res.status(200).json(data);
		} else {
			return res.status(500).json(err);
		}
		return res.status(200).json(data);
	});

};

// DELETE
api.deleteUser = function (req, res) {
	var id = req.params.id;
	return user.deleteUser(id, function (err, data) {
		if (!err) {
			l.p("removed user");
			return res.status(204).send();
		} else {
			l.p(err);
			return res.status(500).json(err);
		}
	});
};



/*
=====================  ROUTES  =====================
*/

// module.exports = function(passport) {
//
// 	router.post('/user',api.adduser);
//
// 	router.route('/user/:id')
// 	.get(api.user)
// 	.put(api.editUser)
// 	.delete(api.deleteUser);
//
//
// 	router.route('/users')
// 	.get(api.users)
// 	.delete(api.deleteAllUsers);
//
//
//
// 	router.get('/users/test',function(req,res){
// 		return user.test(function (err, data) {
// 			res.status(200).json(data);
// 		});
// 	});
// 	return router;
// }

router.route('/user/:id')
.get(api.user)
.put(api.editUser)
.delete(api.deleteUser);


router.route('/users')
.get(api.users)


module.exports = router;
