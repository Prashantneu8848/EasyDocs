import React from 'react';

import Modal from 'react-bootstrap/Modal';

/**
 * A customized react-bootstrap modal component which is the entry point for the app.
 */
class SplashScreen extends React.Component {
	/**
	 * @constructor
	 * @param {Object} props for React component.
	 */
	constructor(props) {
		super(props);
	}

	/**
	 * Renders a modal box.
	 * @return {React.ReactNode} React virtual DOM. 
	 */
	render() {
		return (
			<Modal
			show={this.props.show}
			onHide={this.props.handleSplashScreenClose}
			centered>
				<Modal.Header closeButton>
					<Modal.Title id='contaid-modal-title-vcenter'>
						Welcome to Tic Tac Toe
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Created by Prashant Neupane.
				</Modal.Body>
			</Modal>
		)
	}
}

export default SplashScreen;