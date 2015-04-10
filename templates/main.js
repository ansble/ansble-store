(function(){function main(it
/**/) {
var out='<!DOCTYPE html><html> <head> <meta name="viewport" content="width=device-width"> <title>ansble: rest api-ed data store for you and your apps</title> <link href="/built/css/main.css" rel="stylesheet"> </head> <body class="dark-background"> <h1 class="header__image tr center">the golden snitch</h1> <p class="text-center">coming very very soon&hellip;</p> <footer class="text-right"> </footer> </body></html>';return out;
}var itself=main, _encodeHTML=(function (doNotSkipEncoded) {
		var encodeHTMLRules = { "&": "&#38;", "<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "/": "&#47;" },
			matchHTML = doNotSkipEncoded ? /[&<>"'\/]/g : /&(?!#?\w+;)|<|>|"|'|\//g;
		return function(code) {
			return code ? code.toString().replace(matchHTML, function(m) {return encodeHTMLRules[m] || m;}) : "";
		};
	}());if(typeof module!=='undefined' && module.exports) module.exports=itself;else if(typeof define==='function')define(function(){return itself;});else {window.render=window.render||{};window.render['main']=itself;}}());