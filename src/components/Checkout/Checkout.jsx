import React, { useState } from 'react'
import { useEffect } from 'react';
import { connect } from "react-redux";
import { adjustItemQty, removeFromCart } from '../../redux/Shopping/cart-action';
import StripeCheckout from 'react-stripe-checkout';

function Checkout({ cart, removeFromCart }) {
    console.log(cart)
    const [carData, setCartData] = useState(cart)
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
    }, [cart, totalPrice, totalItems, setTotalPrice, setTotalItems])

    const handleToken = (token, addresses) => {
        console.log({ token, addresses })
        alert("Dummy Payment Success!")
        setCartData({ cart : "" })
        window.location.reload()
    }

    return (
        <div>
            <h1> <b>Checkout Summary</b> </h1>
            {cart.length ? <div>
                {cart.map((item) => (
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
                            <button className="remove-cart" onClick={() => removeFromCart(item.id)}>
                                <i class="fas fa-trash"></i>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
                <StripeCheckout
                    stripeKey="pk_test_51Ih9ajSF5EDKEgjxD3uc0PbLJmc8qScCSNNf8RDH1kPCHsj8QbLHlHA18NJsy7rRgnnbPglGD0qfl0ALiuwH2IeK00wBK7X0BR"
                    label="Pay Now"
                    name='E-Cart Shopping'
                    billingAddress
                    shippingAddress
                    image='https://svgshare.com/i/QaG.svg'
                    description={`Your total is ${totalPrice}`}
                    // amount={priceForStripe}
                    panelLabel="Pay Now"
                    token={handleToken}
                />
                <div >
                    <div className="shopping-cart__checkout">
                        <span className="total">TOTAL: ({totalItems} items)</span>
                        <span>${totalPrice}</span>
                    </div>
                </div>
            </div> : <div>
                <h3>You Dont have any products!</h3>
                <a class="navbar-brand" href="/products" >Add Some Products</a>
            </div>}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart.cart,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        adjustQty: (id, value) => dispatch(adjustItemQty(id, value)),
        removeFromCart: (id) => dispatch(removeFromCart(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
