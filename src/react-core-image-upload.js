/** a component for image to upload and crop
*  Github: https://github.com/Vanthink-UED/vue.core.image.upload
**/

import React, { Component } from 'react';
import { render } from 'react-dom';

import xhr from './lib/xhr';
import Resize from './lib/resize';
import Drag from './lib/drag';
var style = require('style!css!./style.css');



  
const GIF_LOADING_SRC = 'data:image/gif;base64,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';
  

class ReactCoreImageUpload extends Component {
  constructor(props) {
    super(props);
    this.props.class.push('g-core-image-upload-btn');
    this.state = {
      formID: 'g-core-upload-input-' + Math.floor(Math.random() * 10000),
      uploading: false,
      hasImage:false,
      class:  this.props.class.join(' '),
      image: {
        src: 'http://img1.vued.vanthink.cn/vuedcb0efb21e5f2ca013ca1480198bbf4b3.png',
        width:0,
        height:0,
      }
    };
  }
  
  
  render() {
    return (
      <div className={this.state.class} id={this.state.formID}>
        {this.props.text}
        <form className="g-core-image-upload-form" method="post" encType="multipart/form-data" action="" style={{display: 'block', cursor: 'pointer', position: 'absolute', left: 0, top: 0, width: 1242, height: 61, opacity: 0, margin: 0, padding: 0, overflow: 'hidden'}}>
          <input disabled={this.state.uploading}  onChange={this.change.bind(this)} name={this.props.inputOfFile} type="file" accept={this.props.inputAccept}  style={{width: '100%', height: '100%'}} />
        </form>
        <div className="g-core-image-corp-container" style={{display:this.state.hasImage?'block':'none'}}>
          <div className="image-aside">
            <div className="g-crop-image-box">
              <div className="g-crop-image-principal">
                <img src={this.state.image.src} style={{ width:this.state.image.width,height:this.state.image.height}} />
                <div className="select-recorte" onMouseDown={this.drag.bind(this)} onTouchStart={this.drag.bind(this)} style={{width:100,height:100}} >
                  <div className="g-s-resize"></div>
                  <div className="g-e-resize"></div>
                  <div className="g-resize" onTouchStart={this.resize.bind(this)} onMouseDown={this.resize.bind(this)}></div>
                </div>
              </div>
            </div>
          </div>
          <div className="info-aside">
            <p className="btn-groups">
              <button type="button" onClick={this.doCrop.bind(this)} className="btn btn-upload">{this.props.cropBtn.ok}</button>
              <button type="button" onClick={this.cancel.bind(this)} className="btn btn-cancel">{this.props.cropBtn.cancel}</button>
            </p>
          </div>
        </div>          
      </div>     
    );
  }
  
  __find(ele) {
    let dq = document.getElementById(this.state.formID);
    return dq.querySelector(ele);
  }
  
  change(e) {
    
    let fileVal = this.__find('input').value.replace(/C:\\fakepath\\/i, "");
    let fileExt = fileVal.substring(fileVal.lastIndexOf(".") + 1);
    const extensionsArr = this.props.extensions;
    if(extensionsArr.length>1) {
        var reg = new RegExp('^[' + extensionsArr.join('|') + ']+$','i');
        if (!reg.test(fileExt)) {
            return this.props.errorHandle('TYPE ERROR');
        }
    }
    if (e.target.files[0].size > this.props.maxFileSize) {
        var formatSize;
        if (parseInt(this.maxFileSize / 1024 / 1024) > 0) {
            formatSize = (this.maxFileSize / 1024 / 1024).toFixed(2) + 'MB';
        } else if (parseInt(this.maxFileSize / 1024) > 0) {
            formatSize = (this.maxFileSize / 1024).toFixed(2) + 'kB';
        } else {
            formatSize = options.maxFileSize.toFixed(2) + 'Byte';
        }
        this.props.errorHandle('FILE IS TOO LARGER THAN THE MAX VALUE ' + formatSize);
        return;
    }

    this.files = e.target.files;

    if(this.props.crop) {
      this.__showImage();
      return;

    }
    this.tryAjaxUpload(); 

  }


  __showImage() {
    document.body.style.overflow = 'hidden';
    this.setState({
      hasImage: true
    })
    this.__readFiles();
  }

   __readFiles() {
    let reader = new FileReader();
    let self = this;
    reader.onload = function(e) {
      let src = e.target.result;
      self.__initImage(src);

    }
     reader.readAsDataURL(this.files[0]);
  }

  __initImage(src) {
    let pic = new Image();
    let self = this;
    pic.src = src;

    pic.onload= function() {
      
      self.setState({
        image:{
          src: src,
          width: pic.naturalWidth,
          height: pic.naturalHeight,
        }
      });
      self.__reseyLayout();
      self.__initCropBox();
    }
  }

