import React from 'react';
import ReactCoreImageUpload from '../../../src/index';
import Highlight from 'react-highlight';

export default class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: 'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png',
      step: 0,
    };
    this.imagechanged = this.imagechanged.bind(this);
    this.imageuploading = this.imageuploading.bind(this);
    this.imageuploaded = this.imageuploaded.bind(this);
  }

  render() {
    return (
      <div className="components">
        <h3>Custom Events</h3>
        <p>It defines different custom event in different upload progress. You can control the files flow via binding some functions.</p>
        <h5>imageuploaded</h5>
        <p>When image has been uploaded, it call the function you bind. You could recive response from server as an param</p>
        <h5>imagechanged</h5>
        <p>When input[file] velue has been changed, it call the function you bind. You could recive an file source param</p>
        <h5>imageuploading</h5>
        <p>When the image is uploading.</p>
        <h5>errorhandle</h5>
        <p>Whne you meet some error like network error or file size error.</p>
        <h5>Code Example</h5>
        <div className="center">
          <img className="avatar" src={this.state.src} />
        </div>
        <div className="center">
          <ReactCoreImageUpload
           text="Upload Your Image"
           className="btn btn-primary"
           inputOfFile="files"
           url="http://101.198.151.190/api/upload.php"
           imageUploaded={this.imageuploaded}
           imageChanged={this.imagechanged}
           imageUploading={this.imageuploading}
          >
         </ReactCoreImageUpload>
        </div>
        <div>
          <table className="m-table bordered">
            <thead>
              <tr>
                <th>Selected</th>
                <th>Uplaoding</th>
                <th>Finished</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span className={this.state.step > 0 ? 'circle-bar active': 'circle-bar'}></span>
                </td>
                <td><span className={this.state.step > 1 ? 'circle-bar active': 'circle-bar'}></span></td>
                <td><span className={this.state.step > 2 ? 'circle-bar active': 'circle-bar'}></span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>Code:</p>
        <Highlight language="js">
        {`<ReactCoreImageUpload
  text="Upload Your Image"
  className="btn btn-primary"
  inputOfFile="files"
  url="http://101.198.151.190/api/upload.php"
  imageUploaded={this.imageuploaded}
  imageChanged={this.imagechanged}
  imageUploading={this.imageuploading} />`}
        </Highlight>
        <a href="https://github.com/Vanthink-UED/vue-core-image-upload/blob/master/site/client/components/doc/cn/Events.vue">View Code</a>
      </div>
    );
  }

  imagechanged() {
    this.plus();
  }

  imageuploading() {
    this.plus();
  }

  imageuploaded() {
    this.plus();
  }

  plus() {
    this.setState({
      step: this.state.step += 1,
    });
  }

}
