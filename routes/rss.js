var events = require('monument').events
	, RSS = require('rss')

	, feed;


events.once('data:set:articles', function (articles) {
	'use strict';

	//generate the feed!
	feed = new RSS({
	    title: 'designfrontier article feed',
	    description: 'article feed for designfrontier.net can also be accessed via the site api at http://designfrontier.net/api courtesy of Daniel Sellers',
	    feed_url: 'http://designfrontier.net/rss',
	    site_url: 'http://designfrontier.net',
	    managingEditor: 'Daniel Sellers',
	    webMaster: 'Daniel Sellers',
	    copyright: '2015 Daniel Sellers',
	    language: 'en',
	    pubDate: articles[0].published
	});

	articles.forEach(function (article) {
		feed.item({
			title: article.title
			, date: article.published
			, url: 'http://designfrontier.net/' + article.id
			, categories: article.tags
			, description: article.content
		});
	});
});

events.emit('data:get:articles');

events.on('route:/rss:get', function (connection) {
	'use strict';

	connection.res.setHeader('Content-Type', 'application/rss+xml');
	connection.res.end(feed.xml({indent:true}));
});