import React, { useState } from 'react';
import { connect } from 'react-redux';

import loginStyles from './login-modal.module.css';
import signupStyles from '../Signup/signup-modal.module.css';

const URL = process.env.REACT_APP_URL;

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = async (e) => {
    e.preventDefault();
    const res = await fetch(URL + '/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (res.status !== 200) {
      alert('failed to login');
      return;
    }
    const data = await res.json();
    const expireTime = new Date().getTime() + 1000 * 60 * 60;
    localStorage.setItem('jwt', data.token);
    localStorage.setItem('jwt-expire-time', new Date(expireTime).toISOString());
    props.setJWT(data.token, expireTime);
    props.toggleModal();
    window.location.reload();
  };

  return (
    <div className={signupStyles['signup-modal-container']}>
      <div className={signupStyles['signup-input-field']}>
        <h6>Welcome back!</h6>
        <p>
          Login to your Anime Catalog account below. If you need an account,{' '}
          <span onClick={props.switchToSignup}>
            create one
          </span>
          .
        </p>
      </div>
      <div className={loginStyles['modal-login-option']}>
        <form className={loginStyles['modal-login-form']} onSubmit={(e) => loginHandler(e)}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <a href="/forgot-password">forgot password?</a>
          <button className={signupStyles['signup-submit-button']}>Login</button>
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    switchToSignup: () => dispatch({ type: 'OPEN_MODAL', which: 'signup-modal' }),
    toggleModal: () => dispatch({ type: 'CLOSE_MODAL' }),
    setJWT: (jwt, expireTime) => dispatch({ type: 'SET_JWT', jwt: jwt, expireTime: expireTime }),
  };
};

export default connect(null, mapDispatchToProps)(Login);
