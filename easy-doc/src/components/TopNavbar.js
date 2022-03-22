import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import CryptoAES from 'crypto-js/aes';
import CryptoENC from 'crypto-js/enc-utf8';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import FindAndReplace from './FindAndReplace';
import FreeDraw from './FreeDraw';
import GoogleDrivePicker from './GoogleDrivePicker';
import ImageFilePicker from './ImageFilePicker';
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SpeechRecognition from './SpeechRecognition';

/**
 * stuffs to do:
 * 1. saving the stuffs locally in the browser so the stuffs are still there when the user refreshes the browser.
 * 2. Version control
*/

/**
 * Top navigation bar for menu options.
 */
class TopNavbar extends React.Component {
  /**
   * @constructor
   * @param {Object}  props for React component.
   */
  constructor(props) {
    super(props);
    this.state = {
      speechModalBoxShow: false,
      showFilePicker: false,
      drawinghModalBoxShow: false,
      findAndReplaceModalBoxShow: false,
    };

    /**
     * Callback function to close the speech recognition modal box.
     */
    this.handleSpeechModalClose = () => {
      this.setState({ speechModalBoxShow: false });
    };

    /**
     * Callback function to close the file picker modal box.
     */
    this.handleFilePickerClose = () => {
      this.setState({ showFilePicker: false });
    };

    /**
     * Callback function to close the free drawing modal box.
     */
    this.handleDrawinghModalClose = () => {
      this.setState({ drawinghModalBoxShow: false });
    };

    /**
     * Callback function to close the find and replace drawing modal box.
     */
    this.handleFindAndReplacehModalClose = () => {
      this.setState({ findAndReplaceModalBoxShow: false });
    };

    /**
     * Calls the {@code SpeechToTextServlet} and converts speech to text.
     */
    this.convertSpeechToText = () => {
      this.setState({ speechModalBoxShow: true })
      fetch('/speechtotext')
        .then((response) => response.text())
        .then((text) => {
          this.props.addTranslatedText(text);
          this.setState({ speechModalBoxShow: false });
        })
        .catch((error) => console.log(error));
    };

    this.startDrawing = () => {
      this.setState({ drawinghModalBoxShow: true })
    };
  }

  /**
    * Callback function for the print button.
    */
  handlePrintButtonClick = () => {
    this.props.handlePrintButtonClick();
  };

  /**
    * Callback function for the save button.
    */
  handleSaveButtonClick = () => {
    this.props.handleSaveButtonClick();
  };

  /**
    * Applies styling to the selected text.
    * @param {String} command to apply to the text.
    * @param {Object} value to apply with the command.
    */
  applyStyleToEditor = (command, value) => {
    if (command in ['removeFormat', 'outdent', 'indent', 'forecolor',
      'fontname', 'justifyleft', 'justifyright', 'justifycenter', 'backcolor',
      'insertunorderedlist', 'insertorderedlist', 'underline', 'superscript',
      'subscript', 'formatBlock']) {
      document.execCommand('styleWithCSS', false, true);
    } else {
      document.execCommand('styleWithCSS', false, false);
    }
    document.execCommand(command, false, value);
  }

  /**
    * Reads the content of a file selected from
    * {@code TextFilePicker} component.
    */
  handleLoadTextData = async (e) => {
    e.preventDefault();
    let reader = new FileReader();
    reader.onload = async (e) => {
      const decrypt = CryptoAES.decrypt(e.target.result.toString(),
        'secret key 123');
      document.getElementsByClassName("text-editor")[0].innerHTML =
        decrypt.toString(CryptoENC);
    };
    reader.readAsText(e.target.files[0])
  }

