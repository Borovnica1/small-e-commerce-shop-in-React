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
  console.log('WRTFF', props.items, product);
  let button;
  if (product && product.id in props.inCart) {
    console.log('PROIVODDDD JE U KORPIII')
    button = <button className="product-add-cart product-add-cart--added" >Added to Cart</button>
  } else {
    console.log('PROIVODDDD nije U KORPIII')
    button = <AddCart onCartChange={props.onCartChange} id={params.id}/>
  }

  console.log('IMAMO ID:', params.id, product, button);
  if (params.id && product) return (
    <div className="product product--only">
      <img src={product.image} />
    <div className="product-name-price">
        <h3 className="product-name">{(product.title).length < 40 ? product.title : (product.title).slice(0, 40) + '...'}</h3>
        <h3 className="product-price">${product.price}</h3>
    </div>
    <h3 className="product-desc">{product.description}</h3>
    <h3 className="product-rating">rating: {product.rating.rate}</h3>
    {button}
  </div>
  );
  else return (
    <div style={{color: 'red', padding: '30px'}}>Product ????</div>
    /* DODAJ LOADER */
  )
}


export default Product;