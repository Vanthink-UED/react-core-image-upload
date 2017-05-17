import React from 'react';


export default class Ft extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ft">
        <div className="icon-list">
          <a href="https://vanthink-ued.github.io/jquery.core.image.upload/upload.html" aria-label="jQuery" className="hint--bottom">
            <img src="http://img1.vued.vanthink.cn/vued9eb928047ca3079de94f25e873ec4bd8.png" width="60" />
          </a>
          <a href="https://vanthink-ued.github.io/angular-core-image-upload/upload.html" aria-label="Comming Soon" className="hint--bottom">
            <img src="http://img1.vued.vanthink.cn/vuedce20ceee3ed7b3bdcca3c3791c5c016a.png" width="60" alt="" />
          </a>
          <a href="https://vanthink-ued.github.io/vue-core-image-upload/index.html" className="hint--bottom">
            <img src="http://img1.vued.vanthink.cn/vued2ab876123c7eeb5afd09c06dd4610451.png" width="60" />
          </a>
          <a href="https://vanthink-ued.github.io/react-core-image-upload/index.html" className="hint--bottom">
            <img src="http://img1.vued.vanthink.cn/vued7cecc028b8b640e58157bf4f2dd17184.png" width="60" />
          </a>
        </div>
        <p className="other-info">All Rights Reserved By Vanthink-UED</p>
        <p className="lang-list">
          <a href="javascript:;" title="中文文档" className="{this.state.lan == 'cn' ? 'active' : ''}" onclick="changeCn"> 🇨🇳 Chinese </a>
          <a href="javascript:;" title="View Enlish Document" className="{this.state.lan == 'en' ? 'active' : ''}"  onclick="changeEn"> 🇺🇸 English </a>
        </p>
    </div>
    );
  }
};
