/* eslint-env node, mocha */
'use strict';

const assert = require('chai').assert
    , events = require('monument').events
    , fakeConnection = require('../test_stubs/connectionStub');

require('./loaderio-a965750d0b14924648d4a814f35c567a');

describe('/loaderio-a965750d0b14924648d4a814f35c567a route file tests', () => {
    beforeEach(() => {
        fakeConnection.reset();
    });

    it('should respond to route:/loaderio-a965750d0b14924648d4a814f35c567a:get', () => {
        const response = 'loaderio-1b3b503e8a877429e0f6cbd83baf0475';

        events.emit('route:/loaderio-a965750d0b14924648d4a814f35c567a:get', fakeConnection);
        assert.strictEqual(fakeConnection.out().response, response);
    });
});
