import React from 'react';
import PropTypes from 'prop-types';
import helper from '../lib/helper';
import drag from '../lib/drag';

export default class ResizeBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      left: 0,
    };
    this.drag = this.drag.bind(this);
  }

  render() {
    return (
      <div className="g-resize-bar" ref="container">
        <div
          className="g-resize-highlight"
          style={{width: this.state.left + '%' }}
        >
        </div>
        <button
          className="circle-btn"
          onTouchStart={this.drag}
          onMouseDown={this.drag}
          style={{left: this.state.left + '%' }}
        >
        </button>
      </div>
    );
  }

  setProgress(num) {
    this.setState({
      left: num,
    })
  }

  drag(e) {
    const $el = e.target;
    this.el = $el;
    const $container = this.refs.container.parentElement;
    const self = this;
    const isMobile = helper.isMobile;
    const width = 200;
    const coor = {
      x: (isMobile ? e.touches[0]['clientX'] : e.clientX) - $el.offsetLeft,
      y: (isMobile ? e.touches[0]['clientY'] : e.clientY) - $el.offsetTop,
      maxLeft: width,
      maxTop: parseInt($container.style.height) - parseInt($el.style.height),
      minLeft: 0,
      minTop: 0,
    };
    const move = function (ev) {
      const newCoor = drag(ev, self.el, coor);
      if (newCoor) {
        if((newCoor.left / width) < self.minProgress) {
          return;
        }
        self.progress = newCoor.left / width;
        self.setState({
          left: newCoor.left / width * 100,
        });
        self.props.resize(self.progress);
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
};
ResizeBar.PropTypes = {
  minProgress: PropTypes.minProgress,
  resize: PropTypes.function,
};
ResizeBar.defaultProps = {
  minProgress: 0,
};
