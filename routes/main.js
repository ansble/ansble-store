var events = require('monument').events;

events.on('route:/:get', function (connection) {
	'use strict';
	
	events.once('data:set:article:latest', function () {

		connection.res.send('ansble is runnning here');
	});

	events.emit('data:get:article:latest');
});