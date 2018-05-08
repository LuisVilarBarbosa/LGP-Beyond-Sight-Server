// Based on https://www.c-sharpcorner.com/article/socket-io-programming-with-example-in-node-js/
// and https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/#request-body
const express = require('express');
const fs = require('fs');
const sha256 = require('sha256');
const os = require('os');
const app = express();
const port = 8000;
const files_dir = "../uploaded_files/";
const files_url = files_dir.substr(2);
const delimiter = '\0';

app.put("/upload_file", function(request, response){
    let body = [];
    request.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        const nullIndex = body.indexOf(delimiter);
        const filename = body.slice(0, nullIndex);
        const fileContent = body.slice(nullIndex + 1);
        const ourFilename = sha256(fileContent) + filename.substr(filename.lastIndexOf('.'));
        const storedFilename = files_dir + ourFilename;
        const storedFileURL = os.hostname() + files_url + ourFilename;
        fs.writeFile(storedFilename, fileContent, 'utf8', function(err) {
            if(err) {
                return console.error(err);
            }
            console.log("The file '" + storedFilename + "' was saved!");
        });
        response.writeHead(200,{'Content-Type':'text/html'});
        response.write(storedFileURL);
        response.end();
    });
});

app.post("/slide_show_begin_event", function(request, response){
    response.end();
});

app.post("/slide_show_next_slide_event", function(request, response){
    response.end();
});

app.post("/slide_show_next_build_event", function(request, response){
    response.end();
});

app.post("/slide_show_end_event", function(request, response){
    response.end();
});

app.listen(port, function() {
    console.log((new Date().toUTCString()) + ': Node server running on http://' + os.hostname + ':' + port);
});
