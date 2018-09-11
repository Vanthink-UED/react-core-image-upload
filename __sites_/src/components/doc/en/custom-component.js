import React from 'react';
import vendor from '../../../lib/vendor';
import ReactCoreImageUpload  from '../../../../../src/index';
import Highlight from 'react-highlight.js';

export default class CustomComponent extends React.Component {
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
        <h3>Custom Component</h3>
       <p><code>class</code> will be bind to the component and you can include any child component.</p>
       <h4>Demo</h4>
       <p>This is a image upload button.</p>
        <p className="user center">
          <img alt="avatar" className="avatar" src={this.state.src} />
        </p>
        <div className="center">
        <ReactCoreImageUpload
          className="btn"
          imageUploaded={this.imageUploded}
          maxFileSize={5242880}
          multiple={true}
          multipleSize={4}
          url="http://101.198.151.190/api/upload2.php" >
          <img alt="" width="150" src="http://img1.vued.vanthink.cn/vuededa653aa59d1a1287d9a6e18890a7e51.png" />
        </ReactCoreImageUpload>
        </div>
        <p>Code Example</p>
        <Highlight language="js">
        {`<ReactCoreImageUpload
  className="btn"
  imageUploaded={this.imageUploded}
  maxFileSize={5242880}
  multiple={true}
  multipleSize={4}
  url="http://101.198.151.190/api/upload2.php" >
  <img alt="" width="150" src="http://img1.vued.vanthink.cn/vuededa653aa59d1a1287d9a6e18890a7e51.png" />
</ReactCoreImageUpload>`}
        </Highlight>
      </div>
    );
  }

  imageUploded(res) {
    if (res.errcode === 0) {
      this.setState({
        fileList: res.data,
      });
    }
  }

};
