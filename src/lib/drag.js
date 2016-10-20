/** Drag
* @param $el dragged element
* @param $el the container of dragged element
* @param e event object
**/
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

let moveHandler,upHandler;
class Drag {
  constructor($el, $container, e) {

    this.el = $el;
    this.container = $container;
    this.coor = {
      x: (isMobile ? e.touches[0]['clientX'] : e.clientX) - $el.offsetLeft - $el.parentElement.offsetLeft,
      y: (isMobile ? e.touches[0]['clientY'] : e.clientY) - $el.offsetTop - $el.parentElement.offsetTop,
      posX: isMobile ? e.touches[0]['clientX'] : e.clientX,
      posy: isMobile ? e.touches[0]['clientY'] : e.clientY,
      maxLeft: parseInt(this.container.style.width) - parseInt(this.el.style.width),
      maxTop: parseInt(this.container.style.height) - parseInt(this.el.style.height),
    };
    let self = this;
    moveHandler = function(e) {
      self.move(e);
    }
    upHandler = function() {
      self.stopMove();
    }
    if (isMobile) {
      this.container.addEventListener('touchmove', moveHandler, false);
      this.container.addEventListener('touchend', upHandler, false);
      return;
    }
    this.container.addEventListener('mousemove', moveHandler, false);
    this.container.addEventListener('mouseup', upHandler, false);
  }

  move(e) {
    if (!this.el) {
      return;
    }
    this.coor.posX = isMobile ? e.changedTouches[0]['clientX'] : e.clientX;
    this.coor.posY = isMobile ? e.changedTouches[0]['clientY'] : e.clientY;
    let newPosX = this.coor.posX - this.coor.x;
    let newPosY = this.coor.posY - this.coor.y;
    if (newPosX <= 0) {
      newPosX = 0;
    }
    if (newPosX >= this.coor.maxLeft) {
      newPosX = this.coor.maxLeft;
    }
    if (newPosY <= 0) {
      newPosY = 0;
    }
    if (newPosY >= this.coor.maxTop) {
      newPosY = this.coor.maxTop;
    }
    this.el.style.left = (newPosX) + 'px';
    this.el.style.top = (newPosY) + 'px';
  }

  stopMove() {
    this.el = null;
    if (isMobile) {
      this.container.removeEventListener('touchmove', moveHandler, false);
      this.container.removeEventListener('touchend', upHandler, false);
      
    }else{
      this.container.removeEventListener('mousemove', moveHandler, false);
      this.container.removeEventListener('mouseup', upHandler, false);
    }
    
    moveHandler = upHandler = null;
    
  }

};

export default Drag;