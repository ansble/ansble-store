/* eslint-disable no-process-env */
'use strict';

const fs = require('fs');

module.exports = {
    MONGO_URL: process.env.MONGOLAB_URI || 'mongodb://localhost:27017/myproject'
    , KEY: process.env.KEY || fs.readFileSync('./keys/dev_key')
    , PUB_KEY: process.env.PUB_KEY || fs.readFileSync('./keys/dev_key.pub')
    , PORT: process.env.PORT
    , IS_PRODUCTION: process.env.NODE_ENV && process.env.NODE_ENV === 'production'
};
