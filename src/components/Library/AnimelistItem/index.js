import React from 'react';
import { useHistory } from 'react-router-dom';

import animelistStyles from '../../../containers/Library/AnimelistSection/animelist-section.module.css';

const AnimelistItem = (props) => {
  const history = useHistory();

  const redirectHandler = () => {
    history.push('/each-anime/' + props.animeId);
  };

  return (
    <div className={animelistStyles['section-items']}>
      <img
        onClick={redirectHandler}
        className={animelistStyles['section-items-img']}
        src={props.url}
        alt={props.url}
      />
      <div className={animelistStyles['progress']}>
        <p>{props.status}</p>
      </div>
    </div>
  );
};

export default AnimelistItem;
