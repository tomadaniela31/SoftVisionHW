const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

http.listen(5050, function () {
    console.log("Server started at port 5050");
})

app.get('/', function (request, response) {
    response.sendFile(__dirname + '/tema4.html');
})

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
    //socket.join('menu');
    console.log('SOCKET CONNECTED' + socket.id);
    socket.on('join-chat', function (userNameInfo) {
        console.log('[USER JOINED CHAT]', socket.id, userNameInfo.name);
        chatUsers[socket.id] = userNameInfo.name;
        chatColors[socket.id] = userNameInfo.color;
        socket.emit('joined-chat');
        socket.join('chat');
        io.in('chat').emit('nrOfFriends', Object.keys(chatUsers).length, { name: chatUsers[socket.id], action: 'join chat' });
    })
    socket.on('send-message', function (message) {
        console.log('[USER SENT MESSAGE]', message);
        io.to('chat').emit('new-message', { name: chatUsers[socket.id] + ': ' + message, userColor: chatColors[socket.id] });
    })

    socket.on('leave-chat', function () {
        console.log('[USER LEFT CHAT]', socket.id);
        io.in('chat').emit('nrOfFriends', Object.keys(chatUsers).length - 1, { name: chatUsers[socket.id], action: 'left chat' });
        delete chatUsers[socket.id];
        socket.leave('chat');
        socket.emit('menu');

    })
    socket.on('disconnect', function () {
        console.log(`[SOCKET ${socket.id} DISCONNECTED`);
    })
})

const chatUsers = {};
const chatColors = {};