import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Nav from '../../components/Nav';
import navigationStyles from './navigation.module.css';

const NavSection = (props) => {
  const history = useHistory();

  return props.navClass === navigationStyles['nav-right'] ? (
    <nav className={props.navClass}>
      {props.loggedIn ? (
        <Nav
          dropdown={true}
          dropdownList={[
            { name: 'View Profile', clicked: () => {} },
            { name: 'Settings', clicked: () => {} },
            {
              name: 'Logout',
              clicked: props.logout,
            },
          ]}
        >
          profile-pic
        </Nav>
      ) : (
        <>
          <Nav
            dropdown={false}
            clicked={() => props.toggleShowModal('auth-option-modal')}
          >
            Sign Up
          </Nav>
          <Nav
            dropdown={false}
            clicked={() => props.toggleShowModal('login-modal')}
          >
            Sign In
          </Nav>
        </>
      )}
    </nav>
  ) : (
    <nav className={props.navClass}>
      <Nav dropdown={false} clicked={() => history.push('/')}>
        logo
      </Nav>
      {props.loggedIn ? (
        <Nav
          dropdown={false}
          clicked={() => history.push('/library/library')}
        >
          Library
        </Nav>
      ) : null}
      <Nav
        dropdown={true}
        dropdownList={[
          { name: 'anime', clicked: () => history.push('/') },
          { name: 'manga', clicked: () => {} },
        ]}
      >
        Browse ▾
      </Nav>
      <Nav dropdown={false}>Groups</Nav>
      {props.role === 'admin' ? (
        <Nav dropdown={false} clicked={() => history.push('/admin')}>
          Add Anime
        </Nav>
      ) : null}
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.jwt ? true : false,
    role: state.user.user ? state.user.user.role : null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleShowModal: (which) => dispatch({ type: 'OPEN_MODAL', which: which }),
    logout: () => dispatch({ type: 'LOGOUT' }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavSection);
