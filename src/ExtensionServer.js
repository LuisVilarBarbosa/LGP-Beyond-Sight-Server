const express=require('express');

const Websocket= require('ws'); 

const portsocket = 8000;


const server = express()
  .listen(portsocket, () => console.log(`Listening on ${ portsocket }`));

const wss = new Websocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));
  ws.on('message',(message)=>{
    //message handling mby splitting ? mby different type according to each 


  });
});
