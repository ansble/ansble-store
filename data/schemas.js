var jwtSchema = {
		scopes: 'array'
		, jti: 'string'
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
			if(schemaIn[key === 'array']){
				check = check && typeof objectIn[key] === 'object' && Array.isArray(objectIn[key]);
			} else {
				check = check && typeof objectIn[key] === schemaIn[key];
			}
		});

		return check;
	};

module.exports = {
	jwt: jwtSchema
	, check: schemaCheck
};