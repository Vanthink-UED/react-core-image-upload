import React, { Component } from 'react';
import { render } from 'react-dom';
import {  Router, Route, hashHistory } from 'react-router';
import Ft from './components/ft';
import Hd from './components/hd';
import Navlist from './components/nav-list';
//pages
import EnHome from './components/doc/en/home';
import CnHome from './components/doc/cn/home';
import CngetStarted from './components/doc/cn/get-started';
import EngetStarted from './components/doc/en/get-started';
import CnMultipleFile from './components/doc/cn/multiple-file';

class App extends Component {
  render() {
    return (
      <div id="app">
        <Hd></Hd>
        <div className="container">
          <Navlist></Navlist>
          <div className="page main">
            <Router history={hashHistory}>
              <Route path="/" component={EnHome} />
              <Route path="/en/home" component={EnHome} />
              <Route path="/cn/home" component={CnHome} />
              <Route path="/en/get-started" component={EngetStarted} />
              <Route path="/cn/get-started" component={CngetStarted} />
              <Route path="/cn/multiple-file" component={CnMultipleFile} />
            </Router>
          </div>
        </div>
        <Ft></Ft>
      </div>

    );
  }
}

export default App;
