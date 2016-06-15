<!DOCTYPE html>
<html >
  <head>
    <meta charset="UTF-8">
    <title>Kory</title>

    <link class="koreLogo" href="./logo.ico" type="image/x-icon" rel="shortcut icon">
    <link rel="stylesheet" href="css/normalize.css">

    <link rel='stylesheet prefetch' href='css/jquery.mCustomScrollbar.min.css'>

        <link rel="stylesheet" href="css/style.css">




  </head>
<body>
  <script src='./jquery.min.js'></script>

<div id='username'>
<link href="./form.css" rel="stylesheet" title="Default Style">
<div id="form-main">
  <div id="form-div">

<script>
$('input[type="button"]').on("keyenter",function(eve){
     var key = eve.keyCode || e.which ;
     if (key == 13) {
          $(this).click();
      }
      return false;
});

</script>
<h3 style="color:rgb(33,42,101);"> Hi, I’m Kory. Who do I have the pleasure of speaking with? If you can share your contact information, I can follow up with anything else you need following our chat.</h3>

      <p class="name">
        <input name="name" type="text" class="validate[required,custom[onlyLetter],length[0,100]] feedback-input" placeholder="Name" id="name" />
      </p>

      <p class="email">
        <input name="email" type="text" class="validate[required,custom[email]] feedback-input" id="email" placeholder="Email" />
      </p>
      <p class="phone">

        <input name="phone" type="text" class="feedback-input" id="phone" placeholder="Phone (Optional)" />
      </p>


      <div class="submit">
        <input type="submit" value="Start Chat" id="button-blue" onclick="restore()"/>
        <div class="ease"></div>
      </div>
  </div>

</div>
</div>

  <div id="some" hidden>

    <!--

Follow me on
Dribbble: https://dribbble.com/supahfunk
Twitter: https://twitter.com/supahfunk
Codepen: http://codepen.io/supah/

It's just a concept, a fake chat to design a new daily UI for direct messaging.
Hope you like it :)

-->

 <!--<script>

      function doStuff()
      {
        var nameElement = document.getElementById("someInput");
        var theName = nameElement.value;
        document.getElementById("someDiv").innerHTML += theName;
      }

  </script>
 <div id="someDiv">
    Hello
  </div>
<input id="someInput" type="text" style="position:absolute;z-index:10;top:45%;left:45%">
<input type="button" value="Say Hello" style="position: absolute;z-index:10;top:48%;left:48%; " onClick="doStuff()">
-->



<div class="chat" >
  <div class="chat-title">
    <h1>KORY</h1>
    <h2>Kore's PR Bot</h2>
    <figure class="avatar">
      <img src="./kore.png" /></figure>
  </div>
  <div class="messages">
    <div class="messages-content"></div>
  </div>
  <div class="message-box">
    <textarea type="text" class="message-input" placeholder="Type message..."></textarea>
    <button type="submit" class="message-submit">Send</button>
  </div>

</div>
<div class="bg"></div>


<script src='./jquery.mCustomScrollbar.concat.min.js'></script>

      <script src="js/kory.js"></script>
      <script src="js/index.js"></script>


    </div>
  </body>
</html>
