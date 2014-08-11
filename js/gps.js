var latitude = null;
var longitude = null;
var gps;

function updateWeather() {
	updateGPS();
}

function updateGPS() {

 $('#CurrentIcon').html('<img src="img/updating_weather.png" onclick="update()"/>');
 $('#F1Icon').html('<img src="img/updating_weather.png" onclick="update()"/>');
 $('#F2Icon').html('<img src="img/updating_weather.png" onclick="update()"/>');
 $('#F3Icon').html('<img src="img/updating_weather.png" onclick="update()"/>');
 $('#Location').html('Updating...');
 $('#updateIcon').html('<img src="img/updating_weather.png" onclick="update()"/>');
 $('#CurrentIcon').fadeIn(fadeTime).css('display', 'inline-block');
 $('#Updated').fadeIn(fadeTime).css('display', 'inline-block');

 if (useGPS) { 
	if (debug) { console.log('----------Updating GPS Location----------'); }
	
	navigator.geolocation.getCurrentPosition(foundLocation, noLocation);

	function foundLocation(position)
	{
		latitude = position.coords.latitude;
		longitude = position.coords.longitude;
	   	if (debug) { console.log('Latitude: ' + latitude + '\nLongitude: ' + longitude); }

		// Show GPS Icon
		$('#gpsIcon').show();
		gps = true;
		updateWOEID();
	}
	function noLocation()
	{
		console.warn('Could not find location with GPS, using set locale instead');
		// Hide GPS Icon
		$('#gpsIcon').hide();
		gps = false;
		convertZip();
	} 
 } else { convertZip(); }
}
