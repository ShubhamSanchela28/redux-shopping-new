import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

import { connect } from "react-redux";

function Navbar({ cart }) {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    let count = 0;
    cart.forEach((item) => {
      count += item.qty;
    });

    setCartCount(count);
  }, [cart, cartCount]);

  const handleClick = () => {
    localStorage.removeItem("UsersLogin");
  };

  return (
    <>
      {/* <div>
        <Link to="/products">
          <h2>Redux Shopping Cart</h2>
        </Link>
        <Link to="/cart">
          <div>
            <h3>Cart</h3>
            <i class="fab fa-opencart"></i>
            <div>{cartCount}</div>
          </div>
        </Link>
      </div> */}
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a
                    className="nav-products nav-link active"
                    aria-current="page"
                    href="/products"
                  >
                    Products
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-products nav-link active"
                    aria-current="page"
                    href="/register"
                  >
                    Register
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-products nav-link active"
                    aria-current="page"
                    onClick={handleClick}
                  >
                    Logout
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="my-cart"
                  >
                    <NavLink className="nav-link" to="/cart">
                      <i class="fab fa-opencart"></i>{" "}
                      <span className="cart-count">{cartCount}</span>
                    </NavLink>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart,
  };
};

export default connect(mapStateToProps)(Navbar);
