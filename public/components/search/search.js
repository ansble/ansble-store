(function (document, window) {
	'use strict';
	var search = document.querySelector('.header__search');

	search.addEventListener('keydown', function (evnt) {
		var key = (evnt.which) ? evnt.which : evnt.keyCode;
		
		if(key === 13){
			window.location.href = '/search?q=' + search.value;
		}
	});

	if(window.location.search !== ''){
		search.value = window.location.search.replace(/(\?[^=]+)(=)/, '');
	}
})(document, window);