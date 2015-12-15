/* eslint-env node, mocha */
'use strict';

const assert = require('chai').assert
    , utils = require('./index');

describe('Utils Tests', () => {
    describe('Format Date Strings', () => {

        it('should return day Month Year for dates passed in', () => {
            const d = new Date('12/10/1983');

            assert.strictEqual(utils.formatDate(d), '10 Dec 1983');
        });
    });

    describe('MongoID handling', () => {
        it('should return the same string if a non-mongoid is passed in', () => {
            const id = 'daniel-sellers-rocks';

            assert.strictEqual(id, utils.convertToMongoID(id));
        });

        it('should return a mongoid if a mongoid is passed in', () => {
            const mongoid = '551179613567ecb43b6531fe';

            assert.notStrictEqual(mongoid, utils.convertToMongoID(mongoid));
            assert.equal(mongoid, utils.convertToMongoID(mongoid));
        });
    });

    describe('isDefined handling', () => {
        it('should return true for defined variables', () => {
            const test = [
                true
                , false
                , 123
                , 'string'
                , {
                    daniel: true
                }
                , (item) => {
                      return item;
                  }
            ];

            test.forEach((item) => {
                assert.strictEqual(utils.isDefined(item), true);
            });
        });

        it('should return false for undefined variables', () => {
            const test = {};

            assert.strictEqual(utils.isDefined(test.bob), false);
        });
    });

    describe('isUndefined handling', () => {
        it('should return false for defined variables', () => {
            const test = [
                true
                , false
                , 123
                , 'string'
                , {
                    daniel: true
                }
                , (item) => {
                      return item;
                  }
            ];

            test.forEach((item) => {
                assert.strictEqual(utils.isUndefined(item), false);
            });
        });

        it('should return true for undefined variables', () => {
            const test = {};

            assert.strictEqual(utils.isUndefined(test.bob), true);
        });
    });
});
