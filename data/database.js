var events = require('monument').events
	, MongoClient = require('mongodb').MongoClient
	, url = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/myproject'
	, crypto = require('crypto')
	, utils = require('../utils');


MongoClient.connect(url, function(err, db) {
	'use strict';

	var store = db.collection('store');

	events.on('data:get', function (input) {
		var id = utils.convertToMongoID(input.id);

        if(typeof input.id !== 'undefined') {
			store.findOne({
                '$and': [
                    {'_meta.access.app': input.app}
                    , {'_meta.access.read': true}
                    , {'_id': id}
                ]
            }, function (err, doc) {
				events.emit('data:set:' + input.app + ':' + input.id, doc);
			});
		} else {
			events.emit('data:set:' + input.app + ':' + input.id, null);
		}
	});

	events.on('data:get:all', function (input) {
		store.find({
            '$and': [
                {'_meta.access.app': input.key}
                , {'_meta.access.read': true}
            ]
        }).toArray(function (err, docs) {
			events.emit('data:set:all:' + input.key, docs);
		});
	});

	events.on('data:new', function (input) {
		//clone data
		var data = JSON.parse(JSON.stringify(input.data))
			, id = crypto.createHash('sha1').update(JSON.stringify(input.data)).digest('hex');

        console.log('\n\n', input, '\n\n');

        data._meta = {
			access: [
				{app: input.key, read:true, write:true, del:true}
			]
			, createdDate: new Date()
			, updatedDate: new Date()
			, createdBy: input.key
		};

		console.log(data);
		store.insert(data, function(err,doc) {
			if(err){
				console.log(err);
			}

			events.emit('data:saved:' + id, doc);
		});

	});

	events.on('data:update', function (input) {
		console.log(input);
		input._meta.updatedDate = new Date();
		input._id = utils.convertToMongoID(input._id);

		store.update({'_id': input._id}, input, function (err, result) {
			events.emit('data:saved:' + input.id, (result === 1));
		});

	});

	events.on('data:delete', function (idIn) {
		var id = utils.convertToMongoID(idIn);

		if(typeof id !== 'undefined'){
			store.remove({'_id': id}, function(err, result) {
				events.emit('data:deleted:' + id, {success: (result === 1)});
			 });
		} else {
			events.emit('data:deleted:' + id, false);
		}
	});
});
