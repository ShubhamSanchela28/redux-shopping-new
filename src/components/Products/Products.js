import React from "react";
import "./Products.css"

// Redux
import { connect } from "react-redux";

import Product from "./Product/Product"
import { useEffect } from "react";
const Products = ({ products }) => {

  return (
    <div className="products-container">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.shop.products,
  };
};

export default connect(mapStateToProps)(Products);

