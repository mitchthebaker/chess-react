import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

function Item(props) {
    return <li> {props.children} </li>
}

function List(props) {
    return <ul> {props.children} </ul>
}

List.defaultProps = {
  children: <Item> Empty </Item>
};

/*************************************************
 *************************************************
 *************************************************
 *************************************************/

function Square(props) {
    return (
        <button
            className={"square " + props.shade}
            onClick={props.onClick}
            style={props.style}
        >
        </button>
    );
}

class Board extends React.Component {
    renderBoard() {
        const COLUMN = 8;
        //let board = [];
        let keyCount = 0;

        if(this.props.board.length !== 0) {
            return this.props.board;
        }
        else {
            //Outer loop to create board
            for(let i = 0; i < COLUMN; i++) {
                let row = [];

                //Inner loop for rows
                for(let j = 0; j < COLUMN; j++) {
                    row.push(<Square
                        piece={this.props.squares[keyCount]}
                        key={keyCount}
                    />);
                    keyCount++;
                }

                this.props.board.push(<div className="board-row">
                    {row}
                </div>);
            }

            return this.props.board;
        }
    }

    render() {
        return (
          <div>
              <div className="board">
                  {this.renderBoard()}
              </div>
          </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            history: [{
                squares: Array(64).fill(null)
            }],
            piece: "",
            board: [],
            columns: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
            pawn: 'P',
            rook: 'R',
            knight: 'KN',
            bishop: 'B',
            king: 'KI',
            queen: 'Q',
            stepNumber: 0
        }
        this.createNewGame = this.createNewGame.bind(this);
        this.assignSquares = this.assignSquares.bind(this);
        //this.createNewGame();
    }

    createNewGame = () => {
        this.setState(state => {
            const history = state.history.slice(0, state.stepNumber + 1);
            const current = history[history.length - 1];
            const sq = current.squares.slice();

            const squares = sq.map(function(element, index) {
                switch(index) {
                    case 0:
                        return element = state.rook;
                    case 1:
                        return element = state.knight;
                    case 2:
                        return element = state.bishop;
                    case 3:
                        return element = state.king;
                    case 4:
                        return element = state.queen;
                    case 5:
                        return element = state.bishop;
                    case 6:
                        return element = state.knight;
                    case 7:
                        return element = state.rook;
                    case 56:
                        return element = state.rook;
                    case 57:
                        return element = state.knight;
                    case 58:
                        return element = state.bishop;
                    case 59:
                        return element = state.king;
                    case 60:
                        return element = state.queen;
                    case 61:
                        return element = state.bishop;
                    case 62:
                        return element = state.knight;
                    case 63:
                        return element = state.rook;
                    default:
                        if(index >= 8 && index <= 16) {
                            return element = state.pawn;
                        }
                        else if(index >= 48 && index <= 55) {
                            return element = state.pawn;
                        }
                        else {
                            return element = null;
                        }
                }
            });

            return { squares };
        });
    }

    assignSquares = () => {
        this.createNewGame();

        this.setState(state => {
            //console.log(state.board[0].props.children[0]);
            //console.log(state.board[0]);
            console.log(state.squares);
            const sq = state.squares;
            console.log(sq);

            sq.forEach((element, index) => {
                if(index < 8) {
                    let rowCount = 0;

                    console.log(element + '=>' + index + ' || Sq. Comp: ' +
                        state.board[rowCount].props.children[index].key);
                }
                else if(index < 16 && index >= 8) {
                    let rowCount = 1;

                    console.log(element + '=>' + index + ' || Sq. Comp: ' +
                        state.board[rowCount].props.children[index - 8].key);
                }
                else if(index < 24 && index >= 16) {
                    let rowCount = 2;

                    console.log(element + '=>' + index + ' || Sq. Comp: ' +
                        state.board[rowCount].props.children[index - 16].key);
                }
                else if(index < 32 && index >= 24) {
                    let rowCount = 3;

                    console.log(element + '=>' + index + ' || Sq. Comp: ' +
                        state.board[rowCount].props.children[index - 24].key);
                }
                else if(index < 40 && index >= 32) {
                    let rowCount = 4;

                    console.log(element + '=>' + index + ' || Sq. Comp: ' +
                        state.board[rowCount].props.children[index - 32].key);
                }
                else if(index < 48 && index >= 40) {
                    let rowCount = 5;

                    console.log(element + '=>' + index + ' || Sq. Comp: ' +
                        state.board[rowCount].props.children[index - 40].key);
                }
                else if(index < 56 && index >= 48) {
                    let rowCount = 6;

                    console.log(element + '=>' + index + ' || Sq. Comp: ' +
                        state.board[rowCount].props.children[index - 48].key);
                }
                else if(index < 64 && index >= 56) {
                    let rowCount = 7;

                    console.log(element + '=>' + index + ' || Sq. Comp: ' +
                        state.board[rowCount].props.children[index - 56].key);
                }
                //console.log(element + '=>' + index + ' || Sq. Comp: ' + state.board[index]);
            });
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        board={this.state.board}
                    />
                </div>
                <div className="create-game">
                    <button
                        type="button"
                        onClick={this.assignSquares}
                    >
                        Create a new game
                    </button>
                    {this.state.squares}
                </div>
            </div>
        );
    }
}

var reactElement = (
    <div>
        <List />
        <List>
            <Item> First </Item>
            <Item> Second </Item>
            <Item> Third </Item>

        </List>
        <Game />
    </div>
);

ReactDOM.render(reactElement,
    document.getElementById('root')
);