var monument = require('monument');

require('./data/database');

monument.server({
				routePath: './routes'
				, templatePath: './templates'
				, publicPath: './public'
				, port: process.env.PORT || 3002
				, compress: (process.env.NODE_ENV && process.env.NODE_ENV ===  'production')
			});