import React from 'react'
import { Container } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

/**
 * Modal Box for free drawing.
 */
class FindAndReplace extends React.Component {
  /**
     * @constructor
     * @param {Object}  props for React component.
     */
  constructor(props) {
    super(props);
  }

  /**
   * After the component did mount, start drawing.
   */
  componentDidMount() {
    console.log('find and replace component is mounted')
  }

  /**
   * After the component unmounts, paste the drawing.
   */
  componentWillUnmount() {
    console.log('find and replace component is now closed');
  }

  replaceAll = (isReplaceAll) => {
    const prevHtml = document.getElementsByClassName("text-editor")[0].innerHTML;
    const testVar = 'pras'
    let replacedHtml;
    let regex;
    if (isReplaceAll) {
      regex = new RegExp(testVar, 'g');
      replacedHtml = prevHtml.replace(regex, 'neu');
    } else {
      regex = new RegExp(testVar);
      replacedHtml = prevHtml.replace(regex, 'neu');
    }
    document.getElementsByClassName("text-editor")[0].innerHTML = replacedHtml;
  }

  /**
   * Renders react-bootstrap modal box component.
   *  @return { React.ReactNode } React virtual DOM.
   */
  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.handleFindAndReplacehModalClose}
        centered
      >
        <Modal.Header
          closeButton
          className='modal-header'>
          <>
            <Container>
              <Modal.Title
                className='sketch-options'
                id="contained-modal-title-vcenter">
                Find and Replace
              </Modal.Title>
            </Container>
          </>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Find</Form.Label>
              <Form.Control
                placeholder="Enter word to find" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Replace with</Form.Label>
              <Form.Control
                placeholder="new word to replace with" />
            </Form.Group>
            <Modal.Footer>
              <Button
                onClick={() => {
                  this.replaceAll(true);
                  this.props.handleFindAndReplacehModalClose();
                }}
                variant="primary">Replace All</Button>
              <Button
                onClick={() => {
                  this.replaceAll(false);
                  this.props.handleFindAndReplacehModalClose();
                }}
                variant="secondary">Replace</Button>
            </Modal.Footer>
          </Modal.Body>
        </Form>
      </Modal >
    )
  }
}

FindAndReplace.propTypes = {
  show: PropTypes.bool,
  handleFindAndReplacehModalClose: PropTypes.func,
};

export default FindAndReplace;
