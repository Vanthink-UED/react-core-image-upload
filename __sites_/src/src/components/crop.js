import React from 'react';
import PropTypes from 'prop-types';
import ResizeBar from './resize-bar';
import helper from '../lib/helper';
import resize from '../lib/resize';
import drag from '../lib/drag';
import GIF_LOADING_SRC from '../lib/loading-gif';

const CROPBOX_PERCENT = 75;
const isMobile = helper.isMobile;
const areaWidth = window.innerWidth - 60;
const areaHeight = window.innerHeight - 110;

export default class Crop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      cropCSS: {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
      },
      src: GIF_LOADING_SRC,
    };
    this.drag = this.drag.bind(this);
    this.resize = this.resize.bind(this);
    this.resizeImage = this.resizeImage.bind(this);
  }

  render() {
    return (
      <div className="image-aside" ref="container">
        <div className="g-crop-image-box" >
          <div
            className="g-crop-image-principal"
            onTouchStart={this.drag}
            onMouseDown={this.drag}>
            <div
              className="image-wrap"
              style={{
                width: this.state.width,
                height: this.state.height,
                left: this.state.left,
                top: this.state.top,
                backgroundImage: 'url(' + this.state.src + ')',
                cursor: this.props.isResize ? 'default' : 'move' }}
              >
              <img
                ref="crop-image"
                style={{ width:0, height:0 }}
                src={this.state.src} />
            </div>
            {!this.props.isResize ?
              <div className="image-mask">
                <div
                  className="mask top"
                  style={{
                    top:0,
                    height: this.state.cropCSS.top + 'px',
                    left: 0,
                    width: '100%' }}
                  >
                </div>
                <div
                  className="mask bottom"
                  style={{
                    bottom: 0,
                    top: (this.state.cropCSS.top + this.state.cropCSS.height) + 'px',
                    left: 0,
                    width: '100%' }}
                  >
                </div>
                <div
                  className="mask left"
                  style={{
                    top: this.state.cropCSS.top + 'px',
                    height: this.state.cropCSS.height + 'px',
                    left:0,
                    width: this.state.cropCSS.left + 'px' }}
                >
                </div>
                <div
                  className="mask right"
                  style={{
                    top: this.state.cropCSS.top + 'px',
                    height: this.state.cropCSS.height + 'px',
                    left: (this.state.cropCSS.left + this.state.cropCSS.width) + 'px',
                    right: 0 }}
                >
                </div>
              </div>
            : null}
          { !this.props.isResize ?
            <div
              className="crop-box"
              ref="cropbox"
              style={{
                top: this.state.cropCSS.top + 'px',
                left: this.state.cropCSS.left + 'px',
                height: this.state.cropCSS.height + 'px',
                width: this.state.cropCSS.width + 'px' }}
            >
              <div className="reference-line v"></div>
              <div className="reference-line h"></div>
              <a
                className="g-resize"
                onTouchStart={this.resize}
                onMouseDown={this.resize}>
              </a>
            </div>
          : ''}
          </div>
          <ResizeBar ref="resizeBar" resize={this.resizeImage} />
        </div>
      </div>
    );
  }

  setImage(src, w, h) {
    this.setState({
      src,
    })
    if (this.props.ratio.indexOf(':') > 0) {
      this.ratioW = this.props.ratio.split(':')[0];
      this.ratioH = this.props.ratio.split(':')[1];
      this.ratioVal = this.ratioW / this.ratioH;
    } else {
      this.ratioW = 1;
      this.ratioH = 1;
      this.ratioVal = this.ratio;
    }
    this.natrualWidth = w;
    this.natrualHeight = h;
    this.setLayout(w, h);
    const resizeBar = this.refs.resizeBar;
    if (this.props.isResize) {
      resizeBar.setProgress(100);
    } else {
      resizeBar.setProgress(0);
    }
    return this.imgChangeRatio;
  }

  resizeImage(progress) {
    let w,
        h;
    if (this.props.isResize) {
      w = this.natrualWidth * this.imgChangeRatio * progress;
      h = this.natrualHeight * this.imgChangeRatio * progress;
    } else {
      w = this.initWidth + (progress * (this.natrualWidth - this.initWidth));
      h = this.initHeight + (progress * (this.natrualHeight - this.initHeight));
    }
    if (w <= this.props.minWidth || h < this.props.minHeight) {
      return;
    }
    this.setState({
      left: this.state.left + ((this.state.width - w) / 2),
      top: this.state.top + ((this.state.height - h) / 2),
      width: w,
      height: h,
    });
    this.imgChangeRatio = this.width / this.natrualWidth;
  }

  setLayout(w, h) {
    let H = areaHeight,
        W = areaWidth,
        width = w,
        height = h,
        marginLeft = 0,
        marginTop = 0;
    // caculate the image ratio
    let R = width / height;
    let Rs = W / H;
    if (R > Rs) {
      height = H;
      width = H * R;
      marginLeft = (W - (H * R)) / 2;
    } else {
      width = H * R,
      height = H;
      marginLeft = (W - (H * R)) / 2;
    }
    this._setStyle(width, height, marginLeft, marginTop, R, true);
  }

  _setStyle(w, h, ml, mt, r, isInit) {
    const $container = this.__find('.g-crop-image-principal');
    if(!isInit) {
      this.marginLeft = this.marginLeft + (this.width - w) / 2;
      this.marginTop = this.marginTop + (this.height - h) / 2;
    }
    $container.style.cssText = 'width:' + w + 'px;height:' + h + 'px;margin-left:'
    + ml + 'px;' + 'margin-top:' + mt + 'px';
    const cropCSS = this.setCropBox(w, h);
    let width;
    let height;
    if (this.props.isResize) {
      this.setState({
        width: w,
        height: h,
      });
    } else {
      if (r >= 1) {
        height = cropCSS.height;
        width = height * r;
      } else {
        width = cropCSS.width;
        height = width / r;
      }
      this.initWidth = width;
      this.initHeight = height;
      const left = (w - width) / 2;
      const top = (h - height) / 2;
      this.setState({
        width,
        height,
        left,
        top,
      });
    }
    this.imgChangeRatio = width / this.natrualWidth;
  }

  setCropBox(w, h, r) {
    if (this.props.isResize) {
      return;
    }
    let $selectCropBox = this.refs['cropbox'];
    let $wrap = this.refs['container'];
    let imageWidth = w,
        imageHeight = h,
        ratioW = this.ratioW,
        ratioH = this.ratioH;
    let cropWidth = imageWidth;
    if (areaWidth < w) {
      cropWidth = areaWidth;
    }
    const baseCropWidth = (cropWidth / 100) * CROPBOX_PERCENT;
    const CSSObj = {
      width: baseCropWidth,
      height: (baseCropWidth / ratioW) * ratioH,
    }
    CSSObj.left = (imageWidth - baseCropWidth) / 2;
    CSSObj.top = (imageHeight - CSSObj.height) / 2;
    $selectCropBox.style.cssText = helper.setCssText(CSSObj);
    if (CSSObj.height > imageHeight) {
      const baseCropHeight = (imageHeight / 100) * CROPBOX_PERCENT
      CSSObj.height = baseCropHeight;
      CSSObj.width = (CSSObj.height * ratioW) / ratioH;
      CSSObj.left = (imageWidth - CSSObj.width) / 2;
      CSSObj.top = (imageHeight - CSSObj.height) / 2;
      $selectCropBox.style.cssText = helper.setCssText(CSSObj);
    }
    this.setState({
      cropCSS: CSSObj,
    });
    return CSSObj;
  }

  getCropData() {
    // keep compatible with old api
    if (this.props.isResize) {
      return {
        imgChangeRatio: this.imgChangeRatio,
        toCropImgX: 0,
        toCropImgY: 0,
        toCropImgW: this.natrualWidth,
        toCropImgH: this.natrualHeight,
      };
    }
    return {
      toCropImgX: (this.state.cropCSS.left - this.state.left) / this.imgChangeRatio,
      toCropImgY: (this.state.cropCSS.top - this.state.top) / this.imgChangeRatio,
      toCropImgW: this.state.cropCSS.width / this.imgChangeRatio,
      toCropImgH: this.state.cropCSS.height / this.imgChangeRatio,
    };
  }

  getCropImage() {
    return this.refs['crop-image'];
  }

  __find(str) {
    let dq = this.refs['container'];
    return dq.querySelector(str);
  }

  resize(e) {
    e.stopPropagation();
    if (!this.props.ratio.indexOf(':')) {
        return;
    }
    let $el = e.target.parentElement;
    let $container = this.__find('.g-crop-image-principal');
    if (this._$container) {
      this._$container = container;
    }
    const self = this;
    const coor = {
      x: helper.isMobile ? e.touches[0].clientX : e.clientX,
      y: helper.isMobile ? e.touches[0].clientY : e.clientY,
      w: $el.offsetWidth,
      h: $el.offsetHeight,
    };
    this.el = $el;
    this.container = $container;
    const move = function (ev) {
      const newCropStyle = resize(ev, self.el, $container, coor, self.ratioVal);
      if (newCropStyle) {
        self.setState({
          cropCSS:{
            width: newCropStyle.width,
            height: newCropStyle.height,
          }
        });
      }
    };
    const end = function (ev) {
      this.el = null;
      if (helper.isMobile) {
        document.removeEventListener('touchmove', move, false);
        document.removeEventListener('touchend', end, false);
      }
      document.removeEventListener('mousemove', move, false);
      document.removeEventListener('mouseup', end, false);
    };
    if (helper.isMobile) {
      document.addEventListener('touchmove', move, false);
      document.addEventListener('touchend', end, false);
    }
    document.addEventListener('mousemove', move, false);
    document.addEventListener('mouseup', end, false);
  }

  drag(e) {
    e.preventDefault();
    const $el = this.__find('.image-wrap');
    this.el = $el;
    const $cropBox = this.__find('.crop-box');
    const $container = e.currentTarget;
    const self = this;
    const isMobile = helper.isMobile;
    const coor = {
      x: (isMobile ? e.touches[0]['clientX'] : e.clientX) - $el.offsetLeft,
      y: (isMobile ? e.touches[0]['clientY'] : e.clientY) - $el.offsetTop,
      maxLeft: $cropBox.offsetLeft,
      maxTop: $cropBox.offsetTop,
      minLeft: ($cropBox.offsetWidth + $cropBox.offsetLeft) - $el.offsetWidth,
      minTop: ($cropBox.offsetHeight + $cropBox.offsetTop) - $el.offsetHeight,
    };
    const move = function (ev) {
      const newCropStyle = drag(ev, self.el, coor);
      if (newCropStyle) {
        self.setState({
          left: newCropStyle.left,
          top: newCropStyle.top,
        })
      }
    };
    const stopMove = function (ev) {
      self.el = null;
      if (isMobile) {
        document.removeEventListener('touchmove', move, false);
        document.removeEventListener('touchend', stopMove, false);
        return;
      }
      document.removeEventListener('mousemove', move, false);
      document.removeEventListener('mouseup', stopMove, false);
    };
    if (isMobile) {
      document.addEventListener('touchmove', move, false);
      document.addEventListener('touchend', stopMove, false);
      return;
    }
    document.addEventListener('mousemove', move, false);
    document.addEventListener('mouseup', stopMove, false);
  }

}

Crop.propTypes = {
  isResize: PropTypes.bool,
  minWidth: PropTypes.number,
  minHeight: PropTypes.number,
  ratio: PropTypes.string,
};

Crop.defaultProps = {
  isResize: false,
  minWidth: 50,
  minHeight: 50,
  ratio: '1:1',
};
