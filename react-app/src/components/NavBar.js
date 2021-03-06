import React, {useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './styles/NavBar.css'
import { useSelector, useDispatch } from 'react-redux';
import logo from './img/Doughmo.png'

const NavBar = () => {

  const user = useSelector(state => state.session.user)

  let sideButtons;
  if (user){
    sideButtons =
    <ul className="navItems">
      <li className="sideButtons">
      <a href='/'><img className='doughmologo' src={logo}></img></a>
      </li>
      <li className="sideButtons">
        <NavLink to="/requests" exact={true} className="navbarLinks">Pending</NavLink>
      </li>
      <li className="sideButtons">
        <NavLink to="/transaction-form/request" exact={true} className="navbarLinks">Request Money</NavLink>
      </li>
      <li className="sideButtons">
        <NavLink to="/transaction-form" exact={true} className="navbarLinks">Send Money</NavLink>
      </li>
      <li className="sideButtons">
        <NavLink to="/profile" exact={true} className="navbarLinks" activeClassName="active">
          {user.full_name}
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
    <ul className="navItems2">
        <li className="sideButtons">
          <NavLink to="/" exact={true} activeClassName="active" className="button1 button">
            Home
          </NavLink>
        </li>
        <div className='loginsignupButtons'>
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
        </div>
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
