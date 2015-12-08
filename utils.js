var crypto = require('crypto')
    , mongo = require('mongodb')
    , createUUID = require('monument').createUUID
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

        return createUUID();
    }

    , mongoID = function (idIn) {
        'use strict';
        var id = idIn;

        try{
            id = new mongo.ObjectID(id);
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
    , isUndefined: (item) => {
          return typeof item === 'undefined';
      }
    , isDefined: (item) => {
          return typeof item !== 'undefined';
      }
};
