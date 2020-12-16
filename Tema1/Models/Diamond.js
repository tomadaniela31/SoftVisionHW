const RIGHT_EDGE = 860;
const DOWN_EDGE = 540;
const SpaceRanger = require('./space_ranger');
const PinkLady = require('./pink_lady');
class Diamond {
    constructor(player1Base, player2Base) {
        // this.x=Math.floor(Math.random()* RIGHT_EDGE+50);
        //this.y=Math.floor(Math.random()* DOWN_EDGE+50);
        this.x = 0;
        this.y = 0;
        this.imageId = 'diamond';
        this.width = 26;
        this.height = 21;
        this.player1Base = player1Base;
        this.player2Base = player2Base;
        this.generateDiamond();
    }
    forDraw() {
        return {
            imageId: this.imageId,
            drawImageParameters: [
                this.x,
                this.y
            ]

        }
    }
    generateDiamond() {
        while (true) {
            this.x = Math.floor(Math.random() * RIGHT_EDGE + 50);
            this.y = Math.floor(Math.random() * DOWN_EDGE + 50);
            if (this.x < this.player1Base.width && this.y < this.player1Base.height || this.x > this.player2Base.x && this.player2Base.height) {
                this.x = Math.floor(Math.random() * RIGHT_EDGE + 50);
                this.y = Math.floor(Math.random() * DOWN_EDGE + 50);
            }
            else
            break;

        }
    }
}
module.exports = Diamond;