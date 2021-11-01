import React from 'react';
import Form from 'react-bootstrap/Form';

/**
 * Top navigation bar for menu options.
 */
class TextEditor extends React.Component {
	/**
	 * @constructor
	 * @param {Object}  props for React component.
	 */
	constructor(props) {
		super(props);
		this.docRef = React.createRef();
		this.state = {
			textInEditor: this.props.text,
			printBtnClicked: false,
		};
	}

	componentDidMount = () => {
		console.log(this.docRef.current.innerHTML);
	}

	printDoc = () => {
		var oPrntWin = window.open("",
			"_blank",
			"width=450,height=470,left=400,top=100,menubar=yestoolbar=no,location=no,scrollbars=yes");
		oPrntWin.document.open();
		oPrntWin.document.write("<!doctype html><html><head><title>Print<\/title><\/head><body onload=\"print();\">" + this.docRef.current.innerHTML + "<\/body><\/html>");
		oPrntWin.document.close();
	}

	/** Invoked before a mounted component receives new props.
	 * @param {Object}  nextProps for React component.
	 */
	componentWillReceiveProps(nextProps) {
		if (typeof nextProps.text != 'undefined') {
			this.setState({ textInEditor: this.state.textInEditor + nextProps.text });
		}

		if (typeof nextProps.printBtnClicked != 'undefined') {
			this.printDoc();
		}
	}

	/**
	 * Renders navigation bar at the top of the webpage.
	 *  @return { React.ReactNode } React virtual DOM.
	 */
	render() {
		if (this.state.printBtnClicked) {
			this.printDoc();
		}
		return (
			<div
				className="text-editor"
				contentEditable="true"
				ref={this.docRef}
			>
				<p>...</p>
			</div>
		);
	}
}

export default TextEditor;
