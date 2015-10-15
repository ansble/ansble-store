var events = require('monument').events
	, parser = require('monument').parser
	, crypto = require('crypto')
	, getID = require('../utils').generateID
    , tagFilter = require('../utils').filterTags

	, schema = require('../data/schemas')
	, sandbox = require('sandbox')

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
                        if(typeof connection.query.tags !== 'undefined' && Array.isArray(data)){
                            connection.res.send(data.filter(tagFilter(connection.query.tags)));
                        } else {
						  connection.res.send(data);
                        }
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
		events.required([
					'token:verify:' + connection.req.headers.authorization
					, 'data:set:' + connection.params.app + ':' + connection.params.id
				]
			, function (arr) {

			var valid = (arr[0] && arr[0].app === connection.params.app);

			if(valid){
				if(arr[1] === null){
					events.emit('error:404', connection);
				} else {
					connection.res.send(arr[1]);
				}
			} else {
				events.emit('error:401', connection);
			}
		});

		events.emit('data:get', connection.params);
		events.emit('token:verify', connection.req.headers.authorization);

	} else {
		events.emit('error:401', connection);
	}
});

events.on('route:/api/v1/:app/:id:put', function (connection) {
	'use strict';

	events.required([
			'token:verify:' + connection.req.headers.authorization
			, 'data:set:' + connection.params.app + ':' + connection.params.id
		], function (data) {
		var valid = (data[0] && data[0].app === connection.params.app);

		if(valid && data[1] !== null){
			parser(connection, function (body) {

                //add a typecheck here before proceeding...
                if(Array.isArray(body)){
                    events.emit('error:500', {connection: connection, message: 'You can only PUT a single object'});
                } else {
    				events.once('data:saved:' + connection.params.id, function (data) {
                        if(data){
    						connection.res.send(body);
    					} else {
    						events.emit('error:404', connection);
    					}
    				});

					events.emit('data:update', {key: connection.params.app, id: connection.params.id, data:body});
				}
			});
		} else {
			events.emit('error:401', connection);
		}
	});

	events.emit('token:verify', connection.req.headers.authorization);
	events.emit('data:get', connection.params);
});

events.on('route:/api/v1/:app/:id:delete', function (connection) {
	'use strict';


	if(typeof connection.req.headers.authorization !== 'undefined'){
		events.required(['token:verify:' + connection.req.headers.authorization, 'data:set:' + connection.params.app + ':' + connection.params.id], function (arr) {
			var valid = (arr[0] && arr[0].app === connection.params.app)
				, allowed;

			allowed = arr[1]._meta.access.filter(function (permission) {
				return permission.app === connection.params.app && typeof permission.del !== 'undefined' && permission.del;
			});

			console.log(valid && allowed.length > 0);

			if(valid && allowed.length > 0) {
				//this item can be deleted with this key
				events.once('data:deleted:' + connection.params.id, function (done) {
					connection.res.send({success: done});
				});

				events.emit('data:delete', connection.params.id);
			} else {
				events.emit('error:401', connection);
			}
		});

		events.emit('token:verify', connection.req.headers.authorization);
		events.emit('data:get', connection.params);

	} else {
		events.emit('error:401', connection);
	}
});

events.on('route:/api/v1/:app:report', function (connection) {
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
						parser(connection, function (body) {
							var s = new sandbox()
								, execString = 'result = data';

							body.forEach(function (item) {
								if(item.type === 'filter' || item.type === 'map' || item.type === 'reduce'){
									execString += '.' + item.type + '(' + item.body + ')';
								}
							});

							s.run('data = ' + JSON.stringify(data) + '; ' + execString, function (output) {
								connection.res.send(output.result);
							});
						});
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
