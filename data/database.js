var events = require('monument').events;

events.on('data:get:all', function (input) {
	'use strict';

	events.emit('data:set:all:' + input.key, {});
	
	return input;
});