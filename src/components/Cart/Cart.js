import React, { useEffect, useState } from "react";
import "./Cart.css"
import { connect } from "react-redux";
import CartItem from "./CartItem/CartItem";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link, NavLink
} from "react-router-dom";
import Checkout from "../Checkout/Checkout";


function Cart({ cart }) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  // const [cartData, setCartData] = useState([])

  // console.log(cartData)
  console.log("hhhhhhhhhhhhhhhhhhh", cart)

  useEffect(() => {
    let items = 0;
    let price = 0;

      cart.forEach((item) => {
        items += item.qty;
        price += item.qty * item.price;
      });


    setTotalItems(items);
    setTotalPrice(price);



    // if (cartData.length) {
    //   localStorage.setItem("cartData", JSON.stringify(cartData))
    // } else {
    //   if (cart?.length) {
    //     setCartData(cart)
    //   } else setCartData(JSON.parse(localStorage.getItem("cartData") || "[]" ))
    // }

  }, [cart, totalPrice, totalItems, setTotalPrice, setTotalItems]);

  return (
    <div >
      <h1> <b>Cart Summary</b> </h1>
      {cart.length ? <div>
        <div className="shopping-cart">
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <div >
          <div className="shopping-cart__checkout">
            <span className="total">TOTAL: ({totalItems} items)</span>
            <span>${totalPrice}</span>
          </div>
          <NavLink className="nav-link " to="/checkout">
            <button className="checkout-btn" >
              Procced to Checkout
            </button>
          </NavLink>
        </div>
      </div> : <div>
        <div className="cart-empty">Your Cart is Empty! Please Add Products</div>
        <a class="navbar-brand" href="/products" >Add Some Products</a>
      </div>}

    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
  };
};

export default connect(mapStateToProps,)(Cart);