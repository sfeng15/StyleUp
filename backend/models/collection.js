'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema,
ObjectId = Schema.ObjectId,
l=require('../config/lib');

var fields = {
				name: {
            required: true,
            type: String
        },
        description : {
            type:String,
            default:""
        },
				picPath: {
					type: String,
					default:"uploads/collections/default.png"
				},
        items: [String]

};

var collectionSchema = new Schema(fields);

module.exports = mongoose.model('Collection', collectionSchema);
