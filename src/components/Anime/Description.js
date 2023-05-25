import React from 'react';

import eachAnimeSummaryStyles from '../../containers/Anime/Summary/anime-summary.module.css';
import animelistSectionStyles from '../../containers/Library/AnimelistSection/animelist-section.module.css';

const Description = (props) => (
  <div
    className={animelistSectionStyles['anime-list-container']}
    style={{ width: '100%' }}
  >
    <h3>{props.title}</h3>
    <p className={eachAnimeSummaryStyles['description']}>{props.description}</p>
  </div>
);

export default Description;
