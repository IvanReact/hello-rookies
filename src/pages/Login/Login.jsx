import {React, useState} from "react";
import "./style.scss";

import emailOfc from "../../images/emailOfc.png";
import icon2 from "../../images/icon2.png";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logovanje = () => {
    fetch("https://api-mock.avanturista.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (typeof res === "string") {
          alert("Entered username and/or password is incorrect, please repeat the entry!");
        }
        if (typeof res === "object") {
          localStorage.setItem("token", res.accessToken);
          props.setToken(res.accessToken)
        }
      });
  };

  return (
    <>
      <div className="loginWrapper">

        <div className="loginDarkDiv">
          <div className="textDiv">
            <p> <span>H</span>ELLO <span>R</span>OOKIES <br /> WELCOME TO WORLD OF OPPORTUNITIES! </p>
          </div>
        </div>

        <div className="loginLightDiv">
          <h1>SIGN IN</h1>
          
          <div className="signInDiv">
            <input id="inputEmail" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <img src={emailOfc} alt="" />
          </div>

          <div className="signInDiv">
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <img src={icon2} alt="" />
          </div>

          <button onClick={logovanje}>LOGIN</button>

        </div>
      </div>
    </>
  );
};

export default Login;
