/*
 * cometjax JavaScript Library v0.1
 * http://github.com/tenorviol/cometjax
 *
 * Copyright 2011, Christopher Johnson
 * Licensed under the MIT license.
 * http://github.com/tenorviol/cometjax/license
 */
(function($) {

$.cometjax = cometStart;

function cometStart(options) {
	var running = true;
	var retry = 0;
	var request;
	
	var onComplete = options.complete;
	options.complete = ajaxComplete;
	
	options.cache = options.cache || false;
	
	// this timeout stops the browser's "page loading" spinning icon
	setTimeout(function() {
		if (running)
			request = $.ajax(options);
	}, 100);
	
	// use this return object to stop the comet
	return {
		stop: cometStop
	}
	
	function ajaxComplete(XMLHttpRequest, textStatus) {
		if (!running)
			return;
		
		// user callback
		if (onComplete)
			onComplete(XMLHttpRequest, textStatus);
		
		// do it again!
		if (textStatus == "success") {
			retry = 0;
			request = $.ajax(options);
		} else {
			// error! give it some time before retry
			retry = Math.min(retry + 2000, 60000);
			setTimeout(function() {
				request = $.ajax(options);
			}, Math.random() * retry);
		}
	}
	
	function cometStop() {
		running = false;
		if (request)
			request.abort();
	}
}

})(jQuery);
