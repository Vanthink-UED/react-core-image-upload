import React from 'react';
import vendor from '../../../lib/vendor';

export default class EnHome extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="components c-home">
        <p className="center">
          <img src="http://img1.vued.vanthink.cn/vuedd7432dee5fe174ac48ad8190b85b79d5.png" alt="vue core image upload" />
        </p>
        <p className="btn-wrap center">
          <a className="btn btn-primary btn-go-started" href="#/en/get-started">Get Started</a>
        </p>
        <p className="center"><a href="./index.html" onClick={this.goToChineseDoc} title="View Chinese Document">Chinese Document</a></p>
        <p><strong>react-core-image-upload</strong> is a lightweight plugin for developers to upload and crop images. There is also a good experience on mobile devices. We has define different type events for developers and they can control the file flow and do more thing they want. </p>

      </div>
    );
  }

  goToChineseDoc() {
    vendor.setLocalData('lan', 'cn');
    window.lan = 'cn';
    location.href = './index.html#/cn/home';
    location.reload();
  }


};
