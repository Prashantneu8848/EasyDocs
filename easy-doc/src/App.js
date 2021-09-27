import React, { Component } from 'react';
import {
    Switch,
    Route
} from "react-router-dom";
import "./App.css";
import TicTacToe from './components/tic-tac-toe/TicTacToe';
import TopNavbar from './components/TopNavbar';

class App extends Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route exact path="/ttt" component={TicTacToe} />
                    <Route path='/'>
                        <div className="App">
                            <div className='App-header'>
                                <TopNavbar />
                            </div>
                        </div>
                    </Route>
                </Switch>
            </main >
        );
    }
}

export default App;
