import React from 'react';
import ReactCoreImageUpload  from '../react-core-image-upload';
let Contents = React.createClass({ 
  getInitialState () {
    return {
      src:'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png',
      cropArgs:{
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        src: 'http://img1.vued.vanthink.cn/vuede743f1f8b65af500bdbaac67d7b664f9.png',
      }
    };
  },
  render() {
    return(
      <div className="contents">
        <h3 className="content-subhead">Get Started</h3>
        <div className="content pure-u-4-5">
          <div className="pure-g">
            <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">

              <div className="user">
                  <img className="avatar" src={this.state.src}/>
              </div>
              <ReactCoreImageUpload text={"Upload Your Image"} class={['pure-button', 'pure-button-primary', 'js-btn-crop']} inputOfFile={'files'} url={'http://101.198.151.190/api/upload.php'} imageUploaded={this.handleRes}></ReactCoreImageUpload>
              <p>Click button to upload your image</p>
              <pre className="highlight javascript"><code>
              </code></pre>
              <h4>HTML</h4>
        
            </div>
          </div>

        </div>
        <h3 className="content-subhead">Crop Image</h3>
        <div className="content pure-u-4-5">
          <div className="pure-g">
            <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
            <div className="user">
               <img className="avatar" src={this.state.cropArgs.src}/>
             </div>
             <ReactCoreImageUpload text={"Crop Your Image"} class={['pure-button', 'pure-button-primary', 'js-btn-crop']} inputOfFile={'files'} url={'http://101.198.151.190/api/upload.php'} crop={true} imageUploaded={this.handleCropRes}></ReactCoreImageUpload>
              <p>Click button to crop your image</p>
              <h3>Crop Arguments</h3>
              <table className="pure-table" style={{width:'100%'}}>
                <thead>
                  <tr>
                    <th>H</th>
                    <th>W</th>
                    <th>X</th>
                    <th>Y</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{this.state.cropArgs.x}</td>
                    <td>{this.state.cropArgs.y}</td>
                    <td>{this.state.cropArgs.w}</td>
                    <td>{this.state.cropArgs.h}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  },
  
  handleRes(res) {
    console.log(res);
    this.setState({
      src: res.data.src
    });
  },
  
  handleCropRes(res) {
    this.setState({
      cropArgs:{
        src: 'http://img1.vued.vanthink.cn/vuedff07db9e592f103e0f8108bc633d2663.png',
        x: res.data.x,
        y: res.data.y,
        w: res.data.w,
        h: res.data.h
      }
    });
  }
});

export default Contents;  