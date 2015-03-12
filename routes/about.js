var events = require('monument').events
	, aboutTemplate = require('../templates/about');


events.on('route:/about:get', function (connection) {
	'use strict';
	
	events.once('data:set:about', function (about) {
		connection.res.end(aboutTemplate(about));
	});
	
	events.emit('data:get:about');
});