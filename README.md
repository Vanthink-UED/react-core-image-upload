# react-core-image-upload

[![npm](https://img.shields.io/npm/v/react-core-image-upload.svg?maxAge=2592000)]()
![Node Version](https://img.shields.io/node/v/react-core-image-upload.svg "Node Version")

<img src="./shots/REACT-CORE-IMAGE-UPLOAD-LOGO.png" height="180"/>

A component for image to upload and crop


### Install
Use Npm
```bash
npm install react-core-image-upload --save-dev
```

Use yarn
``` bash
yarn add react-core-image-upload
```

Code Example(ES6)
``` js
import React from 'react';
import ReactCoreImageUpload  from '../react-core-image-upload';
let App = React.createClass({ 
//...

  render() {
    return(
      <div>
        <ReactCoreImageUpload 
          text="Upload Your Image"
          class={['pure-button', 'pure-button-primary', 'js-btn-crop']} 
          inputOfFile="files"
          url="http://101.198.151.190/api/upload.php"
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
yarn run start
```
[http://localhost:9000/webpack-dev-server/demo/index.html](http://localhost:9000/webpack-dev-server/demo/index.html)



### Options

| Props        | Type         | Example  | Description  |
| ------------- |:----------| ---------|--------------|
| url     | String | '/crop.php' | your server url |
| text      | String      |  'Upload Image' | the text you want to show |
| inputOfFile | String     |   'file' | upload file form name |
| extensions | String   |    'png,jpg,gif' | limit the file type |
| crop | Boolean   |   true | if need crop image |
| cropRatio | String   |   '1:1' | limit the cropped image shape|
| cropBtn | Object   |   {ok:'Save','cancel':'Give Up'} | the text of crop button|
| maxFileSize | Number   |   10485760(10M) | limit the file size|
| maxWidth | Number   |   150 | limit the width of your image you cropped|
| maxheight | Number   |   150 | limit the height of your image you cropped|
| inputAccept | string   |  'image/*' / 'image/jpg,image/jpeg,image/png' |  the image file of accept type |



### Server Crop Arguments

If you crop a image , your crop will send a request to your server with some crop arguments;

                        
<img src="./shots/vuedba0ed377b88fc84d51026310efcb255b.png" />


+ `toCropImgX`: the distance of cropbox to the image left;
+ `toCropImgY`: the distance of cropbox to the image top
+ `toCropImgW`: the width of cropbox
+ `toCropImgH`: the height of cropbox
+ `maxWidth`: the maxium width of your target image 
+ `maxHeight`: the maxium height of your target image 
If you want to change the crop window style , you should write your own css files.

### MIT Liscense 