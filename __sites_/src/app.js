import React, { Component } from 'react';
import { render } from 'react-dom';
import {  Router, Route, hashHistory } from 'react-router';
import Ft from './components/ft';
import Hd from './components/hd';
import Navlist from './components/nav-list';
//pages
import CngetStarted from './components/doc/cn/get-started';
import EngetStarted from './components/doc/en/get-started';

class App extends Component {
  render() {
    return (
      <div id="app">
        <Hd></Hd>
        <div className="container">
          <Navlist></Navlist>
          <div className="page main">
            <Router history={hashHistory}>
              <Route path="/" component={EngetStarted}>
                <Route path="/en/get-started" component={EngetStarted}/>
                <Route path="/cn/get-started" component={CngetStarted}/>
              </Route>
            </Router>
          </div>
        </div>
        <Ft></Ft>
      </div>

    );
  }
}

export default App;
