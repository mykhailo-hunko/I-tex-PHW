var left;
var timerId;
var rad;
var wasStarted = false;
function f(){
  document.getElementById("hours").value = 0;
  document.getElementById("minutes").value = 0;
  document.getElementById("seconds").value = 0;
  rad=document.getElementsByName('radioButton');

}

function startTimer(){
if(wasStarted){
  wasStartTimer();
} else {
  wasStarted = true;
  var hours = parseInt(document.getElementById("hours").value, 10);
  var minutes =parseInt(document.getElementById("minutes").value, 10);
  var seconds =parseInt(document.getElementById("seconds").value, 10);
  left = (hours*60*60 + minutes*60 + seconds);
  if(left < 1){
    wasStartTimer();
  } else {
  timerId =  setInterval( setHowLost,1000);
  }
}
    
}

function setHowLost(){
  document.title = left;
  left = left - 1;
  if(left == -1){
    timerTimeOut();
  }
}

function cancel(){
  pause();
  document.getElementById("hours").value = 0;
  document.getElementById("minutes").value = 0;
  document.getElementById("seconds").value = 0;
  left = 0;
  document.title= left;
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





