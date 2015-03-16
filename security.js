var jwt = require('jsonwebtoken')
	, events = require('monument').events
	, fs = require('fs')
	, schema = require('./data/schemas')
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

	var token;

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