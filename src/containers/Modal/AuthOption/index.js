import React from 'react';
import { connect } from 'react-redux';

import styles from './auth-option-modal.module.css';

const URL = process.env.REACT_APP_URL;

const AuthOptionModal = (props) => (
  <>
    <div
      className={styles['modal-background']}
      style={{
        background: `url(${URL + '/images/bg-modal.png'})`,
      }}
    ></div>
    <div className={styles['auth-option-container']}>
      <p>
        Create an account to track, share and discover anime and manga in a
        uniquely social way.
      </p>
      <div className={styles['auth-option-links']}>
        <div
          onClick={() => props.switchToSignup('signup-modal')}
          className={styles['auth-option-clickable']}
        >
          Sign up with email
        </div>
        <p>
          Have an account?{' '}
          <span
            className={styles['auth-option-clickable']}
            onClick={() => props.switchToSignup('login-modal')}
          >
            Login
          </span>
        </p>
      </div>
      <div className={styles['auth-option-small-text']}>
        <p>
          By signing up you indicate that you have read and agree to the
          <a href="/">Terms of Service</a> and <a href="/">Privacy Policy</a>.
        </p>
      </div>
    </div>
  </>
);

const mapDispatchToProps = (dispatch) => {
  return {
    switchToSignup: (modalType) =>
      dispatch({ type: 'OPEN_MODAL', which: modalType }),
  };
};

export default connect(null, mapDispatchToProps)(AuthOptionModal);
