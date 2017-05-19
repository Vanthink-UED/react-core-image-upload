import React from 'react';
import ReactCoreImageUpload from '../../../src/index';
import Highlight from 'react-highlight';

export default class PostData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        text: ''
      },
    };
    this.change = this.change.bind(this);
  }

  render() {
    return (
      <div className="components">
        <h3>Send Data to Server</h3>
        <p>Setting <code>data</code> attribute will send some data you bind to the server via ajax.
          Of course you could pass data to server via header, just pass data to <code>header</code>.  </p>
        <h4>Exmaple:</h4>
        <p>You could type some text here and its text will be sended to the server when you upload your image.</p>
        <div className="m-form">
          <input type="text" onChange={this.change} placeholder="input ..." className="form-control text" />
          <br/><br/>
          <ReactCoreImageUpload
           text="Upload Your Image"
           className="btn btn-primary"
           inputOfFile="files"
           data={this.state.data}
           url="http://101.198.151.190/api/upload.php"
           imageUploaded={this.imageuploaded}>
         </ReactCoreImageUpload>
        </div>
        <p>We could open chrome devtool to view http status when uploading image. Below is the result after uploading image successfully.</p>
        <p><img alt="send server shoot" width="480" src="http://img1.vued.vanthink.cn/vued6491e814a4b12bfcaecd628a6732beb0.png" /></p>
        <h4>Code Example</h4>
        <Highlight language>{
          `<ReactCoreImageUpload
   text="Upload Your Image"
   className="btn btn-primary"
   inputOfFile="files"
   data={this.state.data}
   url="http://101.198.151.190/api/upload.php"
   imageUploaded={this.imageuploaded}>
 </ReactCoreImageUpload>`
        }</Highlight>
        <p class="warnning">Set <code>isXhr</code> equal false to cancel default ajax uploading.</p>
        <a href="https://github.com/Vanthink-UED/vue-core-image-upload/blob/master/site/client/components/doc/en/PostData.vue">View Code</a>
      </div>
    );
  }

  imageuploaded(res) {
    if (res.errcode == 0) {
      this.setState({
        src: res.data.src,
      });
    }
  }

  change(e) {
    var val = e.target.value;
    if (val) {
      this.setState({
        data: {
          text: val,
        }
      })
    }
  }

};
