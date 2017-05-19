import React from 'react';
import ReactCoreImageUpload from '../../../src/index';
import Highlight from 'react-highlight';

export default class GetStarted extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: 'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png',
    };
    this.imageuploaded = this.imageuploaded.bind(this);
  }

  render() {
    return (
      <div className="components">
        <h3>快速开始</h3>
        <p>使用 npm 安装依赖</p>
        <pre><code className="bash">npm install react-core-image-upload --save</code></pre>
        <p>安装完成后，编辑源码</p>
        <Highlight className="javascript">
        {`import React from 'react';
import ReactCoreImageUpload  from 'react-core-image-upload';

export default class GetStarted extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: 'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png',
    };
    this.imageuploaded = this.imageuploaded.bind(this);
  }

  redner() {
    return(
      <div>
        <p className="user center">
          <img className="avatar" src={this.state.src} />
        </p>
        <div className="center">
          <ReactCoreImageUpload
           text="Upload Your Image"
           className="btn btn-primary"
           inputOfFile="files"
           url="http://101.198.151.190/api/upload.php"
           imageUploaded={this.imageuploaded}>
         </ReactCoreImageUpload>
        </div>
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
}`
        }
      </Highlight>
      <h5>Code Example</h5>
       <p className="user center">
         <img className="avatar" src={this.state.src} />
       </p>
       <div className="center">
         <ReactCoreImageUpload
          text="Upload Your Image"
          className="btn btn-primary"
          inputOfFile="files"
          url="http://101.198.151.190/api/upload.php"
          imageUploaded={this.imageuploaded}>
        </ReactCoreImageUpload>
       </div>
        <p>如果我们要使用上传插件，我们首先需要引入我们的组件然后并在<code>components</code>中声明。
          实现上传，我们需要定义我们上传的服务器地址<code>url</code>，然后我们需要指定上传完成后触发的方法，也就是<code>imageUploaded</code>，这样我们才能获取上传完后的数据，从而进行下一步的操作。
        </p>
        <p><a className="btn btn-info" href="#/cn/attributes">查看详细文档</a></p>
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

};
