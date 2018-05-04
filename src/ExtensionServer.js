

var net = require('net');

// Create a TCP socket listener
var s = net.Server(function (socket) {

    // Add the new client socket connection to the array of
    // sockets

    // 'data' is an event that means that a message was just sent by the 
    // client application
    socket.on('data', function (msg_sent) {
        // Loop through all of our sockets and send the data
       
            // Write the msg sent by chat client
            console.log(msg_sent.toString('utf8'));
    });
   


});

s.listen(8000);
console.log('Node server at http://localhost:8000');
