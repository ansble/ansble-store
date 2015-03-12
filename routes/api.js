var events = require('monument').events;


events.on('route:/api:get', function (connection) {
	'use strict';
	
	connection.res.end('route /api now responding to get requests');
});

events.on('route:/api/:app:get', function (connection) {
	'use strict';
	
	connection.res.end('route /api/:app now responding to get requests');
});

events.on('route:/api/:app:post', function (connection) {
	'use strict';
	
	connection.res.end('route /api/:app now responding to post requests');
});

events.on('route:/api/:app/:id:get', function (connection) {
	'use strict';
	
	connection.res.end('route /api/:app/:id now responding to get requests');
});

events.on('route:/api/:app/:id:put', function (connection) {
	'use strict';
	
	connection.res.end('route /api/:app/:id now responding to put requests');
});