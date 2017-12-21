import React, { Component } from 'react';
import xhr from 'core-image-xhr';
import defaultProps from './props';
import propTypes from './propTypes';
import Crop from './components/crop';
import errorCode from './lib/error-code';
import canvasHelper from './lib/canvas-helper';
require('style!css!./style.css');

let overflowVal = '';
class ReactCoreImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formID: 'g-core-upload-input-' + Math.floor(Math.random() * 10000),
      uploading: false,
      hasImage: false,
      image: {
        src: 'http://img1.vued.vanthink.cn/vuedcb0efb21e5f2ca013ca1480198bbf4b3.png',
        width: 0,
        height: 0,
      }
    };
    if (this.props.multiple) {
      this.name = this.props.inputOfFile + '[]';
    } else {
      this.name = this.props.inputOfFile;
    }
    this.change = this.change.bind(this);
    this.doCrop = this.doCrop.bind(this);
    this.doResize = this.doResize.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  render() {
    return (
      <div className={this.props.className + ' g-core-image-upload-btn'} id={this.state.formID}>
        {this.props.children ? this.props.children: this.props.text}
        <form
          className="g-core-image-upload-form"
          method="post"
          encType="multipart/form-data"
          action=""
          style={{ display: 'block', cursor: 'pointer', position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', opacity: 0, margin: 0, padding: 0, overflow: 'hidden' }}>
          <input
            disabled={this.state.uploading}
            onChange={this.change}
            name={this.props.inputOfFile}
            type="file"
            multiple={this.props.multiple}
            accept={this.props.inputAccept}
            style={{ width: '100%', height: '100%' }} />
        </form>
        <div className="g-core-image-corp-container" style={{ display: this.state.hasImage ? 'block' : 'none' }}>
          <Crop
            ref={(re) => this.cropbox = re}
            isResize={this.props.resize && !this.props.crop}
            ratio={this.props.ratio}>
          </Crop>
          <div className="info-aside">
            {this.props.crop ?
              <p className="btn-groups">
                <button
                  type="button"
                  onClick={this.doCrop}
                  className="btn btn-upload">
                  {this.props.cropBtn.ok}
                </button>
                <button
                  type="button"
                  onClick={this.cancel}
                  className="btn btn-cancel">
                  {this.props.cropBtn.cancel}
                </button>
              </p> : null}
            {this.props.resize ?
              <p className="btn-groups">
                <button
                  type="button"
                  onClick={this.doResize}
                  className="btn btn-upload">
                  {this.props.resizeBtn.ok}
                </button>
                <button
                  type="button"
                  onClick={this.cancel}
                  className="btn btn-cancel">
                  {this.props.resizeBtn.cancel}
                </button>
              </p> : null}
          </div>
        </div>
      </div>
    );
  }

  __dispatch(name, res) {
    if (this.props[name] && typeof this.props[name] === 'function') {
      this.props[name].apply(this, Array.from(arguments).slice(1));
    }
  }

  __find(ele) {
    let dq = document.getElementById(this.state.formID);
    return dq.querySelector(ele);
  }

  change(e) {
    let fileVal = this.__find('input').value.replace(/C:\\fakepath\\/i, "");
    let fileExt = fileVal.substring(fileVal.lastIndexOf(".") + 1);
    const extensionsArr = this.props.extensions;
    if (extensionsArr.length > 1 ) {
        var reg = new RegExp('^[' + extensionsArr.join('|') + ']+$','i');
        if (!reg.test(fileExt)) {
            return this.__dispatch('errorHandle', errorCode['FILE_FORMAT']);
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
        this.__dispatch('errorHandle', errorCode['FILE_MAXSIZE'], 'FILE IS TOO LARGER THAN THE MAX VALUE ' + formatSize);
        return;
    }

    this.files = e.target.files;
    if(this.props.crop || this.props.resize) {
      this.__showImage();
      return;
    }
    this.__dispatch('imageChanged', this.files.length > 1 ? this.files : this.files[0]);
    if (this.props.compress && this.files[0]['type'] !== 'image/png' && this.files[0]['type'] !== 'image/gif') {
      canvasHelper.compress(this.files[0], 100 - this.props.compress, (code) => {
        this.tryAjaxUpload('', true, code);
      });
    } else {
      this.tryAjaxUpload();
    }
  }
  __showImage() {
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
      overflowVal = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      self.__initImage(src);

    }
    reader.readAsDataURL(this.files[0]);
  }
  __initImage(src) {
    let pic = new Image();
    let self = this;
    pic.src = src;
    const cropBox = this.cropbox;
    pic.onload= function() {
      self.setState({
        image:{
          src: src,
          width: pic.naturalWidth,
          height: pic.naturalHeight,
        }
      });
      self.imgChangeRatio = cropBox.setImage(src, pic.naturalWidth, pic.naturalHeight);
    }
  }

  resizeImage(progress) {
    const cropBox = this.$refs.cropBox;
    cropBox.resizeImage(progress);
  }

  doCrop(e) {
    this.__setData('crop');
    const cropBox = this.cropbox;
    const upload = this.__setUpload(e.target);
    if (this.props.crop === 'local') {
      const targetImage = cropBox.getCropImage();
      this.props.data.comprese = 100 - this.props.compress;
      return canvasHelper.crop(targetImage, this.props.data, (code) => {
        console.log(code);
        upload(code);
      })
    }
    upload();
  }

  doResize(e) {
    this.__setData('reszie');
    const cropBox = this.cropbox;
    const upload = this.__setUpload(e.target);
    if (this.props.resize === 'local') {
      const targetImage = cropBox.getCropImage();
      this.data.comprose = 100 - this.compress;
      return canvasHelper.resize(targetImage, this.data, (code) => {
        upload(code);
      })
    }
    upload();
  }

  __setData(type) {
    this.props.data["request"] = type;
    const cropBox = this.cropbox;
    const newCSSObj = cropBox.getCropData();
    for (const k of Object.keys(newCSSObj)) {
      this.props.data[k] = newCSSObj[k];
    }
    if (this.props.maxWidth) {
      this.props.data['maxWidth'] = this.maxWidth;
    }
    if (this.maxHeight) {
      this.props.data['maxHeight'] = this.maxHeight;
    }
    if (this.minWidth) {
      this.props.data['minWidth'] = this.minWidth;
    }
  }
  __setUpload(btn) {
    btn.value = btn.value + '...';
    btn.disabled = true;
    const upload = (code) => {
      this.tryAjaxUpload(() => {
        btn.value = btn.value.replace('...','');
        btn.disabled = false;
      }, code ? true: false, code);
    };
    return upload;
  }

  cancel() {
    this.setState({
      hasImage: false,
    })
    document.body.style.overflow = overflowVal;
    this.files = '';
    this.__find('input').value = '';
  }
  // use ajax upload  IE10+
  tryAjaxUpload(callback, isBinary, base64Code) {
    const self = this;
    this. __dispatch('imageuploading',this.files[0]);
    const done = function(res) {
      if(typeof callback === 'function') {
        callback();
      }
      self.uploading = false;
      self.cancel();
      self.__dispatch('imageUploaded',res);
    };
    const errorUpload = function(err) {
      self.__dispatch('errorHandle', errorCode['SERVER_ERROR']);
    };
    if (!this.props.isXhr) {
      if(this.props.crop) {
        this.setState(
          hasImage: false,
        );
      }
      return typeof callback === 'function' && callback();
    }
    let data;
    if (isBinary) {
      data = {
        type: this.files[0]['type'],
        filename: this.files[0]['name'],
        filed: this.props.inputOfFile,
        base64Code: base64Code
      };
      if (typeof this.props.data === 'object') {
        data = Object.assign(this.props.data, data);
      }
    } else {
      data = new FormData();
      for (let i = 0;i < this.files.length; i++) {
        data.append(this.name, this.files[i]);
      }
      if (typeof this.props.data === 'object') {
        for(let k in this.props.data) {
          if(this.props.data[k] !== undefined) {
            data.append(k,this.props.data[k]);
          }
        }
      }
    }
    xhr('POST', this.props.url, this.props.headers, data, done, errorUpload, isBinary);
  }
}
ReactCoreImageUpload.propTypes = propTypes;
ReactCoreImageUpload.defaultProps = defaultProps;

export default ReactCoreImageUpload;
