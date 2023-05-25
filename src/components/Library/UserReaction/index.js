import React from 'react';
import userReactionStyles from '../../../containers/Library/UserReactionContainer/user-reaction.module.css';
import Nav from '../../Nav';

const UserReaction = (props) => {

  // CSS class for upvote button
  const upvoteClass = props.disabledUpvote
    ? `${userReactionStyles['user-reaction-upvote']} ${userReactionStyles['disabled-upvote-div']}`
    : userReactionStyles['user-reaction-upvote'];

  // Dropdown list for navigation
  const dropdownList = [
    { name: 'Copy Link to Reaction', clicked: () => { } },
    { name: 'Edit Reaction', clicked: props.editted },
    { name: 'Delete Reaction', clicked: props.deleted },
  ];

  return (
    <div className={userReactionStyles['user-reaction-items']} style={props.wider && { width: '56%' }}>
      <div className={userReactionStyles['user-reaction-reaction']}>
        <div className={userReactionStyles['user-reaction-header']}>
          <div className={upvoteClass} onClick={props.upvoted}>
            <span>▲</span> 
            <span>{props.upvote}</span>
          </div>
          {props.self && (
            <Nav
              dropdown={true}
              dropdownList={dropdownList}
              mediaReaction={true}
            >
              ● ● ●
            </Nav>
          )}
        </div>
        <div>
          <p className={userReactionStyles['user-reaction-title']}>
            {props.title} <span>TV</span>
          </p>
          <p className={userReactionStyles['user-reaction-desc']} onClick={props.clicked}>
            {props.reactionMessage}
          </p>
        </div>
      </div>
      <img src={props.url} alt="" />
    </div>
  );
};

export default UserReaction;
