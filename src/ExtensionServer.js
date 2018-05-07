const net = require('net');
const fs = require('fs');
const port = 8000;
const max_command_bytes = 32;
const max_filename_bytes = 4096;
const files_dir = "../uploaded_files/";
const files_url = files_dir.substr(3);

// Create a TCP socket listener
const s = net.Server(function (socket) {
    socket.setEncoding('utf8');
    let allData = "";

    // 'data' is an event that means that a message was just sent by the 
    // client application
    socket.on('data', function (data) {
        allData += data;
    });

    // This socket only processes the data when the socket is closed because
    // 'data' is a TCP frame, not the full message.
    socket.on('end', function(err) {
        const last_command_byte = Math.min(allData.indexOf("\0"), max_command_bytes - 1);
        const command = allData.slice(0, last_command_byte);
       
        if("Info" == command) {
            const content = allData.slice(max_command_bytes);
            console.log(content);
        }
        else if("SENDING FILE" == command) {
            const content_pos = max_command_bytes + max_filename_bytes;
            const last_filename_byte = Math.min(allData.indexOf("\0", max_command_bytes), content_pos - 1);
            const filename = allData.slice(max_command_bytes, last_filename_byte);
            const content = allData.slice(content_pos);
            const storedFilename = files_dir + filename;
            const storedFileURL = files_url + filename;
            fs.writeFile(storedFilename, content, 'utf8', function(err) {
                if(err) {
                    return console.error(err);
                }
                console.log("The file '" + storedFilename + "' was saved!");
            });
            socket.write(storedFileURL);
        }
        else if("SLIDE_SHOW_BEGIN_EVENT" == command) {
            const content = allData.slice(max_command_bytes);
            // Inform REACT
        }
        else if("SLIDE_SHOW_NEXT_SLIDE_EVENT" == command) {
            const content = allData.slice(max_command_bytes);
            // Inform REACT
        }
        else if("SLIDE_SHOW_NEXT_BUILD_EVENT" == command) {
            const content = allData.slice(max_command_bytes);
            // Inform REACT
        }
        else if("SLIDE_SHOW_END_EVENT" == command) {
            const content = allData.slice(max_command_bytes);
            // Inform REACT
        }
        else
            console.log("Unexpected command received: " + command);
    });

    socket.on('error', function(err) {
    });
});

s.listen(port);
console.log('Node server running on http://localhost:' + port);
