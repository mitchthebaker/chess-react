export default class Piece {
    constructor(player, icon) {
        this.player = player;
        this.icon = {backgroundImage: "url('" + icon + "')"};
    }
}