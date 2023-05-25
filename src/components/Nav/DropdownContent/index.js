import React from 'react';

import navigationStyles from '../../../containers/Navigation/navigation.module.css';

const DropdownContent = (props) => (
  <p className={navigationStyles['dropdown-content-items']} onClick={props.clicked}>
    {props.children}
  </p>
);

export default DropdownContent;
