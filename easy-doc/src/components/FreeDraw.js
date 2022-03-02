import React from 'react'
import { Container } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { Canvas } from './Canvas'
import { useCanvas } from './CanvasContext'

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
    const ClearCanvasButton = () => {
      const { clearCanvas } = useCanvas()
      return <Button variant="secondary" onClick={clearCanvas}>Clear</Button>
    }

    return (
      <Modal
        size="lg"
        show={this.props.show}
        onHide={this.props.handleDrawinghModalClose}
        centered
        backdrop="static"
        keyboard={false}
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
          <Canvas className='canvas-box' />
        </Modal.Body>
        <Modal.Footer>
          <ClearCanvasButton />
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
