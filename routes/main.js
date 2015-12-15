'use strict';

const events = require('monument').events
    , parser = require('monument').parser
    , generateID = require('../utils').generateID
    , isDefined = require('../utils').isDefined
    , schema = require('../data/schemas')
    , apiTemplate = require('../templates/api');


events.on('route:/:get', (connection) => {
    if (isDefined(connection.query.token) && connection.query.token === '550c1afb126db4250aa5f64a'){
        connection.res.send(apiTemplate());
    } else {
        events.emit('error:401', connection);
    }
});

events.on('route:/:post', (connection) => {
    parser(connection, (body) => {
        body.key = generateID();
        body.createdDate = new Date();

        // TODO: add payment system
        body.payment = {};

        events.once(`token:created:${body.key}`, (token) => {
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
