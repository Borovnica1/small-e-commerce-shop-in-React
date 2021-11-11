import React from 'react';
import './App.css';

import { useParams } from "react-router-dom";
import AddCart from './AddToCart';


function getProduct(id, items) {
  return items.find((el) => el.id === id);
};

function Product(props) {
  let params = useParams();
  const product = getProduct(Number(params.id), props.items);
  let button;
  if (product && props.inCart[product.id] > 0) {
    button = <button className="product-add-cart product-add-cart--added" >Added to Cart</button>
  } else {
    button = <AddCart onCartChange={props.onCartChange} id={params.id}/>
  }

  if (params.id && product) return (
    <div className="product product--only">
      <img src={product.image} />
    <div className="product-name-price">
        <h3 className="product-name">{(product.title).length < 40 ? product.title : (product.title).slice(0, 40) + '...'}</h3>
        <h3 className="product-price">${product.price}</h3>
    </div>
    <h3 className="product-desc">{product.description}</h3>
    <h3 className="product-rating">Rating: <i class="fas fa-star"></i> {product.rating.rate}</h3>
    {button}
  </div>
  );
  else return (
    <div style={{color: 'red', padding: '0px'}}>Product ????</div>
    /* DODAJ LOADER */
  )
}


export default Product;