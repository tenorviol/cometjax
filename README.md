cometjax
========

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

This will poll the ajax query over and over again. Clicking the stop_comet button stops the incessant polling.

Features
--------

* Exactly like $.ajax
* 0.4kB
* On error, waits a random time to prevent thundering hordes
* Avoids the perpetual browser loading problem
* And most amazingly, this comet can be stopped!

License
-------

Copyright 2011, Christopher Johnson
Licensed under the MIT license.
http://github.com/tenorviol/cometjax/license
