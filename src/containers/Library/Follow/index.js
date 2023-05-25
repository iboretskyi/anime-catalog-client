import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import FollowItem from '../../../components/Library/FollowItem';
import animelistStyles from '../AnimelistSection/animelist-section.module.css';
import followStyles from './follow.module.css';
import sectionStyles from '../../Home/Section/section.module.css';

const URL = process.env.REACT_APP_URL;

const Follow = (props) => {
  const history = useHistory();

  const [preventDoubleClick, setPreventDoubleClick] = useState(false);

  // Define followHandler function
  const followHandler = async (targetUserId, buttonText) => {
    setPreventDoubleClick(true);
    
    // Decide endpoint based on button text
    const endpoint = buttonText === 'Follow' ? 'follow-user' : 'unfollow-user';
    
    // Make a fetch request to the server to follow/unfollow user
    const res = await fetch(URL + '/user/' + endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + props.jwt,
      },
      body: JSON.stringify({ targetUserId: targetUserId }),
    });

    // If server response status is not 200, alert the user
    if (res.status !== 200) {
      alert('action failed');
      return;
    }
    await res.json();
  };

  // Render the component
  return props.user[props.page].length > 0 ? (
    <div className={`${animelistStyles['animelist-section']} ${followStyles['follow-section']}`}>
      {props.user[props.page].map((each) => {
        let buttonText = 'Follow';
        let found = false;

        // Check if each user is found in followings
        if (!props.other) {
          found = props.user.followings?.find(
            (eachUser) => eachUser.id.toString() === each.id.toString()
          );
        }

        let found2 = false;
        let self = false;

        // Check if each user is found in current user's followings
        if (props.curUser) {
          found2 = props.curUser.followings?.find(
            (eachUser) => eachUser.id.toString() === each.id.toString()
          );
          // Check if each user is the current user
          if (each.id.toString() === props.curUser.id.toString()) self = true;
        }

        // If user is found in followings or is the current user, set buttonText to 'Unfollow' or 'Hey, that's you!' accordingly
        if ((props.page === 'following' && !props.other) || found || found2)
          buttonText = 'Unfollow';
        if (self) buttonText = "Hey, that's you!";

        // Return FollowItem for each user
        return (
          <FollowItem
            key={each.id}
            username={each.username}
            otherUser={() =>
              history.push('/others-library/' + each.id + '/library')
            }
            buttonText={buttonText}
            clicked={() =>
              !preventDoubleClick ? followHandler(each.id, buttonText) : null
            }
            self={self}
          />
        );
      })}
    </div>
  ) : (
    <div style={{ fontSize: '16px', fontFamily: 'sans-serif' }}>
      No Users Found.
    </div>
  );
};

// Map state to props
const mapStateToProps = (state) => {
  return {
    jwt: state.auth.jwt,
  };
};

export default connect(mapStateToProps)(Follow);
