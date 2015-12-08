'use strict';

const events = require('monument').events
    , mainTemplate = require('../templates/main');

events.on('route:/:get', (connection) => {
    connection.res.send(mainTemplate());
});
