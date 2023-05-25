import React from 'react';
import { connect } from 'react-redux';

import NavSection from './NavSection';
import navigationStyles from './navigation.module.css';

const NavContainer = (props) => (
  <div
    className={
      props.transparentNav ? `${navigationStyles['nav-container']} ${navigationStyles['transparent']}` : navigationStyles['nav-container']
    }
  >
    <div style={navContainerStyles}>
      <NavSection navClass={navigationStyles['nav-left']} />
      <NavSection navClass={navigationStyles['nav-right']} />
    </div>
  </div>
);

const mapStateToProps = (state) => {
  return {
    transparentNav: state.webGeneral.transparentNav,
  };
};

const navContainerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  flexGrow: '1',
  maxWidth: '1472px',
  width: '100%',
  padding: '0px 16px'
};

export default connect(mapStateToProps)(NavContainer);
