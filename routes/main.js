var events = require('monument').events;

events.on('route:/:get', function (connection) {
	'use strict';
	
	connection.res.send('ansble is runnning here');
});