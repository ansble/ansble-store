var crypto = require('crypto')
	, monthArray = [
		'Jan'
		, 'Feb'
		, 'Mar'
		, 'Apr'
		, 'Jun'
		, 'Jul'
		, 'Aug'
		, 'Sep'
		, 'Oct'
		, 'Nov'
		, 'Dec'
	]
	, formatDate = function (dateString) {
		'use strict';

		var dateObj = new Date(dateString);

		return dateObj.getDate() + ' ' + monthArray[dateObj.getMonth() - 1] + ' ' + dateObj.getFullYear();
	}

	, generateID = function(salt){
		'use strict';

		var randString = crypto.randomBytes(48).toJSON().data.join('')
			, jti = crypto.createHash('sha1');

		return jti.update(salt + new Date().getTime() + randString).digest('hex');
	};

module.exports = {
	formatDate: formatDate
	, generateID: generateID
};