import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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
        className="square"
      >
      </button>
    );
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
        }
    }

    renderBoard() {
        let board = [];

        //Outer loop to create board
        for(let i = 0; i < this.state.columns.length; i++) {
            let row = [];

            //Inner loop for rows
            for(let j = 0; j < this.state.columns.length; j++) {

                row.push(<Square
                            key={this.state.columns[j] + i}
                            id={this.state.columns[j] + i}
                         />);
            }

            board.push(<div className="board-row">
                            {row}
                       </div>);
        }

        return board;
    }

    render() {
        return (
          <div className="board">
              {this.renderBoard()}
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
        <Board />
    </div>
);

ReactDOM.render(reactElement,
    document.getElementById('root')
);