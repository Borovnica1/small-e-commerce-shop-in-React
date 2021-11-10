import React from 'react';
import './App.css';

import { Link } from "react-router-dom";
 

function Nav() {
  return (
    <nav style={{color: '#fff'}}>
      <h3>Logo</h3>
      <ul>
        <li><Link to={`/products`}>Products</Link></li>
        <li><Link to={`/product`}>PRODUCTTT</Link></li>
        <li>Cart</li>
      </ul>
    </nav>
  )
}

export default Nav;