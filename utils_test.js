var assert = require('chai').assert
	, utils = require('./utils');

describe('Utils Tests', function () {
	'use strict';

	describe('Format Date Strings', function () {
		'use strict';

		it('should return day Month Year for dates passed in', function () {
			var d = new Date('12/10/1983');

			assert.strictEqual(utils.formatDate(d), '10 Dec 1983');
		});
	});
});