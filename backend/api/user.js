// Module dependencies.
var express = require('express'),
router = express.Router(),
user = require('../apiObjects/user'),
UserSchema = require('../models/user'),
l=require('../config/lib');

var path = require('path');
var multer = require('multer');
var upload = multer({dest: './uploads/profilePics'});

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
	var username = req.params.username;
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
	var username = req.params.username;

	return user.editUser(id,req.body.user, function (err, data) {
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
	var username = req.params.username;
	return user.deleteUser(username, function (err, data) {
		if (!err) {
			l.p("removed user");
			return res.status(204).send();
		} else {
			l.p(err);
			return res.status(500).json(err);
		}
	});
};

//PROFILE PICTURE
api.setProfilePic = function(req, res) {
	if(req.params.username != req.user.username) { //Wrong user logged in
		return res.status(401).send('Wrong User');
	}
	var username = req.params.username;
	user.setProfilePic(username, req.file, function(err) {
		if (err) {
			res.status(404).json(err);
		} else {
			res.status(201).json({msg: 'Profile picture set'});
		}
	});
};
api.getProfilePic = function(req, res) {
	var username = req.params.username;
	user.getUser(username, function(err,user){
		if (err || !user) {
			res.status(404).sendFile(path.resolve('uploads/profilePics/default.png'));
		} else {
			res.status(200).sendFile(path.resolve(user.profilePicPath));
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
module.exports = function(passport) {
	router.route('/user/:username')
	.get(api.user)
	.put(api.editUser)
	.delete(api.deleteUser);

	router.route('/user/:username')
	.get(api.user)
	.put(api.editUser)
	.delete(api.deleteUser);

	router.route('/users')
	.get(api.users)

	router.get('/test', passport.authenticate('jwt', {session: false}), function(req,res) {
     res.send('It worked! User is: ' + req.user);
  });
	router.route('/profilePic/:username')
	.get(api.getProfilePic)
	.post(passport.authenticate('jwt', {session: false}), upload.single('image'), api.setProfilePic);
	
	return router;
}
