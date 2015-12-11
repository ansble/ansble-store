'use strict';

const monument = require('monument');

require('./data/database');
require('./security');

monument.server({
    routePath: './routes'
    , templatePath: './templates'
    , publicPath: './public'
    , port: process.env.PORT || 3002
    , compress: false && (process.env.NODE_ENV && process.env.NODE_ENV === 'production')
});
