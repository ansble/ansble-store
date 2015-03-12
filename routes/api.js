var events = require('monument').events;


events.on('route:/api:get', function (connection) {
	'use strict';
	
	connection.res.end('Welcome to the designfrontier.net api!');
});

events.on('route:/api/articles:get', function (connection) {
	'use strict';

	if(typeof connection.query.since !== 'undefined'){
		events.once('data:set:articles:since', function (articles) {
			connection.res.send(articles);
		});

		events.emit('data:get:articles:since', connection.query.since);
	} else {
		events.once('data:set:articles', function (articles) {
			connection.res.send(articles);
		});

		events.emit('data:get:articles');
	}

});

events.on('route:/api/articles/:id:get', function (connection) {
	'use strict';
	
	events.once('data:set:article:' + connection.params.id, function (article) {
		if(typeof article !== 'undefined'){
			connection.res.send(article);
		} else {
			events.emit('error:404', connection);
		}
	});

	events.emit('data:get:articles', connection.params.id);
});

events.on('route:/api/search:get', function (connection) {
	'use strict';
	
	if(typeof connection.query.q === 'undefined' && connection.query.q !== ''){
		connection.res.end('You must include a queryparam q for this to work.');
	} else {
		events.once('articles:search:results', function (results) {
			connection.res.send(results);
		});
		
		events.emit('articles:search', connection.query.q);
	}
});