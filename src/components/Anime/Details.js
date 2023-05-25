import React from 'react';

import eachAnimeSummaryStyles from '../../containers/Anime/Summary/anime-summary.module.css';
import animelistSectionStyles from '../../containers/Library/AnimelistStatus/animelist-status.module.css';

const Details = (props) => {
  return (
    <div
      className={animelistSectionStyles['status']}
      style={{ height: '510px', justifyContent: 'flex-start' }}
    >
      <h5>Anime Details</h5>
      <ul className={eachAnimeSummaryStyles['anime-details-list']}>
        <li className={eachAnimeSummaryStyles['anime-details-list-items']}>
          <strong>English</strong>
          <p>{props.title}</p>
        </li>
        <li className={eachAnimeSummaryStyles['anime-details-list-items']}>
          <strong>Score</strong>
          <p>{props.score}</p>
        </li>
        <li className={eachAnimeSummaryStyles['anime-details-list-items']}>
          <strong>Genre</strong>
          <p>{props.genres.join(', ')}</p>
        </li>
      </ul>
    </div>
  );
};

export default Details;
