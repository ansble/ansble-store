var events = require('monument').events
	, utils = require('../utils')
	, articlesCollection = []
	, articleStore = require('./database.json')

	, populateCollection = function () {
		'use strict';

		Object.keys(articleStore).forEach(function (key) {
			if(articleStore[key].type === 'article'){
				articleStore[key].publishedDate = utils.formatDate(articleStore[key].published);
				articlesCollection.push(articleStore[key]);
			}
		});

		//sort by date Newest to Oldest
		articlesCollection.sort(function (a, b) {
			return new Date(b.published) - new Date(a.published);
		});

		//setup next and previous links
		articlesCollection.map(function (item, index, collection) {
			if(index + 1 < collection.length){
				item.prev = collection[index + 1].id;
			}

			if(index > 0) {
				item.next = collection[index - 1].id;
			}
		});
	};

populateCollection();

events.on('data:get:articles', function (id) {
	'use strict';

	if(typeof id !== 'undefined'){
		events.emit('data:set:article:' + id, articleStore[id]);
	} else {
		events.emit('data:set:articles', articlesCollection);
	}
});

events.on('data:get:articles:since', function (since) {
	'use strict';

	var articles = articlesCollection.filter(function (article) {
		return new Date(article.published) > new Date(since);
	});

	events.emit('data:set:articles:since', articles);
});

events.on('data:get:article:latest', function () {
	'use strict';

	events.emit('data:set:article:latest', articlesCollection[0]);
});

events.on('articles:search', function (query) {
	'use strict';

	var matches = articlesCollection.filter(function (article) {
		var testString = article.tags.join(' ') + ' ' +  article.title + ' ' + article.content;

		return testString.match(query);
	});

	events.emit('articles:search:results', {query: query, matches: matches});
});
