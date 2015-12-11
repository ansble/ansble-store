'use strict';

const events = require('monument').events
    , parser = require('monument').parser
    , generateID = require('../utils').generateID
    , tagFilter = require('../utils').filterTags
    , isDefined = require('../utils').isDefined

    , schema = require('../data/schemas')
    , sandbox = require('sandbox')

    , apiTemplate = require('../templates/api');


events.on('route:/api:get', (connection) => {
    if (isDefined(connection.query.token) && connection.query.token === '550c1afb126db4250aa5f64a'){
        connection.res.send(apiTemplate());
    } else {
        events.emit('error:401', connection);
    }
});

events.on('route:/api:post', (connection) => {
    parser(connection, (body) => {
        body.key = generateID();
        body.createdDate = new Date();

        // TODO: add payment system
        body.payment = {};

        events.once('token:created:' + body.key, (token) => {
            // console.log(body);
            connection.res.send({ auth: token, key: body.key });
        });

        // validate the body
        if (schema.check(body, schema.account)){
            events.emit('token:create', body);
        } else {
            // TODO: actually hook this up once the bug in parser is fixed
            //  console.log(body);
            // //error... not an app
            // events.emit('error:404', connection);
        }

    });
});

events.on('route:/api/v1/:app:get', (connection) => {
    if (isDefined(connection.req.headers.authorization)){
        events.once('token:verify:' + connection.req.headers.authorization, (valid) => {
            if (valid && valid.app === connection.params.app){
                events.once('data:set:all:' + connection.params.app, (data) => {
                    if (data === null){
                        events.emit('error:404', connection);
                    } else {
                        // TODO: grab the allowed domains and use them to set CORS
                        // connection.res.setHeader('Access-Control-Allow-Origin', valid.)
                        if (typeof connection.query.tags !== 'undefined' && Array.isArray(data)){
                            connection.res.send(data.filter(tagFilter(connection.query.tags)));
                        } else {
                            connection.res.send(data);
                        }
                    }

                });

                events.emit('data:get:all', { key: connection.params.app });
            } else {
                events.emit('error:401', connection);
            }
        });

        events.emit('token:verify', connection.req.headers.authorization);
    } else {
        events.emit('error:401', connection);
    }

});

events.on('route:/api/v1/:app:post', (connection) => {
    let id;

    if (typeof connection.req.headers.authorization !== 'undefined'){
        events.once('token:verify:' + connection.req.headers.authorization, (valid) => {
            if (valid && valid.app === connection.params.app){
                parser(connection, (body) => {

                    id = generateID();

                    events.once('data:saved:' + id, (data) => {
                        connection.res.send(data);
                    });

                    // add a typecheck here before proceeding...

                    if (typeof body !== 'object' || Object.keys(body).length === 0){
                        // malformed content was passed in...
                        events.off('data:saved:' + id);
                        events.emit('error:500', 'Malformed data was sent to the service. We\'re sorry. Try again.');
                    } else {
                        events.emit('data:new', { key: connection.params.app, id: id, data: body });
                    }
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

events.on('route:/api/v1/:app/:id:get', (connection) => {
    if (isDefined(connection.req.headers.authorization)){
        events.required([
            'token:verify:' + connection.req.headers.authorization
            , 'data:set:' + connection.params.app + ':' + connection.params.id
        ], (arr) => {
            const valid = arr[0] && arr[0].app === connection.params.app;

            if (valid){
                if (arr[1] === null){
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

events.on('route:/api/v1/:app/:id:put', (connection) => {
    events.required([
        'token:verify:' + connection.req.headers.authorization
        , 'data:set:' + connection.params.app + ':' + connection.params.id
    ], (data) => {
        const valid = data[0] && data[0].app === connection.params.app;

        if (valid && data[1] !== null){
            parser(connection, (body) => {
                // add a typecheck here before proceeding...
                if (Array.isArray(body)){
                    events.emit('error:500', {
                        connection: connection
                        , message: 'You can only PUT a single object'
                    });
                } else {
                    events.once('data:saved:' + connection.params.id, (dataSaved) => {
                        if (dataSaved){
                            connection.res.send(body);
                        } else {
                            events.emit('error:404', connection);
                        }
                    });

                    events.emit('data:update', {
                        key: connection.params.app
                        , id: connection.params.id
                        , data: body
                    });
                }
            });
        } else {
            events.emit('error:401', connection);
        }
    });

    events.emit('token:verify', connection.req.headers.authorization);
    events.emit('data:get', connection.params);
});

events.on('route:/api/v1/:app/:id:delete', (connection) => {
    if (isDefined(connection.req.headers.authorization)){
        events.required([ 'token:verify:' + connection.req.headers.authorization, 'data:set:' + connection.params.app + ':' + connection.params.id ], (arr) => {
            const valid = arr[0] && arr[0].app === connection.params.app;
            let allowed;

            allowed = arr[1]._meta.access.filter((permission) => {
                return permission.app === connection.params.app && typeof permission.del !== 'undefined' && permission.del;
            });

            console.log(valid && allowed.length > 0);

            if (valid && allowed.length > 0) {
                // this item can be deleted with this key
                events.once('data:deleted:' + connection.params.id, (done) => {
                    connection.res.send({ success: done });
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

events.on('route:/api/v1/:app:report', (connection) => {
    if (isDefined(connection.req.headers.authorization)){
        events.once('token:verify:' + connection.req.headers.authorization, (valid) => {
            if (valid && valid.app === connection.params.app){
                events.once(`data:set:all:${connection.params.app}`, (data) => {
                    if (data === null){
                        events.emit('error:404', connection);
                    } else {
                        // TODO: grab the allowed domains and use them to set CORS
                        //  connection.res.setHeader('Access-Control-Allow-Origin', valid.)
                        parser(connection, (body) => {
                            /* eslint-disable new-cap */
                            const s = new sandbox();
                            /* eslint-enable new-cap */
                            let execString = 'result = data';

                            body.forEach((item) => {
                                if (item.type === 'filter' || item.type === 'map' || item.type === 'reduce'){
                                    execString += '.' + item.type + '(' + item.body + ')';
                                }
                            });

                            s.run('data = ' + JSON.stringify(data) + '; ' + execString, (output) => {
                                connection.res.send(output.result);
                            });
                        });
                    }

                });

                events.emit('data:get:all', { key: connection.params.app });
            } else {
                events.emit('error:401', connection);
            }
        });

        events.emit('token:verify', connection.req.headers.authorization);
    } else {
        events.emit('error:401', connection);
    }

});
