import React from 'react';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import Image from 'react-bootstrap/Image'
import miclogo from '../../public/voiceicon.png'

/**
 * Modal Box for speech recognition.
 */
class SpeechRecognition extends React.Component {
  /**
     * @constructor
     * @param {Object}  props for React component.
     */
  constructor(props) {
    super(props);
  }

  /**
   * After the component did mount, start listening
   */
  componentDidMount() {
    console.log('component has displayed');
  }

  /**
   * After the component unmounts, get the translated text.
   */
  componentWillUnmount() {
    console.log('component is now closed');
  }

  /**
   * Renders react-bootstrap modal box component.
   *  @return { React.ReactNode } React virtual DOM.
   */
  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.handleSpeechModalClose}
        centered
      >
        <Modal.Header
          closeButton
          className='modal-header'>
          <Modal.Title
            id="contained-modal-title-vcenter">
            <p className="loading">
              Start talking
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image
            src={miclogo}
            className="mic-icon"
          />
        </Modal.Body>
      </Modal>
    )
  }
}

SpeechRecognition.propTypes = {
  show: PropTypes.bool,
  handleUploadModalClose: PropTypes.func,
};

export default SpeechRecognition;