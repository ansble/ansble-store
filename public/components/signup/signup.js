(function (doc, win) {
	'use strict';

	var submit = doc.querySelector('.signup__submit')
		, form = {
			contactName: doc.querySelector('[name="name"]')
			, name: doc.querySelector('[name="app"]')
			, url: doc.querySelector('[name="url"]')
			, description: doc.querySelector('[name="what"]')
			, phone: doc.querySelector('[name="phone"]')
			, email: doc.querySelector('[name="email"]')
		}
		, modal = doc.querySelector('.modal')
		, modalContent = doc.querySelector('.modal__content');

	submit.addEventListener('click', function (evnt) {
		//gather the form and submit it
		var data = {
				contact: {}
			}
			, server = new XMLHttpRequest();

		Object.keys(form).forEach(function (key) {
			if(key === 'phone' || key === 'email'){
				data.contact[key] = form[key].value;
			}else if (key === 'contactName'){
				data.contact.name = form[key].value;
			} else {
				data[key] = form[key].value;
			}
		});

		//post to the server
		server.addEventListener('load', function () {
			var res = JSON.parse(server.response);

			if(server.response !== 'exists'){
				//good token
				modal.setAttribute('open','');
				modalContent.innerHTML = win.auth(res);
			} else {
				//you already created this app

			}
		});
		server.open('POST', '/api');
		server.setRequestHeader('Content-Type','application/json');
		server.send(JSON.stringify(data));

		evnt.preventDefault();
		evnt.stopPropagation();
	});
})(document, window);