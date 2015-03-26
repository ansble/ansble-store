var assert = require('chai').assert
	, utils = require('./utils');

describe('Utils Tests', function () {
	'use strict';

	describe('Format Date Strings', function () {

		it('should return day Month Year for dates passed in', function () {
			var d = new Date('12/10/1983');

			assert.strictEqual(utils.formatDate(d), '10 Dec 1983');
		});
	});

	describe('MongoID handling', function () {
		it('should return the same string if a non-mongoid is passed in', function () {
			var id = 'daniel-sellers-rocks';

			assert.strictEqual(id, utils.convertToMongoID(id));
		});

		it('should return a mongoid if a mongoid is passed in', function () {
			var mongoid = '551179613567ecb43b6531fe';

			assert.notStrictEqual(mongoid, utils.convertToMongoID(mongoid));
			assert.equal(mongoid, utils.convertToMongoID(mongoid));
		});
	});
});