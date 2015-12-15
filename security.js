var jwt = require('jsonwebtoken')
	, events = require('monument').events
	, fs = require('fs')
	, schema = require('./data/schemas')
	, salt = 'it was the best of times it was the worst of times. It was the age of reason...'
	, createJTI = require('./utils').generateID

	, MongoClient = require('mongodb').MongoClient
	, url = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/myproject'

	, key
	, pubKey;

//import the public key for this environment
if(typeof process.env.KEY === 'undefined') {
	key = fs.readFileSync('./keys/dev_key');
	pubKey = fs.readFileSync('./keys/dev_key.pub');
} else {
	key = process.env.KEY;
	pubKey = process.env.PUB_KEY;
}

MongoClient.connect(url, function(err, db) {
	'use strict';

	var ansble = db.collection('ansble');

	console.log('db connected');

	if(err) {
		events.emit('error:db', err);
	}

	events.on('token:verify', function (token) {
		jwt.verify(token, pubKey, { algorithm: 'RS256'}, function (err, decoded) {
            console.log(err, decoded);
			if(err){
				events.emit('token:verify:' + token, false);
			} else {
				events.emit('token:verify:' + token, decoded);
			}
		});
	});

	events.on('token:create', function (dataIn) {

		var token;

		//check to see if this app already has a key... and then do stuff

		console.log('new token requested');
		if(schema.check(dataIn, schema.account)){
			dataIn.jti = createJTI(salt);

			ansble.find({_id: 'application_store'}).toArray(function (err, docs) {
				var store = {}
					, update = {};

				if(typeof docs[0] === 'undefined' || typeof docs[0][dataIn.key] === 'undefined'){
					if(typeof docs[0] === 'undefined'){
						store._id = 'application_store';
						store[dataIn.key] = dataIn;
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

	// insertDocuments(db, function() {
	// db.close();
	// });
});


