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
			textInProps: this.props.text,
		};
	}

	/** Invoked before a mounted component receives new props.
	 * @param {Object}  nextProps for React component.
	 */
	componentWillReceiveProps(nextProps) {
		if (typeof nextProps.text != 'undefined') {
			this.setState({ textInProps: nextProps.text });
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
						onChange={e => this.setState({ textInProps: e.target.value })}
						rows={25}
						className="text-editor"
						value={this.state.textInProps} />
				</Form.Group>
			</Form>
		);
	}
}

export default TextEditor;
