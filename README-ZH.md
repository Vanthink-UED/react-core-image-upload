# react-core-image-upload

[![npm](https://img.shields.io/npm/v/react-core-image-upload.svg?maxAge=2592000)]()
![Node Version](https://img.shields.io/node/v/react-core-image-upload.svg "Node Version")
[![Build Status](https://travis-ci.org/Vanthink-UED/react-core-image-upload.svg?branch=master)](https://travis-ci.org/Vanthink-UED/react-core-image-upload)

<img src="./shots/react-core-image-upload.jpg" width="320" />

一款轻量级的图片上传裁剪组件

[English Doc]('./README.md')


### 快速开始
使用 npm
```bash
npm install react-core-image-upload --save
```

使用 yarn
``` bash
yarn add react-core-image-upload
```

### 使用ES6 进行开发
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
          class={['pure-button', 'pure-button-primary', 'js-btn-crop']} 
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



### 运行DEMO
``` bash
yarn run start
```
[http://localhost:9000/webpack-dev-server/demo/index.html](http://localhost:9000/webpack-dev-server/demo/index.html)

[Demo Online](http://vanthink-ued.github.io/react-core-image-upload/upload.html)

### 配置属性

| Props        | Type         | Example  | Description  |
| ------------- |:----------| ---------|--------------|
| url     | String | '/crop.php' | 服务端上传的地址 |
| text      | String      |  'Upload Image' | 你需要显示按钮的文本 |
| inputOfFile | String     |   'file' | 	上传服务端对应表单 name |
| extensions | String   |    'png,jpg,gif' | 限制的图片类型 |
| crop | Boolean   |   true | 是否需要裁剪 |
| cropRatio | String   |   '1:1' | 限制裁剪的形状|
| cropBtn | Object   |   {ok:'Save','cancel':'Give Up'} |按钮文本|
| maxFileSize | Number   |   10485760(10M) | 文件大小限制|
| maxWidth | Number   |   150 | 限制裁剪图片的最大宽度|
| maxheight | Number   |   150 | 限制裁剪图片的最大高度|
| inputAccept | string   |  'image/*' / 'image/jpg,image/jpeg,image/png' | 赋予上传file的接受类型|
| isXhr | Boolean  | true  |  是否需要调用系统内自己的上传功能 
| headers | Object  | {auth: xxxxx}  |  设置xhr上传 的header

### image uploading callback

+ `imageUploaded`:  当图片上传成功后的响应处理
+ `imageChanged`: 当选择图片后
+ `imageUploading` 图片上传过程中
+ `errorHandle`图片上传中的异常处理


[Demo](http://vanthink-ued.github.io/react-core-image-upload/upload.html)

[Demo Source](https://github.com/Vanthink-UED/react-core-image-upload/blob/master/src/components/contents.js)


### 发给服务端的裁剪参数

If you crop a image , your crop will send a request to your server with some crop arguments;

                        
<img src="./shots/vuedba0ed377b88fc84d51026310efcb255b.png" />

参数如上图。

如果你需要自定义裁剪弹窗的的样式，你可以自己写css进行覆盖

### MIT Liscense 