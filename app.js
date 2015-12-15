'use strict';

const monument = require('monument')
    , env = require('./utils/env');

require('./data/database');
require('./security');

monument.server({
    routePath: './routes'
    , templatePath: './templates'
    , publicPath: './public'
    , port: env.PORT || 3002
    , compress: env.IS_PRODUCTION
});
