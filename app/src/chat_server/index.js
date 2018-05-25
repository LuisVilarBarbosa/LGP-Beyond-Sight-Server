var app = require('http').createServer();
var io = module.exports.io = require('socket.io')(app);
const SocketManager = require('./SocketManager');
const os = require('os');
const PORT = process.env.NODE_CHAT_SERVER_PORT || 3231;

io.on('connection', SocketManager);

app.listen(PORT, () => {
    console.log((new Date().toUTCString()) + ': Chat server running on http://' + os.hostname + ':' + PORT);
});
