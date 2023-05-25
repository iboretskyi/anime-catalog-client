import React from 'react';
import { connect } from 'react-redux';

import AuthOption from './AuthOption';
import Signup from './Signup';
import Login from './Login';
import Reaction from './Reaction';
import './modal.css';

const Modal = (props) => {
  let className = 'modal';

  // Add specific class names based on the modal type
  if (props.modalType === 'login-modal') className += ' login-modal-height';
  if (props.modalType === 'reaction-modal') className += ' reaction-modal';

  // Render the appropriate modal based on the modal type
  const switchCaseHandler = () => {
    switch (props.modalType) {
      case 'auth-option-modal':
        return <AuthOption />;
      case 'signup-modal':
        return <Signup />;
      case 'login-modal':
        return <Login />;
      case 'reaction-modal':
        return <Reaction />;
      default:
        return null;
    }
  };

  return <div className={className}>{switchCaseHandler()}</div>;
};

const mapStateToProps = (state) => {
  return {
    modalType: state.webGeneral.modalType,
  };
};

export default connect(mapStateToProps)(Modal);
