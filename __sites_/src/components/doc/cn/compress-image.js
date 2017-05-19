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
        <h3>压缩图片</h3>
        <p>设置<code>compress</code>的数值，你可以在上传之前进行图片的本地压缩。其中 compress 为 0 表示不压缩，数据越大，图片的质量越差，且最大值不能大于100。</p>
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
