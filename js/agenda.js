function updateCal() {
   if (debug) { console.log('----------Getting Calendar----------'); }   
   var calCacheBuster = Math.floor((new Date().getTime()) / 1200 / 1000);
   var calUrl = calBaseUrl+ '&cache=' + calCacheBuster;
   
   $.getJSON(calUrl)

   .done(function(data) {
      $("#agenda_status").html("");
      parseCal(data);
      if (debug) { console.log('Calendar retrival success, ' + maxShownEvents + ' events shown'); }
   })

   .fail(function( jqxhr, textStatus, error ) {
     console.error('Calendar update error');
     $("#agenda_update_status").html("Calendar update error");
     $('#agenda_update_icon').html("<img src='img/update_calendar.png' onclick='updateCal()'/>");
   });
}

function parseCal(myData) {

   var maxEvents = maxShownEvents;
   if(myData.count == 0) {
      console.log('No events');
      maxEvents = 0;
   } else if (myData.count < maxEvents) {
      maxEvents = myData.count;
   }

   $("#agenda").html("");

   var currentTime = getTime(new Date)[9];

   for (var i = 0; i < maxEvents; i++) {
      var title = myData.value.items[i].title;
      var location = ' (' + myData.value.items[i].where.valueString + ')';
      if (!myData.value.items[i].where.valueString) { location = ''; }

      var color = myData.value.items[i].color;
      var startTime = getTime(new Date(myData.value.items[i].startTime));
      var endTime = getTime(new Date(myData.value.items[i].endTime));
      var endingTime = endTime[9];
      var fullTime = '';

      if (currentTime < endingTime) {

         if (startTime[5] == endTime[5]) {
            fullTime = startTime[7] + ' ' + startTime[4] + '/' + startTime[5] + ' (' + startTime[1] + ':' + startTime[2] + startTime[3] + ' - ' + endTime[1] + ':' + endTime[2] + endTime[3] + ')';
         } else if (startTime[8] == 0 && endTime[8] == 0) {
            fullTime = endTime[7] + ' ' + endTime[4] + '/' + endTime[5] + ' (All Day)';
         } else {
            fullTime = startTime[0] + ' - ' + endTime[0];
         }
         var end = '<hr/>';
         if (i == maxEvents - 1) { end = ''; }
         var html = '<div class="agendaItem" id="agenda' + i + '"><div class="agenda-color" style="background-color: ' + color + '">&nbsp</div><div class="agenda-time">' + fullTime + '</div><div class="agenda-info">' + title + location + '</div></div>'+ end;
         $("#agenda").append(html);

      }
   }
   $("#agenda").fadeIn(fadeTime);
   $("#agenda_status").hide();
}

function getTime(myDate) {
   try {
      var hour = formatHour(myDate.getHours());
      var minute = formatMinute(myDate.getMinutes());
      var ampm = '';
      var month = (myDate.getMonth()+1);
      var date = myDate.getDate();
      var year = myDate.getFullYear();
      var day = getDay(myDate);
      var UTC = myDate.getUTCHours();
      var EPOCH = myDate.valueOf();

      if (hourFormat == '12h') {
         if (myDate.getHours() > 11) { ampm = 'pm'; }
         else { ampm = 'am'; }
      }

      var time = day + ' ' + month + '/' + date + ' ' + hour + ':' + minute + ampm;

   } catch (e) { 
      var time = '';
   }
   return [time, hour, minute, ampm, month, date, year, day, UTC, EPOCH];
}

function formatMinute(minute) {
   if (minute < 0) { minute = "59"; }
   if (minute > 59) { minute = "1"; }
   
   if (minute < 10) { minute = "0" + minute; }
   return minute;
}

function formatHour(hour) {
   if (hourFormat == '12h') {
      hour = hour % 12;
      hour = (hour) ? hour : 12;
   }
   return hour;
}

function getDay(myDate) {
   var days = new Array("Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat");
   var day = days[(myDate.getDay())];
   return day;
}