  /**
    * Modal component with file picker that lets to chose a file locally
    * from the computer.
    * @return { React.ReactNode } React virtual DOM for the component.
    */
  TextFilePicker = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <>
        <Dropdown.Item
          onClick={handleShow}
          className='option4'>
          Load
        </Dropdown.Item>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Chose a document</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <input
                type='file'
                onChange={(e) => {
                  handleClose();
                  this.handleLoadTextData(e)
                }} />;
            </div>
          </Modal.Body>
        </Modal>
      </>
    )
  };

  /**
   * Renders navigation bar at the top of the webpage.
   * @return { React.ReactNode } React virtual DOM.
   */
  render() {
    return (
      <>
        <Navbar bg='dark' variant='dark' fixed='top'>
          <Container>
            <Nav className='ml-auto links'>
              <Form.Control
                type='text'
                htmlSize='10'
                placeholder='Untitled' />
              <>
                <Dropdown className='dropdowns'>
                  <Dropdown.Toggle
                    variant='dark'
                    id='dropdown-basic'
                    className='dropdown-toggle'>
                    File
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    className='dropdown-menu'>
                    <Dropdown.Item
                      onClick={() => this.handleSaveButtonClick()}
                      className='option1'>
                      Save
                    </Dropdown.Item>
                    <Dropdown.Item
                      className='option2'>
                      Download
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => this.handlePrintButtonClick()}
                      className='option3'>
                      Print
                    </Dropdown.Item>
                    <this.TextFilePicker />
                  </Dropdown.Menu>
                </Dropdown>
              </>
              <>
                <Dropdown className='dropdowns'>
                  <Dropdown.Toggle
                    variant='dark'
                    id='dropdown-basic'
                    className='dropdown-toggle'>
                    Edit
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    className='dropdown-menu'>
                    <Dropdown.Item
                      className='option1'>
                      Undo
                    </Dropdown.Item>
                    <Dropdown.Item
                      className='option2'>
                      Redo
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => this.setState({ findAndReplaceModalBoxShow: true })}
                      className='option3'>
                      Find and replace
                    </Dropdown.Item>
                    <FindAndReplace
                      show={this.state.findAndReplaceModalBoxShow}
                      handleFindAndReplacehModalClose={this.handleFindAndReplacehModalClose}
                    />
                  </Dropdown.Menu>
                </Dropdown>
              </>
              <>
                <Dropdown className='dropdowns'>
                  <Dropdown.Toggle
                    variant='dark'
                    id='dropdown-basic'
                    className='dropdown-toggle'>
                    Insert
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    className='dropdown-menu'>
                    <Dropdown.Item
                      onClick={() => this.startDrawing()}
                      className='option1'>
                      Drawing
                    </Dropdown.Item>
                    <FreeDraw
                      show={this.state.drawinghModalBoxShow}
                      handleDrawinghModalClose={this.handleDrawinghModalClose}
                    />
                    <Dropdown.Item
                      onClick={() => this.setState({ showFilePicker: true })}
                      className='option2'>
                      Picture
                    </Dropdown.Item>
                    <Dropdown.Item
                      className='option3'>
                      <GoogleDrivePicker />
                    </Dropdown.Item>
                    <Button
                      onClick={() => this.applyStyleToEditor('insertHorizontalRule')}
                      variant='light'>
                      Horizontal Line
                    </Button>
                  </Dropdown.Menu>
                </Dropdown>
              </>
              <>
                <Dropdown className='dropdowns'>
                  <Dropdown.Toggle
                    variant='dark'
                    id='dropdown-basic'
                    className='dropdown-toggle'>
                    Format
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    className='dropdown-menu'>
                    <Button
                      onClick={() => this.applyStyleToEditor('superscript')}
                      variant='light'>
                      Superscript
                    </Button>
                    <Button
                      onClick={() => this.applyStyleToEditor('subscript')}
                      variant='light'>
                      Subscript
                    </Button>
                  </Dropdown.Menu>
                </Dropdown>
              </>
              <>
                <Dropdown className='dropdowns'>
                  <Dropdown.Toggle
                    variant='dark'
                    id='dropdown-basic'
                    className='dropdown-toggle'>
                    Tools
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    className='dropdown-menu'>
                    <Dropdown.Item
                      onClick={() => this.convertSpeechToText()}
                      className='option1'>
                      Speech to Text
                    </Dropdown.Item>
                    <SpeechRecognition
                      show={this.state.speechModalBoxShow}
                      handleSpeechModalClose={this.handleSpeechModalClose}
                    />
                    <Dropdown.Item
                      className='option2'>
                      Option2
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
              <>
                <Form.Control
                  onChange={(e) => this.applyStyleToEditor('forecolor', e.target.value)}
                  type='color'
                  id='colorInput'
                  title='Color'
                />
                <Form.Select
                  onChange={(e) => this.applyStyleToEditor('fontname', e.target.value)}
                  aria-label='different fonts'>
                  <option value='Arial'>Arial</option>
                  <option value='Calibre'>Calibre</option>
                  <option value='Arial Black'>Arial Black</option>
                  <option value='Roboto'>Roboto</option>
                  <option value='Courier New'>Courier New</option>
                  <option value='Tahoma'>Tahoma</option>
                  <option value='Monaco'>Monaco</option>
                  <option value='Georgia'>Georgia</option>
                  <option value='Luminari'>Luminari</option>
                  <option value='Verdana'>Verdana</option>
                  <option value='Times New Roman'>Times New Roman</option>
                </Form.Select>
              </>
              {/* Look into window.computedsize and window.selection */}
              <Button
                className='navbar-buttons'
                onClick={(e) => this.applyStyleToEditor('fontsize', 7)}
                variant='outline-light'
              >+</Button>
              <Button
                className='navbar-buttons'
                onClick={() => this.applyStyleToEditor('fontsize', 1)}
                variant='outline-light'
              >-</Button>
              <Button
                className='navbar-buttons'
                onClick={() => this.applyStyleToEditor('bold')}
                variant='outline-light'
              >B</Button>
              <Button
                className='navbar-buttons'
                onClick={() => this.applyStyleToEditor('italic')}
                variant='outline-light'
              >I</Button>
              <Button
                className='navbar-buttons'
                onClick={() => this.applyStyleToEditor('underline')}
                variant='outline-light'
              >U</Button>
              <Button
                className='navbar-buttons'
                onClick={() => this.applyStyleToEditor('strikeThrough')}
                variant='outline-light'
              >S</Button>
              <Form.Select
                onChange={(e) =>
                  this.applyStyleToEditor('formatBlock', 'H' + e.target.value.slice(-1))}
                aria-label='different fonts'>
                <option value='Heading 6'>Heading 6</option>
                <option value='Heading 5'>Heading 5</option>
                <option value='Heading 4'>Heading 4</option>
                <option value='Heading 3'>Heading 3</option>
                <option value='Heading 2'>Heading 2</option>
                <option value='Heading 1'>Heading 1</option>
              </Form.Select>
              <Form.Floating>
                <Form.Control
                  onChange={(e) => this.applyStyleToEditor('backcolor', e.target.value)}
                  type='color'
                  id='colorInputBack'
                  title='BackColor'
                />
                <label htmlFor='floatingInputCustom'>BG</label>
              </Form.Floating>
            </Nav>
          </Container>
          <Navbar.Brand>
            Easy-Docs
          </Navbar.Brand>
        </Navbar>
        {
          this.state.showFilePicker &&
          <ImageFilePicker
            handleFilePickerClose={this.handleFilePickerClose}
          />
        }
        <br />
        <Navbar
          bg='light'
          fixed='bottom'>
          <Container >
            <Button
              className='undo-button navbar-buttons'
              size='lg'
              onClick={() => this.applyStyleToEditor('undo')}
              variant='link'
            ></Button>
            <Button
              className='redo-button navbar-buttons'
              size='lg'
              onClick={() => this.applyStyleToEditor('redo')}
              variant='link'
            ></Button>
            <Button
              className='la-button navbar-buttons'
              size='lg'
              onClick={() => this.applyStyleToEditor('justifyleft')}
              variant='link'
            ></Button>
            <Button
              className='ca-button navbar-buttons'
              size='lg'
              onClick={() => this.applyStyleToEditor('justifycenter')}
              variant='link'
            ></Button>
            <Button
              className='ra-button navbar-buttons'
              size='lg'
              onClick={() => this.applyStyleToEditor('justifyright')}
              variant='link'
            ></Button>
            <Button
              className='ol-button navbar-buttons'
              size='lg'
              onClick={() => this.applyStyleToEditor('insertorderedlist')}
              variant='link'
            ></Button>
            <Button
              className='ul-button navbar-buttons'
              size='lg'
              onClick={() => this.applyStyleToEditor('insertunorderedlist')}
              variant='link'
            ></Button>
            <Button
              className='indent-button navbar-buttons'
              size='lg'
              onClick={() => this.applyStyleToEditor('indent')}
              variant='link'
            ></Button>
            <Button
              className='outdent-button navbar-buttons'
              size='lg'
              onClick={() => this.applyStyleToEditor('outdent')}
              variant='link'
            ></Button>
            <Button
              className='style-button navbar-buttons'
              onClick={() => this.applyStyleToEditor('removeFormat')}
              variant='link'
            ></Button>
            <Button
              className='link-button navbar-buttons'
              onClick={() => {
                let link = prompt('enter the link');
                if (link && !(/^\s*$/.test(link))) {
                  this.applyStyleToEditor('createlink', 'https://' + link);
                }
              }}
              variant='link'
            ></Button>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default TopNavbar;
