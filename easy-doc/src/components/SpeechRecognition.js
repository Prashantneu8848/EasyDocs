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
    this.state = {
      timeRemainingInSeconds: 10
    }
  }

  /**
   * After the component did mount, start listening
   */
  componentDidMount() {
    this.startTimer();
  }

  /**
   * After the component unmounts, get the translated text.
   */
  componentWillUnmount() {
    console.log('component is now closed');
  }

  /**
   * Starts a countdown for a specified amount of time in the state.
   */
  startTimer() {
    this.interval = setInterval(() => {
      const remainingTime = this.state.timeRemainingInSeconds;
      if (remainingTime > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1
        }))
      }

      if (remainingTime === 0) {
        clearInterval((this.interval))
      } else {
        this.setState(({ timeRemainingInSeconds }) => ({
          timeRemainingInSeconds: remainingTime - 1
        }))
      }
    }, 1000);
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
            Time Remaining: {this.state.timeRemainingInSeconds}
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