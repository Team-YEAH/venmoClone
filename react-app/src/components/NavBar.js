import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './styles/NavBar.css'

const NavBar = () => {
  return (
    <nav className="navContainer">
      <ul className="navItems">
        <li className="sideButtons">
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
        <li className="sideButtons">
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </li>
        <li className="sideButtons">
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
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
    </nav>
  );
}

export default NavBar;
