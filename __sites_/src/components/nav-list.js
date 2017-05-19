import React from 'react';
import { routers } from '../lib/constants';
import vendor from '../lib/vendor';

export default class NavList extends React.Component {
  constructor(props) {
    super(props);
    const lan = vendor.getLocalData('lan') || 'cn';
    for (var item of routers) {
      item.url = '#/' + lan + '/' + item.url;
      if (lan !== 'en') {
        item.name = item.cn_name;
      }
    }
    this.state = {
      url: location.hash.replace(/\?.*/, ''),
      list: routers,
    };
    this.setUrl = this.setUrl.bind(this);
  }

  setUrl(e) {
    const url = /\#(.*)/.exec(e.target.href)[0];
    this.setState({
      url,
    });
    const $aside = document.querySelector('aside');
    if ($aside) {
      $aside.classList.remove('active');
    }

  }

  render() {
    const lis = [];
    for (let i = 0; i < this.state.list.length; i++) {
      const classname = this.state.list[i].url === this.state.url ? 'active' : '';
      const item = this.state.list[i];
      lis.push(
        <li key={item.url}>
          <a href={item.url} className={classname} onClick={this.setUrl}>{item.name}</a>
        </li>
      );
    }
    return (
      <aside>
        <h4>类目</h4>
        <ul>
          {lis}
        </ul>
      </aside>
    );
  }

}
