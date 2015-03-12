var events = require('monument').events
	, parser = require('monument').parser
	, crypto = require('crypto');


events.on('route:/api:get', function (connection) {
	'use strict';
	
	connection.res.send('route /api now responding to get requests');
});

events.on('route:/api/v1/:app:get', function (connection) {
	'use strict';
	
	events.once('data:set:all:' + connection.params.app, function (data) {
		if(data === null){
			data = [];
		}

		connection.res.send(data);
	});

	events.emit('data:get:all', {key: connection.params.app});
});

events.on('route:/api/v1/:app:post', function (connection) {
	'use strict';
	var hash = crypto.createHash('sha1')
		, id;
	
	parser(connection, function (body) {
		id = hash.update(JSON.stringify(body)).digest('hex');

		events.once('data:saved:' + id, function (data) {
			connection.res.send(data);
		});

		//add a typecheck here before proceeding...
		events.emit('data:new', body);
	});

});

events.on('route:/api/v1/:app/:id:get', function (connection) {
	'use strict';
	
	connection.res.send('route /api/v1/:app/:id now responding to get requests');
});

events.on('route:/api/v1/:app/:id:put', function (connection) {
	'use strict';
	
	connection.res.send('route /api/v1/:app/:id now responding to put requests');
});