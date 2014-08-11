var woeid;

function convertZip() {
	if (debug) { console.log('----------Finding Zip Code WOEID----------'); }
	if (zipcode == 0) {
		if (debug) { console.log('Zipcode not set, skipping'); }
		getWeather();
	}
	var zipQuery = "select * from geo.placefinder where text='" + zipcode + "' and gflags='R'";
	var zipCacheBuster = Math.floor((new Date().getTime()) / 1200 / 1000);
	var zipUrl = 'https://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(zipQuery) + '&format=json&_nocache=' + zipCacheBuster;
	
	window['zipCallback'] = function(data) {
		woeid = data.query.results.Result.woeid;
		if (debug) { console.log('Yahoo WOEID received for zip (' + zipcode + '): ' + woeid); }
		getWeather();
	};

	var zipReq = $.ajax({
        	url: zipUrl,
	        dataType: 'jsonp',
		timeout: getTimeout,
	        cache: true,
	        jsonpCallback: 'zipCallback'
	});
 
	zipReq.error(function() {
		console.error('Zipcode update error');	
		getWeather();
	});
}
