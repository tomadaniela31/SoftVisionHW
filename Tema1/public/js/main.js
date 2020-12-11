
const canvas = document.getElementById("game-canvas");
/**@type {CanvasRenderingContext2D} */
const context = canvas.getContext('2d');
const socket = io();
document.getElementById('create-game-button').addEventListener('click', function () {
    const input = document.getElementById('game-name-input');
    const gameName = input.value;
    if (gameName.length > 0) {
        console.log(gameName);
        document.getElementById('game-name-missing').classList.add('display-none');
        socket.emit('create-game', gameName);
    }
    else {
        document.getElementById('game-name-missing').classList.remove('display-none');
    }

})

socket.on('game-loop', function (objectsForDraw) {
    document.getElementById('menu').classList.add('display-none');

    document.getElementById('game-container').classList.remove('display-none');
    context.drawImage(document.getElementById('map-image'), 0, 0);

    objectsForDraw.forEach(function (objectsForDraw) {
        //console.log(objectsForDraw)
        context.drawImage(
            document.getElementById(objectsForDraw.imageId),
            ...objectsForDraw.drawImageParameters
        )
    })
})
document.addEventListener("keydown", function (event) {
    switch (event.key) {
        case 'ArrowUp':
            {
                socket.emit('start-moving-player', 'up');
                break;
            }
        case 'ArrowDown':
            {
                socket.emit('start-moving-player', 'down');
                break;
            }
        case 'ArrowLeft':
            {
                socket.emit('start-moving-player', 'left');
                break;
            }
        case 'ArrowRight':
            {
                socket.emit('start-moving-player', 'right');
                break;
            }
    }


});
document.addEventListener('keyup', function (event) {
    switch (event.key) {
        case 'ArrowUp':
        case 'ArrowDown':
            {
                socket.emit('stop-moving-player', 'dy');
                break;
            }
        case 'ArrowLeft':
        case 'ArrowRight':
            {
                socket.emit('stop-moving-player', 'dx');
                break;
            }
    }

})

socket.on('game-name-to-list', function (options) {
    const gameElementContainer = document.createElement('div');
    gameElementContainer.classList.add('game-element');
    gameElementContainer.id = options.gameId;

    const gameNameElement = document.createElement('p');
    gameNameElement.innerHTML = options.gameName;
    const joinGameButton = document.createElement('button');
    joinGameButton.innerHTML = 'Join Game';

    joinGameButton.addEventListener('click', function () {
        socket.emit('join-game', options.gameId);
    })

    gameElementContainer.appendChild(gameNameElement);
    gameElementContainer.appendChild(joinGameButton);

    document.getElementById('game-list').appendChild(gameElementContainer);
})

socket.on('remove-game-from-list', function (gameId) {
    document.getElementById(gameId).classList.add('display-none');
})

socket.on('game-over', function (reason) {
    const canvas = document.getElementById('game-canvas');
    console.log('Game over', reason);
    context.font = "80px Arial";
    context.fillStyle = "red";
    context.textAlign = "center";
    context.fillText("Game Over", canvas.width / 2, canvas.height / 2);
})