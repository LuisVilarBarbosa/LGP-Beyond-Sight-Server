const net = require('net');
const fs = require('fs');
const port = 8000;
const max_command_bytes = 32;
const max_filename_bytes = 4096;
const files_dir = "../uploaded_files/";
const files_url = files_dir.substr(3);

// Create a TCP socket listener
const s = net.Server(function (socket) {

    // 'data' is an event that means that a message was just sent by the 
    // client application
    socket.on('data', function (msg_sent) {
        const last_command_byte = Math.min(msg_sent.indexOf("\0"), max_command_bytes - 1);
        const command = msg_sent.slice(0, last_command_byte).toString('utf8');
       
        if("Info" == command) {
            const content = msg_sent.slice(max_command_bytes).toString('utf8');
            console.log(content);
        }
        else if("SENDING FILE" == command) {
            const content_pos = max_command_bytes + max_filename_bytes;
            const last_filename_byte = Math.min(msg_sent.indexOf("\0", max_command_bytes), content_pos - 1);
            const filename = msg_sent.slice(max_command_bytes, last_filename_byte).toString('utf8');
            const content = msg_sent.slice(content_pos);
            const storedFilename = files_dir + filename;
            const storedFileURL = files_url + filename;
            fs.writeFile(storedFilename, content, function(err) {
                if(err) {
                    return console.error(err);
                }
                console.log("The file '" + storedFilename + "' was saved!");
            });
            socket.write(storedFileURL);
        }
        else if("SLIDE_SHOW_BEGIN_EVENT" == command) {
            const content = msg_sent.slice(max_command_bytes).toString('utf8');
            // Inform REACT
        }
        else if("SLIDE_SHOW_NEXT_SLIDE_EVENT" == command) {
            const content = msg_sent.slice(max_command_bytes).toString('utf8');
            // Inform REACT
        }
        else if("SLIDE_SHOW_NEXT_BUILD_EVENT" == command) {
            const content = msg_sent.slice(max_command_bytes).toString('utf8');
            // Inform REACT
        }
        else if("SLIDE_SHOW_END_EVENT" == command) {
            const content = msg_sent.slice(max_command_bytes).toString('utf8');
            // Inform REACT
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
