import React from 'react';
import '../index.css';
import Board from './board.js';
import createChessBoard from "../helpers/createChessBoard";

export default class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            squares: createChessBoard(),
            player: 1,
            sourceSelection: -1,
            status: '',
            turn: 'white'
        }
    }

    handleClick(i) {
        const squares = this.state.squares.slice();

        if(this.state.sourceSelection === -1) {
            if(!squares[i] || squares[i].player !== this.state.player) {
                this.setState({
                   status: 'Wrong selection; choose player ' + this.state.player + ' pieces.'
                });
                //squares[i] ? delete squares[i].style.backgroundColor : null;
            }
            else {
                squares[i].style = { ...squares[i].style, backgroundColor: "RGB(111, 143, 114)"};
                this.setState({
                   status: "Choose the destination for the selected piece",
                   sourceSelection: i
                });
            }
        }
        else if(this.state.sourceSelection > -1) {
            //delete squares[this.state.sourceSelection].style.backgroundColor;
            if(squares[i] && squares[i].player === this.state.player) {
                this.setState({
                    status: "Wrong selection. Choose a valid source and destination",
                    sourceSelection: -1
                })
            }
            else {
                const squares = this.state.squares.slice();
                const isDestEnemyOccupied = squares[i]? true : false;
                const isMovePossible = squares[this.state.sourceSelection].isMovePossible(this.state.sourceSelection, i, isDestEnemyOccupied);

            }
        }

    }

    render() {
        return (
            <div>
                <div className="game">
                    <div className="game-board">
                        <Board
                            squares={this.state.squares}
                            onClick={(i) => this.handleClick(i)}
                        />
                    </div>
                    <div className="game-status">
                        {this.state.status}
                    </div>
                </div>
            </div>
        );
    }
}