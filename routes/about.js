var events = require('monument').events;


events.on('route:/about:get', function (connection) {
	'use strict';
	
	connection.res.end('route /about now responding to get requests');
});