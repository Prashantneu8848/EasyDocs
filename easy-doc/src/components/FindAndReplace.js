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
    this.state = {
      findWord: '',
      replaceWith: '',
    };
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

  /**
   * Gets the word to be replaced and the word to replace it with and replaces the occurence
   * of the string either the first or all and updates the text editor.
   * 
   * @param {bool} isReplaceAll flag that determines to replace all or one occurence
   * of the string
   */
  replaceAll = (isReplaceAll) => {
    this.props.handleFindAndReplacehModalClose();
    const prevHtml = document.getElementsByClassName("text-editor")[0].innerHTML;
    let replacedHtml;
    let regex;
    if (isReplaceAll) {
      regex = new RegExp(this.state.findWord, 'g');
      replacedHtml = prevHtml.replace(regex, this.state.replaceWith);
    } else {
      regex = new RegExp(this.state.findWord);
      replacedHtml = prevHtml.replace(regex, this.state.replaceWith);
    }
    document.getElementsByClassName("text-editor")[0].innerHTML = replacedHtml;
    this.setState({ findWord: '', replaceWith: '' });
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
                value={this.state.findWord}
                onChange={e => this.setState({ findWord: e.target.value })}
                placeholder="Enter word to find" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Replace with</Form.Label>
              <Form.Control
                value={this.state.replaceWith}
                onChange={e => this.setState({ replaceWith: e.target.value })}
                placeholder="new word to replace with" />
            </Form.Group>
            <Modal.Footer>
              <Button
                onClick={() => {
                  this.replaceAll(true);
                }}
                variant="primary">Replace All</Button>
              <Button
                onClick={() => {
                  this.replaceAll(false);
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
