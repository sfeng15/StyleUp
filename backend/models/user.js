'use strict';

var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose'),
Schema = mongoose.Schema,
ObjectId = Schema.ObjectId,
l=require('../config/lib');

var fields = {
		email: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true
	 	}

};

var userSchema = new Schema(fields);

userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
