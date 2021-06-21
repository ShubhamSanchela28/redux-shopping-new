import React from 'react'
import "./SingleItem.css"
import { connect } from "react-redux";
import { addToCart } from "../../redux/Shopping/cart-action";

function SingleItem({ currentItem, addToCart }) {
    console.log(currentItem)
    return (
        <div >
      <img
        className="item-img"
        src={currentItem.image}
        alt={currentItem.title}
      />
      <div >
        <p className="title">{currentItem.title}</p>
        <p className="description">{currentItem.description}</p>
        <p className="price">$ {currentItem.price}</p>

        <button
          className="product-btn"
          onClick={() => addToCart(currentItem.id)}
        >
          Add To Cart
        </button>
      </div>
    </div>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
      currentItem: state.shop.currentItem,
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
      addToCart: (id) => dispatch(addToCart(id)),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(SingleItem);
  
