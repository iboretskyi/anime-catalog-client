import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import DropdownContent from '../../Nav/DropdownContent';
import Backdrop from '../../UI/Backdrop';
import sectionStyles from '../../../containers/Home/Section/section.module.css';
import navigationStyles from '../../../containers/Navigation/navigation.module.css';

const URL = process.env.REACT_APP_URL;

const Section = (props) => {
  const history = useHistory();
  const [dropdown, setDropdown] = useState(false);
  const [preventDoubleClick, setPreventDoubleClick] = useState(false);

  // Dropdown list content
  const dropdownList = [
    'Completed',
    'On Hold',
    'Currently Watching',
    'Want to Watch',
    'Dropped',
  ];
  if (props.role === 'admin') {
    dropdownList.push('Edit');
  }

  // Handlers
  const dropdownHandler = () => {
    setDropdown((prevState) => !prevState);
  };

  const redirectHandler = () => {
    history.push(`/each-anime/${props.id}`);
  };

  const addToLibrary = async (animeId, status) => {
    if (!props.jwt) {
      props.toggleShowModal();
      return;
    }

    setPreventDoubleClick(true);

    const res = await fetch(`${URL}/user/add-to-library`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${props.jwt}`,
      },
      body: JSON.stringify({
        animeId: animeId,
        status: status,
      }),
    });

    if (res.status !== 200) {
      alert('action failed');
      return;
    } else {
      await res.json();
      window.location.reload();
    }
  };

  // CSS Classes
  let btnClass = sectionStyles['lib-stat-drop'];
  if (dropdown) {
    btnClass += ` ${navigationStyles['dropdown-content-show']}`;
  }

  return (
    <>
      {dropdown && <Backdrop class="backdrop" clicked={dropdownHandler} />}
      <div className={sectionStyles['section-items']}>
        <img
          onClick={redirectHandler}
          className={sectionStyles['section-items-img']}
          src={props.imageUrl}
          alt={props.imageUrl}
        />
        <div className={sectionStyles['add-to-library']}>
          <div className={btnClass} onClick={dropdownHandler}>
            {props.inLibrary ? props.inLibrary : 'Add To library'}
          </div>
          <div className={`${navigationStyles['dropdown-content']} ${sectionStyles['lib-stat-drop-content']}`}>
            {dropdownList.map((each, index) => (
              <DropdownContent
                key={index}
                clicked={() =>
                  each === 'Edit'
                    ? history.push(`/admin?${each}=${props.id}`)
                    : !preventDoubleClick
                    ? addToLibrary(props.id, each)
                    : null
                }
              >
                {each}
              </DropdownContent>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    jwt: state.auth.jwt,
    role: state.user.user ? state.user.user.role : null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleShowModal: () =>
      dispatch({ type: 'OPEN_MODAL', which: 'login-modal' }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Section);
