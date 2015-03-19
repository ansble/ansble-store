var jwt = require('jsonwebtoken')
	, events = require('monument').events
	, fs = require('fs')
	, schema = require('./data/schemas')
	, salt = 'it was the best of times it was the worst of times. It was the age of reason...'
	, createJTI = require('./utils').generateID
	
	, MongoClient = require('mongodb').MongoClient
	, url = 'mongodb://localhost:27017/myproject'

	, key;

//import the public key for this environment
if(typeof process.env.KEY === 'undefined') {
	fs.readFile('./keys/dev_key', function (err, data) {
		'use strict';

		if(err){
			console.log(err);
		} 

		key = data;
	});
} else {
	key = process.env.KEY;
}

MongoClient.connect(url, function(err, db) {
	'use strict';

	var ansble = db.collection('ansble')
		, store = db.collection('store');

	console.log('db connected');

	if(err) {
		events.emit('error:db', err);
	}
	
	events.on('token:verify', function (token) {

		jwt.verify(token, key, { algorithm: 'RS256'}, function (err, decoded) {
			if(err){
				console.log(err);
			} else {
				console.log(decoded);
				events.emit('token:verify:' + token, decoded);
			}
		});
	});

	events.on('token:create', function (dataIn) {

		var token;

		//check to see if this app already has a key... and then do stuff

		console.log('new token requested', dataIn);
		if(schema.check(dataIn, schema.account)){
			dataIn.jti = createJTI(salt);
			
			ansble.find({_id: 'application_store'}).toArray(function (err, docs) {
				var store = {}
					, update = {};

				if(typeof docs[0] === 'undefined' || typeof docs[0][dataIn.app] === 'undefined'){
					if(typeof docs[0] === 'undefined'){
						store._id = 'application_store';
						store[dataIn.app] = dataIn;
						ansble.insert(store, function (err, result){
							console.log(result);
						});
					}else{
						update = {
							'$set':{}
						};
						update.$set[dataIn.app] = dataIn;

						ansble.update({_id: 'application_store'}, update, function (err, result) {
							console.log(err, result);
						});
					}

					//TODO: if we ever use scopes change this
					token = jwt.sign({scopes: [], app: dataIn.key, jti: dataIn.jti}, key, { algorithm: 'RS256'});
					console.log(token);
				} else {
					token = 'exists';
				}

				events.emit('token:created:' + dataIn.key, token);
			});
		} else {
			events.emit('token:created:' + dataIn.key, 'invalid');
		}
	});

	events.on('token:destroy', function () {

	});

	console.log('token handling events setup');
	// insertDocuments(db, function() {
	// db.close();
	// });
});


