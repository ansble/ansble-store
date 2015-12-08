/* eslint-env node, mocha */
'use strict';

const assert = require('chai').assert
    , schemas = require('./schemas');

describe('Schema Tests', () => {
    describe('jwt schema test', () => {
        it('should return a jwt schema', () => {
            const jwt = schemas.jwt;

            assert.strictEqual(jwt.scopes, 'array');
            assert.strictEqual(jwt.app, 'string');
            assert.strictEqual(jwt.jti, 'string');
        });

        it('should validate a jwt when passed into the validate function', () => {
            const jwt = {
                scopes: []
                , app: 'some-id-of-an-app'
                , jti: '12345678532234234'
            };

            assert.strictEqual(schemas.check(jwt, schemas.jwt), true);
        });

        it('should return an account schema', () => {
            const app = schemas.account;

            assert.strictEqual(app.key, 'string');
            assert.strictEqual(app.createdDate, 'date');
            assert.strictEqual(app.contact, 'object');
            assert.strictEqual(app.payment, 'object');
            assert.strictEqual(app.url, 'string');
            assert.strictEqual(app.key, 'string');
            assert.strictEqual(app.name, 'string');
            assert.strictEqual(app.description, 'string');
        });

        it('should return a contact schema', () => {
            const test = schemas.contact;

            assert.strictEqual(test.name, 'string');
            assert.strictEqual(test.email, 'string');
            assert.strictEqual(test.phone, 'string');
        });

        it('should return a payment schema', () => {
            const test = schemas.payment;

            assert.strictEqual(test.token, 'string');
            assert.strictEqual(test.expires, 'date');
        });

    });
});
