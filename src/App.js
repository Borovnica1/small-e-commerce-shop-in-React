import logo from './logo.svg';
import './App.css';
import React from 'react';

import Nav from './Nav';
import ProductLol from './Product';
import { BrowserRouter, Routes, Route, Switch, Link } from 'react-router-dom';
import Cart from './Cart';

class App extends React.Component {

  /* maybe keep here state data of products instead in Cart component*/

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Nav />
          <Routes>
            <Route path="/" element={<Cart oneProduct={false}/>}/>
            <Route path="/products" element={<Cart oneProduct={false} />}/>
            <Route path="/product" element={<Cart oneProduct={true} />}>
              <Route path=":id" />
            </Route>
            <Route path="/cart" element={<Cart oneProduct={false} cartTable={true} />}/>
          </Routes>
        </div>
      </BrowserRouter>
    );

  }
  
};

export default App;
