document.addEventListener('DOMContentLoaded', function() {

 
    var clockTime = document.getElementById('clockTime');
    var setAlarmBtn = document.getElementById('setAlarmBtn');
    var alarmsUl = document.getElementById('alarmsUl');
     var loader = document.querySelector('.loader');
     var content = document.querySelector('.content');
   
     // Simulate loading time
     setTimeout(function() {
       loader.classList.add('hidden');
       content.classList.remove('hidden');
     }, 2000);
   
  
    setAlarmBtn.addEventListener('click', setAlarm);
  
    // Update the clock every second

    setInterval(updateClock, 1000);
  
    function updateClock() {
      var now = new Date();
      var hours = now.getHours();
      var minutes = now.getMinutes();
      var seconds = now.getSeconds();
      
      
      // Convert hours to 12-hour format
      var period = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours === 0 ? 12 : hours;
    
      var timeString = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds) + ' ' + period;
      clockTime.textContent = timeString;
    }
    
  
    function formatTime(time) {
      return time < 10 ? '0' + time : time;
    }
  
    function setAlarm() {
      var alarmHour = document.getElementById('alarmHour').value;
      var alarmMinute = document.getElementById('alarmMinute').value;
      var alarmSecond = document.getElementById('alarmSecond').value;
      var alarmPeriod = document.getElementById('alarmPeriod').value;
  
      var alarmTime = formatTime(alarmHour) + ':' + formatTime(alarmMinute) + ':' + formatTime(alarmSecond) + ' ' + alarmPeriod;
  
      var alarmLi = document.createElement('li');
      if (!(alarmHour === '' || alarmMinute === '' || alarmSecond === '' || alarmPeriod === '' ||
      alarmHour === '0' || alarmMinute === '0' || alarmSecond === '0')) {
      alarmLi.textContent = alarmTime;
      }
      if(! (alarmHour === '' || alarmMinute === '' || alarmSecond === '' || alarmPeriod === '' ||
      alarmHour === '0' || alarmMinute === '0' || alarmSecond === '0')) {
      var deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'btn btn-danger btn-sm';
      deleteButton.style.marginLeft = '10px';
      deleteButton.style.marginBottom = '30px';
      deleteButton.addEventListener('click', deleteAlarm);
  
      alarmLi.appendChild(deleteButton);
      alarmsUl.appendChild(alarmLi);
      }
  
      var now = new Date();
      var alarm = new Date();
      alarm.setHours(get24Hour(alarmHour, alarmPeriod));
      alarm.setMinutes(alarmMinute);
      alarm.setSeconds(alarmSecond);
      if (alarmHour === '' || alarmMinute === '' || alarmSecond === '' || alarmPeriod === '' ||
      alarmHour === '0' || alarmMinute === '0' || alarmSecond === '0') {
    alert('Please fill in all the alarm time fields with valid values.');
    return;
  }
      var timeDiff = alarm.getTime() - now.getTime();
      if (timeDiff < 0) {
        alarm.setDate(alarm.getDate() + 1);
        timeDiff = alarm.getTime() - now.getTime();
      }
  
      setTimeout(function() {
        alert('Alarm!');
        deleteAlarm();
      }, timeDiff);
    }
  
    function deleteAlarm() {
      var listItem = this.parentNode;
      
      alarmsUl.removeChild(listItem);
    }
  
    function get24Hour(hour, period) {
      hour = parseInt(hour);
      if (period === 'AM') {
        if (hour === 12) {
          hour = 0;
        }
      } else if (period === 'PM') {
        if (hour !== 12) {
          hour += 12;
        }
      }
      return hour;
    }
    

  

 
  });
  