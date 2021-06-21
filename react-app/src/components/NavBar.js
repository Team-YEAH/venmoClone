import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './styles/NavBar.css'
import { useSelector } from 'react-redux';

const NavBar = () => {
  const user = useSelector(state => state.session.user)
  let sideButtons;
  if (user){
    sideButtons =
    <ul className="navItems">
      <li className="sideButtons">
        <NavLink to="/" exact={true} activeClassName="active">
          Home
        </NavLink>
      </li>
      {/* <li className="sideButtons">
        <NavLink to="/users" exact={true} activeClassName="active">
          Users
        </NavLink>
      </li> */}
      <li className="sideButtons">
        <LogoutButton />
      </li>
  </ul>
  } else {
    sideButtons =
    <ul className="navItems">
        <li className="sideButtons">
          <NavLink to="/" exact={true} activeClassName="active" className="button1 button">
            Home
          </NavLink>
        </li>
        <li className="sideButtons">
          <NavLink to="/login" exact={true} activeClassName="active" className="button2 button">
            Login
          </NavLink>
        </li>
        <li className="sideButtons">
          <NavLink to="/sign-up" exact={true} activeClassName="active" className="button2 button">
            Sign Up
          </NavLink>
        </li>
        {/* <li className="sideButtons">
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </li> */}
      </ul>
  }
  return (
    <nav className="navContainer">
      {sideButtons}
    </nav>
  );
}

export default NavBar;
