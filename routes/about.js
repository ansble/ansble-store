var events = require('monument').events;


events.on('route:/about:get', function (connection) {
	'use strict';

	connection.res.send('route /about now responding to get requests');
});
