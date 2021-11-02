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
    };

    /**
     * Callback function to close the speech recognition modal box.
     */
    this.handleSpeechModalClose = () => {
      this.setState({ speechModalBoxShow: false });
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
  }

  /**
    * Callback function for the print button.
    */
  handlePrintButtonClick = () => {
    this.props.handlePrintButtonClick();
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
              <Form.Control type="text" placeholder="Untitled" />
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
                      className='option1'>
                      Drawing
                    </Dropdown.Item>
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
                  type="color"
                  id="exampleColorInput"
                  defaultValue="#000000"
                  title="Color"
                />
                <Form.Select aria-label="different fonts">
                  <option value="1">Arial</option>
                  <option value="2">Calibre</option>
                  <option value="3">Roboto</option>
                </Form.Select>
              </>
              {"  "}
              <Button variant="outline-light">+</Button>
              {"  "}
              <Button variant="outline-light">-</Button>
            </Nav>
          </Container>
          <Navbar.Brand>
            Easy-Docs
          </Navbar.Brand>
        </Navbar>
        {this.state.showFilePicker &&
          <ImageFilePicker />
        }
      </>
    );
  }
}

export default TopNavbar;
