import React, { Component } from 'react';
import {
	Switch,
	Route
} from "react-router-dom";
import "./App.css";
import TicTacToe from './components/tic-tac-toe/TicTacToe';
import TopNavbar from './components/TopNavbar';
import TextEditor from './components/TextEditor';

class App extends Component {
	/**
	 * @constructor
	 * @param {Object}  props for React component.
	 */
	constructor(props) {
		super(props);
		this.state = {
			translatedText: "",
			printBtnClicked: false,
		};

		this.addTranslatedText = this.addTranslatedText.bind(this)
	}

	addTranslatedText(text) {
		this.setState({
			translatedText: text
		})
	}

	handlePrintButtonClick = () => {
		this.setState({ printBtnClicked: true });
	};

	render() {
		return (
			<main>
				<Switch>
					<Route exact path="/ttt" component={TicTacToe} />
					<Route path='/'>
						<div className="App">
							<div className='App-header'>
								<TopNavbar
									handlePrintButtonClick={this.handlePrintButtonClick}
									addTranslatedText={this.addTranslatedText} />
							</div>
							<div className='text-box'>
								<TextEditor
									printBtnClicked={this.state.printBtnClicked}
									text={this.state.translatedText} />
							</div>
						</div>
					</Route>
				</Switch>
			</main>
		);
	}
}

export default App;
