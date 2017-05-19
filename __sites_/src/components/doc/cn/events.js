import React from 'react';
import ReactCoreImageUpload from '../../../src/index';
import Highlight from 'react-highlight';

export default class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: 'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png',
      step: 0,
    };
    this.imagechanged = this.imagechanged.bind(this);
    this.imageuploading = this.imageuploading.bind(this);
    this.imageuploaded = this.imageuploaded.bind(this);
  }

  render() {
    return (
      <div className="components">
        <h3>响应事件</h3>
        <p>我们在上传的不同阶段指定了不同的派发事件，你可以绑定每个事件的响应方法，实现对于流程的控制。</p>
        <h5>imageuploaded</h5>
        <p>当图片上传完，会调用该事件绑定的函数，并且用户可以获取到服务端返回的数据。</p>
        <h5>imagechanged</h5>
        <p>当input框改变选择图片时候触发，会返回input的获取的图片数据</p>
        <h5>imageuploading</h5>
        <p>当图片上传过程中触发，你可以自定义你需要处理的内容比如显示加载动画等。</p>
        <h5>errorhandle</h5>
        <p>当图片上传发生错误的时候触发，会返回错误状态信息</p>
        <h5>Code Example</h5>
        <div className="center">
          <img className="avatar" src={this.state.src} />
        </div>
        <div className="center">
          <ReactCoreImageUpload
           text="Upload Your Image"
           className="btn btn-primary"
           inputOfFile="files"
           url="http://101.198.151.190/api/upload.php"
           imageUploaded={this.imageuploaded}
           imageChanged={this.imagechanged}
           imageUploading={this.imageuploading}
          >
         </ReactCoreImageUpload>
        </div>
        <div>
          <table className="m-table bordered">
            <thead>
              <tr>
                <th>图片选中</th>
                <th>图片上传</th>
                <th>图片完成</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span className={this.state.step > 0 ? 'circle-bar active': 'circle-bar'}></span>
                </td>
                <td><span className={this.state.step > 1 ? 'circle-bar active': 'circle-bar'}></span></td>
                <td><span className={this.state.step > 2 ? 'circle-bar active': 'circle-bar'}></span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>上面的演示，表示了上传自定义事件的执行状况，参考代码如下：</p>
        <Highlight language="js">
        {`<ReactCoreImageUpload
  text="Upload Your Image"
  className="btn btn-primary"
  inputOfFile="files"
  url="http://101.198.151.190/api/upload.php"
  imageUploaded={this.imageuploaded}
  imageChanged={this.imagechanged}
  imageUploading={this.imageuploading} />`}
        </Highlight>
        <a href="https://github.com/Vanthink-UED/vue-core-image-upload/blob/master/site/client/components/doc/cn/Events.vue">完整代码</a>
      </div>
    );
  }

  imagechanged() {
    this.plus();
  }

  imageuploading() {
    this.plus();
  }

  imageuploaded() {
    this.plus();
  }

  plus() {
    this.setState({
      step: this.state.step += 1,
    });
  }

}
