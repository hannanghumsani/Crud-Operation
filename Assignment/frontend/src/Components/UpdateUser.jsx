import React, { useState } from 'react';
import { useLocation , useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../Css/style.css';

function UpdateUser() {
  const location = useLocation();
  const navigate = useNavigate();
  const userUpdate = location.state || {};

  const [firstName, setFirstName] = useState(userUpdate.firstName || '');
  const [lastName, setLastName] = useState(userUpdate.lastName || '');
  const [email, setEmail] = useState(userUpdate.email || '');
  const [_id, setid] = useState(userUpdate._id || '')
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/edit', {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        _id
      });

      if (response.data.message) {
        window.alert('Email Already in use');
      } else {
        console.log('Update successful:', response.data);
        window.alert('Update successfully');
        navigate('/users');
      }
    } catch (error) {
      console.log('Updating error:', error);
    }
  };

  return (
    <>
      <nav className="bg-dark navbar-dark navbar">
        <div className="row col-12 d-flex justify-content-center text-white">
          <h3>Update User</h3>
        </div>
      </nav>
      <div className="form">
        <div className="form-body">
          <form onSubmit={handleSubmit}>
            <div className="username">
              <label className="form__label" htmlFor="firstName">
                First Name
              </label>
              <input
                className="form__input"
                type="text"
                id="firstName"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                placeholder="First Name"
                required
              />
            </div>
            <div className="lastname">
              <label className="form__label" htmlFor="lastName">
                Last Name
              </label>
              <input
                type="text"
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
                Email
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
                Password
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
                Confirm Password
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
                Edit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateUser;
