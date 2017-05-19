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
        <h3>向服务端发送数据</h3>
        <p>你可以设置<code>data</code> 来将一些附带的数据发送给服务端。
          当然你也可以将一些数据包含在 header 中传递过去，你只需要绑定到 <code>header</code>即可。</p>
        <h4>Exmaple:</h4>
        <p>下面会将输入框的内容一并发送过去</p>
        <div className="m-form">
          <input type="text" onChange={this.change} placeholder="输入一些内容吧" className="form-control text" />
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
        <p>上传的过程中我们可以打开devtool查看请求，可以看到发送数据中带上了一个新的 text 字段，也就是文本框内容。</p>
        <p><img width="480" src="http://img1.vued.vanthink.cn/vued6491e814a4b12bfcaecd628a6732beb0.png" /></p>
        <h4>Code Example</h4>
        <p className="warnning">你可以设置 <code>isXhr</code> 来取消向服务端上传。</p>
        <a href="https://github.com/Vanthink-UED/vue-core-image-upload/blob/master/site/client/components/doc/en/PostData.vue">查看源码</a>
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
