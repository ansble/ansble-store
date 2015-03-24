var events = require('monument').events
	, parser = require('monument').parser
	, crypto = require('crypto')
	, getID = require('../utils').generateID

	, schema = require('../data/schemas')

	, apiTemplate = require('../templates/api');


events.on('route:/api:get', function (connection) {
	'use strict';
	if(typeof connection.query.token !== 'undefined' && connection.query.token === '550c1afb126db4250aa5f64a'){
		connection.res.send(apiTemplate());
	} else {
		events.emit('error:401', connection);
	}
});

events.on('route:/api:post', function (connection) {
	'use strict';

	parser(connection, function (body) {
		body.key = getID(crypto.randomBytes(48).toJSON().data.join(''));
		body.createdDate = new Date();

		//TODO: add payment system
		body.payment = {};

		events.once('token:created:' + body.key, function (token) {
			// console.log(body);
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
	

	if(typeof connection.req.headers.authorization !== 'undefined'){
		events.once('token:verify:' + connection.req.headers.authorization, function (valid) {
			if(valid && valid.app === connection.params.app){
				events.once('data:set:all:' + connection.params.app, function (data) {
					if(data === null){
						events.emit('error:404', connection);
					} else {
						//TODO: grab the allowed domains and use them to set CORS
						// connection.res.setHeader('Access-Control-Allow-Origin', valid.)
						connection.res.send(data);
					}

				});

				events.emit('data:get:all', {key: connection.params.app});
			} else {
				events.emit('error:401', connection);
			}
		});

		events.emit('token:verify', connection.req.headers.authorization);
	} else {
		events.emit('error:401', connection);
	}
	
});

events.on('route:/api/v1/:app:post', function (connection) {
	'use strict';
	var id;
	if(typeof connection.req.headers.authorization !== 'undefined'){
		events.once('token:verify:' + connection.req.headers.authorization, function (valid) {
			if(valid && valid.app === connection.params.app){
				parser(connection, function (body) {					
					id = crypto.createHash('sha1').update(JSON.stringify(body)).digest('hex');

					events.once('data:saved:' + id, function (data) {
						connection.res.send(data);
					});

					//add a typecheck here before proceeding...
					events.emit('data:new', {key: connection.params.app, id: id, data:body});
				});
			} else {
				events.emit('error:401', connection);
			}
		});

		events.emit('token:verify', connection.req.headers.authorization);
	} else {
		events.emit('error:401', connection);
	}
});

events.on('route:/api/v1/:app/:id:get', function (connection) {
	'use strict';
	if(typeof connection.req.headers.authorization !== 'undefined'){
		events.once('token:verify:' + connection.req.headers.authorization, function (valid) {
			if(valid && valid.app === connection.params.app){
				events.once('data:set:' + connection.params.app + ':' + connection.params.id, function (data) {
					if(data === null){
						events.emit('error:404', connection);
					} else {
						connection.res.send(data);
					}
				});

				events.emit('data:get', connection.params);
			} else {
				events.emit('error:401', connection);
			}
		});

		events.emit('token:verify', connection.req.headers.authorization);
	} else {
		events.emit('error:401', connection);
	}
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

events.on('route:/api/v1/:app/:id:delete', function (connection) {
	'use strict';
	
	connection.res.end('route /api/v1/:app/:id now responding to delete requests');
});