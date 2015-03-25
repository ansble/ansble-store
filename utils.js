var crypto = require('crypto')
	, mongo = require('mongodb')
	, BSON = mongo.BSONPure
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
	}

	, mongoID = function (idIn) {
		'use strict';
		var id = idIn;

		try{
			id = new BSON.ObjectID(id);
		}catch(e){}

		return id;
	};

module.exports = {
	formatDate: formatDate
	, generateID: generateID
	, convertToMongoID: mongoID
};