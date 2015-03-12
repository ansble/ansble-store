var events = require('monument').events

	, about = require('./database.json').about;

events.on('data:get:about', function () {
	'use strict';

	events.emit('data:set:about', about);
});