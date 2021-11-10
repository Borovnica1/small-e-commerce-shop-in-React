import React from 'react';
import './App.css';

import { Link } from 'react-router-dom';
import OnlyProduct from './Product';
import AddCart from './AddToCart';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.handleCart = this.handleCart.bind(this);
    this.state = {
      data: [],
    };
  };

  componentDidMount() {
    const url = 'https://fakestoreapi.com/products';
    fetch(url)
      .then((result) => result.json())
      .then((result) => {
        this.setState({
          data: result,
        })
      });
  }

  handleCart(id, quantity) {
    let quant = id in this.state ? this.state[id] : 0;
    quant += quantity;
    this.setState({ ...this.state, [id]: quant });
  }


  render() {
    console.log('HANDLUJEM CARTTTTT', this.state, this.props.items, this.props.id, this.props.oneProduct);
    return (
      <Products items={this.state.data} inCart={this.state} onCartChange={this.handleCart} oneProduct={this.props.oneProduct}/>
    );
  }
};

class Products extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const products = this.props.items.map((c) => <Product key={c.id} item={c} onCartChange={this.props.onCartChange} />);
    const product = <OnlyProduct inCart={this.props.inCart} items={this.props.items} onCartChange={this.props.onCartChange} />;

    if (this.props.oneProduct) return (
      <div>
        {product}
      </div>
    );
    else return (
      <div className="products-grid">
        {products}
      </div>
    ); 
  };
};

class Product extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('vracama prozibvoddd');
    return (
      <div className="product">
        <Link className="product-img" to={`/product/${this.props.item.id}`}>
          <img src={this.props.item.image} />
        </Link>
        <div className="product-name-price">
          <Link to={`/product/${this.props.item.id}`}>
            <h3 className="product-name">{(this.props.item.title).length < 40 ? this.props.item.title : (this.props.item.title).slice(0, 40) + '...'}</h3>
          </Link>
          <h3 className="product-price">${this.props.item.price}</h3>
        </div>
        <AddCart onCartChange={this.props.onCartChange} id={this.props.item.id}/>
      </div>
    );
  };
};


export default Cart;