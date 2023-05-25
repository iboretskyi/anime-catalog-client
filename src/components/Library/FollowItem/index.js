import React from 'react';

import followStyles from '../../../containers/Library/Follow/follow.module.css';

const FollowItem = (props) => (
  <div className={followStyles['follow-items']}>
    <div className={followStyles['follow-items-bg']}>
      <img src={process.env.REACT_APP_URL + '/images/bg-user.png'} alt="" />
    </div>
    <img
      style={{ objectFit: 'cover' }}
      onClick={props.otherUser}
      src={process.env.REACT_APP_URL + '/images/profile-pic.png'}
      alt=""
    />
    <div className={followStyles['follow-items-user']}>
      <h4 onClick={props.otherUser}>{props.username}</h4>
      <div
        className={followStyles['follow-btn']}
        disabled={props.self}
        onClick={props.clicked}
      >
        {props.buttonText}
      </div>
    </div>
  </div>
);

export default FollowItem;
