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
        <h3>Crop Image</h3>
        <p>Set <code>crop</code> value to help you crop the image. </p>
        <p className="warnning"> if you setted the crop props, you can not upload multiple files.</p>
        <p><code>cropRatio</code> can be setted for diffrent crop shape.But it must be a string like '2:3' or '1:1'. If you set it to 'auto', users can crop any shape images.</p>
        <p>You have two values to select，<strong>local crop:<code>local</code></strong>or<strong>server-side crop: <code>server</code></strong>.</p>
        <h4>Local Crop</h4>
        <p><code>crop="local"</code> The Browser will crop the image via canvas API and send the cropped image to the server.</p>
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
            url="http://101.198.151.190/api/upload.php">
          </ReactCoreImageUpload>
        </div>
        <h4>Server-side crop</h4>
        <p><code>crop="server"</code>  means the bwowser will send the original image to the server and post the cropped data below to the server:</p>
        <img width="480" src="http://img1.vued.vanthink.cn/vuedbb5d2173fa90af576b66f7077a87bfdb.jpeg" />
        <p>Each filed introduce:</p>
        <ul>
          <li><code>toCropImgX</code>: The x-axis distance between the crop area and the image</li>
          <li><code>toCropImgY</code>: The y-axis distance between the crop area and the image</li>
          <li><code>toCropImgW</code>: The width of crop area</li>
          <li><code>toCropImgH</code>: The height of crop area</li>
          <li><code>maxWidth</code>: The maximum width of the crop image</li>
          <li><code>maxHeight</code>: The maximum height of the crop image</li>
        </ul>
       <h4>Code example</h4>
       <p>Click button to upload and you can view some post params.</p>
        <div className="center">
          <div className="user">
            <img alt="avatar" className="avatar" src={this.state.cropSrc} />
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
        <Highlight language="javascript">{`<ReactCoreImageUpload
  className="btn btn-primary"
  imageUploaded={this.crpoServerImageUploaded}
  maxFileSize={5242880}
  crop="server"
  url="http://101.198.151.190/api/crop.php" >
</ReactCoreImageUpload>`}</Highlight>
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
