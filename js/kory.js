var botName = 'kory';           // change this to your bot name

// declare timer variables
var alarm = null;
var callback = null;
var loopback = null;
var koreUserId = "";
var authToken = "";
var userId = Math.random().toString(36).substring(7);;
$(function(){
        var usersession = JSON.parse(window.localStorage.jStorage||"{}");
  /*      if(usersession.currentAccount && usersession.currentAccount.authorization) {
                koreUserId = usersession.currentAccount.authorization.resourceOwnerID;
                authToken  = usersession.currentAccount.authorization.accessToken;
                userName = usersession.currentAccount.userInfo.fName + " " + usersession.currentAccount.userInfo.lName;
                $("#txtUser").val(userName);
                $('#txtMessage').val('').focus();
        } else {
                window.location.href = "https://qa.kore.com/?return_to=https://qa.kore.com/kora-test";

        }
*/

        $('#frmChat').submit(function(e){
        // this function overrides the form's submit() method, allowing us to use AJAX calls to communicate with the ChatScript server
        e.preventDefault();  // Prevent the default submit() method
    var name = $('#txtUser').val();
    if (name == '') {
                alert('Please provide your name.');
                document.getElementById('txtUser').focus();
    }
        var chatLog = $('#responseHolder').html();
        var youSaid = '<strong>' + name + ':</strong> ' + $('#txtMessage').val() + "<br>\n";
        update(youSaid);
        var transformedMessage =  name + ". " + $("#txtMessage").val();
        $("#txtMessage").val(transformedMessage);
        var data = $(this).serialize();
      //  console.log(data);
        sendMessage(data);
        $('#txtMessage').val('').focus();
        });

        // any user typing cancels loopback or callback for this round
        $('#txtMessage').keypress(function(){
          window.clearInterval(loopback);
          window.clearTimeout(callback);
        });
});

function sendMessage(data){ //Sends inputs to the ChatScript server, and returns the response-  data - a JSON string of input information
$.ajax({
        url: 'ui.php',
        dataType: 'text',
        data: data,
    type: 'post',
    success: function(response){
                processResponse(parseCommands(response));
    },
    error: function(xhr, status, error){
                alert('oops? Status = ' + status + ', error message = ' + error + "\nResponse = " + xhr.responseText);
    }
  });
}

function parseCommands(response){ // Response is data from CS server. This processes OOB commands sent from the CS server returning the remaining response w/o oob commands

        var len  = response.length;
        var i = -1;
        while (++i < len )
        {
                if (response.charAt(i) == ' ' || response.charAt(i) == '\t') continue; // starting whitespace
                if (response.charAt(i) == '[') break;   // we have an oob starter
                return response;                                                // there is no oob data
        }
        if ( i == len) return response; // no starter found
        var user = $('#txtUser').val();

        // walk string to find oob data and when ended return rest of string
        var start = 0;
        while (++i < len )
        {
                if (response.charAt(i) == ' ' || response.charAt(i) == ']') // separation
                {
                        if (start != 0) // new oob chunk
                        {
                                var blob = response.slice(start,i);
                                start = 0;

                                var commandArr = blob.split('=');
                                if (commandArr.length == 1) continue;   // failed to split left=right

                                var command = commandArr[0]; // left side is command
                                var interval = (commandArr.length > 1) ? commandArr[1].trim() : -1; // right side is millisecond count
                                if (interval == 0)  /* abort timeout item */
                                {
                                        switch (command){
                                                case 'alarm':
                                                        window.clearTimeout(alarm);
                                                        alarm = null;
                                                        break;
                                                case 'callback':
                                                        window.clearTimeout(callback);
                                                        callback = null;
                                                        break;
                                                case 'loopback':
                                                        window.clearInterval(loopback);
                                                        loopback = null;
                                                        break;
                                        }
                                }
                                else if (interval == -1) interval = -1; // do nothing
                                else
                                {
                                        var timeoutmsg = {user: user, send: true, message: '[' + command + ' ]'}; // send naked command if timer goes off
                                        switch (command) {
                                                case 'alarm':
                                                        alarm = setTimeout(function(){sendMessage(timeoutmsg );}, interval);
                                                        break;
                                                case 'callback':
                                                        callback = setTimeout(function(){sendMessage(timeoutmsg );}, interval);
                                                        break;
                                                case 'loopback':
                                                        loopback = setInterval(function(){sendMessage(timeoutmsg );}, interval);
                                                        break;
                                        }
                                }
                        } // end new oob chunk
                        if (response.charAt(i) == ']') return response.slice(i + 2); // return rest of string, skipping over space after ]
                } // end if
                else if (start == 0) start = i; // begin new text blob
        } // end while
        return response;        // should never get here
 }

function update(text){ // text is  HTML code to append to the 'chat log' div. This appends the input text to the response div
        var chatLog = $('#responseHolder').html();
        $('#responseHolder').html(chatLog + text);
        var rhd = $('#responseHolder');
        var h = rhd.get(0).scrollHeight;
        rhd.scrollTop(h);
}

function processResponse(response) { // given the final CS text, converts the parsed response from the CS server into HTML code for adding to the response holder div
    //    var botSaid = '<strong>' + botName + ':</strong> ' + response + "<br>\n";
      //  update(botSaid);
	//console.log(response);
	//message(response);
  response = response.split("|");
  //for (var i = 0; i < response.length; i++) {
    message(response);
  //}
}
