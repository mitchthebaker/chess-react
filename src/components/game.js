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