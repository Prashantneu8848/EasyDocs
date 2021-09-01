import React from 'react';
import ReactDOM from 'react-dom';
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Square(props) {
  return (
    <button
      className="square"
      // onClick prop tells React to set up a click event listener. When this
      // button is clicked, React will call the onClick event handler that
      // is defined here.
      onClick={() => props.onClick()}
    // This calls the onClick from the props defined by the board.
    // Which is turn calls the handleClick method.
    >
      {props.value}
    </button>
  );
}

/**
 * Passes data to Square Component.
 */
class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        // Location of each Square needs to be passed to the onClick method
        // since there is a single event handler for the entire board.
        onClick={() => this.props.onClick(i)}
      />
    )
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  resetGame() {
    this.setState({
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (!winner) {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <>
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            {winner &&
              <Alert variant="success">
                <Alert.Heading>Winner is: {winner}</Alert.Heading>
              </Alert>
            }
            {this.state.stepNumber === 9 && !winner &&
              <Alert variant="danger">
                <Alert.Heading>Nobody won the game</Alert.Heading>
              </Alert>
            }
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
          <div className="reset">
            <Button variant="warning"
              onClick={() => this.resetGame()}>
              Reset
            </Button>
          </div>
        </div>
      </>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}