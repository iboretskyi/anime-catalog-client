import React, { useState } from 'react';

import DropdownContent from './DropdownContent';
import Backdrop from '../UI/Backdrop';
import navigationStyles from '../../containers/Navigation/navigation.module.css';
import userReactionStyles from '../../containers/Library/UserReactionContainer/user-reaction.module.css';

const URL = process.env.REACT_APP_URL;

const Nav = (props) => {
  const [dropdown, setDropdown] = useState(false);

  const dropdownHandler = () => {
    setDropdown((prevState) => !prevState);
  };

  const backdrop = dropdown ? <Backdrop class="backdrop" clicked={dropdownHandler} /> : null;

  // Handle profile-pic
  if (props.children === 'profile-pic') {
    const profilePicClass = dropdown
      ? `${navigationStyles[`${props.children}`]} ${navigationStyles['dropdown-content-show']}`
      : navigationStyles[`${props.children}`];

    return (
      <>
        {backdrop}
        <div className={`${navigationStyles['nav-a']} ${navigationStyles['dropdown']}`}>
          <img
            onClick={dropdownHandler}
            className={profilePicClass}
            style={{ objectFit: 'cover' }}
            src={`${URL}/images/profile-pic.png`}
            alt="/images/logo.png"
          />
          <div className={`${navigationStyles['dropdown-content']} ${navigationStyles['for-profile']}`}>
            {props.dropdownList.map((each, index) => (
              <DropdownContent key={index} clicked={each.clicked}>
                {each.name}
              </DropdownContent>
            ))}
          </div>
        </div>
      </>
    );
  }

  // Handle logo
  if (props.children === 'logo') {
    return (
      <div className={`${navigationStyles['nav-a']} ${navigationStyles.sidebar}`}>
        <img
          onClick={props.clicked}
          className={props.children}
          src={`${URL}/images/logo.png`}
          alt="/images/logo.png"
        />
      </div>
    );
  }

  // Handle other navigation elements
  let btnClass = `${navigationStyles['drop-btn']}`;
  if (dropdown) btnClass += ` ${navigationStyles['dropdown-content-show']}`;
  if (props.mediaReaction) btnClass += ` ${userReactionStyles['user-reaction-dropdown']}`;

  if (props.dropdown) {
    return (
      <>
        {backdrop}
        <div className={`${navigationStyles['nav-a']} ${navigationStyles.dropdown}`}>
          <button
            onClick={dropdownHandler}
            className={btnClass}
            id="drop-btn-browse"
          >
            {props.children}
          </button>
          <div
            className={
              props.mediaReaction
                ? `${navigationStyles['dropdown-content']} ${userReactionStyles['for-reaction']}`
                : navigationStyles['dropdown-content']
            }
          >
            {props.dropdownList.map((each, index) => (
              <DropdownContent
                key={index}
                clicked={() => {
                  each.clicked();
                  dropdownHandler();
                }}
              >
                {each.name}
              </DropdownContent>
            ))}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className={navigationStyles['nav-a']} onClick={props.clicked}>
        <button className={btnClass} onClick={props.clicked}>
          {props.children}
        </button>
      </div>
    );
  }
};

export default Nav;
