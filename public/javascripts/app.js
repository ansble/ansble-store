//TODO/NOTES
//	1. first load package should include:
//		- first article if there is a newer one
//		- about page
//		- main page
//	2. most of this should go in local storage of some flavor one first load
//		- implement pouch? or hoodie?
//	3. Show navigation items for prev/next article/about
//		- on first use these should let you know you can swipe instead
//		- use localstorage to determine new/returning
//		- if someone starts using swipe fade out the inputs?

var designfrontier = action.eventMe({
	init: function(){
		var that = this
			, doc = document
			, body = doc.getElementsByTagName('body')[0];

		that.location = 1;

		//swipe navigation listeners yo!
		that.listen('swipe:right-to-left', that.nextArticle, that);
		that.listen('swipe:left-to-right', that.previousArticle, that);

		//bring in da hammaaa!!!
		Hammer(body).on('swipeleft', function(){
			that.emit('swipe:right-to-left');
		}).on('swiperight', function(){
			that.emit('swipe:left-to-right');
		});
		//end swipe navigation handlers and stuff

		//navigation helpers
		// $('.right-helper-tab').on('click', function(){
		// 	that.emit('swipe:right-to-left');
		// });

		// $('.left-helper-tab').on('click', function(){
		// 	that.emit('swipe:left-to-right');
		// });

		//data listeners
		that.listen('data:location:get', that.returnValue('location'), that);
		that.listen('panes:getAll', that.getPanes, that);

		//get the panes
		that.emit('panes:getAll');

		return that;
	}

	// , setupRoutes: function(){
	// 	var that = this
	// 		, uid = 0;

	// 	that.listen('navigate:to', function(urlIn){
	// 		var url = urlIn
	// 			, push = true;

	// 		if(typeof url === 'object'){
	// 			push = url.pushState;
	// 			url = url.url;
	// 		}

	// 		if(push){
	// 			history.pushState({id: url},'designfrontier' + uid++,url);
	// 		}
	// 	});

	// 	window.onpopstate = function(d, a, c){
	// 		var locationArray = location.pathname.split('/');
	// 		that.emit('navigate:to', {url: locationArray.pop(), pushState: false});
	// 	};
	// }

	, nextArticle: function(){
		var that = this
			, currentLocation = that.location;

		// $(that.panes[currentLocation]).css('right', '100%');
		// $(that.panes[currentLocation + 1]).css('right', '0');

		if(currentLocation === 1){
			history.pushState({},'article 1', 'article-1');
		}
	}

	, previousArticle: function(){
		var that = this
			, currentLocation = that.location;

		// $(that.panes[currentLocation]).css('right', '0');
		// $(that.panes[currentLocation + 1]).css('right', '100%');

		if(currentLocation === 1){
			history.pushState({},'article 1', 'about-me');
		}else{
			history.pushState({},'article 1', 'test');	
		}
	}

	, getPanes: function(){
		var that = this;

		that.panes = document.querySelector('.pane');
		that.emit('panes:ready');
		console.log('panes set');
	}

	, returnValue: function(name){
		var that = this;

		that.emit('data:' + name, that[name]);
	}
});