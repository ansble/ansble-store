var jwtSchema = {
		scopes: 'array'
		, app: 'string'
		, jti: 'string'
	}

	, app = {
		key: 'string'
		, createdDate: 'date'
		, contact: 'object'
		, payment: 'object'
		, url: 'string'
		, name: 'string'
		, description: 'string'
	}

	, contact = {
		name: 'string'
		, email: 'string'
		, phone: 'string'
	}

	, payment = {
		token: 'string'
		, expires: 'date'
	}

	, schemaCheck = function (objectIn, schemaIn) {
		'use strict';
		var check = true
			, schemaKeys = Object.keys(schemaIn)
			, objectKeys = Object.keys(objectIn);

		//must have the same number of keys
		check = check && schemaKeys.length === objectKeys.length;


		//and all the keys must match in name and type
		schemaKeys.forEach( function (key) {
			if(schemaIn[key] === 'array'){
				check = check && typeof objectIn[key] === 'object' && Array.isArray(objectIn[key]);
			}else if (schemaIn[key] === 'date'){
				check = check && typeof objectIn[key] === 'object' && !isNaN(new Date(objectIn[key]).getTime());
			} else {
				check = check && typeof objectIn[key] === schemaIn[key];
			}
		});

		return check;
	};

module.exports = {
	jwt: jwtSchema
	, account: app
	, contact: contact
	, payment:payment
	, check: schemaCheck
};