# react-core-image-upload

[![npm](https://img.shields.io/npm/v/react-core-image-upload.svg?maxAge=2592000)]()
![Node Version](https://img.shields.io/node/v/react-core-image-upload.svg "Node Version")
[![Build Status](https://travis-ci.org/Vanthink-UED/react-core-image-upload.svg?branch=master)](https://travis-ci.org/Vanthink-UED/react-core-image-upload)

<img src="http://img1.vued.vanthink.cn/vued4196249d82e15d09c66af279cc1818eb.jpeg" width="320" />

A component for image to upload and crop

[Document](http://vanthink-ued.github.io/react-core-image-upload/index.html#/en/home)

[中文文档](http://vanthink-ued.github.io/react-core-image-upload/index.html#/cn/home)


### Install
Use Npm
```bash
npm install react-core-image-upload --save
```

Use yarn
``` bash
yarn add react-core-image-upload
```

### How to use
``` js
import React from 'react';
import ReactCoreImageUpload  from 'react-core-image-upload';
let App = React.createClass({
//...

  render() {
    return(
      <div>
        <ReactCoreImageUpload
          text="Upload Your Image"
          className='pure-button'
          inputOfFile="files"
          url="./api/upload.php"
          imageUploaded={this.handleRes}>
        </ReactCoreImageUpload>
      </div>
    );
  },

  handleRes(res) {
    this.setState({
      // handle response
    })
  }
})

```


### Run demo
``` bash
cd __sites_ && npm run start
```

[http://localhost:9000/webpack-dev-server/demo/index.html](http://localhost:9000/webpack-dev-server/demo/index.html)

[Demos](http://vanthink-ued.github.io/react-core-image-upload/index.html)

### Props
<table class="m-table bordered">
  <thead>
    <tr>
      <th>Props</th>
      <th align="left">Data Type</th>
      <th>Example</th>
      <th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>url</td>
      <td align="left">String</td>
      <td>'/crop.php'</td>
      <td>Your server api</td>
    </tr>
    <tr>
      <td>text</td>
      <td align="left">String</td>
      <td>'Upload Image'</td>
      <td>The text of your uploading button</td>
    </tr>
    <tr>
      <td>inputOfFile</td>
      <td align="left">String &nbsp; &nbsp;</td>
      <td>&nbsp; 'file'</td>
      <td>Yout input[file] name</td>
    </tr>
    <tr>
      <td>extensions</td>
      <td align="left">String</td>
      <td>'png,jpg,gif'</td>
      <td>Limit the image type</td>
    </tr>
    <tr>
      <td>crop</td>
      <td align="left">Boolean</td>
      <td>'server'</td>
      <td>Crop image option</td>
    </tr>
    <tr>
      <td>cropRatio</td>
      <td align="left">String</td>
      <td>'1:1'</td>
      <td>The cropped image shape(set 'auto' not limit the crop shape)</td>
    </tr>
    <tr>
      <td>cropBtn</td>
      <td align="left">Object</td>
      <td>{ok:'Save','cancel':'Give Up'}</td>
      <td>The Text of cropping button text</td>
    </tr>
    <tr>
      <td>maxFileSize</td>
      <td align="left">Number</td>
      <td>10485760(10M)</td>
      <td>Limit the size of the file</td>
    </tr>
    <tr>
      <td>maxWidth</td>
      <td align="left">Number</td>
      <td>150</td>
      <td>The maximum width of cropped image </td>
    </tr>
    <tr>
      <td>maxheight</td>
      <td align="left">Number</td>
      <td>150</td>
      <td>限制图片的最大高度</td>
    </tr>
    <tr>
      <td>inputAccept</td>
      <td align="left">string</td>
      <td>'image/*' / 'image/jpg,image/jpeg,image/png'</td>
      <td>the input[file] accept</td>
    </tr>
    <tr>
      <td>compress</td>
      <td align="left">Number</td>
      <td>50</td>
      <td>Set the quality of compressed image</td>
    </tr>
    <tr>
      <td>isXhr</td>
      <td align="left">Boolean</td>
      <td>true</td>
      <td>IF cancel ajax uploading</td>
    </tr>
    <tr>
      <td>headers</td>
      <td align="left">Object</td>
      <td>{auth: xxxxx}</td>
      <td>Set customed header when ajax uploading</td>
    </tr>
    <tr>
      <td>data</td>
      <td align="left">Object</td>
      <td>{auth: xxxxx}</td>
      <td>Set customed data when ajax posting server</td>
    </tr>
  </tbody>
</table>

### Events

+ `imageUploaded`:  when you finish your image uploading
+ `imageChanged`: when the input file has changed
+ `imageUploading` when your image is uploading
+ `errorHandle` when image uploading meet some error


[Demo](http://vanthink-ued.github.io/react-core-image-upload/upload.html)

[Demo Source](https://github.com/Vanthink-UED/react-core-image-upload/blob/master/src/components/contents.js)


### Contributions

Your contributions and suggestions are welcome 😄😄😄💐💐💐
