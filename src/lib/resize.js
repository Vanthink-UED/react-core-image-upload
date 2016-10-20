/** Reszie
 * @el  dom
 * @container  dom
 * @ratio  string '1:1' like this
 * e events
 **/

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

let moveHandler,upHandler;
class Resize {
  constructor($el, $container, ratio, e) {
    e.stopPropagation();
    this.coor = {
      x: isMobile ? e.touches[0]['clientX'] : e.clientX,
      y: isMobile ? e.touches[0]['clientY'] : e.clientY,
      w: parseInt(window.getComputedStyle($el).width),
      h: parseInt(window.getComputedStyle($el).height),
    };
    this.splitX = ratio.split(':')[0];
    this.splitY = ratio.split(':')[1];
    this.el = $el;
    this.container = $container;
    var self = this;
    moveHandler = function(e) {
      self.drag(e);
    }
    upHandler = function() {
      self.stopDrag();
    }
    if (isMobile) {
      this.container.addEventListener('touchmove', moveHandler, false);
      this.container.addEventListener('touchend',moveHandler,false);
      return;
    }
    this.container.addEventListener('mousemove', moveHandler, false);
    this.container.addEventListener('mouseup',upHandler,false);
  }

  drag(e) {
    
    if (!this.el) {
      return;
    }
    let $dotBox = this.container;
    let cw = parseInt(window.getComputedStyle($dotBox).width);
    let ch = parseInt(window.getComputedStyle($dotBox).height);
    let $halfX = parseInt(document.body.offsetWidth) - cw;
    let $halfY = parseInt(document.body.offsetHeight) - ch - 40;
    let resetX = isMobile ? e.changedTouches[0]['clientX'] : e.clientX;
    let resetY = isMobile ? e.changedTouches[0]['clientY'] : e.clientY;
    if (this.splitX > this.splitY) {
      if (parseInt(resetX) >= ($halfX / 2) + cw) {
        return;
      } else {
        if (parseInt(this.el.style.width) >= parseInt(window.getComputedStyle($dotBox).width)) {
          this.el.style.width = window.getComputedStyle($dotBox).width;
        };
        this.el.style.width = (this.coor.w + (isMobile ? e.changedTouches[0]['clientX'] : e.clientX) - this.coor.x) + 'px';
        this.el.style.height = parseInt(this.el.style.width) * (this.splitY / this.splitX) + 'px';
        //限制拖拉的范围在图片内
        if (parseInt(window.getComputedStyle($dotBox).width) > parseInt(window.getComputedStyle($dotBox).height)) {
          if (parseInt(this.el.style.height) >= parseInt(window.getComputedStyle($dotBox).height)) {
            this.el.style.height = window.getComputedStyle($dotBox).height;
            this.el.style.width = parseInt(window.getComputedStyle($dotBox).height) * (this.splitX / this.splitY) + 'px';
            return;
          };
        } else if (parseInt(window.getComputedStyle($dotBox).width) < parseInt(window.getComputedStyle($dotBox).height)) {
          if (parseInt(this.el.style.width) >= parseInt(window.getComputedStyle($dotBox).width)) {
            this.el.style.width = window.getComputedStyle($dotBox).width;
            this.el.style.height = parseInt(window.getComputedStyle($dotBox).width) * (this.splitY / this.splitX) + 'px';
            return;
          }
        } else {
          if (parseInt(this.el.style.width) >= parseInt(window.getComputedStyle($dotBox).width)) {
            this.el.style.width = window.getComputedStyle($dotBox).width;
            this.el.style.height = parseInt(window.getComputedStyle($dotBox).width) * (this.splitY / this.splitX) + 'px';
            return;
          }
        }
      }
    } else if (this.splitX < this.splitY) {
      if (parseInt(resetY) >= ($halfY / 2) + parseInt(window.getComputedStyle($dotBox).height) + parseInt(window.getComputedStyle($topH).height)) {
        return;
      } else {
        this.el.style.height = (this.coor.h + (isMobile ? e.changedTouches[0]['clientY'] : e.clientY) - this.coor.y) + 'px';
        this.el.style.width = parseInt(this.el.style.height) * (this.splitX / this.splitY) + 'px';
        //限制拖拉的范围在图片内
        if (parseInt(window.getComputedStyle($dotBox).width) > parseInt(window.getComputedStyle($dotBox).height)) {
          if (parseInt(this.el.style.height) >= parseInt(window.getComputedStyle($dotBox).height)) {
            this.el.style.height = window.getComputedStyle($dotBox).height;
            this.el.style.width = parseInt(window.getComputedStyle($dotBox).height) * (this.splitX / this.splitY) + 'px';
            return;
          };
        } else if (parseInt(window.getComputedStyle($dotBox).width) < parseInt(window.getComputedStyle($dotBox).height)) {
          if (parseInt(this.el.style.width) >= parseInt(window.getComputedStyle($dotBox).width)) {
            this.el.style.width = window.getComputedStyle($dotBox).width;
            this.el.style.height = parseInt(window.getComputedStyle($dotBox).width) * (this.splitY / this.splitX) + 'px';
            return;
          }
        } else {
          if (parseInt(this.el.style.width) >= parseInt(window.getComputedStyle($dotBox).width)) {
            this.el.style.width = window.getComputedStyle($dotBox).width;
            this.el.style.height = parseInt(window.getComputedStyle($dotBox).width) * (this.splitY / this.splitX) + 'px';
            return;
          }
        }
      }
    } else {
      if (parseInt(resetX) >= ($halfX / 2) + parseInt(window.getComputedStyle($dotBox).width)) {
        //现在拖拉范围不准超过某一边的范围
        return;
      } else {
        this.el.style.width = (this.coor.w + (isMobile ? e.changedTouches[0]['clientX'] : e.clientX) - this.coor.x) + 'px';
        this.el.style.height = this.el.style.width;
        //限制拖拉的范围在图片内
        if (parseInt(window.getComputedStyle($dotBox).width) > parseInt(window.getComputedStyle($dotBox).height)) {
          if (parseInt(this.el.style.height) >= parseInt(window.getComputedStyle($dotBox).height)) {
            this.el.style.height = window.getComputedStyle($dotBox).height;
            this.el.style.width = window.getComputedStyle($dotBox).height;
          };
        } else if (parseInt(window.getComputedStyle($dotBox).width) < parseInt(window.getComputedStyle($dotBox).height)) {
          if (parseInt(this.el.style.width) >= parseInt(window.getComputedStyle($dotBox).width)) {
            this.el.style.width = window.getComputedStyle($dotBox).width;
            this.el.style.height = window.getComputedStyle($dotBox).width;
          }
        } else {
          if (parseInt(this.el.style.width) >= parseInt(window.getComputedStyle($dotBox).width)) {
            this.el.style.width = this.el.style.height = window.getComputedStyle($dotBox).width;
          }
        }
      }
    }
  }

  stopDrag(e) {
    this.el = null;
    if(isMobile) {
      this.container.removeEventListener('touchmove',moveHandler,false);
      this.container.removeEventListener('touchend',moveHandler,false);
    }else{
      this.container.removeEventListener('touchmove',moveHandler,false);
      this.container.removeEventListener('mouseup',upHandler,false);
    }
    
    moveHandler = upHandler = null;
    this.container = null;
  }
};



export default Resize;