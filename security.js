var jwt = require('jsonwebtoken')
	, events = require('monument').events
	, fs = require('fs')
	, schema = require('./data/schemas')
	, salt = 'it was the best of times it was the worst of times. It was the age of reason...'
	, crypto = require('crypto')

	, createJTI = function(){
		return 
	};
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


events.on('token:verify', function (token) {
	'use strict';

	jwt.verify(token, key, { algorithm: 'RS256'}, function (err, decoded) {
		if(err){

		} else {
			events.emit('token:verify:' + token, decoded);
		}
	});
});

events.on('token:create', function (dataIn) {
	'use strict';

	var token
		, hash = crypto.createHash('sha1');

	dataIn.jti = hash.update(createJTI()).digest('hex');

	if(schema.check(schema.jwt, dataIn)){
		token = jwt.sign(dataIn, key, { algorithm: 'RS256'});
	} else {
		token = 'invalid';
	}

	events.emit('token:created:' + JSON.stringify(dataIn), token);
});

events.on('token:destroy', function (token) {
	'use strict';

});