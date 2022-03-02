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

  /***
    * Applies styling to the drawing modal.
    * @param {Object} value to apply with the command.
    */
  applyStyle = (value) => {
    console.log(value);
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
          <>
            <Navbar
              bg="light">
              <Container>
                <Nav className='ml-auto links'>
                  <Modal.Title
                    className='sketch-options'
                    id="contained-modal-title-vcenter">
                    Draw
                  </Modal.Title>
                  <Form.Control
                    className='sketch-options'
                    onChange={(e) => this.applyStyle(e.target.value)}
                    type="color"
                    id="stroke-select"
                    title="Color"
                  />
                  <Form.Select
                    className='linecap-select sketch-options'
                    onChange={(e) => this.applyStyle(e.target.value)}
                    aria-label="different linecap">
                    <option value="butt">Butt</option>
                    <option value="round">Round</option>
                    <option value="square">Square</option>
                  </Form.Select>
                  <Form.Select
                    className='linewidth-select sketch-options'
                    onChange={(e) => this.applyStyle(e.target.value)}
                    aria-label="different linecap">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Form.Select>
                </Nav>
              </Container>
            </Navbar>
          </>
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
