import React, { Component } from 'react';
import { render } from 'react-dom';
import Footer from './components/footer';
import Contents from './components/contents';
class App extends Component {
  render() {
    return (
      <div>
        <Contents></Contents>    
        <Footer></Footer>
      </div> 
    );
  }
}

export default App;