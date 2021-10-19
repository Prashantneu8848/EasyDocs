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
						rows={25} className="text-editor"
						value={this.props.text} />
				</Form.Group>
			</Form>
		);
	}
}

export default TextEditor;
