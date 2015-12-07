'use strict';
const events = require('monument').events;

events.on('route:/loaderio-a965750d0b14924648d4a814f35c567a:get', (connection) => {
    connection.res.send('loaderio-a965750d0b14924648d4a814f35c567a');
});
