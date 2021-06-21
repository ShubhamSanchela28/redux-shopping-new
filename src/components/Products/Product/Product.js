import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Product.css"

import { connect } from "react-redux";
import {
  loadCurrentItem
} from "../../../redux/Shopping/shopping-action";
import {
  addToCart
} from "../../../redux/Shopping/cart-action";
import Cookies from "js-cookie";

const Product = ({ product, addToCart, loadCurrentItem, cart, onLoad }) => {
  console.log(cart)
  console.log(product)

  useEffect(() => {
  },[])
  return (
    <div >
      <img
        className="product-img"
        src={product.image}
        alt={product.title}
      />

      <div  >
        <p className="title" >{product.title}</p>
        <p className="price">$ {product.price}</p>
      </div>

      <div >
        <Link to={`/product/${product.id}`}>
          <button
            onClick={() => loadCurrentItem(product)}
            className="product-btn"
          >
            View Item
          </button>
        </Link>
        <button
          className="product-btn"
          onClick={() => addToCart(product.id)}

        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => dispatch(addToCart(id)),
    loadCurrentItem: (item) => dispatch(loadCurrentItem(item)),
  };
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);