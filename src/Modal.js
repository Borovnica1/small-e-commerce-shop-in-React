import './App.css';
import React from 'react';
import { Link } from 'react-router-dom';

class Modal extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="modal">
        <div className="box">
          <h3>{this.props.name} successfully added to your cart!<i class="fas fa-check fa-lg"></i></h3>
          <div>
          <button className="modal-close" onClick={() => this.props.closeModal()}>Close <i class="fas fa-times-circle fa-lg"></i></button>
          <Link to="/cart" onClick={() => this.props.closeModal()}><button className="modal-checkout">Go to checkout <i class="fas fa-shopping-cart fa-lg"></i></button></Link>
          </div>
        </div>
      </div>
    )
  }
};

export default Modal;