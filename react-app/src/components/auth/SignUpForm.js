import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import "./SignUpForm.css"

const SignUpForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [full_name, setFullName] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword && phonenumber.length === 11) {
      const data = await dispatch(signUp(username, email, password, full_name, phonenumber, profileImage));
      if (data.errors){
        setErrors(data.errors)
      }
    }

    if(password !== repeatPassword && phonenumber.length !== 11){
      return setErrors(['Passwords do not match!', 'Phone number must be 11 digits'])
    } else if (password !== repeatPassword){
      return setErrors(['Passwords do not match!'])
    } else {
      return setErrors(['Phone number must be 11 digits'])
    }

  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateFullName = (e) => {
    setFullName(e.target.value)
  }

  const updatePhoneNumber = (e) => {
    setPhoneNumber(e.target.value)
  }

  const updateProfileImage = (e) => {
    const file = e.target.files[0]; /* grabs first file and setting as profile image*/
    if (file) setProfileImage(file)
  }

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="SignUpFormContainer">
      <form className='SignUpFormBox' onSubmit={onSignUp}>
        <div className='errors3'>
          {errors.map((error, idx) => (
            <div key={idx}>{error}</div>
          ))}
        </div>
        <div>
          <div className="signUp-header-container">
            <h1>Sign-Up</h1>
          </div>
          <label className="SignUpFormInput">Full Name</label>
          <input
            className="SignUpFormBoxes"
            type="text"
            name="fullname"
            onChange={updateFullName}
            value={full_name}
          ></input>
        </div>
        <div>
          <label className="SignUpFormInput">User Name</label>
          <input
            className="SignUpFormBoxes"
            type="text"
            name="username"
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div>
          <label className="SignUpFormInput">Email</label>
          <input
            className="SignUpFormBoxes"
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div>
          <label className="SignUpFormInput">Phone Number</label>
          <input
            className="SignUpFormBoxes"
            type="text"
            name="phonenumber"
            onChange={updatePhoneNumber}
            value={phonenumber}
          ></input>
        </div>
        <div>
          <label className="SignUpFormInput">Profile Image</label>
          <input
            className="SignUpFormBoxes"
            type="file"
            onChange={updateProfileImage}
          ></input>
        </div>
        <div>
          <label className="SignUpFormInput">Password</label>
          <input
            className="SignUpFormBoxes"
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div>
          <label className="SignUpFormInput">Repeat Password</label>
          <input
            className="SignUpFormBoxes"
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <button className='SignUpButton' type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
