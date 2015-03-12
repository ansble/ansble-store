var events = require('monument').events;


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

	events.emit('data:get:all', {key: connection.params.key});
});

events.on('route:/api/v1/:app:post', function (connection) {
	'use strict';
	
	connection.res.send('route /api/v1/:app now responding to post requests');
});

events.on('route:/api/v1/:app/:id:get', function (connection) {
	'use strict';
	
	connection.res.send('route /api/v1/:app/:id now responding to get requests');
});

events.on('route:/api/v1/:app/:id:put', function (connection) {
	'use strict';
	
	connection.res.send('route /api/v1/:app/:id now responding to put requests');
});