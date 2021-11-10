import logo from './logo.svg';
import './App.css';
import React from 'react';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.handleCart = this.handleCart.bind(this);
    this.state = {};
  };

  handleCart(name, quantity) {
    let quant = name in this.state ? this.state[name] : 0;
    quant += quantity;
    this.setState({ ...this.state, [name]: quant });
  }


  render() {
    console.log('HANDLUJEM CARTTTTT', this.props.items, this.props.id);

    return (
      <Products items={this.props.items} onCartChange={this.handleCart} />
    );
  }
};

class AddCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  handleAddToCart(e) {
    e.preventDefault();
    this.props.onCartChange(this.props.id, 1)
  }

  render() {
    return (
      <btn className="product-add-cart" onClick={this.handleAddToCart}>Add to Cart</btn>
    );
  }
};

class Product extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="product">
        <a className="product-img" href="/productPage">
          <img src={this.props.item.image} />
        </a>
        <div className="product-name-price">
          <a href="/productPage">
            <h3 className="product-name">{(this.props.item.title).length < 40 ? this.props.item.title : (this.props.item.title).slice(0, 40) + '...'}</h3>
          </a>
          <h3 className="product-price">{this.props.item.price}</h3>
        </div>
        <AddCart onCartChange={this.props.onCartChange} id={this.props.item.id}/>
      </div>
    );
  };
};

class Products extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const products = this.props.items.map((c) => <Product item={c} onCartChange={this.props.onCartChange} />);

    return (
      <div className="products-grid">
        {products}
      </div>
    );
  };
};

class App extends React.Component {
  state = {
    data: [],
    id: 0,
  }

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

  render() {
    const data = this.state.data;
    console.log('IDEMO DATAAAA', data);
    return (
      <div className="App">
        <Cart items={data} id={this.state.id} />

      </div>
    );

  }
  
};

export default App;
