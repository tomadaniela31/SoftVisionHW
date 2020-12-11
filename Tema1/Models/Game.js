//exercitiul 3, tema3
const server = require('../server.js');
class Game {
    constructor(options) {
        this.id = options.id
        this.players = options.players;
        this.name = options.name;
        this.start();
    }
    start() {
        const that = this;
        this.gameInterval = setInterval(function () { server.gameLoop(that.id) }, 1000 / 60);
    }
    update() {
        this.players.forEach(function (player) {
            player.move();
        })
    }
}
module.exports = Game;