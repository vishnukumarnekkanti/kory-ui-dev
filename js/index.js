var $messages = $('.messages-content'),
    d, h, m,
    i = 0;
var name = '';
var savebody
$(window).load(function() {
  if (name == '' && email == '' ){
    $("#some").hide();
    $("#username").show();
    }
  $messages.mCustomScrollbar();

});

function restore() {

 name = document.getElementById('name').value;
 email = document.getElementById('email').value;

 phone = document.getElementById('phone').value;

 if(name != '' && email != ''){
 $("#username").hide();
 $("#some").show();
 if(phone == ""){
   phone = "not_provided";
 }
else {
  phone = phone.replace(/ /g,'');
}
  var data ={};
  data["message"] = cleanMail(email) + ". begin conversation name " + name + " email  " + email + " phone " + phone;
  data["send"]="";
  data["user"]=name;
  sendMessage(data);
 }
}

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

function setDate(){
  d = new Date()
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
  }
}

function cleanMail(arg){
  while (arg.contains(".")) {
    arg = arg.replace(".","");
  }
  return arg;
}

function insertMessage() {
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
  setDate();
  $('.message-input').val(null);
  updateScrollbar();
  var message = cleanMail(email) + ". " + msg;
  var data ={};
  data["message"] = message;
  data["send"]="";
  data["user"]=name;
  sendMessage(data);
 /* setTimeout(function() {
    fakeMessage();
  }, 1000 + (Math.random() * 20) * 100); */
}

$('.message-submit').click(function() {
  insertMessage();
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
})

var bubbleLength=1;
var currentBubble=0;
function appendMSG(msg){
  setTimeout(function() {
    $('.message.loading').remove();
    $('<div class="message new"><figure class="avatar"><img src="./kore.png" /></figure>' + msg[currentBubble++] + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();
    i++;
    if (currentBubble < bubbleLength) {
      message_intermidiate(msg);
    }
  }, 1000 + (Math.random() * 20) * 100);
}

function message(msg) {
  bubbleLength = msg.length;
  currentBubble = 0;
  message_intermidiate(msg);
}

function message_intermidiate(arg) {
  if ($('.message-input').val() != '') {
    return false;
  }
  $('<div class="message loading new"><figure class="avatar"><img src="./kore.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();
  appendMSG(arg);
}
