import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import SingleItem from "./components/SingleItem/SingleItem";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./components/Cart/Cart";
import Products from "./components/Products/Products";

import { connect } from "react-redux";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./PrivateRoute";
import Cookie from "js-cookie"
import { useEffect } from "react";

function App({ currentItem }) {

  useEffect(() => {
    const token =  Cookie.get("token") ? Cookie.get("token") : null;
    Cookie.set("token", token);
  })

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <PrivateRoute exact path="/products" component={Products} />
          <PrivateRoute exact path="/cart" component={Cart} />
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          {!currentItem ? (
            <Redirect to="/" />
          ) : (
            <Route exact path="/product/:id" component={SingleItem} />
          )}
        </Switch>
      </div>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    currentItem: state.shop.currentItem,
  };
};

export default connect(mapStateToProps)(App);
