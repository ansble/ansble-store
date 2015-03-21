var events = require('monument').events
	, mainTemplate = require('../templates/main');

events.on('route:/:get', function (connection) {
	'use strict';
	
	connection.res.send(mainTemplate());
});