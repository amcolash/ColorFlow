function setCookie(cname,cvalue,exdays) {
	var d = new Date();
	d.setTime(d.getTime()+(exdays*24*60*60*1000));
	var expires = "expires="+d.toGMTString();
	document.cookie = cname + "=" + cvalue + "; " + expires + ";";
}

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
		var c = ca[i].trim();
		if (c.indexOf(name)==0) {
			return c.substring(name.length,c.length);
		}
	}
	return "";
}

function listCookies() {
    var theCookies = document.cookie.split(';');
    var aString = '';
    for (var i = 1 ; i <= theCookies.length; i++) {
        aString += i + ' ' + theCookies[i-1] + "\n";
    }
    return aString;
}

function deleteAllCookies() {
	var cookies = document.cookie.split(";");
	for(var i=0; i < cookies.length; i++) {
		var equals = cookies[i].indexOf("=");
		var name = equals > -1 ? cookies[i].substr(0, equals) : cookies[i];
		document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
	}
}

function stringToBoolean(string){
	switch(string.toLowerCase()){
		case "true": case "yes": case "1": return true;
		case "false": case "no": case "0": case null: return false;
		default: return Boolean(string);
	}
}

function checkCookies() {
	var temp = getCookie("locationType");
	if (temp == "") {
		if (debug) { alert("no cookies"); }
		resetSettings();
		return false;
	}
	else { return true; }
}

function resetSettings() {
	deleteAllCookies();
	
	zipcode = 53213;
	woeid = 0;
	units = 'f';
	refreshRate = 20;
	useGPS = true;
	hourFormat = '12h';
	background = 'img/bg.png';
	maxShownEvents = 10;
	calBaseUrl = '';
	startPage = 1;
	swipeSpeed = 300;
	fadeTime = 1000;
	getTimeout = 10000;
	debug = false;
	debugColor = false;

	locationType = 'zip';
	locationValue = '53213';
	refreshSettings();

	if(debug) { alert("locationType: " + locationType +
			  "\nlocationValue: " + locationValue +
			  "\nzipcode: " + zipcode +
			  "\nwoeid: " + woeid +
			  "\nunits: " + units +
			  "\nrefreshRate: " + refreshRate +
			  "\nuseGPS: " + useGPS +
			  "\nhourFormat: " + hourFormat +
			  "\nmaxShownEvents: " + maxShownEvents +
			  "\ncalBaseUrl: " + calBaseUrl +
			  "\nstartPage: " + startPage +
			  "\nswipeSpeed: " + swipeSpeed +
			  "\nfadeTime: " + fadeTime +
			  "\ngetTimeout: " + getTimeout +
			  "\ndebugColor: " + debugColor +
			  "\ndebug: " + debug); }

	saveSettings();
}

function refreshSettings() {

	if (locationType == 'zip') {
		$('input:radio[name=locationType]')[0].checked = true;
		$('#locationValue').val(zipcode);
	} else {
		$('input:radio[name=locationType]')[1].checked = true;
		$('#locationValue').val(woeid);
	}

	if (locationValue == "") {
		locationValue = 0;
	}

	if (units == 'f') {
		$('input:radio[name=units]')[0].checked = true;
	} else {
		$('input:radio[name=units]')[1].checked = true;
	}

	$('#refreshRate').val(refreshRate);
	$("#useGPS").prop('checked', useGPS);

	if (hourFormat == '12h') {
		$('input:radio[name=hourFormat]')[0].checked = true;
	} else {
		$('input:radio[name=hourFormat]')[1].checked = true;
	}

	$('#maxShownEvents').val(maxShownEvents);
	$('#calBaseUrl').val(calBaseUrl);

	if (startPage == 0) {
		$('input:radio[name=startPage]')[0].checked = true;
	} else if (startPage == 1) {
		$('input:radio[name=startPage]')[1].checked = true;
	} else {
		$('input:radio[name=startPage]')[2].checked = true;
	}
	
	// Debug Vars
	$('#swipeSpeed').val(swipeSpeed);
	$('#fadeTime').val(fadeTime);
	$('#getTimeout').val(getTimeout);
	$("#debugColor").prop('checked', debugColor);
	$("#debug").prop('checked', debug);
}

