import React, { Component } from 'react';
import {
    Switch,
    Link,
    Route
} from "react-router-dom";
import logo from './logo.svg';
import "./App.css";
import TicTacToe from './components/tic-tac-toe/TicTacToe';

class App extends Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route exact path="/ttt" component={TicTacToe} />
                    <Route path='/'>
                        <div className="App">
                            <li>
                                <Link to="/ttt">TicTacToe</Link>
                            </li>
                            <div className="App-header">
                                <img src={logo} className="App-logo" alt="logo" />
                                <h2>Welcome to React</h2>
                            </div>
                        </div>
                    </Route>
                </Switch>
            </main >
        );
    }
}


export default App;
