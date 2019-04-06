import React from 'react';
import '../index.scss';
import Board from './board.js';
import FallenPiecesBlock from './fallenPiecesBlock.js';
import createChessBoard from "../helpers/createChessBoard.js";

export default class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            squares: createChessBoard(),
            whiteFallenPieces: [],
            blackFallenPieces: [],
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
                const whiteFallenPieces = this.state.whiteFallenPieces.slice();
                const blackFallenPieces = this.state.blackFallenPieces.slice();
                const isDestEnemyOccupied = !!squares[i]; //squares[i]? true : false
                const isMovePossible = squares[this.state.sourceSelection].isMovePossible(this.state.sourceSelection, i, isDestEnemyOccupied);
                const srcToDestPath = squares[this.state.sourceSelection].getSrctoDestPath(this.state.sourceSelection, i);
                const isMoveLegal = this.isMoveLegal(srcToDestPath);

                if(isMovePossible && isMoveLegal) {
                    if(squares[i] !== null) {
                        if(squares[i].player === 1) {
                            whiteFallenPieces.push(squares[i]);
                        }
                        else {
                            blackFallenPieces.push(squares[i]);
                        }
                    }

                    console.log("whiteFallenPieces", whiteFallenPieces);
                    console.log("blackFallenPieces", blackFallenPieces);
                    squares[i] = squares[this.state.sourceSelection];
                    squares[this.state.sourceSelection] = null;

                    let player = this.state.player === 1? 2 : 1;
                    let turn = this.state.turn === 'white'? 'black' : 'white';
                    this.setState({
                        sourceSelection: -1,
                        squares: squares,
                        whiteFallenPieces: whiteFallenPieces,
                        blackFallenPieces: blackFallenPieces,
                        player: player,
                        status: '',
                        turn: turn
                    });
                }
                else {
                    this.setState({
                        status: "Wrong selection, choose a valid source and destination.",
                        sourceSelection: -1
                    });
                }
            }
        }
    }

    isMoveLegal(srcToDestPath) {
        let isLegal = true;
        for(let i = 0; i < srcToDestPath.length; i++) {
            if(this.state.squares[srcToDestPath[i]] !== null) {
                isLegal = false;
            }
        }
        return isLegal;
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
                    <div className="fallen-pieces-block">
                        {<FallenPiecesBlock
                            whiteFallenPieces={this.state.whiteFallenPieces}
                            blackFallenPieces={this.state.blackFallenPieces}
                        />}
                    </div>
                </div>
            </div>
        );
    }
}