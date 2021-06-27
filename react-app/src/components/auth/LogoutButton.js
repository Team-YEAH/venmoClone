import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"
import { logout } from "../../store/session";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onLogout = (e) => {
    setTimeout(async ()=>{
      await dispatch(logout());
    },0)
    history.push('/')
  };
  return <button className='logoutButton' onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
