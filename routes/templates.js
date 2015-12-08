'use strict';

const events = require('monument').events
    , authTemplate = require('../templates/auth');

events.on('route:/templates:get', (connection) => {
    connection.res.setHeader('Content-Type', 'application/javascript');
    connection.res.setHeader('Vary', 'Accept-Encoding');
    connection.res.end(authTemplate.toString());
});