  // init crop area
  __initCropBox (){
    let $selectCropBox = this.__find('.select-recorte');
    let $wrap = this.__find('.g-crop-image-principal');
    let imageWidth = parseInt($wrap.style['width']),
        imageHeight = parseInt($wrap.style['height']);
    let ratioW = this.props.cropRatio.split(':')[0],
        ratioH = this.props.cropRatio.split(':')[1];
    let Swidth = (imageWidth / 100) * 80;
    let Sheight = (Swidth / ratioW) * ratioH;
    $selectCropBox.style.cssText = 'width:' + Swidth + 'px;height: ' + Sheight + 'px;left:' + (imageWidth - Swidth) / 2 + 'px;top:' + (imageHeight - Sheight) / 2 + 'px;';
    if (Sheight > imageHeight) {
      Sheight = (imageHeight / 100) * 80;
      Swidth = (Sheight * ratioW) / ratioH;
      $selectCropBox.style.cssText = 'width:' + Swidth + 'px;height:' + Sheight + 'px;left:' + (imageWidth - Swidth) / 2 + 'px;top:' + (imageHeight - Sheight) / 2 + 'px';
    };

  }


  // reset layout 
  __reseyLayout () {
    let H = window.innerHeight - 80,
        W = window.innerWidth - 60,
        imageWidth = this.state.image.width,
        imageHeight = this.state.image.height;
    // caculate the image ratio
    let R = imageWidth / imageHeight;
    let Rs = W / H;
    let $container = this.__find('.g-crop-image-principal'); 
    if (R > Rs) {
      this.setState({
        image:{
          src: this.state.image.src,
          width:W,
          height: W / R,
        }
      });
      // I don't hope to use a state to change the container stye
      $container.style.cssText = 'width:' + W + 'px;height:' + W / R + 'px;margin-top:' + (H - W / R) / 2 + 'px';
    } else {
       this.setState({
        image:{
          src: this.state.image.src,
          width: H * R,
          height: H,
        }
      });

      $container.style.cssText = 'width:' + H * R + 'px;height:' + H + 'px;margin-left:' + (W - H * R) / 2 + 'px;';
    }
    this.imgChangeRatio = imageWidth / this.state.image.width;

  }

  doCrop(e) {
    let btn = e.target;
    btn.value = btn.value + '...';
    btn.disabled = true;
    if(typeof this.data !== 'object') { 
      this.data = {};  
    }

    let $selectCrop = this.__find('.select-recorte');
    this.data["request"] = "crop";

    this.data["toCropImgX"] = parseInt(window.getComputedStyle($selectCrop).left) * this.imgChangeRatio;
    this.data["toCropImgY"] = parseInt(window.getComputedStyle($selectCrop).top) * this.imgChangeRatio;
    this.data["toCropImgW"] = parseInt(window.getComputedStyle($selectCrop).width)  * this.imgChangeRatio;
    this.data["toCropImgH"] = parseInt(window.getComputedStyle($selectCrop).height)  * this.imgChangeRatio;
    this.tryAjaxUpload(function() {
      btn.value = btn.value.replace('...','');
      btn.disabled = false;  
    });

  }


  cancel() {
    this.files = '';
    this.setState({
      hasImage: false
    });
    this.__find('input').value = '';
    document.body.removeAttribute('style');
  }



  // use ajax upload  IE9+ 
  tryAjaxUpload(callback) {
    let self = this;
    let data = new FormData();
    for(let i=0;i<this.files.length;i++) { 
      data.append(self.props.inputOfFile, this.files[i]);  
    }

    if (typeof this.data === 'object') { 

        for(let k in this.data) {
          if(this.data[k] !== undefined) {
            data.append(k,this.data[k]);
          }

        }      
    }
    this.props.imageUploading(this.files);
    xhr('POST',this.props.url,{},data,function(res) {
      if(typeof callback === 'function') {
        callback();
      }
      self.uploading = false;
      if(self.props.crop) {
          self.cancel();
       } 
       self.props.imageUploaded(res);
    });  
  }

  // resize and drag move
  resize(e) {
    
    let $el = e.target.parentElement;
    let $container = this.__find('.g-crop-image-principal');
    let resizedObj = new Resize($el,$container,this.props.cropRatio,e);
  }

  drag(e) {
    let $el = e.target;
    let $container = this.__find('.g-crop-image-principal');
    let dragObj = new Drag($el,$container,e);
  }
    
  
}

ReactCoreImageUpload.propTypes = {
  url: React.PropTypes.string,
  text: React.PropTypes.string,
  inputAccept: React.PropTypes.string,
  inputOfFile:  React.PropTypes.string,
  class: React.PropTypes.array,
  imageUploaded: React.PropTypes.function,
};
ReactCoreImageUpload.defaultProps = {
  url: '',
  text: 'upload',
  inputAccept: 'image/*',
  inputOfFile: 'file',
  crop: false,
  cropBtn: {
    'ok': 'Save',
    'cancel': 'Cancel',
  },
  class: [],
  extensions:[],
  cropRatio:'1:1',
  maxFileSize: 10485760,
  imageUploaded: function(res) {
  
  },
  imageUploading: function(res) {
    console.info('uploading');
  },
  errorHandle: function(err) {
    console.error(err);  
  },
};
export default ReactCoreImageUpload;