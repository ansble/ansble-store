(function (document, window) {
	'use strict';
	var header = document.querySelector('.header__logo')
		, menu = document.querySelector('.header');

	header.addEventListener('click', function () {
		if(menu.hasAttribute('open')){
			menu.removeAttribute('open');
		} else {
			menu.setAttribute('open', '');
		}
	});
})(document, window);