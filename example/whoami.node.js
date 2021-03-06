var http = require('http'),
	url = require('url');


var port = 8124;
http.createServer(client).listen(port);

console.log('whoami server running on port '+port);


// clients are either here to say something or to listen
function client(request, result) {
	result.writeHead(200, { "Content-Type": "application/javascript" });

	var parse = url.parse(request.url, true);
	var query = parse.query || {};
	
	if (query.say) {
		result.end();  // finish with this client
		say(query);    // then disceminate the say
	} else {
		if (query.callback) {
			result.write(query.callback+"();");  // jsonp callback
		}
		wait(result);
	}
}


var listeners = [];

// throw this client in with the rest of the listeners,
// waiting desperately for someone to say something
function wait(result) {
	var listener;
	
	// give up after 50s
	var timeout = setTimeout(function() {
		removeListener(listener);
		result.end();
	}, 50000);
	
	listener = {result:result, timeout:timeout};
	listeners.push(listener);
}

function removeListener(listener) {
	var i = listeners.indexOf(listener);
	if (i >= 0) {
		listeners.splice(i, 1);
	}
}

// to all listening, send said response
function say(data) {
	for (var i in listeners) {
		var listener = listeners[i];
		clearTimeout(listener.timeout);
		listener.result.end("say("+JSON.stringify(data)+");");  // finally data gets back to a client!
	}
	listeners = [];
}
