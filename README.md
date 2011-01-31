cometjax
========

Project maintained on [github.com/tenorviol/cometjax](http://github.com/tenorviol/cometjax).
Use it just like [jQuery.ajax](http://api.jquery.com/jQuery.ajax/), same options.

	$(function() {
		var comet = $.cometjax({
			url: "http://my.comet.server",
			success: function(data) {
				console.log(data);
			}
		});
		
		$("button.stop_comet").click(function() {
			comet.stop();
		});
	});

This will poll the ajax query over and over again.
Clicking the stop_comet button stops the incessant polling.

whoami example
--------------

whoami is a very rudimentary long-polling comet chat server that runs on 
[node.js](http://nodejs.org/). To run the whoami example, download and
install node.js. The server should run as is:

	node example/whoami.node.js

Then launch whoami.html into various browser windows, and start chattin'.

Features
--------

* Exactly like $.ajax, except long-polling
* < 0.4kB
* On error, waits a random time to prevent thundering hordes
* Avoids the perpetual browser loading problem

License
-------

Copyright 2011, Christopher Johnson

Licensed under the MIT license.

http://github.com/tenorviol/cometjax/license
