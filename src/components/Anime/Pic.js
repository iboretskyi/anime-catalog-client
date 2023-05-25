import React from 'react';
import { connect } from 'react-redux';

import eachAnimeSummaryStyles from '../../containers/Anime/Summary/anime-summary.module.css';
import followStyles from '../../containers/Library/Follow/follow.module.css';

const Pic = (props) => {
  let libraryBox = (
    <>
      <p>Add to Library</p>
      <div className={`${followStyles['follow-btn']} ${followStyles['smaller']}`}>
        Completed
      </div>
      <div className={`${followStyles['follow-btn']} ${followStyles['smaller']} ${followStyles['blue']}`}>
        Want to Watch
      </div>
      <div className={`${followStyles['follow-btn']} ${followStyles['smaller']} ${followStyles['purple']}`}>
        Started Watching
      </div>
    </>
  );

  if (props.inLib)
    libraryBox = (
      <>
        <p>Update Library</p>
        <div className={`${eachAnimeSummaryStyles['each-anime-info-status']} ${eachAnimeSummaryStyles['upper']}`}>
          <span>Saved in </span>
          <span className={eachAnimeSummaryStyles['link-edit-status']}>{props.inLib.status}</span>
        </div>
        <div className={`${followStyles['follow-btn']} ${followStyles['smaller']} ${followStyles['blue']}`}>
          Add Rating
        </div>
        <div
          className={`${followStyles['follow-btn']} ${followStyles['smaller']}`}
          onClick={() =>
            props.openReactionModal({
              title: props.title,
              id: props.id,
            })
          }
        >
          Post Reaction
        </div>
        <div className={eachAnimeSummaryStyles['each-anime-info-status']}>
          <span className={eachAnimeSummaryStyles['link-edit-status']}>Edit Library Entry</span>
        </div>
      </>
    );
  return (
    <div className={eachAnimeSummaryStyles['each-anime-pic']}>
      <img src={props.url} alt={props.url} />
      <div className={eachAnimeSummaryStyles['each-anime-info']}>{libraryBox}</div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    openReactionModal: (payload) =>
      dispatch({
        type: 'OPEN_MODAL',
        which: 'reaction-modal',
        payload: payload,
      }),
  };
};

export default connect(null, mapDispatchToProps)(Pic);
