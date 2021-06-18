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
import Cookies from "js-cookie"
import { useEffect } from "react";
import AuthAPi from "./AuthApi"
import { useState } from "react";
import { useContext } from "react";
import AuthApi from "./AuthApi";
import Footer from "./components/Footer/Footer";
import Checkout from "./components/Checkout/Checkout";

function App({ currentItem }) {
  const [auth, setAuth] = useState(false)
  useEffect(() => {
    readCookie()
  })
  const readCookie = () => {
    const user = Cookies.get("user");
    if (user) {
      setAuth(true);
    }
  };
  const Auth = useContext(AuthAPi)
  return (
    <AuthAPi.Provider value={{ auth, setAuth }} >
      <Router>
        <div className="App">
          <Navbar auth={setAuth} />
          {/* <Switch>
            <PrivateRoute exact path="/"  component={Products} />
            <PrivateRoute exact path="/cart" component={Cart} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            {!currentItem ? (
              <Redirect to="/" />
            ) : (
              <Route exact path="/product/:id" component={SingleItem} />
            )}
          </Switch> */}
          <Routes />
          <Footer />
        </div>
      </Router>
    </AuthAPi.Provider>
  );
}

const mapStateToProps = (state) => {
  return {
    currentItem: state.shop.currentItem,
  };
};

const Routes = ({ currentItem }) => {
  const Auth = useContext(AuthApi);
  return (
    <Switch>
      <ProtectedLogin exact path="/login" auth={Auth.auth} component={Login} />
      <ProtectedRoute
        path="/products"
        auth={Auth.auth}
        component={Products}
      />
      <Route
        path="/register"
        auth={Auth.auth}
        component={Register}
      />
      {currentItem ? (
        <Redirect to="/products" />
      ) : (
        <Route exact path="/product/:id" component={SingleItem} />
      )}
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/checkout" component={Checkout} />
      <Route exact path="/" component={Login} />
    </Switch>
  );
};

const ProtectedRoute = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => (auth ? <Component /> : <Redirect to="/login" />)}
    />
  );
};

const ProtectedLogin = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => (!auth ? <Component /> : <Redirect to="/products" />)}
    />
  );
};


export default connect(mapStateToProps)(App);
