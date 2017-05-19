import React from 'react';

export default class Others extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="components">
        <h3>Feedback</h3>
        <p>You could find some solution from  <a href="https://github.com/Vanthink-UED/vue-core-image-upload/issues">Github issue</a>.</p>
        <p>If you need help when you meet some trouble, it is free to contac with me via email:<a href="mailTO:kakashjack@gmail.com">kakashjack@gmail.com</a></p>
        <p>WeChat: </p>
        <img alt="wechat" src="http://img1.vued.vanthink.cn/vuedb61e15192e3c4a1eb41f414871dd6716.png" width="285" />
        <p>Facebook Messager: </p>
        <img alt="Facebook Messager" src="http://img1.vued.vanthink.cn/vued2c22e82e19a7bb396938a496785c2ff4.jpeg" width="285" />
      </div>
    );
  }

}
