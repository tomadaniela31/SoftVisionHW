const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const valCounter=0;
http.listen(5000, function () {
    console.log("Server started at port 5000");

})
app.get('/', function (request, response) {
    response.sendFile(__dirname + '/tema3ex1.html');
})
app.use(express.static(__dirname+'/public'));
io.on('connection', function (socket) {
   // console.log('SOCKET CONNECTED' + socket.id);
   socket.emit('counter',valCounter);
   socket.on('counter', function(counter){
       io.emit('counter',counter);
   })
})