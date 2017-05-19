import React from 'react';
import vendor from '../../../lib/vendor';
import ReactCoreImageUpload  from '../../../src/index';
import Highlight from 'react-highlight.js';

export default class CnCropImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: 'http://img1.vued.vanthink.cn/vued7553a09a5d5209ebd00a48264394b7f3.png',
      cropSrc: 'http://img1.vued.vanthink.cn/vued7553a09a5d5209ebd00a48264394b7f3.png',
      cropArgs: {
        toCropImgH: '?',
        toCropImgW: '?',
        toCropImgX: '?',
        toCropImgY: '?',
      },
    };
    this.cropLocalImageUploaded = this.cropLocalImageUploaded.bind(this);
    this.crpoServerImageUploaded = this.crpoServerImageUploaded.bind(this);
  }

  render() {
    return (
      <div className="components">
        <h3>裁剪图片</h3>
        <p>你可以通过设置 <code>crop</code>，来实现图片的裁剪。你可以指定图片裁剪的宽高，以及它的最大宽度和高度这些参数。</p>
        <p>设置 <code>cropRatio</code>来限制裁剪图片的形状，需要字符串的格式(1:1 或者2:3这种比例形式)，当然你可以设置为 auto 则不限制裁剪框的形状。</p>
        <p className="warnning"> 设置图片裁剪后，批量上传将不再生效。</p>
        <p>图片裁剪完有两种选择，选择<strong>本地裁剪<code>local</code></strong>或者<strong>服务端裁剪 <code>server</code></strong>。</p>
        <h4>本地裁剪</h4>
        <p>你可以将 crop 设置为 local 来实现本地裁剪。本地裁剪完成后发送给服务端接口的图片便是已经裁剪好的图片。</p>
        <div className="center">
          <div className="user">
              <img className="avatar" src={this.state.src}/>
          </div>
          <ReactCoreImageUpload
            className="btn btn-primary"
            imageUploaded={this.imageUploded}
            maxFileSize={5242880}
            crop="local"
            compress={50}
            url="http://101.198.151.190/api/upload.php" >
          </ReactCoreImageUpload>
        </div>
        <h4>服务端裁剪</h4>
        <p>服务端裁剪是指将原图片和裁剪的参数一起发给后端，方便服务端保存原图，以及对原图的其他操作，而服务端能够接收到post的参数如下:</p>
        <img src="http://img1.vued.vanthink.cn/vueda26e41f79edd6208ec92f6ce915e558a.png" />
        <p>每个字段具体说明如下:</p>
        <ul>
          <li><code>toCropImgX</code>: 裁剪的区域距离图片的左边缘的距离</li>
          <li><code>toCropImgY</code>: 裁剪的区域距离图片的上边缘的距离</li>
          <li><code>toCropImgW</code>: 裁剪的区域的宽度</li>
          <li><code>toCropImgH</code>: 裁剪的区域的高度</li>
          <li><code>maxWidth</code>: 你期望裁剪的图片的最大宽度</li>
          <li><code>maxHeight</code>: 你期望裁剪的图片的最大高度</li>
        </ul>
        <p>裁剪区域的样式，你可以自行复写样式进行覆盖</p>
        <h4>服务端裁剪DEMO</h4>
        <p>上传图片后可以看到裁剪的参数</p>
        <div className="center">
          <div className="user">
              <img className="avatar" src={this.state.cropSrc}/>
          </div>
          <ReactCoreImageUpload
            className="btn btn-primary"
            imageUploaded={this.crpoServerImageUploaded}
            maxFileSize={5242880}
            crop="server"
            url="http://101.198.151.190/api/crop.php" >
          </ReactCoreImageUpload>
        </div>
        <table className="m-table bordered" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>H</th>
              <th>W</th>
              <th>X</th>
              <th>Y</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.state.cropArgs.toCropImgH}</td>
              <td>{this.state.cropArgs.toCropImgW}</td>
              <td>{this.state.cropArgs.toCropImgX}</td>
              <td>{this.state.cropArgs.toCropImgY}</td>
            </tr>
          </tbody>
        </table>
        <p>Code Example</p>

        <p>设置<code>resize="server"</code>同理，会上传原图片，只是会在服务端的参数自动添加裁剪的比例 <code>imgChangeRatio</code>。</p>
        <a href="https://github.com/Vanthink-UED/vue-core-image-upload/blob/master/site/client/components/doc/cn/ResizeImage.vue">View Code Source</a>
      </div>
    );
  }

  cropLocalImageUploaded(res) {
    this.src = res.data.src;
  }

  crpoServerImageUploaded(res) {
    if (res.errcode === 0) {
      this.setState({
        cropArgs: {
          toCropImgH: parseInt(res.data.post.toCropImgH),
          toCropImgW: parseInt(res.data.post.toCropImgW),
          toCropImgX: parseInt(res.data.post.toCropImgX),
          toCropImgY: parseInt(res.data.post.toCropImgY)
        },
        cropSrc: 'http://img1.vued.vanthink.cn/vued41b900045d6d44f3b32e06049621b415.png',
      });

    }
  }

};
