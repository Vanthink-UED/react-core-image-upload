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
import CnProps from './components/doc/cn/props';
import EnProps from './components/doc/en/props';
import CnEvents from './components/doc/cn/events';
import EnEvents from './components/doc/en/events';
import CnCustomComponent from './components/doc/cn/custom-component';
import EnCustomComponent from './components/doc/en/custom-component';
import CnCropImage from './components/doc/cn/crop-image';
import EnCropImage from './components/doc/en/crop-image';
import CnResizeImage from './components/doc/cn/resize-image';
import EnResizeImage from './components/doc/en/resize-image';
import CnCompressImage from './components/doc/cn/compress-image';
import EnCompressImage from './components/doc/en/compress-image';
import CnMultipleFile from './components/doc/cn/multiple-file';
import EnMultipleFile from './components/doc/en/multiple-file';
import CnPostData from './components/doc/cn/post-data';
import EnPostData from './components/doc/en/post-data';
import CnOthers from './components/doc/cn/others';
import EnOthers from './components/doc/en/others';


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
              <Route path="/cn/props" component={CnProps} />
              <Route path="/cn/events" component={CnEvents} />
              <Route path="/en/events" component={EnEvents} />
              <Route path="/cn/custom-component" component={CnCustomComponent} />
              <Route path="/en/custom-component" component={EnCustomComponent} />
              <Route path="/en/props" component={EnProps} />
              <Route path="/cn/crop-image" component={CnCropImage} />
              <Route path="/en/crop-image" component={EnCropImage} />
              <Route path="/cn/resize-image" component={CnResizeImage} />
              <Route path="/en/resize-image" component={EnResizeImage} />
              <Route path="/cn/compress-image" component={CnCompressImage} />
              <Route path="/en/compress-image" component={EnCompressImage} />
              <Route path="/cn/multiple-file" component={CnMultipleFile} />
              <Route path="/cn/post-data" component={CnPostData} />
              <Route path="/en/post-data" component={EnPostData} />
              <Route path="/cn/others" component={CnOthers} />
              <Route path="/en/others" component={EnOthers} />
            </Router>
          </div>
        </div>
        <Ft></Ft>
      </div>

    );
  }
}

export default App;
