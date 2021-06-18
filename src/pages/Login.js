import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Cookie from "js-cookie"
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useContext } from "react";
import AuthApi from "../AuthApi";

function Login() {
  const Auth = useContext(AuthApi)
  console.log(Auth)
  const history = useHistory();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleLoginChange = (event) => {
    setLogin((prevProps) => ({
      ...prevProps,
      [event.target.name]: event.target.value,
    }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Success Login");
  //   var loginemail = localStorage.getItem("email");
  //   var loginpass = localStorage.getItem("password");
  //   console.log("Email", loginemail);
  //   console.log("Password", loginpass);

  //   if (loginemail !== login.email || loginpass !== login.password) {
  //     alert("error");
  //   } else {
  //     // alert("Success");
  //     setLogin({ email: "", password: "" });
  //     history.push("/products");
  //   }
  // };
  const onSubmit = (e, data) => {
    e.preventDefault();
    const loginEmail = login.email;
    const loginPass = login.password;
    if (localStorage.getItem("UsersLogin")) {
      const allStoredUsers = JSON.parse(localStorage.getItem("UsersLogin"));
      const matchedUser = allStoredUsers.filter((user) => {
        return loginEmail === user.email && loginPass === user.password;
      });
      if (matchedUser.length) {
        console.log("Login successful");
        // alert("Login Successfull");
        localStorage.setItem("loginDetails",JSON.stringify(matchedUser))
        Cookies.set("user",{data});
        Auth.setAuth(true);
        setLogin({ email: "", password: "" });
        history.push("/products");
        window.location.reload(true);
      } else {
        console.log("Wrong credentials");
        alert("Wrong Credintials");
        setLogin({ email: "", password: "" });
      }
    }
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false)


  function loginn(e) {
    e.preventDefault()
    if (typeof (Storage) !== "undefined") {
      localStorage.setItem("email", login.email);
      localStorage.setItem("password", login.password);
      setIsLoggedIn(false)
      localStorage.setItem("isLoggedIn", isLoggedIn);
      if (localStorage.getItem("isLoggedIn")) {
        console.log("Congratulations " + localStorage.getItem("username") + ", you are now logged in.");
        setTimeout(function () {
          window.location.pathname = "/user";
        }.bind(this), 3500);
      }
    }
    else {
      console.log("No support for local storage");
    }
  }



  return (
    <>
      <div className="container vh-100">
        <div className="row justify-content-center h-100">
          <div className="card w-25 my-auto shadow">
            <div className="card-header text-center ">
              <h3>Login Form</h3>
            </div>
            <div className="card-body">
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor="">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={login.email}
                    onChange={handleLoginChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={login.password}
                    onChange={handleLoginChange}
                    className="form-control"
                  />
                </div>
                <input
                  type="submit"
                  value="Login"
                  className="btn btn-primary mt-4"
                />
                {/* <button onClick={loginn} >loginnnn</button> */}
                <p>
                  {" "}
                  Register<a href="/register"> Now? </a>
                </p>
              </form>
            </div>
            <div className="card-footer">
              <small>&copy; E-Commerce</small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
