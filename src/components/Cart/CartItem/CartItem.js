import React, { useState } from "react";
import "../Cart.css";
import { connect } from "react-redux";
import {
  adjustItemQty,
  removeFromCart,
} from "../../../redux/Shopping/shopping-action";

function CartItem({ item, adjustQty, removeFromCart }) {
  console.log(item, "??????????");
  const [input, setInput] = useState(item.qty);
  const onChangeHandle = (e) => {
    setInput(e.target.value);
    adjustQty(item.id, e.target.value);
  };
  return (
    <div>
      <img
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
          {/* <img
            src="https://image.flaticon.com/icons/svg/709/709519.svg"
            alt=""
          /> */}
          <i class="fas fa-trash"></i>
          Delete
        </button>
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
