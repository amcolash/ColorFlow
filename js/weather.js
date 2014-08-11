var alreadyUpdated = false;

function getWeather() {
  
  if ((zipcode == 0 && woeid == 0) || (zipcode == undefined && woeid == undefined) || (zipcode == null && woeid == null)) { alert("we got a boagie!"); weatherError(); }
  else {

    $(function(){
    var weatherQuery = "SELECT item FROM weather.forecast WHERE woeid='" + woeid + "' AND u='" + units + "'";
    var weatherCacheBuster = Math.floor((new Date().getTime()) / 1200 / 1000);
    var weatherUrl = 'https://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(weatherQuery) + '&format=json&_nocache=' + weatherCacheBuster;
    if (debug) { console.log('----------Begin Weather Update----------\nWOEID: ' + woeid); }
    window['wxCallback'] = function(data) {
	var results = data.query.results.channel.item;
	var current = results.condition;
	var forecast = results.forecast;

	if(results.title != "City not found") {
		// Get Current Conditions
	    	var loc = results.title;

	    	$('#Location').html(loc.slice(15, loc.indexOf(',')));
	
		$('#CurrentIcon').html('<img src="img/icons/' + current.code + '.png" title="' + current.text + '" />');
		$('#CurrentTemp').html(current.temp + '&deg;' + (units.toUpperCase()));
		//$('#CurrentCondition').html(current.text);

		// Get Forecast
		$('#F1High').html(forecast[0].high + '&deg;' + (units.toUpperCase()));
		$('#F1Low').html(forecast[0].low + '&deg;' + (units.toUpperCase()));
		$('#F1Icon').html('<img src="img/icons/' + forecast[0].code + '.png" title="' + forecast[0].text + '" />');
		$('#F1Day').html(forecast[0].day);
		$('#F2High').html(forecast[1].high + '&deg;' + (units.toUpperCase()));
		$('#F2Low').html(forecast[1].low + '&deg;' + (units.toUpperCase()));
		$('#F2Icon').html('<img src="img/icons/' + forecast[1].code + '.png" title="' + forecast[1].text + '" />');
		$('#F2Day').html(forecast[1].day);
		$('#F3High').html(forecast[2].high + '&deg;' + (units.toUpperCase()));
		$('#F3Low').html(forecast[2].low + '&deg;' + (units.toUpperCase()));
		$('#F3Icon').html('<img src="img/icons/' + forecast[2].code + '.png" title="' + forecast[2].text + '" />');
		$('#F3Day').html(forecast[2].day);

		$('#Forecast').fadeIn(fadeTime);
		$('.Forecast').fadeIn(fadeTime).css('display', 'inline-block');
		$('#CurrentTemp').fadeIn(fadeTime);
		$('.weathervr').fadeIn(fadeTime);

		// Get most recent update time
		var date = results.pubDate;
		var epoch = Date.parse(date)/1000;
		var local = new Date(0);
		local.setUTCSeconds(epoch);
		var hour = local.getHours();
		var minutes = local.getMinutes();
		if (hourFormat == '12h') {
			if (hour > 12) { hour = hour - 12; }
			if (hour == 0) { hour = 12; }
		}
		if (minutes < 10) { minutes = "0" + minutes; }
		var time = "@ " + hour + ":" + minutes;
		$('#updateTime').html(time);
		$('#updateIcon').html('<img src="img/update_weather.png" onclick="update()"/>');
		alreadyUpdated = true;

		if (debug) {
			var currentTime = new Date();
			console.log('Updated at: ' + currentTime + '\nLast yahoo weather update: ' + local);	
		}
		updateCal();
	} else { weatherError(); }
    };

    var weatherReq = $.ajax({
        url: weatherUrl,
        dataType: 'jsonp',
	timeout: getTimeout,
        cache: true,
        jsonpCallback: 'wxCallback'
    });
    
    weatherReq.error(function() {	
	weatherError();
    });
  
    

  });

  }
}

function weatherError() {
	$('#Location').html('Update error');
	$('#updateIcon').html('<img src="img/error_weather.png" onclick="update()"/>');
	$('#Forecast').fadeOut(fadeTime);
	//$('.Forecast').fadeOut(fadeTime);
	$('#gpsIcon').fadeOut(fadeTime);
	$('#CurrentTemp').fadeOut(fadeTime);
	$('#CurrentIcon').html('<img src="img/error_weather.png" onclick="update()"/>');
	if (!alreadyUpdated) {
		$('#CurrentIcon').hide();
		$('#CurrentIcon').fadeIn(fadeTime).css('display', 'inline-block');
	}
	console.error('Weather update error');

        updateCal();
}
