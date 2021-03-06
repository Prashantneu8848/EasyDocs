import React from 'react';
import Button from 'react-bootstrap/Button'
import GooglePicker from 'react-google-picker';
import Dropdown from 'react-bootstrap/Dropdown';

/**
 * File picker to select items from Google Drive.
 */
class GoogleDrivePicker extends React.Component {
  /**
   * @constructor
   * @param {Object}  props for React component.
   */
  constructor(props) {
    super(props);
    this.state = {
      AUTH_TOKEN: ""
    };
  }

  /**
   * Opens a new window to preview the image.
   * 
   * @param {data} fileId for the image. 
   */
  previewImage(data) {
    let url = "https://drive.google.com/uc?export=view&id=" + data
    window.open(url, '_blank').focus();
  }

  /**
   * Inserts the image in the text editor.
   * 
   * @param {data} fileId for the image. 
   */
  insertImage(data) {
    let url = "https://drive.google.com/uc?export=view&id=" + data
    let elem = document.createElement("img")
    elem.setAttribute("src", url);
    document.getElementsByClassName("text-editor")[0].appendChild(elem);
  }
  /**
   * Renders navigation bar at the top of the webpage.
   *  @return { React.ReactNode } React virtual DOM.
   */
  render() {
    const APP_ID = process.env.REACT_APP_APP_ID;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    const scopes = [
      "https://www.googleapis.com/auth/drive.readonly",
      "https://www.googleapis.com/auth/drive.photos.readonly"
    ];
    return (
      <div className="picker">
        <GooglePicker
          clientId={CLIENT_ID}
          developerKey={API_KEY}
          scope={scopes}
          onChange={data => console.log('on change:', data)}
          onAuthenticate={token => {
            this.setState({ AUTH_TOKEN: token });
          }}
          onAuthFailed={data => console.log('on auth failed:', data)}
          navHidden={true}
          mimeTypes={["image/png", "image/jpeg", "image/jpg"]}
          createPicker={(google, oauthToken) => {
            const picker = new google.picker.PickerBuilder()
              .addView(new google.picker.View(google.picker.ViewId.DOCS_IMAGES))
              .addView(new google.picker.DocsUploadView())
              .setOAuthToken(oauthToken)
              .setDeveloperKey(API_KEY)
              .setAppId(APP_ID)
              .setCallback((data) => {
                if (data.action === google.picker.Action.PICKED) {
                  this.insertImage(data.docs[0].id)
                }
              })
              .enableFeature(google.picker.Feature.NAV_HIDDEN)
              .enableFeature(google.picker.Feature.MULTISELECT_ENABLED);

            picker.build().setVisible(true);
          }}
        >
          <Dropdown.Item
            className='dropdowns'>
            Google
          </Dropdown.Item>
        </GooglePicker>
      </div>
    )
  }
}

export default GoogleDrivePicker;