import React, { useState } from 'react';
import '../Css/style.css';
import {  useNavigate,Link } from 'react-router-dom';

import axios from 'axios';
// import React from 'react'

function LoginUser() {
  const navigate = useNavigate();
    // const [firstName, setFirstName] = useState('');
    // const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');
    const LoginCredential = async () => {
      try {
        const response = await axios.post('http://localhost:8080/api/login', {
          email,
          password,
        });
        if(response.data.message){
          window.alert('Ivalid Credential');
        }else{
          console.log('Login successfully', response.data);
          // window.alert('ragister succesfully');
          navigate('/users');     
        }
      } catch (error) {
        console.log('Registration error:', error);
      }
    };



    const handleSubmit = (e) => {
      e.preventDefault();
      if (!email.trim() || !password.trim()) {
        window.alert('Please fill in all fields');
      } else {
        console.log( email, password);
        LoginCredential()
      }
    };
  return (
    <>
      <nav className="bg-dark navbar-dark navbar">
        <div className="row col-12 d-flex justify-content-center text-white">
          <h3>Login</h3>
        </div>
      </nav>
      <div className="form">
        <div className="form-body">
          <form onSubmit={handleSubmit}>
            
        
            <div className="email">
              <label className="form__label" htmlFor="email">
                Email{' '}
              </label>
              <input
                type="email"
                id="email"
                className="form__input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                minLength="6"
              />
            </div>
            
            <div className="footer">
              <button type="submit" className="btn">
                Login
              </button>
              <Link className="btn btn-primary" to="/register">
          Create User
        </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default LoginUser
