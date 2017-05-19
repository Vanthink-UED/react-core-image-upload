import React from 'react';
import vendor from '../../../lib/vendor';
import ReactCoreImageUpload  from '../../../src/index';
import Highlight from 'react-highlight.js';

export default class CnMultipleFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: 'http://img1.vued.vanthink.cn/vued7553a09a5d5209ebd00a48264394b7f3.png',
    };
    this.imageUploded = this.imageUploded.bind(this);
  }
  render() {
    return (
      <div className="components">
        <h3>Compress Image</h3>
        <p>Props <code>compress</code> means the quality of the image you want to compress via browser
    and then send the compressed image to the server. </p>
        <div className="center">
          <p><img width="300" src={this.state.src} /></p>
          <ReactCoreImageUpload
           text="Upload Your Image"
           className="btn btn-primary"
           inputOfFile="files"
           compress={50}
           data={{name: '你的名字'}}
           url="http://101.198.151.190/api/upload.php"
           imageUploaded={this.imageUploded}>
         </ReactCoreImageUpload>
        </div>
        <h4>代码示例</h4>
        <Highlight>{`<ReactCoreImageUpload
 text="Upload Your Image"
 className="btn btn-primary"
 inputOfFile="files"
 compress={50}
 data={{name: '你的名字'}}
 url="http://101.198.151.190/api/upload.php"
 imageUploaded={this.imageuploaded}>
</ReactCoreImageUpload>`}
        </Highlight>
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
