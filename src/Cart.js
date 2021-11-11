import React from 'react';
import './App.css';

import { Link } from 'react-router-dom';
import OnlyProduct from './Product';
import AddCart from './AddToCart';
import CartTable from './CartTable';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.handleCart = this.handleCart.bind(this);
    this.handleProductByOne = this.handleProductByOne.bind(this);
    this.removeProductFromCart = this.removeProductFromCart.bind(this);
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
  };

  handleProductByOne(id, op) {
    let quant = this.state[id];
    if (op === 'inc') quant += 1;
    else quant -= 1;
    if (quant === 0) quant = 1;
    this.setState({ ...this.state, [id]: quant });
  };

  removeProductFromCart(id) {
    this.setState({ ...this.state, [id]: 0 });
  }


  render() {
    if (this.props.cartTable) return (
      <CartTable removeProductFromCart={this.removeProductFromCart} onByOneChange={this.handleProductByOne} items={this.state} />
    )
    else return (
      <Products items={this.state.data} inCart={this.state} onCartChange={this.handleCart} oneProduct={this.props.oneProduct}/>
    );
  }
};

class Products extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const products = this.props.items.map((c) => <Product inCart={this.props.inCart} key={c.id} item={c} onCartChange={this.props.onCartChange} />);

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
    let button;
    if (this.props.inCart[this.props.item.id] > 0) {
      button = <button className="product-add-cart product-add-cart--added" >Added to Cart</button>
    } else {
      button = <AddCart onCartChange={this.props.onCartChange} id={this.props.item.id}/>
    }

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
        {button}
      </div>
    );
  };
};


export default Cart;