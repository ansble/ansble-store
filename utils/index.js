'use strict';

const mongo = require('mongodb')
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
    , formatDate = (dateString) => {
        const dateObj = new Date(dateString)
            , month = monthArray[dateObj.getMonth() - 1];

        return `${dateObj.getDate()} ${month} ${dateObj.getFullYear()}`;
    }

    , generateID = () => {
        return createUUID();
    }

    , mongoID = (idIn) => {
        let id = idIn;

        try {
            id = new mongo.ObjectID(id);
        } catch (e) {
            // an error... that we don't care about
        }

        return id;
    }

    , clone = (item) => {
        return JSON.parse(JSON.stringify(item));
    }

    , isUndefined = (item) => {
        return typeof item === 'undefined';
    }

    , isDefined = (item) => {
        return typeof item !== 'undefined';
    }

    , filterTags = (tagsIn) => {
        const tags = Array.isArray(tagsIn) ? tags : [ tags ]
            , isMatch = (itemTags, tag) => {
                return isDefined(itemTags) && Array.isArray(itemTags) && itemTags.indexOf(tag) >= 0;
            };

        return (item) => {
            return tags.reduce((match, tag) => {
                if (isMatch(item.tags, tag)) {
                    return true;
                } else {
                    return match;
                }
            }, false);
        };
    };

module.exports = {
    formatDate: formatDate
    , generateID: generateID
    , convertToMongoID: mongoID
    , filterTags: filterTags
    , isUndefined: isUndefined
    , isDefined: isDefined
    , clone: clone
};
