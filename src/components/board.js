import React from 'react';

import '../index.css';
import Square from './square.js';

export default class Board extends React.Component {

    renderSquare(i, squareShade) {
        console.log(this.props.squares[i]);
        return (
          <Square
            piece={this.props.squares[i]}
            style={this.props.squares[i] ? this.props.squares[i].style : null}
            shade={squareShade}
            onClick={() => this.props.onClick(i)}
          />
        );
    }

    render() {
        const COLUMN = 8;
        let board = [];

        for(let i = 0; i < COLUMN; i++) {
            let row = [];

            for(let j = 0; j < COLUMN; j++) {
                const squareShade = (isEven(i) && isEven(j)) || (!isEven(i) && !isEven(j)) ? "light-square" : "dark-square";
                row.push(this.renderSquare((i * 8) + j, squareShade));
            }
            board.push(<div className="board-row"> {row} </div>);
        }

        return (
            <div className="board">
                {board}
            </div>
        );
    }
}

function isEven(num) {
    return num % 2 === 0;
}