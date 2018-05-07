const net = require('net');
const fs = require('fs');
const port = 8000;
const files_dir = "../uploaded_files/";
const files_url = files_dir.substr(3);
const delimiter = '\0';

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
        const firstNull = allData.indexOf(delimiter);
        const command = allData.slice(0, firstNull);
        const payload = allData.slice(firstNull + 1);
       
        if("Info" == command) {
            console.log(payload);
        }
        else if("SENDING FILE" == command) {
            const secondNull = payload.indexOf(delimiter);
            const filename = payload.slice(0, secondNull);
            const fileContent = payload.slice(secondNull + 1);
            const storedFilename = files_dir + filename;
            const storedFileURL = files_url + filename;
            fs.writeFile(storedFilename, fileContent, 'utf8', function(err) {
                if(err) {
                    return console.error(err);
                }
                console.log("The file '" + storedFilename + "' was saved!");
            });
            socket.write(storedFileURL);
        }
        else if("SLIDE_SHOW_BEGIN_EVENT" == command) {
            // Inform REACT
        }
        else if("SLIDE_SHOW_NEXT_SLIDE_EVENT" == command) {
            // Inform REACT
        }
        else if("SLIDE_SHOW_NEXT_BUILD_EVENT" == command) {
            // Inform REACT
        }
        else if("SLIDE_SHOW_END_EVENT" == command) {
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
