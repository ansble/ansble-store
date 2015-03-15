var events = require('monument').events;

events.on('data:get', function (input) {
	'use strict';

	events.emit('data:set:' + input.app + ':' + input.id, null);
	
});

events.on('data:get:all', function (input) {
	'use strict';

	events.emit('data:set:all:' + input.key, null);
	
});

events.on('data:new', function (input) {
	'use strict';

	input.data.id = 1;

	events.emit('data:saved:' + input.id, input.data);
});

events.on('data:update', function (input) {
	'use strict';

	input.data.updatedDate = new Date();

	events.emit('data:saved:' + input.id, input.data);
});