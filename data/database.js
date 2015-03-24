var events = require('monument').events
	, MongoClient = require('mongodb').MongoClient
	, mongo = require('mongodb')
	, url = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/myproject'
	, BSON = mongo.BSONPure
	, crypto = require('crypto');


MongoClient.connect(url, function(err, db) {
	'use strict';

	var store = db.collection('store')
		, id;

	events.on('data:get', function (input) {
		
		try{
			id = new BSON.ObjectID(input.id);
			
			store.findOne({'_meta.access.app': input.app, '_id': id}, function (err, doc) {
				events.emit('data:set:' + input.app + ':' + input.id, doc);
			});
		} catch (e) {
			if(typeof input.id === 'string') {
				store.findOne({'_meta.access.app': input.app, '_id': input.id}, function (err, doc) {
					events.emit('data:set:' + input.app + ':' + input.id, doc);
				});
			} else {
				console.log(input.id, e);
				events.emit('data:set:' + input.app + ':' + input.id, null);
			}
		}

	});

	events.on('data:get:all', function (input) {		
		store.find({'_meta.access.app': input.key, '_meta.access.read': true}).toArray(function (err, docs) {
			events.emit('data:set:all:' + input.key, docs);
		});
	});

	events.on('data:new', function (input) {
		//clone data
		var data = JSON.parse(JSON.stringify(input.data))
			, id = crypto.createHash('sha1').update(JSON.stringify(input.data)).digest('hex');

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
		input.data.updatedDate = new Date();

		events.emit('data:saved:' + input.id, input.data);
	});

	events.on('data:delete', function (id) {
		if(typeof id !== 'undefined'){
			store.remove({'_id': id}, true);
			events.emit('data:deleted:id', true);
		} else {
			events.emit('data:deleted:id', false);
		}
	});
});