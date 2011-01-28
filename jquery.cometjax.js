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
	
	var onSuccess = options.success;
	var onError = options.error;
	
	options.cache = options.cache || false;
	options.error = ajaxError;
	options.success = ajaxSuccess;
	
	// the timeout lets this not persist the browser's "page loading" state
	setTimeout(function() {
		request = $.ajax(options);
	}, 100);
	
	// use this return object to stop the comet
	return {
		stop: cometStop
	}
	
	function ajaxSuccess(data, textStatus, XMLHttpRequest) {
		// workaround for http://bugs.jquery.com/ticket/6060
		if (!XMLHttpRequest.status)
			return ajaxError(XMLHttpRequest, textStatus);
		
		// user callback
		if (onSuccess)
			onSuccess(data, textStatus, XMLHttpRequest);
		
		// do it again!
		retry = 0;
		request = $.ajax(options);
	}
	
	function ajaxError(XMLHttpRequest, textStatus, errorThrown) {
		if (!running)
			return;
		
		// user callback
		if (onError)
			onError(XMLHttpRequest, textStatus, errorThrown);
		
		// give it a second before retry
		retry = Math.min(retry + 2000, 60000);
		setTimeout(function() {
			request = $.ajax(options);
		}, Math.random() * retry);
	}
	
	function cometStop() {
		running = false;
		if (request)
			request.abort();
	}
}

})(jQuery);
