import React from 'react';
import { NavLink } from 'react-router-dom';

import libraryHeaderStyles from '../../containers/Library/LibraryHeader/library-header.module.css';

const EachLibraryNav = (props) => {
  let linkClass = libraryHeaderStyles['library-nav-items'];
  if (props.active) linkClass += ' ' + libraryHeaderStyles['library-nav-items-active'];
  return (
    <NavLink to={props.href} className={linkClass}>
      {props.children}
    </NavLink>
  );
};

export default EachLibraryNav;
