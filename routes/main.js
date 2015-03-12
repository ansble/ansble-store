var events = require('monument').events
	, articleTemplate = require('../templates/article');

events.on('route:/:get', function (connection) {
	'use strict';
	
	events.once('data:set:article:latest', function (article) {
		connection.res.send(articleTemplate(article));
	});

	events.emit('data:get:article:latest');
});

events.on('route:/:id:get', function (connection) {
	'use strict';

	events.once('data:set:article:' + connection.params.id, function (article) {
		if(typeof article !== 'undefined'){
			connection.res.send(articleTemplate(article));
		} else {
			events.emit('error:404', connection);
		}
	});

	events.emit('data:get:articles', connection.params.id);
});