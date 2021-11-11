import React from 'react';
import './App.css';

import { Link } from 'react-router-dom';
import OnlyProduct from './Product';
import AddCart from './AddToCart';
import CartTable from './CartTable';

class Cart extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <CartTable removeProductFromCart={this.props.removeProductFromCart} onByOneChange={this.props.handleProductByOne} items={this.props.inCart} allProducts={this.props.allProducts} />
    )
  }
};


export default Cart;