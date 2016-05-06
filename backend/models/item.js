'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema,
ObjectId = Schema.ObjectId,
l=require('../config/lib');

var fields = {
		type: { type: String, required: true },
		path: { type: String, default: 'uploads/items/default.png' }
};

var itemSchema = new Schema(fields);

module.exports = mongoose.model('Item', itemSchema);
