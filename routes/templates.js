var events = require('monument').events
	, authTemplate = require('../templates/auth');


events.on('route:/templates:get', function (connection) {
	'use strict';
	
	connection.res.send(authTemplate.toString());
});