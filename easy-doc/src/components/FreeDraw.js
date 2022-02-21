import React from 'react';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

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
          <p>Drawing component goes here.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Close</Button>
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