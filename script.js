var left;
var timerId;
var rad;
var wasStarted = false;
var startTimerBool = false;
function f(){
  document.getElementById("hours").value = 0;
  document.getElementById("minutes").value = 0;
  document.getElementById("seconds").value = 0;
  rad=document.getElementsByName('radioButton');
  getAllUrlParams();
}

function startTimer(){
if(wasStarted){
  wasStartTimer();
} else {
  if(!startTimerBool){
  var hours = parseInt(document.getElementById("hours").value, 10);
  var minutes =parseInt(document.getElementById("minutes").value, 10);
  var seconds =parseInt(document.getElementById("seconds").value, 10);
  left = (hours*60*60 + minutes*60 + seconds);
  }
  if(left < 1){
    wasStartTimer();
  } else {
  timerId =  setInterval( setHowLost,1000);
  wasStarted = true;
  }
}
    
}

function setHowLost(){
  document.title = left;
  howLeftOnPage();
  left = left - 1;
  if(left == -1){
    howLeftOnPage();
    timerTimeOut();
  }
}
function howLeftOnPage(){
  var hours = Math.floor(left/3600);
  var minutes = Math.floor((left - hours*3600)/60);
  var seconds = Math.floor(left - hours*3600 - minutes*60);
  document.getElementById("hhh").innerHTML = hours;
  document.getElementById("min").innerHTML = minutes;
  document.getElementById("sec").innerHTML = seconds;
}

function cancel(){
  pause();
  document.getElementById("hours").value = 0;
  document.getElementById("minutes").value = 0;
  document.getElementById("seconds").value = 0;
  left = 0;
  document.title= left;
  howLeftOnPage();
  wasStarted = false;
}

function pause(){
  clearInterval(timerId);
}

function runAfterPause(){
  timerId =  setInterval( setHowLost,1000);
}

function timerTimeOut(){
  pause();
  wasStarted = false;
  if(rad[0].checked){
    startTimer();
    var params = {
      body: "Таймер был перезапущен!",
      tag: "zzz"
    }
    var notify = new Notification("Заново!", params);
  } else {
    var params = {
      body: "Таймер закончил свою работу!",
      tag: "zzz"
    }
    var notify = new Notification("Конец!", params);
    notificationRun();
    alert("Действие таймера окончено!");
    document.title="Timer";
  }
}

function notificationRun(){
  cancel();
}

function wasStartTimer(){
  var params = {
    body: "Таймер уже был запущен!",
    tag: "zzz"
  }
  var notify = new Notification("Ошибка!", params);
}

function getAllUrlParams() {
  var params = window
  .location
  .search
  .replace('?','')
  .split('&')
  .reduce(
      function(p,e){
          var a = e.split('=');
          p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
          return p;
      },
      {}
  );
  if(+ params['start'] == 1){
    startTimerBool = true;
  var sec;
  var min;
  var hours;
  if( + params['seconds'] > 0){
   sec = parseInt(params['seconds']);
  } else {
    sec = 0;
  }
  if(+ params['minutes'] > 0){
     min = parseInt(params['minutes']);
    }else {
      min = 0;
    }
    if( + params['hours'] > 0){
       hours = parseInt(params['hours']);
      }else {
        hours = 0;
      }

      left = (hours*60*60 + min*60 + sec);
      startTimer();
  console.log( params['continue']);
    }
  
}





