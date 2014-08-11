var lastUpdate;

// Initialize all variables
var locationType;
var locationValue;
var zipcode;
var woeid;
var units;
var refreshRate;
var useGPS;
var hourFormat;
var background;
var maxShownEvents;
var calBaseUrl;
var startPage;
var swipeSpeed;
var fadeTime;
var getTimeout;
var debug;
var debugColor;

// Load settings from cookies
loadSettings();

background = 'img/bg.png';
calBaseUrl = 'http://pipes.yahoo.com/pipes/pipe.run?_id=3a1e8497d675c568eaf435b10b522200&_render=json&colorinput1=%23b3dc6c&colorinput2=%23fad165&colorinput3=%23ff7537&colorinput4=%239fe1e7&colorinput5=%234986e7&filter1=Track+Workout&urlinput1=https%3A%2F%2Fwww.google.com%2Fcalendar%2Ffeeds%2Famcolash%2540gmail.com%2Fprivate-586b8fbc8ba2bbbaddfe86a1c42e92db%2Ffull%3Ffutureevents%3Dtrue%26orderby%3Dstarttime%26singleevents%3Dtrue%26sortorder%3Dascending&urlinput2=https%3A%2F%2Fwww.google.com%2Fcalendar%2Ffeeds%2Fiaapf3m04v087258l7q2ta9i0s%2540group.calendar.google.com%2Fprivate-a72dcdf043b4f68b934116522577db55%2Ffull%3Ffutureevents%3Dtrue%26orderby%3Dstarttime%26singleevents%3Dtrue%26sortorder%3Dascending&urlinput3=https%3A%2F%2Fwww.google.com%2Fcalendar%2Ffeeds%2Frunningclubuwmsn%2540gmail.com%2Fprivate-450d1884db7ff4761167c80e56030afb%2Ffull%3Ffutureevents%3Dtrue%26orderby%3Dstarttime%26singleevents%3Dtrue%26sortorder%3Dascending&urlinput4=https%3A%2F%2Fwww.google.com%2Fcalendar%2Ffeeds%2Fcqklni39iosv744qc88r9kbk78%2540group.calendar.google.com%2Fprivate-337c2e3a3843327b3fd6e85432b61aa7%2Ffull%3Ffutureevents%3Dtrue%26orderby%3Dstarttime%26singleevents%3Dtrue%26sortorder%3Dascending&urlinput5=https%3A%2F%2Fwww.google.com%2Fcalendar%2Ffeeds%2Fnpaqlurjiqjasord1rogqm8tt9n0ubhu%2540import.calendar.google.com%2Fpublic%2Ffull%3Ffutureevents%3Dtrue%26orderby%3Dstarttime%26singleevents%3Dtrue%26sortorder%3Dascending';


// Begin debug mode
if (debug) {
	console.log('----------Debug mode active----------\nZipcode: ' + zipcode + '\nWOEID: ' + woeid);
	$('.debug').show();
	background  = 'img/bg.png';
}



// Inject color CSS if in debug mode
if (debugColor) {
	document.write('<link rel="stylesheet" type="text/css" href="css/color_agenda.css">');
	document.write('<link rel="stylesheet" type="text/css" href="css/color_clock.css">');
	document.write('<link rel="stylesheet" type="text/css" href="css/color_settings.css">');
	document.write('<link rel="stylesheet" type="text/css" href="css/color_weather.css">');
}

// Set background
$('body').css("background", "#777777 url('" + background + "') no-repeat center top");


$('.Time').hide();
$('.timevr').hide();
$('#CurrentIcon').hide();
$('#CurrentTemp').hide();
$('.Forecast').hide();
$('#gpsIcon').hide();
$('#Updated').hide();
$('.weathervr').hide();
$('#agenda').hide();
$('#settings').hide();
$("#agenda_status").fadeIn(fadeTime);
$('#agenda_update_icon').html("<img src='img/updating_calendar.png' onclick='updateCal()'/>");

setTimeout(function() {update()}, 750);
setInterval(function() {updateTime()}, 4000);
setInterval(function() {updateGPS()}, refreshRate * 50 * 1000);

function update() {
	updateTime();
	updateWeather();
}
