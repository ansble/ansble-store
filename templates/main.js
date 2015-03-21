(function(){function main(it
/**/) {
var out='<!DOCTYPE html><html> <head> <title>ansble llc: powerful rest APIed data store</title> <link rel=\'stylesheet\' href=\'/stylesheets/style.css\' /> </head> <body> <h1 class="header tr center">ansble llc</h1> <p class="text-center">coming very very soon&hellip;</p> <footer class="text-right"> &copy; 2015 <a href="http://ansble.com">ansble llc</a> </footer> </body></html>';return out;
}var itself=main, _encodeHTML=(function (doNotSkipEncoded) {
		var encodeHTMLRules = { "&": "&#38;", "<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "/": "&#47;" },
			matchHTML = doNotSkipEncoded ? /[&<>"'\/]/g : /&(?!#?\w+;)|<|>|"|'|\//g;
		return function(code) {
			return code ? code.toString().replace(matchHTML, function(m) {return encodeHTMLRules[m] || m;}) : "";
		};
	}());if(typeof module!=='undefined' && module.exports) module.exports=itself;else if(typeof define==='function')define(function(){return itself;});else {window.render=window.render||{};window.render['main']=itself;}}());