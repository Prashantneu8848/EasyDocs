import React, { useRef, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Canvas } from './Canvas'
import { ClearCanvasButton } from './ClearCanvasButton';

/**
 * Modal Box for free drawing.
 */
class FreeDraw extends React.Component {
  /**
     * @constructor
     * @param {Object}  props for React component.
     */
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  /**
   * After the component did mount, start drawing.
   */
  componentDidMount() {
    console.log('free draw component is mounted')
  }

  /**
   * After the component unmounts, paste the drawing.
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
        onHide={this.props.handleDrawinghModalClose}
        dialogClassName="modal-90w"
        centered
      >
        <Modal.Header
          closeButton
          className='modal-header'>
          <Modal.Title
            id="contained-modal-title-vcenter">
            Free Draw
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <Canvas />
            <ClearCanvasButton />
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Clear</Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

FreeDraw.propTypes = {
  show: PropTypes.bool,
  handleDrawinghModalClose: PropTypes.func,
};

export default FreeDraw;
