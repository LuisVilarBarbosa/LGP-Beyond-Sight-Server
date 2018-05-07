const net = require('net');
const fs = require('fs');
const port = 8000;
const files_dir = "../uploaded_files/";
const files_url = files_dir.substr(3);

// Create a TCP socket listener
const s = net.Server(function (socket) {

    // 'data' is an event that means that a message was just sent by the 
    // client application
    socket.on('data', function (msg_sent) {
        const command = msg_sent.slice(0, 127).toString('utf8');
        if(command.startsWith("Info")) {
            const content = msg_sent.slice(128).toString('utf8');
            console.log(content);
        }
        else if(command.startsWith("SENDING FILE")) {
            const content = msg_sent.slice(128);
            const filename = files_dir + "test.pdf";
            const fileURL = files_url + "test.pdf";
            fs.writeFile(filename, content, function(err) {
                if(err) {
                    return console.error(err);
                }
                console.log("The file '" + filename + "' was saved!");
            });
            socket.write(fileURL);
        }
        else
            console.log("Unexpected command received: " + command);
    });

    socket.on('error', function(err) {
        console.error(err);
    });
});

s.listen(port);
console.log('Node server running on http://localhost:' + port);
