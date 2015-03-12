var monthArray = [
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

		return dateObj.getDate() + ' ' + monthArray[dateObj.getMonth()] + ' ' + dateObj.getFullYear();
	};

module.exports = {
	formatDate: formatDate
};