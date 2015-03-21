(function(){function auth(it
/**/) {
var out='<h3 class="modal__auth">Your Auth Information</h3><p>Use these to make your requests against the API. Do not give these to other people... for obvious reasons. Also the URL that you gave us at setup will be used to set the CORS headers for your data.</p><h4 class="modal__sub-header">Key:</h4><p class="modal__auth">'+( it.key )+'</p><h4 class="modal__sub-header">Token:</h4><p class="modal__auth">'+( it.auth )+'</p><h4 class="modal__auth">Examples &amp; Docs</h4><p>Include the token as an <code>authorization</code> header and then make requests against the api. For example you would hit <code>http://ansble.com/api/v1/my-key-goes-here</code> to retrieve all of the data you have stored with that key.</p>';return out;
}var itself=auth, _encodeHTML=(function (doNotSkipEncoded) {
		var encodeHTMLRules = { "&": "&#38;", "<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "/": "&#47;" },
			matchHTML = doNotSkipEncoded ? /[&<>"'\/]/g : /&(?!#?\w+;)|<|>|"|'|\//g;
		return function(code) {
			return code ? code.toString().replace(matchHTML, function(m) {return encodeHTMLRules[m] || m;}) : "";
		};
	}());if(typeof module!=='undefined' && module.exports) module.exports=itself;else if(typeof define==='function')define(function(){return itself;});else {window.render=window.render||{};window.render['auth']=itself;}}());