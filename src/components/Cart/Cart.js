import React, { useEffect, useState } from "react";
import "./Cart.css"

import { connect } from "react-redux";
import CartItem from "./CartItem/CartItem";

function Cart({ cart }) {
  console.log(cart)
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [cartData, setCartData] = useState(cart, () => {
    const localData = localStorage.getItem("cartData")
    console.log(localData, ">>>>>>>>>>>>data cart")
    return localData ? JSON.parse(localData) : []
  })

  useEffect(() => {
    let items = 0;
    let price = 0;

    cart.forEach((item) => {
      items += item.qty;
      price += item.qty * item.price;
    });

    setTotalItems(items);
    setTotalPrice(price);
    localStorage.setItem("cartData", JSON.stringify(cartData))
    const cardta = localStorage.setItem("token", JSON.stringify(cartData))
    console.log(cartData)
    // const find = cardta.find(o => o.id)
    // console.log(find)
   const find = cartData.find(o => o.id > 0)
   console.log(find)
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