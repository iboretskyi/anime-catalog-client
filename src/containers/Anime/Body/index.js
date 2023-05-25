import React from 'react';

import animelistStyles from '../../Library/AnimelistSection/animelist-section.module.css';
import bodyStyles from './anime-body.module.css';
import Pic from '../../../components/Anime/Pic';

const Body = (props) => (
  <div className={animelistStyles['animelist-section']}>
    <Pic url={props.url} inLib={props.inLib} />
    <div className={bodyStyles['anime-details-section']}></div>
  </div>
);

export default Body;
