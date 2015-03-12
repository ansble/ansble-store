$(function(){
	$.getJSON('/api/about', function(data, status){

		$('#content').html(action.templates.about(data));
	});
});