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
        const command = msg_sent.slice(0, max_command_bytes - 1).toString('utf8');
        if(command.startsWith("Info")) {
            const content = msg_sent.slice(max_command_bytes).toString('utf8');
            console.log(content);
        }
        else if(command.startsWith("SENDING FILE")) {
            const payload_pos = max_command_bytes + max_filename_bytes;
            let filename = msg_sent.slice(max_command_bytes, payload_pos - 1).toString('utf8');
            filename = filename.slice(0, filename.indexOf("\0"));
            const content = msg_sent.slice(payload_pos);
            const storedFilename = files_dir + filename;
            const storedFileURL = files_url + filename;
            fs.writeFile(storedFilename, content, function(err) {
                if(err) {
                    return console.error(err);
                }
                console.log("The file '" + filename + "' was saved!");
            });
            socket.write(storedFileURL);
        }
        else if(command.startsWith("SLIDE_SHOW_BEGIN_EVENT")) {
            const content = msg_sent.slice(max_command_bytes).toString('utf8');
            // Inform REACT
        }
        else if(command.startsWith("SLIDE_SHOW_NEXT_SLIDE_EVENT")) {
            const content = msg_sent.slice(max_command_bytes).toString('utf8');
            // Inform REACT
        }
        else if(command.startsWith("SLIDE_SHOW_NEXT_BUILD_EVENT")) {
            const content = msg_sent.slice(max_command_bytes).toString('utf8');
            // Inform REACT
        }
        else if(command.startsWith("SLIDE_SHOW_END_EVENT")) {
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
