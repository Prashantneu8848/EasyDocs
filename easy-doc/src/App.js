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
			saveBtnClicked: false,
		};

		this.addTranslatedText = this.addTranslatedText.bind(this)
	}

	/**
	 * Saves the translated text in the component's state.
	 * @param {String} text from the Google Speech to Text API.
	 */
	addTranslatedText(text) {
		this.setState({
			translatedText: text
		})
	}

	/**
	 * Callback handler for print button in { @TopNavbar }.
	 */
	handlePrintButtonClick = () => {
		this.setState({ printBtnClicked: true });
	};

	/**
	 * Callback handler for save button in { @TopNavbar }.
	 */
	handleSaveButtonClick = () => {
		this.setState({ saveBtnClicked: true });
	};

	/**
	 * Renders { @TopNavbar } and { @TextEditor }.
	 * @return { React.ReactNode } React virtual DOM.
	 */
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
									handleSaveButtonClick={this.handleSaveButtonClick}
									addTranslatedText={this.addTranslatedText} />
							</div>
							<div className='text-box'>
								<TextEditor
									printBtnClicked={this.state.printBtnClicked}
									saveBtnClicked={this.state.saveBtnClicked}
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
