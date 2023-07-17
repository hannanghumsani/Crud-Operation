import React, {useState} from 'react';
// import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';

import axios from 'axios';
import '../Css/style.css';

function RegisterUser() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // const SubmitData = async () => {
    const navigate = useNavigate();


  const SubmitData = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/register', {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      });
      if(response.data.message){
        window.alert('Email Already in use');
      }else{
        console.log('Registration successful:', response.data);
        window.alert('ragister succesfully');
        navigate('/');
        
      }

    } catch (error) {
      console.log('Registration error:', error);

    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      window.alert('Please fill in all fields');
    } else if (password !== confirmPassword) {
      window.alert('Passwords do not match');
    } else {
      
      console.log(firstName, lastName, email, password, confirmPassword);
      SubmitData();
    }
  };

  return (
    <>
      <nav className="bg-dark navbar-dark navbar">
        <div className="row col-12 d-flex justify-content-center text-white">
          <h3>Registration</h3>
        </div>
      </nav>
      <div className="form">
        <div className="form-body">
          <form onSubmit={handleSubmit}>
            <div className="username">
              <label className="form__label" htmlFor="firstName">
                First Name{' '}
              </label>
              <input
                className="form__input"
                type="text"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                id="firstName"
                placeholder="First Name"
                required
              />
            </div>
            <div className="lastname">
              <label className="form__label" htmlFor="lastName">
                Last Name{' '}
              </label>
              <input
                type="text"
                name=""
                id="lastName"
                value={lastName}
                className="form__input"
                onChange={e => setLastName(e.target.value)}
                placeholder="Last Name"
                required
              />
            </div>
            <div className="email">
              <label className="form__label" htmlFor="email">
                Email{' '}
              </label>
              <input
                type="email"
                id="email"
                className="form__input"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
            <div className="password">
              <label className="form__label" htmlFor="password">
                Password{' '}
              </label>
              <input
                className="form__input"
                type="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                required
                minLength="6"
              />
            </div>
            <div className="confirm-password">
              <label className="form__label" htmlFor="confirmPassword">
                Confirm Password{' '}
              </label>
              <input
                className="form__input"
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required
                minLength="6"
              />
            </div>
            <div className="footer">
              <button type="submit" className="btn">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegisterUser;
