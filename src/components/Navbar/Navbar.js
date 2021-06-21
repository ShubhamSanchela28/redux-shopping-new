import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link, NavLink
} from "react-router-dom";
import "./Navbar.css";
import { useHistory } from "react-router-dom";

import { connect } from "react-redux";
import Cookies from "js-cookie";

function Navbar({ cart, setAuth }) {
  const [cartCount, setCartCount] = useState(0);
  const [userDetail, setUserDetail] = useState()

  useEffect(() => {
    let count = 0;
    if(cart){
    cart.forEach((item) => {
      count += item.qty;
    });
  }

    setCartCount(count);

    const login = JSON.parse(localStorage.getItem("loginDetails") || "[]")
    const loginto = login.map((log) => log.email)
    console.log(loginto)

    const register = JSON.parse(localStorage.getItem("UsersLogin") || "[]")
    const regito = register.map((reg) => reg.email)
    console.log(regito)
    
    for (let i = 0; i < loginto.length; i++) {
      for (let j = 0; j < regito.length; j++) {
        if (loginto[i].loginto === regito[j].regito) {
          const usermail = loginto[i]
          setUserDetail(usermail)
          console.log(usermail, "4444444444444444")
        }
      }
    }
  }, [cart, cartCount]);

  const handleClick = () => {
    localStorage.removeItem("UsersLogin");
  };

  const del = () => {
    if (localStorage.getItem("UsersLogin") === null) {
      return []
    } else {
      const userid = localStorage.getItem("UsersLogin")
      const uid = JSON.parse(userid)
      console.log(uid);

      var index = uid.indexOf(1)
      uid.splice(index, 1)
      localStorage.setItem("UsersLogin", JSON.stringify(uid))
    }
  }

  const logout = () => {
    Cookies.remove("user")
    localStorage.removeItem("loginDetails")
  }

  const cartt = () => {
    const cartCookie = Cookies.get("user")
    if (cartCookie) {
      setAuth(true)
    }
  }
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
            <a class="navbar-brand" href="/products" >E-Cart Shopping</a>
            <a class="navbar-brand" href="/products" >{userDetail ? <div><i class="fas fa-user-circle"></i> {userDetail}</div> : null}</a>
            <div class="d-flex">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item ">
                  {!Cookies.get("user") ? null : <a
                    className="nav-link active"
                    aria-current="page"
                    href="/cart"
                  >
                    <NavLink className="nav-link " to="/cart">
                      <i class="fab fa-opencart"></i>{" "}
                      <span className="cart-count">{cartCount}</span>
                    </NavLink>
                  </a>}
                </li>
                {Cookies.get("user") ?
                  <li className="nav-item">
                    <a
                      className="nav-products nav-link active"
                      aria-current="page"
                      href="/login"
                      onClick={logout}
                    >
                      <button className="btn btn-danger">Logout</button>
                    </a>
                  </li> : null
                }
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
    cart: state.cart.cart,
  };
};

export default connect(mapStateToProps)(Navbar);
