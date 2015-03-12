var events = require('monument').events;


events.on('route:/api:get', function (connection) {
	'use strict';
	
	connection.res.end('route /api now responding to get requests');
});

events.on('route:/api/v1/:app:get', function (connection) {
	'use strict';
	
	connection.res.end('route /api/v1/:app now responding to get requests');
});

events.on('route:/api/v1/:app:post', function (connection) {
	'use strict';
	
	connection.res.end('route /api/v1/:app now responding to post requests');
});

events.on('route:/api/v1/:app/:id:get', function (connection) {
	'use strict';
	
	connection.res.end('route /api/v1/:app/:id now responding to get requests');
});

events.on('route:/api/v1/:app/:id:put', function (connection) {
	'use strict';
	
	connection.res.end('route /api/v1/:app/:id now responding to put requests');
});