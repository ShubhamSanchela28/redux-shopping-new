import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import cartData from "../components/Cart/Cart"
console.log(cartData);
function Register() {
  const history = useHistory();
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    //   (function() { // Scoping function to avoid creating globals
    //     // Loading
    //     var users = JSON.parse(localStorage.getItem("users") || "[]");
    //     console.log("# of users: " + users.length);
    //     users.forEach(function(user, index) {
    //         console.log("[" + index + "]: " + user.id);
    //     });

    //     // Modifying
    //     var user = {
    //         id: Math.floor(Math.random() * 1000000)
    //     };
    //     users.push(user);
    //     console.log("Added user #" + user.id);

    //     // Saving
    //     localStorage.setItem("users", JSON.stringify(users));
    // })();

    const register = JSON.parse(localStorage.getItem("UsersLogin") || "[]")
    const regito = register.map((reg) => reg.email)
    console.log(regito)

    const emailto = state.email
    const main = regito.indexOf(emailto)

    if (main < 0) {
    } else {
      alert("This email is already exists : Please try with different email")
      setState({ email: "", password : "" })
      return
    }
  })

  const handleInputChange = (event) => {
    setState((prevProps) => ({
      ...prevProps,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = (e) => {

    const token = '_' + Math.random().toString(36).substr(2, 9)

    e.preventDefault();
    let storedUsers = localStorage.UsersLogin
      ? JSON.parse(localStorage.UsersLogin)
      : [];
    const userData = {
      email: state.email,
      password: state.password,
      id: token,
      cart: cartData
    };
    storedUsers.push(userData);
    console.log(userData.id)
    localStorage.setItem("UsersLogin", JSON.stringify(storedUsers));
    console.log(token)
    console.log("Registration Successfull!!", storedUsers);
    setState({ email: "", password: "" });
    history.push("/login");
  };

  const getId = () => {

    if (localStorage.getItem("UsersLogin")) {
      const userid = localStorage.getItem("UsersLogin")
      const uid = JSON.parse(userid)
      console.log(uid.length);
      const particularID = uid.forEach(function (user, index) {
        console.log("[" + index + "]: " + user.id);
      });
    }
    else return
  }

  // const onSubmit = (e) => {
  //   e.preventDefault()
  //   const e_mail = document.getElementById("email").value
  //   const pass_word = document.getElementById("password").value

  //   if (!e_mail || !pass_word) {
  //     return alert("you need to fill up all the forms.");
  //   }
  //   let user_data = {
  //     email: e_mail,
  //     password: pass_word
  //   }
  //   let user_data_str = JSON.stringify(user_data);
  //   let clientsArr = JSON.parse(localStorage.getItem('users')) || [];
  //   const userExists = clientsArr.find(user => JSON.stringify(user) === user_data_str);
  //   if (userExists) {
  //     return alert("User already Exists");
  //   }
  //   clientsArr.push(user_data);
  //   //save to localStorage
  //   localStorage.setItem("users", JSON.stringify(clientsArr));
  //   return alert("Account Created!");
  // }

  const del = () => {
    // const particularID = uid.forEach(function (user, index) {
    //   console.log("[" + index + "]: " + user.id);
    // });

    // const itemremove = "_5b1jbbqul"
    // console.log(itemremove);
    // const del = uid.filter(u => u.id !== itemremove)
    // console.log(del);
    // uid.push(del)
    // localStorage.setItem("UsersLogin", JSON.stringify(uid))
    // const id = '_' + Math.random().toString(36).substr(2, 9);
    // localStorage.setItem("token", id)
    // const userData = {
    //   email: state.email,
    //   password: state.password,
    //   id: id
    // };
    // const localitem = localStorage.getItem("UsersLogin")
    // const obj = JSON.parse(localitem)
    // const deletee = obj.filter(item => item.id !== "_2prhrrw09");
    // console.log(deletee, "suc")
  }

  const users = [
    {
      username: 'harry123',
      password: '1234567A',
      accountName: 'harry123'
    },
    {
      username: 'datngo234',
      password: '1234567A',
      accountName: 'datngo234'
    }
  ]

  var isValidUserName = true
  var isValidPass = true
  var isValidPassConfirm = true

  const btnSignUp = () => {
    if (isValidUserName && isValidPass && isValidPassConfirm) {
      let temp = localStorage.getItem("signup")
      if (temp == null) {
        localStorage.setItem("signup", `${state.email};${state.password}`)
      } else {
        localStorage.setItem('signup', `${temp}-${state.email};${state.password}`)
      }
      localStorage.setItem('login', `1;${JSON.stringify(state)}`);
    }
  }

  function updateUsersAccount() {
    let temp = localStorage.getItem('signup');
    if (temp == null)
      return;

    let accounts = temp.split('-');

    accounts.forEach(account => {
      let temp = account.split(';')
      users.push({
        email: temp[0],
        password: temp[1],
      })
    })
  }

  const btnLogin = () => {
    updateUsersAccount()
  }

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
                    id="email"
                    value={state.email}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={state.password}
                    onChange={handleInputChange}
                    className="form-control"
                    required
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
              {/* <button onClick={getId} >GetID</button> */}
              {/* <button onClick={del} >Del</button> */}
              {/* <button onClick={btnSignUp} >SignUp</button> */}
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
