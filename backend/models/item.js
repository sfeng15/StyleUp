'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema,
ObjectId = Schema.ObjectId,
l=require('../config/lib');

var fields = {
		name: { type: String, required: true },
		type: { type: String, required: true },
		path: { type: String, required: true }	
};

var itemSchema = new Schema(fields);

module.exports = mongoose.model('Item', itemSchema);
