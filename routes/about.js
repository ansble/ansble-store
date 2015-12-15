'use strict';

const events = require('monument').events;


events.on('route:/about:get', (connection) => {
    connection.res.send('route /about now responding to get requests');
});
