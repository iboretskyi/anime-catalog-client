import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import styles from './user-reaction.module.css';
import UserReaction from '../../../components/Library/UserReaction';

const URL = process.env.REACT_APP_URL;

const UserReactionContainer = (props) => {
  const reactions = props.user.reactions;
  const history = useHistory();

  // const deleteReactionHandler = async (reactionId) => {
  //   const res = await fetch(URL + '/user/delete-reaction', {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: 'Bearer ' + props.jwt,
  //     },
  //     body: JSON.stringify({
  //       reactionId: reactionId,
  //     }),
  //   });
  //   if (res.status !== 200) {
  //     alert('action failed');
  //     return;
  //   }
  //   await res.json();
  // };

  return (
    <div className={styles['reaction-section']}>
      <div className={styles['user-reaction-container']}>
        {reactions.map((each) => (
          <UserReaction
            self={true}
            editted={() =>
              props.openModal({
                title: props.animelist[each.animeId].title,
                id: each.id,
                reactionMessage: each.reactionMessage,
              })
            }
            key={each.id}
            upvote={each.upvote}
            reactionMessage={each.reactionMessage}
            title={each.animeTitle}
            url={URL + each.animeImageUrl}
          />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    jwt: state.auth.jwt,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: (payload) =>
      dispatch({
        type: 'OPEN_MODAL',
        which: 'reaction-modal',
        payload: payload,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserReactionContainer);
