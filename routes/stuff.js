var events = require('monument').events;


events.on('route:/stuff:get', function (connection) {
	'use strict';
	
	connection.res.end('route /stuff now responding to get requests');
});