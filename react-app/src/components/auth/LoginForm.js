import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import "./LoginForm.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const [errors, setErrors] = useState([]);
  const [auth, setAuth] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(auth, password));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  const updateAuth = (e) => {
    setAuth(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/profile" />;
  }

  return (
    <div className="LoginFormContainer">
      <form onSubmit={onLogin} className="FormBox">
        <div>
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
        <div>
          <label className="loginFormInput" htmlFor="auth">Email or Username</label>
          <input
            className="loginFormBoxes"
            name="auth"
            type="text"
            // placeholder="Email/Username"
            value={auth}
            onChange={updateAuth}
          />
        </div>
        <div>
          <label className="loginFormInput" htmlFor="password">Password</label>
          <input
            className="loginFormBoxes"
            name="password"
            type="password"
            placeholder="••••••"
            value={password}
            onChange={updatePassword}
          />
          <button className="loginButton" type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
