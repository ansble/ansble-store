//this is the template manager event system
action.listen('template:get', function(templateID){
	action.emit('template:set:' + templateID, action.templates[templateID]);
});