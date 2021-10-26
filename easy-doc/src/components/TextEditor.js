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
		this.state = {
			textInEditor: this.props.text,
		};
	}

	/** Invoked before a mounted component receives new props.
	 * @param {Object}  nextProps for React component.
	 */
	componentWillReceiveProps(nextProps) {
		if (typeof nextProps.text != 'undefined') {
			this.setState({ textInEditor: this.state.textInEditor + nextProps.text });
		}
	}

	/**
	 * Renders navigation bar at the top of the webpage.
	 *  @return { React.ReactNode } React virtual DOM.
	 */
	render() {
		return (
			<Form>
				<Form.Group className="mb-3" controlId="editor.ControlText">
					<Form.Control
						as="textarea"
						onChange={e => this.setState({ textInEditor: e.target.value })}
						rows={25}
						className="text-editor"
						value={this.state.textInEditor} />
				</Form.Group>
			</Form>
		);
	}
}

export default TextEditor;
