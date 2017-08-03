module.exports = {
  isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),

  setCssText(obj) {
    const cssArr = [];
    for (const key of Object.keys(obj)) {
      let val = obj[key];
      if (typeof val === 'number') {
        val = '' + val + 'px';
      }
      cssArr.push(key + ': ' + val + ';');
    }
    return cssArr.join('');
  }
};
