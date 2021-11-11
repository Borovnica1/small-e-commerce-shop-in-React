import React from 'react';
import './App.css';

import OnlyProduct from './Product';
import AddCart from './AddToCart';
import { Link } from 'react-router-dom';

class Products extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let products;
    let product;
    let categories;

    if (this.props.items) {
      products = this.props.items.map((c) => <Product inCart={this.props.inCart} key={c.id} item={c} onCartChange={this.props.onCartChange} />);

      product = <OnlyProduct inCart={this.props.inCart} items={this.props.items} onCartChange={this.props.onCartChange} />;

      categories = this.props.categories.map((c) => <Option category={c} />)
    };
    
    if (this.props.oneProduct) return (
      <div className="products-grid">
        {product}
      </div>
    );
    else return (
      <div className="products-grid">
        {/* Make dropdown select component? */}
          <select onChange={() => this.props.sortDataBy(document.querySelector('.sort-dropdown').value)} className="sort-dropdown" name="sort-dropdown" id="sort-dropdown">
            <option value="default">Sort by: Default</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="lowTitle">Name: A-Z</option>
            <option value="highTitle">Name: Z-A</option>
          </select>

          <select onChange={() => this.props.sortByCategory(document.querySelector('.category-dropdown').value)} className="category-dropdown" name="category-dropdown" id="sort-dropdown">
            <option value="/">Category: All</option>
            {categories}
          </select>
        {products}
      </div>
    ); 
  };
};

function Option(props) {
  return (
    <option value={'/category/'+props.category}>Category: {props.category}</option>
  )
}

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

export default Products;