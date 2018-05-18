const io = require('./index.js').io


let allMessages = {};

module.exports = function(socket){
    console.log("Socket id" + socket.id);

    // socket.on(USER_CONNECTED, (user) =>{
    //     connectedUsers = addUser(connectedUsers, user)
    //     socket.user = user;
    //     io.emit(USER_CONNECTED, connectedUsers)
    //     console.log(connectedUsers);
    // })

    socket.on("SendMessage", (chat) =>{
        allMessages = addMessage(addMessage, chat)
        console.log(allMessages);
        io.emit("SendAll",allMessages);
    })

    socket.emit("SendAll",allMessages);
}


function addUser(userList, user){
    let newList = Object.assign({}, userList)
    newList[user.name] = user
    return newList
}

function addMessage(messageList, message){
    let newList = Object.assign({}, messageList)
    newList[message.name] = message
    return newList
}