import React, { useEffect, useState } from "react";
import "./Cart.css"

import { connect } from "react-redux";
import CartItem from "./CartItem/CartItem";

function Cart({ cart }) {
    console.log(cart)
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
  
    useEffect(() => {
      let items = 0;
      let price = 0;
  
      cart.forEach((item) => {
        items += item.qty;
        price += item.qty * item.price;
      });
  
      setTotalItems(items);
      setTotalPrice(price);
    }, [cart, totalPrice, totalItems, setTotalPrice, setTotalItems]);
  
  return (
    <div >
      <div className="shopping-cart">
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <div >
        <h4 >Cart Summary</h4>
        <div className="shopping-cart__checkout">
          <span className="total">TOTAL: ({totalItems} items)</span>
          <span>${totalPrice}</span>
        </div>
        {/* <button className="checkout-btn" >
          Proceed To Checkout
        </button> */}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
    return {
      cart: state.shop.cart,
    };
  };
  
  export default connect(mapStateToProps)(Cart);