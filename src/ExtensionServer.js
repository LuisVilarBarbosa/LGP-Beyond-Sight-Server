// Based on https://www.c-sharpcorner.com/article/socket-io-programming-with-example-in-node-js/
// and https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/#request-body
const express = require('express');
const fs = require('fs');
const sha256 = require('sha256');
const os = require('os');
const ftpd = require('simple-ftpd');
const path = require('path');
const app = express();
const port = 8000;
const files_dir = "../uploaded_files/";
const files_url = files_dir.substr(2);
const delimiter = '\0';
const ftpPort = 21;
const uploadMapping = new Map();

fs.exists(files_dir, function(exists) {
    if(!exists) {
        fs.mkdir(files_dir, function(err) {
            if(err) throw err;
            console.log("The directory '" + files_dir + "' was created!");
        });
    }
});

ftpd({ host: '127.0.0.1', port: ftpPort, root: files_dir }, (session) => {
 
    session.on('pass', (username, password, callback) => {
      if (username === 'BeyondSightPPTExtension' && password === 'BeyondSightPPTExtensionPassword') {
        session.readOnly = false;
        session.root = files_dir;
        callback(null, 'Welcome Beyond Sight PPT Extension');
      } 
      // else {
      //   callback(null, 'Welcome guest');
      // }
    });

    // session.on('stat', (pathName, callback) => {
    //  fs.stat(pathName, callback);
    // })
   
    // session.on('readdir', (pathName, callback) => {
    //   fs.readdir(pathName, callback);
    // })
   
    // session.on('read', (pathName, offset, callback) => {
    //  callback(null, fs.createReadStream(pathName, { start: offset }));
    // });
   
    session.on('write', (pathName, offset, callback) => {
        let filename = path.basename(pathName);
        if(uploadMapping.get(filename) === undefined){
            callback(null, null);
            return;
        }
        fs.exists(pathName, function(exists) {
            if(exists) {
                callback(null, null);
                return;
            }
            callback(null, fs.createWriteStream(pathName, { start: offset }));
        });
    });
});
console.log((new Date().toUTCString()) + ': FTP server running on ftp://' + os.hostname + ':' + ftpPort);


function receiveBody(request, callback) {
    let body = [];
    request.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        const bodyString = Buffer.concat(body).toString();
        callback(bodyString);
    });
}

function receiveAndParseBodyAsText(request, callback) {
    receiveBody(request, (body) => {
        const bodyParts = body.split(delimiter);
        callback(bodyParts);
    });
}

app.post("/upload_file", function(request, response){
    receiveAndParseBodyAsText(request, (bodyParts) => {
        if(bodyParts.length == 0){
            response.writeHead(500,{'Content-Type':'text/html'});
            response.end();
            return;
        }
        const filename = bodyParts[0];
        const fileExtension = filename.substr(filename.lastIndexOf('.'));
        const ourFileName = sha256(filename) + fileExtension;   // make it more collision proof
        const storedFileURL = os.hostname() + files_url + ourFileName;
        uploadMapping.set(ourFileName, Date.now);
        const timeout = new Date() - 10000 /* ms */;
        uploadMapping.forEach((value, key, map) => {
            if(value < timeout)
                map.delete(key);
        });
        response.writeHead(200,{'Content-Type':'text/html'});
        response.write(storedFileURL);
        response.end();
    });
});

app.post("/slide_show_begin_event", function(request, response){
    receiveAndParseBodyAsText(request, (bodyParts) => {
        console.log(bodyParts);
        response.writeHead(200,{'Content-Type':'text/html'});
        response.end();
    });
});

app.post("/slide_show_next_slide_event", function(request, response){
    receiveAndParseBodyAsText(request, (bodyParts) => {
        console.log(bodyParts);
        response.writeHead(200,{'Content-Type':'text/html'});
        response.end();
    });
});

app.post("/slide_show_next_build_event", function(request, response){
    receiveAndParseBodyAsText(request, (bodyParts) => {
        console.log(bodyParts);
        response.writeHead(200,{'Content-Type':'text/html'});
        response.end();
    });
});

app.post("/slide_show_end_event", function(request, response){
    receiveAndParseBodyAsText(request, (bodyParts) => {
        console.log(bodyParts);
        response.writeHead(200,{'Content-Type':'text/html'});
        response.end();
    });
});

app.listen(port, function() {
    console.log((new Date().toUTCString()) + ': Node server running on http://' + os.hostname + ':' + port);
});
