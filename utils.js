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
	}

    , filterTags = function (tags) {
        'use strict';

        if(!Array.isArray(tags)){
            tags = [tags];
        }

        return function (item) {
            var match = false;

            tags.forEach(function (tag) {
                if(typeof item.tags !== 'undefined' && Array.isArray(item.tags) && item.tags.indexOf(tag) >= 0){
                    match = true;
                }
            });

            return match;
        };
    };

module.exports = {
	formatDate: formatDate
	, generateID: generateID
	, convertToMongoID: mongoID
    , filterTags: filterTags
};
