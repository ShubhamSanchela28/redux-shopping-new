import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Register() {
  const history = useHistory();
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    setState((prevProps) => ({
      ...prevProps,
      [event.target.name]: event.target.value,
    }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Succeess");
  //   localStorage.setItem("email", state.email);
  //   localStorage.setItem("password", state.password);
  //   setState({ email: "", password: "" });
  //   history.push("/login")
  // };

  const onSubmit = (e) => {
    e.preventDefault();
    let storedUsers = localStorage.UsersLogin
      ? JSON.parse(localStorage.UsersLogin)
      : [];
    const userData = {
      email: state.email,
      password: state.password,
    };
    storedUsers.push(userData);
    console.log(userData)
    localStorage.setItem("UsersLogin", JSON.stringify(storedUsers));
    const id = '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem("token",id)
    console.log(id)
    console.log("Registration Successfull!!");
    setState({ email: "", password: "" });
    history.push("/");
  };

  return (
    <>
      <div className="container vh-100">
        <div className="row justify-content-center h-100">
          <div className="card w-25 my-auto shadow">
            <div className="card-header text-center ">
              <h3>Registration Form</h3>
            </div>
            <div className="card-body">
              <form action="" onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor="">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={state.email}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={state.password}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
                <input
                  type="submit"
                  value="SignUp"
                  className="btn btn-primary mt-4"
                />
                <p>
                  Already have account ?<a href="/login"> Sign in</a>
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

export default Register;
