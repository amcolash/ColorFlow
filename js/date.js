function calculateTime() {

	var currentTime = new Date();
	var hour1 = currentTime.getHours() - 1;
	var hour2 = currentTime.getHours();
	var hour3 = currentTime.getHours() + 1;

	var minutes = currentTime.getMinutes();
	var minute1 = currentTime.getMinutes() - 1;
	var minute2 = currentTime.getMinutes();
	var minute3 = currentTime.getMinutes() + 1;

	if (hourFormat == '12h') {
		hour1 = hour1 % 12;
		hour1 = (hour1) ? hour1 : 12;
		hour2 = hour2 % 12;
		hour2 = (hour2) ? hour2 : 12;
		hour3 = hour3 % 12;
		hour3 = (hour3) ? hour3 : 12;

		if (hour1 < 0) { hour1 = "11"; }
		if (hour3 > 12) { hour3 = "1"; }

	} else {

		if (hour1 < 0) { hour1 = "23"; }
		if (hour3 > 23) { hour3 = "0"; }

	}

	if (minute1 < 0) { minute1 = "59"; }
	if (minute3 > 59) { minute3 = "1"; }

	if (minute1 < 10) { minute1 = "0" + minute1; }
	if (minute2 < 10) { minute2 = "0" + minute2; }
	if (minute3 < 10) { minute3 = "0" + minute3; }
	
	if (hour1 < 10) { hour1 = hour1; }
	if (hour2 < 10) { hour2 = hour2; }
	if (hour3 < 10) { hour3 = hour3; }


	document.getElementById("time1-1").innerText = hour1;
	document.getElementById("time1-2").innerText = hour2;
	document.getElementById("time1-3").innerText = hour3;

	document.getElementById("time2-1").innerText = minute1;
	document.getElementById("time2-2").innerText = minute2;
	document.getElementById("time2-3").innerText = minute3;
}

function calculateDate() {
	var months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
	var currentTime = new Date();
	var day1 = (currentTime.getDate() - 1).toString();
	var day2 = currentTime.getDate().toString();
	var day3 = (currentTime.getDate() + 1).toString();
	var month = currentTime.getMonth();

	if (day1.length == 1) { day1 = day1; } 
	if (day2.length == 1) { day2 = day2; } 
	if (day3.length == 1) { day3 = day3; } 

	document.getElementById("date1-1").innerText = months[month - 1];
	document.getElementById("date1-2").innerText = months[month];
	document.getElementById("date1-3").innerText = months[month + 1];

	document.getElementById("date2-1").innerText = day1;
	document.getElementById("date2-2").innerText = day2;
	document.getElementById("date2-3").innerText = day3;
}


function calculateDay() {
	var days = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
	var currentTime = new Date();
	var day = (currentTime.getDay()).toString();
	document.getElementById("dayofweek").innerText = days[day];
}

function updateTime() {
	calculateTime();
	calculateDate();
	calculateDay();
	$('.Time').fadeIn(fadeTime).css('display', 'inline-block');
	$('.timevr').fadeIn(fadeTime).css('display', 'inline-block');
}
