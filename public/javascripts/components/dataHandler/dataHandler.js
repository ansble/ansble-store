action.dataHandler = (function(){
	var dataStore = {
		articles: action.modelMe({
			url: '/api'
			, init: function(){
				var that = this
					localStore = window.localforage;

				//setup events
				that.listen('article:get', function(articleId){
					//check to see if this thing is locally cached
					localStore.getItem('articles', function(articles){
						if(articles === null){
							//not cached yet
							that.fetch('articles');
						} else {
							//articles is cached. update and serve from here
							that.emit('articles:loaded', articles);
							that.emit('articles:update');
						}
					});
					
					that.emit('article:set', dataStore[articleId]);
				});

				//cache articles locally...
				that.listen('articles:loaded', function(articles){
					that.set('articles', articles);
				});

				that.listen('articles:update', function(){
					that.fetchNewer();
				});

				that.listen('articles:updated', function(update){
					//update the articles object with the new stuff and save it to 
					//	localforage
					var articles = that.get('articles')
						, i = 0;

					//update the items that haven't been downloaded yet
					for(i = 0; i < update.length; i++){
						articles[update[i].id] = update[i];
					}

					that.set('articles', articles);
					localStore.setItem('articles', articles);
				});

				that.emit('articles:get');
			}
			, newerFetch: function(){
				$.ajax({
                    type: 'get'
                    , url: requestUrl + '/newer/' + new Date().toISOString()
                    , success: function(data, status){
                        if(status !== 'success'){
                            that.emit('global:error', new action.Error('http', 'Error in request', that));
                        }

                        if(data.length){
                        	that.emit('articles:updated', data);
                        }
                    }
                    , error: function(xhr, errorType, error){
                        that.emit('global:error', new action.Error('http', 'Error in request type: ' + errorType, that, error));
                    }
                });
			}
			, dataEvent: 'articles:loaded'
		})
	}

	return dataStore;
})();