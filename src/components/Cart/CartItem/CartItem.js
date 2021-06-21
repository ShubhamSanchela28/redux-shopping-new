import React, { useState } from "react";
import "../Cart.css";
import { connect } from "react-redux";
import {
  adjustItemQty,
  removeFromCart,
} from "../../../redux/Shopping/cart-action";

function CartItem({ item, adjustQty, removeFromCart }) {
  const [input, setInput] = useState(item.qty);
  const onChangeHandle = (e) => {
    setInput(e.target.value);
    adjustQty(item.id, e.target.value);
  };
  return (
    <div>
      {/* <img
        className="shoppingcart-img"
        width="200px"
        src={item.image}
        alt={item.title}
      />
      <div>
        <p className="title">{item.title}</p>
        <p>$ {item.price}</p>
      </div>
      <div>
        <div>
          <label htmlFor="qty">Qty</label>
          <input
            min="1"
            type="number"
            id="qty"
            name="qty"
            value={input}
            onChange={onChangeHandle}
          />
        </div>
        <button className="remove-cart" onClick={() => removeFromCart(item.id)}>
          <img
            src="https://image.flaticon.com/icons/svg/709/709519.svg"
            alt=""
          />
          <i class="fas fa-trash"></i>
          Delete
        </button>
      </div> */}
      <div class="container mt-5 mb-5">
        <div class="d-flex justify-content-center row">
          <div class="col-md-8">
            <div class="p-2">
            </div>
            <div class="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded">
              <div class="mr-1"><img class="rounded" src={item.image}
                alt={item.title} width="120px" /></div>
              <div class="d-flex flex-column align-items-center product-details"><span
                class="font-weight-bold"><h5>{item.title}</h5></span>
              </div>
              <div class="d-flex flex-row align-items-center qty">
                <h5 class="text-grey mt-1 mr-1 ml-1"><input
                  min="1"
                  type="number"
                  id="qty"
                  name="qty"
                  value={input}
                  onChange={onChangeHandle}
                  style={{ width: "60px" }}
                /></h5>
              </div>
              <div>
                <h5 class="text-grey">${item.price}</h5>
              </div> 
              <div class="d-flex align-items-center" style={{ cursor : "pointer" }} onClick={() => removeFromCart(item.id)}><i class="fa fa-trash mb-1 text-danger"></i></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    adjustQty: (id, value) => dispatch(adjustItemQty(id, value)),
    removeFromCart: (id) => dispatch(removeFromCart(id)),
  };
};

export default connect(null, mapDispatchToProps)(CartItem);