function loadSettings() {
	if (checkCookies()) {
	locationType = getCookie("locationType");
	
	if (locationType == 'zip') {
		zipcode = getCookie("locationValue");
		woeid = 0;
		locationValue = zipcode;
	}

	else {
		woeid = getCookie("locationValue");
		zipcode = 0;
		locationValue = woeid;
	}

	if (locationValue == "") {
		locationValue = 0;
	}
	
	units = getCookie("units");
	refreshRate = parseInt(getCookie("refreshRate"));
	useGPS = stringToBoolean(getCookie("useGPS"));
	hourFormat = getCookie("hourFormat");
	maxShownEvents = parseInt(getCookie("maxShownEvents"));
	calBaseUrl = getCookie("calBaseUrl");
	startPage = parseInt(getCookie("startPage"));
	
	// Debug Vars
	swipeSpeed = parseInt(getCookie("swipeSpeed"));
	fadeTime = parseInt(getCookie("fadeTime"));
	getTimeout = parseInt(getCookie("getTimeout"));
	debugColor = stringToBoolean(getCookie("debugColor"));
	debug = stringToBoolean(getCookie("debug"));
	
	refreshSettings();

	
	if(debug) { alert("locationType: " + locationType +
			  "\nlocationValue: " + locationValue +
			  "\nzipcode: " + zipcode +
			  "\nwoeid: " + woeid +
			  "\nunits: " + units +
			  "\nrefreshRate: " + refreshRate +
			  "\nuseGPS: " + useGPS +
			  "\nhourFormat: " + hourFormat +
			  "\nmaxShownEvents: " + maxShownEvents +
			  "\ncalBaseUrl: " + calBaseUrl +
			  "\nstartPage: " + startPage +
			  "\nswipeSpeed: " + swipeSpeed +
			  "\nfadeTime: " + fadeTime +
			  "\ngetTimeout: " + getTimeout +
			  "\ndebugColor: " + debugColor +
			  "\ndebug: " + debug); }
	
	}
}

function saveSettings() {
	deleteAllCookies();

	locationType = $('input[name=locationType]:checked').val();
	
	if (locationType == 'zip') {
		zipcode = $('#locationValue').val();
		woeid = 0;
		locationValue = zipcode;
	}

	else {
		woeid = $('#locationValue').val();
		zipcode = 0;
		locationValue = woeid;
	}
	if (locationValue == "") {
		locationValue = 0;
	}

	units = $('input[name=units]:checked').val();
	refreshRate = $('#refreshRate').val();
	useGPS = $("#useGPS").prop('checked');
	hourFormat = $('input[name=hourFormat]:checked').val();
	maxShownEvents = $('#maxShownEvents').val();
	calBaseUrl = $('#calBaseUrl').val();
	startPage = $('input[name=startPage]:checked').val();
	
	// Debug Vars
	swipeSpeed = $('#swipeSpeed').val();
	fadeTime = $('#fadeTime').val();
	getTimeout = $('#getTimeout').val();
	debugColor = $("#debugColor").prop('checked');
	debug = $("#debug").prop('checked');

	setCookie("locationType", locationType, 365);
	setCookie("locationValue", locationValue, 365);
	setCookie("units", units, 365);
	setCookie("refreshRate", refreshRate, 365);
	setCookie("useGPS", useGPS, 365);
	setCookie("hourFormat", hourFormat, 365);
	setCookie("maxShownEvents", maxShownEvents, 365);
	setCookie("calBaseUrl", calBaseUrl, 365);
	setCookie("startPage", startPage, 365);
	setCookie("swipeSpeed", swipeSpeed, 365);
	setCookie("fadeTime", fadeTime, 365);
	setCookie("getTimeout", getTimeout, 365);
	setCookie("debugColor", debugColor, 365);
	setCookie("debug", debug, 365);

	if(debug) { alert("locationType: " + locationType +
			  "\nlocationValue: " + locationValue +
			  "\nzipcode: " + zipcode +
			  "\nwoeid: " + woeid +
			  "\nunits: " + units +
			  "\nrefreshRate: " + refreshRate +
			  "\nuseGPS: " + useGPS +
			  "\nhourFormat: " + hourFormat +
			  "\nmaxShownEvents: " + maxShownEvents +
			  "\ncalBaseUrl: " + calBaseUrl +
			  "\nstartPage: " + startPage +
			  "\nswipeSpeed: " + swipeSpeed +
			  "\nfadeTime: " + fadeTime +
			  "\ngetTimeout: " + getTimeout +
			  "\ndebugColor: " + debugColor +
			  "\ndebug: " + debug); }
	
}
