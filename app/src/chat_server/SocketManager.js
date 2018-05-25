const io = require('./index.js').io


let allMessages = {};

module.exports = function(socket){
    console.log("Socket id" + socket.id);

    socket.on("SendMessage", (chat) =>{
        allMessages = addMessage(addMessage, chat)
        console.log(allMessages)
        io.emit("SendAll",allMessages);
    })

    socket.emit("SendAll",allMessages);
}

function addMessage(messageList, message){
    let newList = Object.assign({}, messageList)
    newList[message.name] = message
    return newList
}