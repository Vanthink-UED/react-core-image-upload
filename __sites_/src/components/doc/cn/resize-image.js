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
        <h3>调整图片</h3>
        <p>你可以设置 <code> resize </code> 来进行图片的缩放。 </p>
        <p>设置<code>resize="local"</code> 意味着图片的缩放将在本地进行。发给服务端的将会是大小调整完毕的后的图片。</p>
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

        <p>设置<code>resize="server"</code>同理，会上传原图片，只是会在服务端的参数自动添加裁剪的比例 <code>imgChangeRatio</code>。</p>
        <a  href="https://github.com/Vanthink-UED/vue-core-image-upload/blob/master/site/client/components/doc/cn/ResizeImage.vue">View Code Source</a>
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
