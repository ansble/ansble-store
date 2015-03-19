(function(){function api(it
/**/) {
var out='<!doctype html><html><head><meta name="viewport" content="width=device-width"><title>ansble: rest api-ed data store for you and your apps</title><link href="/built/css/main.css" rel="stylesheet"></head><body><nav class="header"><h1 class="header__logo">ansble</h1><ul class="header__nav"><li><a href="/" class="header__nav__item">home</a></li><li><a href="/about" class="header__nav__item">about</a></li><li><a href="/api" class="header__nav__item">api</a></li><li><a href="/docs" class="header__nav__item">docs</a></li></ul></nav><form class="signup"><label>Your Name: <input type="text" name="name"></label><label>Application Name: <input type="text" name="app"></label><label>What does it do?: <textarea name="what"></textarea></label><button type="submit">Apply</button></form><footer class="footer"><section class="footer__nav--copyright">&copy; 2015 ansble llc</section><section class="footer__nav__api"><a href="/api" class="footer__nav__link">api</a></section></footer><script src="/components/signup/signup.js"></script><script>//google analytics goes here</script></body></html>';return out;
}var itself=api, _encodeHTML=(function (doNotSkipEncoded) {
		var encodeHTMLRules = { "&": "&#38;", "<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "/": "&#47;" },
			matchHTML = doNotSkipEncoded ? /[&<>"'\/]/g : /&(?!#?\w+;)|<|>|"|'|\//g;
		return function(code) {
			return code ? code.toString().replace(matchHTML, function(m) {return encodeHTMLRules[m] || m;}) : "";
		};
	}());if(typeof module!=='undefined' && module.exports) module.exports=itself;else if(typeof define==='function')define(function(){return itself;});else {window.render=window.render||{};window.render['api']=itself;}}());