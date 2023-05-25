import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Reaction from './Reaction';
import './anime-reaction.css';

const URL = process.env.REACT_APP_URL;

const EachAnimeReaction = (props) => {
  console.log('props', props)
  const history = useHistory();

  // State for upvote count and prevention of double-click
  const [upvote, setUpvote] = useState(null);
  const [preventDoubleClick, setPreventDoubleClick] = useState(false);

  useEffect(() => { }, [upvote]);

  // Function for handling upvote actions
  const upvoteHandler = async (id) => {
    // prevent double click
    setPreventDoubleClick(true);
    
    // If the item is already upvoted, perform un-upvote action
    if (props.upvotedlist[id]) {
      // Fetch request to un-upvote API
      const res = await fetch(URL + '/user/un-upvote', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + props.jwt,
        },
        body: JSON.stringify({
          reactionId: id,
        }),
      });
      if (res.status !== 200) {
        return;
      }
      const resData = await res.json();
      setUpvote(resData.upvote);
    } else {
      // If the item is not upvoted, perform upvote action
      const res = await fetch(URL + '/user/upvote', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + props.jwt,
        },
        body: JSON.stringify({
          reactionId: id,
        }),
      });
      if (res.status !== 200) {
        alert('action failed');
        return;
      }
      const resData = await res.json();
      setUpvote(resData.upvote);
    }
    // Enable click after 2 seconds
    setTimeout(() => {
      setPreventDoubleClick(false);
    }, 2000);
  };

  return props?.reactions?.length > 0 ? (
    <div className="reaction-container">
      <div className="reaction-header">
        <h5>Reactions</h5>
        {props.inLib && (
          <h5
            onClick={() =>
              props.openModal({
                title: props.title,
                id: props.id.toString(),
              })
            }
            className="new-reaction"
          >
            New Reactions
          </h5>
        )}
      </div>
      <div className="reaction-content">
        {props.reactions.map(
          (each, index) =>
            (!props.viewmore || index <= 5) && (
              <Reaction
                otherUser={() =>
                  history.push(
                    '/others-library/' + each.id + '/library'
                  )
                }
                upvoted={() =>
                  !props.jwt
                    ? props.openModal()
                    : !preventDoubleClick
                      ? upvoteHandler(each.id)
                      : null
                }
                key={each.id.toString()}
                id={each.id}
                username={each.username}
                reactionMessage={each.reactionMessage}
                upvote={each.upvote}
              />
            )
        )}
        {props.viewmore && (
          <div
            className="view-more-reaction"
            onClick={() =>
              history.push('/each-anime/' + props.id + '/reactions')
            }
          >
            View More Reactions
          </div>
        )}
      </div>
    </div>
  ) : props.reactionpage ? (
    <div
      style={{
        textAlign: 'center',
        fontFamily: 'sans-serif',
        fontSize: '16px',
        marginTop: '16px',
      }}
    >
      This anime has no reactions
    </div>
  ) : null;
};

// Map state to props function for connecting component to Redux store
const mapStateToProps = (state) => {
  return {
    jwt: state.auth.jwt,
    upvotedlist: state.user.upvotedlist,
  };
};

// Map dispatch to props function for connecting component actions to Redux store
const mapDispatchToProps = (dispatch) => {
  return {
    openModal: (payload) => {
      if (payload)
        dispatch({
          type: 'OPEN_MODAL',
          which: 'reaction-modal',
          payload: payload,
        });
      else dispatch({ type: 'OPEN_MODAL', which: 'login-modal' });
    },
  };
};

// Connect component to Redux store
export default connect(mapStateToProps, mapDispatchToProps)(EachAnimeReaction);
