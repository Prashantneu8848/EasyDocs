import React, { Component } from 'react';
import {
	Switch,
	Route
} from "react-router-dom";
import "./App.css";
import TicTacToe from './components/tic-tac-toe/TicTacToe';
import TopNavbar from './components/TopNavbar';
import TextEditor from './components/TextEditor';
import GoogleDrivePicker from './components/GoogleDrivePicker';

class App extends Component {
	/**
	 * @constructor
	 * @param {Object}  props for React component.
	 */
	constructor(props) {
		super(props);
		this.state = {
			textInEditor: "",
		};

		this.updateTextInEditor = this.updateTextInEditor.bind(this)
	}

	updateTextInEditor(text) {
		this.setState({
			textInEditor: text
		})
	}

	render() {
		return (
			<main>
				<Switch>
					<Route exact path="/ttt" component={TicTacToe} />
					<Route path='/'>
						<div className="App">
							<div className='App-header'>
								<TopNavbar updateTextInEditor={this.updateTextInEditor} />
							</div>
							<div className='text-editor'>
								<TextEditor text={this.state.textInEditor} />
							</div>
							<div className='test'>
								<GoogleDrivePicker />
							</div>
						</div>
					</Route>
				</Switch>
			</main >
		);
	}
}

export default App;
