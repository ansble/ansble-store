var events = require('monument').events
	, searchTemplate = require('../templates/search');

events.on('route:/search:get', function (connection) {
	'use strict';

	if(typeof connection.query.q === 'undefined' && connection.query.q !== ''){
		connection.res.end('You must include a queryparam q for this to work.');
	} else {
		events.once('articles:search:results', function (results) {
			connection.res.end(searchTemplate(results));
		});
		
		events.emit('articles:search', connection.query.q);
	}
});