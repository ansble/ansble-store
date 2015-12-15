/* eslint-env node, mocha */
'use strict';

const assert = require('chai').assert
    , events = require('monument').events
    , fakeConnection = require('../test_stubs/connectionStub');

require('./loaderio-1b3b503e8a877429e0f6cbd83baf0475');

describe('/loaderio-1b3b503e8a877429e0f6cbd83baf0475 route file tests', () => {
    beforeEach(() => {
        fakeConnection.reset();
    });

    it('should respond to route:/loaderio-1b3b503e8a877429e0f6cbd83baf0475:get', () => {
        events.emit('route:/loaderio-1b3b503e8a877429e0f6cbd83baf0475:get', fakeConnection);

        assert.strictEqual(fakeConnection.out().response, 'loaderio-1b3b503e8a877429e0f6cbd83baf0475');
    });
});
