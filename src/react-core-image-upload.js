/** a component for image to upload and crop
*  Github: https://github.com/Vanthink-UED/vue.core.image.upload
**/

import React, { Component } from 'react';
import { render } from 'react-dom';
var style = require('style!css!./style.css');

/**simple ajax handler**/
let xhr = function (method, url, headers, data, callback,error) {
  var r = new XMLHttpRequest();
  var error = error || function() {
    console.error('AJAX ERROR!')
  };
  // Binary?
  var binary = false;
  if (method === 'blob') {
      binary = method;
      method = 'GET';
  }
  method = method.toUpperCase();
  // Xhr.responseType 'json' is not supported in any of the vendors yet.
  r.onload = function (e) {
      var json = r.response;
      try {
          json = JSON.parse(r.responseText);
      } catch (_e) {
          if (r.status === 401) {
              json = error('access_denied', r.statusText);
          }
      }
      var headers = headersToJSON(r.getAllResponseHeaders());
      headers.statusCode = r.status;
      callback(json || (method === 'GET' ? error('empty_response', 'Could not get resource') : {}), headers);
  };
  r.onerror = function (e) {
      var json = r.responseText;
      try {
          json = JSON.parse(r.responseText);
      } catch (_e) {}
      callback(json || error('access_denied', 'Could not get resource'));
  };
  var x;
  // Should we add the query to the URL?
  if (method === 'GET' || method === 'DELETE') {
      data = null;
  } else if (data && typeof (data) !== 'string' && !(data instanceof FormData) && !(data instanceof File) && !(data instanceof Blob)) {
      // Loop through and add formData
      var f = new FormData();
      for (x in data)
          if (data.hasOwnProperty(x)) {
              if (data[x] instanceof HTMLInputElement) {
                  if ('files' in data[x] && data[x].files.length > 0) {
                      f.append(x, data[x].files[0]);
                  }
              } else if (data[x] instanceof Blob) {
                  f.append(x, data[x], data.name);
              } else {
                  f.append(x, data[x]);
              }
          }
      data = f;
  }
  // Open the path, async
  r.open(method, url, true);
  if (binary) {
    if ('responseType' in r) {
        r.responseType = binary;
    } else {
        r.overrideMimeType('text/plain; charset=x-user-defined');
    }
  }
  // Set any bespoke headers
  if (headers) {
      for (x in headers) {
          r.setRequestHeader(x, headers[x]);
      }
  }
  r.send(data);
  return r;
  // Headers are returned as a string
  function headersToJSON(s) {
    var r = {};
    var reg = /([a-z\-]+):\s?(.*);?/gi;
    var m;
    while ((m = reg.exec(s))) {
        r[m[1]] = m[2];
    }
    return r;
  }
};

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  
const GIF_LOADING_SRC = 'data:image/gif;base64,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';
  

class ReactCoreImageUpload extends Component {
  constructor(props) {
    super(props);
    this.props.class.push('g-core-image-upload-btn');
    this.state = {
      formID: 'g-core-upload-input-' + Math.floor(Math.random() * 10000),
      uploading: false,
    };
  }
  
  
  render() {
    console.log(this.props.inputOfFile);
    return (
      <div className={this.props.class.join(' ')} id={this.state.formID}>
        {this.props.text}
        <form className="g-core-image-upload-form" method="post" encType="multipart/form-data" action="" style={{display: 'block', cursor: 'pointer', position: 'absolute', left: 0, top: 0, width: 1242, height: 61, opacity: 0, margin: 0, padding: 0, overflow: 'hidden'}}>
          <input disabled={this.state.uploading}  onChange={this.change.bind(this)} name={this.props.inputOfFile} type="file" accept={this.props.inputAccept}  style={{width: '100%', height: '100%'}} />
        </form>
        
          
          
      </div>     
    );
  }
  
  __find(ele) {
    let dq = document.getElementById(this.state.formID);
    console.log(dq);
    return dq.querySelector(ele);
  }
  
  change(e) {
    console.log(1);
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

    if(this.crop) {
      this.__showImage();
      return;

    }
    this.tryAjaxUpload(); 

  }


  __showImage() {

    this.hasImage = true;  
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
      if(self.crop) {
          self.hasImage = false;
       } 
       self.props.imageUploaded(res);
    });  
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
  class: [],
  extensions:[],
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