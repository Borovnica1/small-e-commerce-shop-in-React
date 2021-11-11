import logo from './logo.svg';
import './App.css';
import React from 'react';

import Nav from './Nav';
import ProductLol from './Product';
import { BrowserRouter, Routes, Route, Switch, Link } from 'react-router-dom';
import Cart from './Cart';
import Products from './Products';
import Modal from './Modal';

class App extends React.Component {

  /* maybe keep here state data of products instead in Cart component*/

  constructor(props) {
    super(props);
    this.handleCart = this.handleCart.bind(this);
    this.handleProductByOne = this.handleProductByOne.bind(this);
    this.removeProductFromCart = this.removeProductFromCart.bind(this);
    this.sortDataBy = this.sortDataBy.bind(this);
    this.sortByCategory = this.sortByCategory.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      allProducts: [],
      data: [],
      categories: [],
    };
  };

  componentDidMount() {
    const url = 'https://fakestoreapi.com/products';
    const url2 = 'https://fakestoreapi.com/products/categories';
    Promise.all([fetch(url).then(result => result.json()), fetch(url2).then(result => result.json())]).then((result) => {
        this.setState({
          allProducts: result[0],
          data: result[0],
          categories: result[1]
        })
      });
  };

  sortByCategory(type) {
    const url = `https://fakestoreapi.com/products${type}`;
    fetch(url)
      .then((result) => result.json())
      .then((result) => {
        this.setState({
          data: result,
        })
      });
  }

  sortDataBy(type) {
    let newData;
    const propComparator = (propName, dir) => {
      if (dir === 'up') return (a, b) => a[propName] == b[propName] ? 0 : a[propName] < b[propName] ? -1 : 1;
      return (a, b) => a[propName] == b[propName] ? 0 : a[propName] < b[propName] ? 1 : -1;
    }
    switch (type) {
      case 'default': newData = this.state.data.sort(propComparator('id', 'up')); break;
      case 'low': newData = this.state.data.sort(propComparator('price', 'up')); break;
      case 'high': newData = this.state.data.sort(propComparator('price', 'down')); break;
      case 'lowTitle': newData = this.state.data.sort(propComparator('title', 'up')); break;
      case 'highTitle': newData = this.state.data.sort(propComparator('title', 'down')); break;
    }
    this.setState({
      data: newData,
    });
  };

  handleCart(id, quantity) {
    let quant = id in this.state ? this.state[id] : 0;
    quant += quantity;
    const name = (this.state.allProducts.find(el => el.id == id)).title;
    this.setState({ ...this.state, [id]: quant , justBought: name});
    const modal = document.querySelector('.modal');
    modal.classList.add('modal--active');
  };

  closeModal() {
    const modal = document.querySelector('.modal');
    modal.classList.remove('modal--active');
  }

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
    let sumOfProducts = 0;
    for (let el of Object.keys(this.state)) {
      if (typeof Number(this.state[el]) === 'number' && this.state[el] > 0) {
        sumOfProducts += Number(this.state[el]);
      };
    }


    return (
      <BrowserRouter>
        <div className="App">
          <Modal closeModal={this.closeModal} name={this.state.justBought}/>
          <Nav productsCnt={sumOfProducts} />
          <Routes>
            <Route path="/" element={<Products oneProduct={false} items={this.state.data} inCart={this.state} onCartChange={this.handleCart} sortDataBy={this.sortDataBy} sortByCategory={this.sortByCategory} categories={this.state.categories} />}/>
            <Route path="/products" element={<Products oneProduct={false} items={this.state.data} inCart={this.state} onCartChange={this.handleCart} sortDataBy={this.sortDataBy} sortByCategory={this.sortByCategory} categories={this.state.categories} />} />
            <Route path="/product" element={<Products oneProduct={true} items={this.state.data} inCart={this.state} onCartChange={this.handleCart} />}>
              <Route path=":id" />
            </Route>
            <Route path="/cart" element={<Cart oneProduct={false} inCart={this.state} removeProductFromCart={this.removeProductFromCart} handleProductByOne={this.handleProductByOne} allProducts={this.state.allProducts} />}/>
          </Routes>
        </div>
      </BrowserRouter>
    );

  }
  
};

export default App;
