import react from 'react';
import React from 'react';
import './App.css';

class CartTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let sumPrice = 0;
    let cartRows;
    let thereAreItemsInCart = false;
    if (Object.keys(this.props.items).length > 1) {
      cartRows = Object.keys(this.props.items).map(el => {
        if (el != 'data' && this.props.items[el] > 0) {
          thereAreItemsInCart = true;
          const product = this.props.items.data.find(x => x.id == el);
          const amountOfThisProduct = this.props.items[el];
          sumPrice += product.price * amountOfThisProduct;
          return <CartRow removeProductFromCart={this.props.removeProductFromCart} onByOneChange={this.props.onByOneChange} quant={amountOfThisProduct} item={product}/>
        }
      });
    } 

    if (thereAreItemsInCart) cartRows.push(React.createElement(
      'h3',
      null,
      `Ukupno: $${Math.round(sumPrice * 100) / 100}`
    ))
    else cartRows = 'There are no items in Cart';

    return (
      <div className="cart-table">
        {cartRows}
      </div>
    )
  }
};

function CartRow(props) {

  return (
    <div className="cart-row">
      <img src={props.item.image} />
      <h3>{(props.item.title).length < 40 ? props.item.title : (props.item.title).slice(0, 40) + '...'}</h3>
      <h3>${Math.round((props.item.price * props.quant) * 100) / 100}</h3>
      <h3><IncrementByOne onByOneChange={props.onByOneChange} id={props.item.id} /> {props.quant} <DecrementByOne onByOneChange={props.onByOneChange} id={props.item.id} /></h3>
      <DeleteRow removeProductFromCart={props.removeProductFromCart} id={props.item.id} />
    </div>
  )
};

function DeleteRow(props) {
  return (
    <span className="cart-close" onClick={() => props.removeProductFromCart(props.id)}>CLOSE</span>
  );
};

function IncrementByOne(props) {
  return (
    <span className="cart-increment" onClick={() => props.onByOneChange(props.id, 'inc')}>UP</span>
  );
};
 
function DecrementByOne(props) {
  return (
    <span className="cart-decrement" onClick={() => props.onByOneChange(props.id, 'dec')}>DOWN</span>
  );
};

export default CartTable;