import React from 'react';
import vendor from '../../../lib/vendor';
import ReactCoreImageUpload  from '../../../src/index';
import Highlight from 'react-highlight.js';

export default class CnMultipleFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
    };
    this.imageUploded = this.imageUploded.bind(this);
  }

  render() {
    const trs = [];
    console.log(this.state.fileList);
    for(let i = 0; i < this.state.fileList.length; i++) {
      const item = this.state.fileList[i];

      trs.push(
        <tr key={item.name}>
          <td>{item.name}</td>
          <td>{item.size}</td>
        </tr>
      );
    }

    return (
      <div className="components">
        <h3>上传多个文件</h3>
        <h4>multiple</h4>
        <p>你可以使用 <code>multiple</code> 属性设置为true来实现多文件的上传。需要注意的是，你设置了该属性后,服务端收到文件上传的字段数据会是一个数组。</p>
        <h4>multiple-size</h4>
        <p>你可以使用<code>multiple-size</code>来限制图片的数量，你可以限制上传文件的数量。</p>
        <h4>演示</h4>
        <div className="center">
          <ReactCoreImageUpload
            className="btn btn-primary"
            imageUploaded={this.imageUploded}
            maxFileSize={5242880}
            multiple={true}
            multipleSize={4}
            url="http://101.198.151.190/api/upload2.php" >
          </ReactCoreImageUpload>
        </div>
        <table className="m-table bordered">
          <thead>
            <tr>
              <th>文件名称</th>
              <th>文件大小</th>
            </tr>
          </thead>
          <tbody>
            {trs}
          </tbody>
        </table>
        <p>点击上传按钮，可以选择多张图片，然后在表格中可以看到上传的图片名称和图片大小。</p>
        <h4>Code Example</h4>
        <Highlight language="js">{`<ReactCoreImageUpload
  className="btn btn-primary"
  crop="false"
  imageUploaded="imageUploded"
  maxFileSize={5242880}
  multiple="true"
  multipleSize={4}
  url="http://101.198.151.190/api/upload2.php" >
</ReactCoreImageUpload>`}
      </Highlight>
      <a href="https://github.com/Vanthink-UED/vue-core-image-upload/blob/master/site/client/components/doc/cn/MultipleFile.vue">查看完整源码</a>
      </div>
    );
  }

  imageUploded(res) {
    if (res.errcode === 0) {
      this.setState({
        fileList: res.data,
      });
    }
  }

};
