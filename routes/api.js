'use strict';

const events = require('monument').events
    , parser = require('monument').parser
    , generateID = require('../utils').generateID
    , tagFilter = require('../utils').filterTags
    , isDefined = require('../utils').isDefined
    , sandbox = require('sandbox');


events.on('route:/:app:get', (connection) => {
    if (isDefined(connection.req.headers.authorization)){
        events.once(`token:verify:${connection.req.headers.authorization}`, (valid) => {
            if (valid && valid.app === connection.params.app){
                events.once(`data:set:all:${connection.params.app}`, (data) => {
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

events.on('route:/:app:post', (connection) => {
    let id;

    if (isDefined(connection.req.headers.authorization)) {
        events.once(`token:verify:${connection.req.headers.authorization}`, (valid) => {
            if (valid && valid.app === connection.params.app){
                parser(connection, (body) => {

                    // get a UUID
                    id = generateID();

                    events.once(`data:saved:${id}`, (data) => {
                        connection.res.send(data);
                    });

                    // add a typecheck here before proceeding...
                    if (typeof body !== 'object' || Object.keys(body).length === 0) {
                        // malformed content was passed in...
                        events.off(`data:saved:${id}`);
                        events.emit('error:500', {
                            message: 'It looks like you sent us a malformed object! Try again bub.'
                            , connection: connection
                        });
                    } else {
                        events.emit('data:new', {
                            key: connection.params.app
                            , id: id
                            , data: body
                        });
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

events.on('route:/:app/:id:get', (connection) => {
    if (isDefined(connection.req.headers.authorization)) {
        events.required([
            `token:verify:${connection.req.headers.authorization}`
            , `data:set:${connection.params.app}:${connection.params.id}`
        ], (arr) => {
            const valid = arr[0] && arr[0].app === connection.params.app;

            if (valid) {
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

events.on('route:/:app/:id:put', (connection) => {
    events.required([
        `token:verify:${connection.req.headers.authorization}`
        , `data:set:${connection.params.app}:${connection.params.id}`
    ], (data) => {
        const valid = data[0] && data[0].app === connection.params.app;

        if (valid && data[1] !== null) {
            parser(connection, (body) => {
                // add a typecheck here before proceeding...
                if (Array.isArray(body)){
                    events.emit('error:500', {
                        connection: connection
                        , message: 'You can only PUT a single object'
                    });
                } else {
                    events.once(`data:saved:${connection.params.id}`, (dataSaved) => {
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

events.on('route:/:app/:id:delete', (connection) => {
    if (isDefined(connection.req.headers.authorization)) {
        events.required([
            `token:verify:${connection.req.headers.authorization}`
            , `data:set:${connection.params.app}:${connection.params.id}`
        ], (arr) => {
            const valid = arr[0] && arr[0].app === connection.params.app;
            let allowed;

            allowed = arr[1]._meta.access.filter((permission) => {
                return permission.app === connection.params.app && typeof permission.del !== 'undefined' && permission.del;
            });

            console.log(valid && allowed.length > 0);

            if (valid && allowed.length > 0) {
                // this item can be deleted with this key
                events.once(`data:deleted:${connection.params.id}`, (done) => {
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

events.on('route:/:app:report', (connection) => {
    if (isDefined(connection.req.headers.authorization)){
        events.once(`token:verify:${connection.req.headers.authorization}`, (valid) => {
            if (valid && valid.app === connection.params.app){
                events.once(`data:set:all:${connection.params.app}`, (data) => {
                    if (data === null) {
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
                                if (item.type === 'filter' || item.type === 'map' || item.type === 'reduce') {
                                    execString += `.${item.type}(${item.body})`;
                                }
                            });

                            s.run(`data = ${JSON.stringify(data)}; ${execString}`, (output) => {
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
