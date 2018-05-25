// Based on https://www.c-sharpcorner.com/article/socket-io-programming-with-example-in-node-js/
// and https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/#request-body
const express = require('express');
const fs = require('fs');
const nanoid = require('nanoid')
const os = require('os');
const ftpd = require('simple-ftpd');
const path = require('path');
const app = express();
const port = process.env.NODE_EXT_SERVER_PORT || 8000;
const files_dir = "../uploaded_files/";
const files_url = "/pages/pdf/";
const delimiter = '\0';
const ftpPort = process.env.NODE_FTP_SERVER_PORT || 21;
const uploadMapping = new Map();
var mailer  = require('./Mailer');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const Pusher = require('pusher');

const pusher = new Pusher({
    appId: '528423',
    key: '649f74e3a883bf7aa954',
    secret: '6560157c267df67fac68',
    cluster: 'eu',
    encrypted: true
    });

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
    uploadMapping.delete(filename);
    fs.exists(pathName, async function(exists) {
      if(exists) {
        callback(null, null);
        return;
      }
      await callback(null, fs.createWriteStream(pathName, { start: offset }));

      try {
        const filenameWithoutExtension = filename.substr(0, filename.lastIndexOf('.'));
        var exec = require('child_process').exec, child;
        child = exec('pdftk ' + files_dir + filename + ' burst output ' + files_dir + filenameWithoutExtension + '_%02d.pdf', function (error, stdout, stderr) {
          console.log('pdftk stdout: ' + stdout);
          console.log('pdftk stderr: ' + stderr);
          if (error != null) {
            console.log('exec error: ' + error);
          }
        });
      } catch (err) {
        console.log(err);
      }
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
    const id = nanoid();
    const ourFileName = id + fileExtension;
    const storedFileURL = os.hostname() + files_url + id;
    uploadMapping.set(ourFileName, Date.now());
    const timeout = Date.now() - 10000 /* ms */;
    uploadMapping.forEach((value, key, map) => {
      if(value < timeout)
        map.delete(key);
    });
    response.writeHead(200,{'Content-Type':'text/html'});
    response.write(storedFileURL);
    response.end();
  });
});

app.post("/email", function(req, res){
  mailer.sendContactForm('lgpbeyondsight@gmail.com', req.body.name, req.body.email, req.body.message);
  res.end();
});

app.post("/slide_show_begin_event", function(request, response){
    receiveAndParseBodyAsText(request, (bodyParts) => {
        console.log(bodyParts);
        pusher.trigger('react-node', 'message', {
        "message": bodyParts
        });
        response.writeHead(200,{'Content-Type':'text/html'});
        response.end();
    });
});

app.post("/slide_show_next_slide_event", function(request, response){
    receiveAndParseBodyAsText(request, (bodyParts) => {
        console.log(bodyParts);
        pusher.trigger('react-node', 'message', {
            "message": bodyParts
        });
        response.writeHead(200,{'Content-Type':'text/html'});
        response.end();
    });
});

app.post("/slide_show_next_build_event", function(request, response){
    receiveAndParseBodyAsText(request, (bodyParts) => {
        console.log(bodyParts);
        pusher.trigger('react-node', 'message', {
            "message": bodyParts
        });
        response.writeHead(200,{'Content-Type':'text/html'});
        response.end();
    });
});

app.post("/slide_show_end_event", function(request, response){
    receiveAndParseBodyAsText(request, (bodyParts) => {
        console.log(bodyParts);
        pusher.trigger('react-node', 'message', {
            "message": bodyParts
        });
        response.writeHead(200,{'Content-Type':'text/html'});
        response.end();
    });
});

app.listen(port, function() {
  console.log((new Date().toUTCString()) + ': Node server running on http://' + os.hostname + ':' + port);
});
