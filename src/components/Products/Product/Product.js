import React from "react";
import { Link } from "react-router-dom";
import "./Product.css"

import { connect } from "react-redux";
import {
  addToCart, loadCurrentItem
} from "../../../redux/Shopping/shopping-action";

const Product = ({ product, addToCart, loadCurrentItem }) => {
  console.log(loadCurrentItem)
  console.log(product)
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

  export default connect(null, mapDispatchToProps)(Product);