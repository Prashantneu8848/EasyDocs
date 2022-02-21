import React from 'react';
import { Container } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SpeechRecognition from './SpeechRecognition';
import ImageFilePicker from './ImageFilePicker';
import GoogleDrivePicker from './GoogleDrivePicker';
import FreeDraw from './FreeDraw';

/**
 * stuffs to do:
 * 1. saving the stuffs locally in the browser so the stuffs are still there when the user refreshes the browser.
 * 2. fix image
 * 4. Version control
 * 5. add indentation
 * 6. delete indentation
 * 7. remove styling
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
    };

    /**
     * Callback function to close the speech recognition modal box.
     */
    this.handleSpeechModalClose = () => {
      this.setState({ speechModalBoxShow: false });
    };

    /**
     * Callback function to close the free drawing modal box.
     */
    this.handleDrawinghModalClose = () => {
      this.setState({ drawinghModalBoxShow: false });
    };

    /**
     * Calls the {@code SpeechToTextServlet} and converts speech to text.
     */
    this.convertSpeechToText = () => {
      this.setState({ speechModalBoxShow: true })
      fetch('/speechtotext')
        .then((response) => response.text())
        .then((text) => {
          console.log(text);
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
    * Applies styling to the selected text.
    * @param {String} command to apply to the text.
    * @param {Object} value to apply with the command.
    */
  applyStyleToEditor = (command, value) => {
    if (command in ['forecolor', 'fontname', 'justifyleft', 'justifyright', 'justifycenter', 'backcolor', 'insertunorderedlist', 'insertorderedlist']) {
      document.execCommand('styleWithCSS', false, true);
      if (command === 'forecolor') {
        document.execCommand('foreColor', false, value);
      } else if (command === 'insertorderedlist') {
        document.execCommand('insertorderedlist', false, value);
      } else if (command === 'insertorderedlist') {
        document.execCommand('insertorderedlist', false, value);
      } else if (command === 'insertunorderedlist') {
        document.execCommand('insertunorderedlist', false, value);
      } else if (command === 'backcolor') {
        document.execCommand('backcolor', false, value);
      } else if (command === 'fontname') {
        document.execCommand('fontname', false, value);
      } else if (command === 'justifyleft') {
        document.execCommand('justifyleft', false, value)
      } else if (command === 'justifyright') {
        document.execCommand('justifyright', false, value)
      } else if (command === 'justifycenter') {
        document.execCommand('justifycenter', false, value)
      }
    }
    document.execCommand('styleWithCSS', false, false);
    document.execCommand(command, false, value);
  }

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
                type="text"
                htmlSize="10"
                placeholder="Untitled" />
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
                  type="color"
                  id="colorInput"
                  title="Color"
                />
                <Form.Select
                  onChange={(e) => this.applyStyleToEditor('fontname', e.target.value)}
                  aria-label="different fonts">
                  <option value="Arial">Arial</option>
                  <option value="Calibre">Calibre</option>
                  <option value="Arial Black">Arial Black</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Courier New">Courier New</option>
                  <option value="Tahoma">Tahoma</option>
                  <option value="Monaco">Monaco</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Luminari">Luminari</option>
                  <option value="Verdana">Verdana</option>
                  <option value="Times New Roman">Times New Roman</option>
                </Form.Select>
              </>
              {/* Look into window.computedsize and window.selection */}
              <Button
                className='navbar-buttons'
                onClick={(e) => this.applyStyleToEditor('fontsize', 7)}
                variant="outline-light"
              >+</Button>
              <Button
                className='navbar-buttons'
                onClick={() => this.applyStyleToEditor('fontsize', 1)}
                variant="outline-light"
              >-</Button>
              <Button
                className='navbar-buttons'
                onClick={() => this.applyStyleToEditor('bold')}
                variant="outline-light"
              >B</Button>
              <Button
                className='navbar-buttons'
                onClick={() => this.applyStyleToEditor('italic')}
                variant="outline-light"
              >I</Button>
              <Button
                className='navbar-buttons'
                onClick={() => this.applyStyleToEditor('underline')}
                variant="outline-light"
              >U</Button>
              <Form.Control
                // as='input'
                value='11'
                type='number'
                htmlSize="10"
                onChange={(e) => console.log(e.target.value)}
              />
              <Form.Floating>
                <Form.Control
                  onChange={(e) => this.applyStyleToEditor('backcolor', e.target.value)}
                  type="color"
                  id="colorInputBack"
                  title="BackColor"
                />
                <label htmlFor="floatingInputCustom">BG</label>
              </Form.Floating>
            </Nav>
          </Container>
          <Navbar.Brand>
            Easy-Docs
          </Navbar.Brand>
        </Navbar>
        {this.state.showFilePicker &&
          <ImageFilePicker />
        }
        <br />
        <Navbar bg="dark" variant="light" fixed='bottom'>
          <Container>
            <Button
              className='navbar-buttons'
              onClick={() => this.applyStyleToEditor('undo')}
              variant="outline-light"
            >U</Button>
            <Button
              className='navbar-buttons'
              onClick={() => this.applyStyleToEditor('redo')}
              variant="outline-light"
            >R</Button>
            <Button
              className='navbar-buttons'
              onClick={() => this.applyStyleToEditor('justifyleft')}
              variant="outline-light"
            >LA</Button>
            <Button
              className='navbar-buttons'
              onClick={() => this.applyStyleToEditor('justifycenter')}
              variant="outline-light"
            >CA</Button>
            <Button
              className='navbar-buttons'
              onClick={() => this.applyStyleToEditor('justifyright')}
              variant="outline-light"
            >RA</Button>
            <Button
              className='navbar-buttons'
              onClick={() => this.applyStyleToEditor('insertorderedlist')}
              variant="outline-light"
            >OL</Button>
            <Button
              className='navbar-buttons'
              onClick={() => this.applyStyleToEditor('insertunorderedlist')}
              variant="outline-light"
            >UL</Button>
            <Button
              className='navbar-buttons'
              // bsPrefix='link-button'
              onClick={() => {
                let link = prompt("enter the link");
                if (link && !(/^\s*$/.test(link))) {
                  console.log(link);
                  this.applyStyleToEditor('createlink', "https://" + link);
                }
              }}
              variant="outline-light"
            >Link</Button>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default TopNavbar;
