(function (doc) {
	'use strict';

	var submit = doc.querySelector('.signup__submit')
		, form = {
			name: doc.querySelector('[name="name"]')
			, app: doc.querySelector('[name="app"]')
			, description: doc.querySelector('[name="what"]')
		};

	submit.addEventListener('click', function (evnt) {
		//gather the form and submit it
		var data = {};

		Object.keys(form).forEach(function (key) {
			data[key] = form[key].value;
		});

		console.log(data);
		evnt.preventDefault();
		evnt.stopPropogation();
	});
})(document);