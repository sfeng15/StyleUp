'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema,
ObjectId = Schema.ObjectId,
l=require('../config/lib');

var fields = {
		email: { type: String }
			,
	password: { type: String }
			
};

var userSchema = new Schema(fields);

module.exports = mongoose.model('User', userSchema);
