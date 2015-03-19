var events = require('monument').events
	, parser = require('monument').parser
	, crypto = require('crypto')
	, getID = require('../utils').generateID

	, schema = require('../data/schemas')

	, apiTemplate = require('../templates/api');


events.on('route:/api:get', function (connection) {
	'use strict';

	connection.res.send(apiTemplate());
});

events.on('route:/api:post', function (connection) {
	'use strict';

	parser(connection, function (body) {
		body.key = getID(crypto.randomBytes(48).toJSON().data.join(''));
		body.createdDate = new Date();

		//TODO: add payment system
		body.payment = {};

		events.once('token:created:' + body.key, function (token) {
			console.log(body);
			connection.res.send({auth: token, key: body.key});
		});

		//validate the body
		if(schema.check(body, schema.account)){
			events.emit('token:create', body);
		} else {
			//TODO: actually hook this up once the bug in parser is fixed
			// console.log(body);
			// //error... not an app
			// events.emit('error:404', connection);
		}

	});
});

events.on('route:/api/v1/:app:get', function (connection) {
	'use strict';
	
	events.once('data:set:all:' + connection.params.app, function (data) {
		if(data === null){
			events.emit('error:404', connection);
		} else {
			connection.res.send(data);
		}

	});

	events.emit('data:get:all', {key: connection.params.app});
});

events.on('route:/api/v1/:app:post', function (connection) {
	'use strict';
	var id;
	
	parser(connection, function (body) {
		id = crypto.createHash('sha1').update(JSON.stringify(body)).digest('hex');

		events.once('data:saved:' + id, function (data) {
			connection.res.send(data);
		});

		//add a typecheck here before proceeding...
		events.emit('data:new', {key: connection.params.app, id: id, data:body});
	});

});

events.on('route:/api/v1/:app/:id:get', function (connection) {
	'use strict';
	
	events.once('data:set:' + connection.params.app + ':' + connection.params.id, function (data) {
		if(data === null){
			events.emit('error:404', connection);
		} else {
			connection.res.send(data);
		}
	});

	events.emit('data:get', connection.params);
});

events.on('route:/api/v1/:app/:id:put', function (connection) {
	'use strict';
	
	parser(connection, function (body) {
		events.once('data:saved:' + connection.params.id, function (data) {
			connection.res.send(data);
		});

		//add a typecheck here before proceeding...
		events.emit('data:update', {key: connection.params.app, id: connection.params.id, data:body});
	});
});