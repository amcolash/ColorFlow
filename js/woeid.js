function updateWOEID() {
   if (useGPS) {
	if (debug) { console.log('----------Updating GPS WOEID----------'); }
	if (latitude != null) {
		var locationQuery = "select * from geo.placefinder where text='" + latitude + "," + longitude + "' and gflags='R'"
		var locationCacheBuster = Math.floor((new Date().getTime()) / 1200 / 1000);
		var locationUrl = 'https://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(locationQuery) + '&format=json&_nocache=' + locationCacheBuster;


	window['locationCallback'] = function(data) {
		woeid = data.query.results.Result.woeid;
		if (debug) { console.log('Yahoo WOEID received for GPS (' + latitude + ', ' + longitude + '): ' + woeid); }
		getWeather();
	};

	var locationReq = $.ajax({
        	url: locationUrl,
	        dataType: 'jsonp',
		timeout: getTimeout,
	        cache: true,
	        jsonpCallback: 'locationCallback'
	});
 
	locationReq.error(function() {
		console.error('GPS WOEID update error');
		convertZip();
	});

      } else {
	      console.warn('Unable to get GPS WOEID');
	      convertZip();
      }
   } else { getWeather(); }
}
