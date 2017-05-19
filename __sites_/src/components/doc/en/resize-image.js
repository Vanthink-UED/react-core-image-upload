import React from 'react';
import vendor from '../../../lib/vendor';
import ReactCoreImageUpload  from '../../../src/index';
import Highlight from 'react-highlight.js';

export default class CnResizeImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: 'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png',
    };
    this.imageUploded = this.imageUploded.bind(this);
  }

  render() {
    return (
      <div className="components">
        <h3>Resize</h3>
        <p>Set <code> resize </code> props to help you to resize the imagey you want to upload. </p>
        <p><code>resize="local"</code> means you can resize image in local browser via canvas and it will send server the resized image.</p>
        <div className="center">
          <div className="user">
              <img className="avatar" src={this.state.src}/>
          </div>
          <ReactCoreImageUpload
            className="btn btn-primary"
            imageUploaded={this.imageUploded}
            maxFileSize={5242880}
            resize="local"
            url="http://101.198.151.190/api/upload.php" >
          </ReactCoreImageUpload>
        </div>
        <p>Code Example</p>

        <p><code>resize="server"</code> means it will send the original image you upload，and it will send the server with data params <code>imgChangeRatio</code>.</p>
        <a href="https://github.com/Vanthink-UED/vue-core-image-upload/blob/master/site/client/components/doc/cn/ResizeImage.vue">View Code Source</a>
      </div>
    );
  }

  imageUploded(res) {
    if (res.errcode === 0) {
      this.setState({
        src: res.data.src,
      });
    }
  }

};
