const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const Game = require('./Models/Game.js');//tema 3 exercitiul 3 
const SpaceRanger = require('./Models/space_ranger.js');
const PinkLady = require('./Models/pink_lady.js');
const Bullet = require('./Models/Bullet.js');
http.listen(5000, function () {
    console.log("Server started at port 5000");

})
app.get('/', function (request, response) {
    response.sendFile(__dirname + '/tema2.html');
})
app.use(express.static(__dirname + '/public'));
app.get('/about', function (request, response) {
    response.sendFile(__dirname + '/about.html');
})
io.on('connection', function (socket) {
    console.log('SOCKET CONNECTED' + socket.id);
    socket.join('menu');
    Object.keys(games).forEach(function (gameId) {
        if (games[gameId].players.length == 1) {
            socket.emit('game-name-to-list', { gameName: games[gameId].name, gameId: gameId })
        }

    })

    socket.on('create-game', function (gameName) {
        console.log('[NEW GAME CREATED]');
        const gameId = 'game-' + socket.id;
        players[socket.id] = new SpaceRanger({ gameId: gameId, socketId: socket.id });
        const game = new Game({
            id: gameId,
            players: [players[socket.id]],
            name: gameName
        });
       
        games[game.id] = game;
        socket.join(gameId);
        io.to('menu').emit('game-name-to-list', { gameName: gameName, gameId: gameId })
    })
    socket.on('start-moving-player', function (direction) {
        if (players[socket.id]) {
            if(games[players[socket.id].gameId].players.length!=2){
                return;
            }
            players[socket.id].startMoving(direction);
        }

    })
    socket.on('stop-moving-player', function (axis) {
        if (players[socket.id]) {
            if(games[players[socket.id].gameId].players.length!=2){
                return;
            }
            players[socket.id].stopMoving(axis);
        }
    })
    socket.on('join-game', function (gameId) {
        console.log(`[SOCKET ${socket.id} JOINED GAME ${gameId}`);
        players[socket.id] = new PinkLady({ gameId: gameId, socketId: socket.id });
        games[gameId].players.push(players[socket.id]);
        
        socket.join(gameId);
        games[gameId].generateDiamonds();
        io.to('menu').emit('remove-game-from-list', gameId);
        socket.emit('show-game-container');
    })
    socket.on('disconnect', function () {
        console.log(`[SOCKET ${socket.id} DISCONNECTED`);
        if (players[socket.id]) {
            const gameId = players[socket.id].gameId;
            const game = games[gameId];
            console.log('gameeeee: ', game);
            const playersToRemoveIds = game.players.map(function (player) {
                return player.socketId;
            })
            clearInterval(game.gameInterval);
            delete games[gameId];
            playersToRemoveIds.forEach(function (playersToRemoveId) {
                delete players[playersToRemoveId];
            })
           // io.to(gameId).emit('game-over', 'A player disconnected');
            io.to(gameId).emit('game-over', 'A player disconnected',gameId);
            //console.log(`[USER ${gameId} DISCONNECTED]`);
       
     }
    })
    socket.on('back-to-menu', function (gameId) {
        socket.leave(gameId);
        socket.emit('menu');
      })

    socket.on('attack',function(){
        if(players[socket.id]){
            if(games[players[socket.id].gameId].players.length!=2){
                return;
            }
            const game=games[players[socket.id].gameId];
            if(game.bullets.length==0)
            game.bullets.push(new Bullet(players[socket.id]));
        }
    })
    
})

function gameLoop(roomId) {
    const game=games[roomId];
    if (game) {
        game.update();
        if(game.over){
            const playersToRemoveIds = game.players.map(function (player) {
                return player.socketId;
            })
            clearInterval(game.gameInterval);
            delete games[roomId];
            playersToRemoveIds.forEach(function (playersToRemoveId) {
                delete players[playersToRemoveId];
            })
           // io.to(gameId).emit('game-over', 'A player disconnected');
            io.to(roomId).emit('game-over', game.winner+'-won',roomId);
        }
        else{
            const objectsForDraw = [];
        game.players.forEach(function (player) {
            objectsForDraw.push(player.forDraw());
        })
        game.diamonds.forEach(function (diamond) {
            objectsForDraw.push(diamond.forDraw());
        })
        game.bullets.forEach(function (bullet) {
            objectsForDraw.push(bullet.forDraw());
        })
      
        const data={
            objectsForDraw:objectsForDraw,
            gameInProgress: game.players.length==2,
           
        }
        if(data.gameInProgress){
            data.score={
                'space-ranger':game.players[0].score,
                'pink-lady':game.players[1].score

            }
            data.leftDiamonds=game.totalDiamonds-game.players[0].score-game.players[1].score;
        }
        io.to(roomId).emit('game-loop', data);

        }
        
    }
}
const games = {};
const players = {};
const bullets={};
exports.gameLoop = gameLoop;
exports.games=games;