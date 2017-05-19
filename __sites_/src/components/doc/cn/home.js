import React from 'react';
import vendor from '../../../lib/vendor';

export default class CnHome extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="components c-home">
        <p className="center">
          <img src="http://img1.vued.vanthink.cn/vuedb0c434fffc3c4ac840661ea7e0efe0f7.png" alt="react-core-image-upload" />
        </p>
        <p className="btn-wrap center">
          <a className="btn btn-primary btn-go-started" href="#/cn/get-started">快速开始</a>
        </p>
        <p className="center"><a href="./index.html" onClick={this.goToEnglishDoc} title="View English Document">English Document</a></p>
        <p><strong>react-core-image-upload</strong> 是一款轻量级的 react.js 上传插件，它可以支持的图片的上传，裁剪，压缩。它同样也支持在移动端的图片处理，它定义了诸多上传周期，你可以自由的进行流程控制。</p>
      </div>
    );
  }

  goToEnglishDoc() {
    vendor.setLocalData('lan', 'en');
    window.lan = 'en';
    location.href = './index.html#/en/home';
    location.reload();
  }

};
