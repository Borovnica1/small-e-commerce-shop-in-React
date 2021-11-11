import React from 'react';
import './App.css';

import { Link } from "react-router-dom";
 

function Nav(props) {
  return (
    <header>
      <h3>E-commerce shop in React</h3>
      <nav>
        <ul>
          <li><Link to={`/products`}>Products</Link></li>
          <Link to={`/cart`}><li className="cart-icon"><span className="cart-counter">{props.productsCnt}</span><i className="fas fa-shopping-cart fa-2x"></i></li></Link>
        </ul>
      </nav>
    </header>
  )
}

export default Nav;