var jwt = require('jsonwebtoken')
	, events = require('monument').events
	, fs = require('fs')
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

});

events.on('token:create', function (dataIn) {
	'use strict';

});

events.on('token:destroy', function (token) {
	'use strict';

});