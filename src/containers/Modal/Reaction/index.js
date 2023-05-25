import React, { useState } from 'react';
import { connect } from 'react-redux';

import styles from './reaction-modal.module.css';

const URL = process.env.REACT_APP_URL;
const WORD_LIMIT = 140;

const Reaction = (props) => {
  const [reactionMessage, setReactionMessage] = useState(
    props.payload.reactionMessage ? props.payload.reactionMessage : ''
  );
  const [preventDoubleClick, setPreventDoubleClick] = useState(false);

  let btnClass = styles['reaction-post-button'];
  if (reactionMessage.length > 0 && reactionMessage.length <= WORD_LIMIT)
    btnClass += ` ${styles.success}`;

  const onClickHandler = async (btnText) => {
    setPreventDoubleClick(true);
    let endpoint = 'post-reaction';
    let method = 'POST';
    let body = {
      reactionMessage: reactionMessage,
      animeId: props.payload.id,
    };
    if (btnText === 'Edit') {
      endpoint = 'put-reaction';
      method = 'PUT';
      body = {
        reactionMessage: reactionMessage,
        reactionId: props.payload.id,
      };
    }

    const res = await fetch(URL + '/user/' + endpoint, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + props.jwt,
      },
      body: JSON.stringify(body),
    });
    if (method === 'POST' && res.status !== 201)
      throw new Error('failed to post a reaction');
    if (method === 'PUT' && res.status !== 200)
      throw new Error('failed to updat a reaction');
    props.closeModal();
  };

  let btnText = props.payload.reactionMessage ? 'Edit' : 'Post';

  return (
    <>
      <img className={styles['reaction-img']} src={URL + '/images/bg-modal.png'} alt="" />
      <div className={styles['reaction-info']}>
        <div className={styles['reaction-info-header']}>
          <span className={styles.left}>{props.payload.title}</span>
          <span className={styles.left}>TV</span>
          <span className={styles['far-right']}>
            {WORD_LIMIT - reactionMessage.length}
          </span>
        </div>
        <textarea
          placeholder="While it may not be everyone's cup of tea, it's certainly interesting."
          value={reactionMessage}
          onChange={(e) => setReactionMessage(e.target.value)}
        ></textarea>
      </div>
      <button
        className={btnClass}
        disabled={
          reactionMessage.length === 0 || reactionMessage.length > WORD_LIMIT
        }
        onClick={() => (!preventDoubleClick ? onClickHandler(btnText) : null)}
      >
        {btnText}
      </button>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    payload: state.webGeneral.payload,
    jwt: state.auth.jwt,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch({ type: 'CLOSE_MODAL' }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reaction);
