import React from 'react';

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
			saveBtnClicked: false,
		};
	}

	/**
		* Invoked immediately after { @TextEditor } is mounted.
		*/
	componentDidMount = () => {
		// console.log(this.docRef.current.innerHTML);
	}

	/**
		* Opens a new browser tab and provides option to print the content in
		* { @TextEditor }.
		*/
	printDoc = () => {
		var oPrntWin = window.open("",
			"_blank",
			"width=450,height=470,left=400,top=100,menubar=yestoolbar=no,location=no,scrollbars=yes");
		oPrntWin.document.open();
		oPrntWin.document.write("<!doctype html><html><head><title>Print<\/title><\/head><body onload=\"print();\">" + this.docRef.current.innerHTML + "<\/body><\/html>");
		oPrntWin.document.close();
	}

	saveDoc = () => {
		const blob = new Blob([this.docRef.current.innerHTML],
			{ type: "text/plain;charset=utf-8" });
		const a = document.createElement('a');
		a.href = URL.createObjectURL(blob);
		a.download = "easy-doc";
		a.click();
		URL.revokeObjectURL(a.href);
	}

	/** Invoked before a mounted component receives new props.
	 * @param {Object}  nextProps for React component.
	 */
	componentWillReceiveProps(nextProps) {
		if (typeof nextProps.text != 'undefined') {
			this.setState({ textInEditor: this.state.textInEditor + nextProps.text });
		}

		if (typeof nextProps.saveBtnClicked != 'undefined') {
			this.saveDoc();
		}

		if (typeof nextProps.printBtnClicked != 'undefined' && nextProps.printBtnClicked != 'false') {
			this.printDoc();
		}
	}

	/**
	 * Renders navigation bar at the top of the webpage.
	 *  @return { React.ReactNode } React virtual DOM.
	 */
	render() {
		if (this.state.saveBtnClicked) {
			this.saveDoc();
		}

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
