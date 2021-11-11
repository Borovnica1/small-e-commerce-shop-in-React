import React from 'react';
import './App.css';

class AddCart extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  handleAddToCart(e) {
    e.preventDefault();
    this.props.onCartChange(this.props.id, 1)
  }

  render() {
    return (
      <button className="product-add-cart" onClick={this.handleAddToCart}>Add to Cart <i className="fas fa-cart-plus"></i></button>
    );
  }
};

export default AddCart;