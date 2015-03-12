(function (document, window) {
	'use strict';

	var prev = document.querySelector('.footer__nav--previous a')
		, next = document.querySelector('.footer__nav--next a');

	document.addEventListener('keydown', function (evnt) {
		var key = (evnt.which) ? evnt.which : evnt.keyCode;

		//key navigation
		if(key === 39){
			//previous article
			if(prev !== null){
				window.location.pathname = prev.getAttribute('href');
			}
		} else if(key === 37){
			//next article
			if(next !== null){
				window.location.pathname = next.getAttribute('href');
			}
		}
	});
})(document, window);